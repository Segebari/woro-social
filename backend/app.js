const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();  
app.use(cors());
app.use(express.json());

const FB_GRAPH_API = 'https://graph.facebook.com/v22.0';
const ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN;


// Add this function
function mockResponse(type, error) {
  console.error(`API failed for ${type}:`, error.message);
  if (type === 'accounts') {
    return [
      { id: 'mock-ig-1', username: 'mockuser1' },
      { id: 'mock-ig-2', username: 'mockuser2' },
    ];
  }
  if (type === 'messages') {
    return {
      data: [
        { id: 'msg1', participants: [{ id: 'user1', username: 'user1' }], messages: [{ text: 'Hey there!' }] },
        { id: 'msg2', participants: [{ id: 'user2', username: 'user2' }], messages: [{ text: 'Nice post!' }] },
      ],
    };
  }
  if (type === 'posts') {
    return {
      data: [
        { id: 'post1', caption: 'Cool photo!', comments: { data: [{ text: 'Great shot!' }] } },
        { id: 'post2', caption: 'Another one', comments: { data: [{ text: 'Love this!' }] } },
      ],
    };
  }
  return { error: 'Mock not implemented for this type' };
}


// Route to get Instagram accounts linked to user's Pages (pages_show_list)
app.get("/api/accounts", async (req, res) => {
  try {
    // Step 1: Get Pages user manages
    const pagesResponse = await axios.get(`${FB_GRAPH_API}/me/accounts`, {
      params: { access_token: ACCESS_TOKEN },
    });
    const pages = pagesResponse.data.data;

    // Step 2: Filter Pages with Instagram Business accounts
    const accounts = await Promise.all(
      pages.map(async (page) => {
        const igResponse = await axios.get(`${FB_GRAPH_API}/${page.id}`, {
          params: {
            fields: "instagram_business_account{name,username}",
            access_token: ACCESS_TOKEN,
          },
        });
        const igAccount = igResponse.data.instagram_business_account;
        return igAccount
          ? { id: igAccount.id, username: igAccount.username }
          : null;
      })
    );
    const validAccounts = accounts.filter(Boolean); // Remove nulls
    if (validAccounts.length === 0)
      throw new Error("No Instagram Business accounts found");
    res.json(validAccounts);
  } catch (error) {
    console.error("API failed for accounts:", error.message);
    res.json(mockResponse("accounts", error)); // Fallback to mock
  }
});

// Route to get DMs (instagram_manage_messages)
app.get("/api/messages/:igUserId", async (req, res) => {
  const { igUserId } = req.params;
  try {
    const response = await axios.get(
      `${FB_GRAPH_API}/${igUserId}/conversations`,
      {
        params: {
          fields: "id,participants,messages{text}",
          access_token: ACCESS_TOKEN,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.json(mockResponse("messages", error));
  }
});

// Route to send a DM (instagram_manage_messages)
app.post('/api/messages/:igUserId', async (req, res) => {
  const { igUserId } = req.params;
  const { recipientId, message } = req.body;
  try {
    const response = await axios.post(`${FB_GRAPH_API}/${igUserId}/messages`, {
      recipient: { id: recipientId },
      message,
    }, { params: { access_token: ACCESS_TOKEN } });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get posts and comments (instagram_manage_comments)
app.get('/api/posts/:igUserId', async (req, res) => {
  const { igUserId } = req.params;
  try {
    const response = await axios.get(`${FB_GRAPH_API}/${igUserId}/media`, {
      params: { fields: 'id,caption,comments', access_token: ACCESS_TOKEN },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to post a comment (instagram_manage_comments)
app.post('/api/comments/:mediaId', async (req, res) => {
  const { mediaId } = req.params;
  const { message } = req.body;
  try {
    const response = await axios.post(`${FB_GRAPH_API}/${mediaId}/comments`, {
      message,
    }, { params: { access_token: ACCESS_TOKEN } });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to configure webhook (pages_manage_metadata)
app.post('/api/webhook/:pageId', async (req, res) => {
  const { pageId } = req.params;
  const { fields } = req.body; // e.g., ['messages', 'comments']
  try {
    const response = await axios.post(`${FB_GRAPH_API}/${pageId}/subscribed_apps`, {
      subscribed_fields: fields.join(','),
    }, { params: { access_token: ACCESS_TOKEN } });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = app;