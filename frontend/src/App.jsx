import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Landing from "./components/Landing";
import AccountSelection from "./components/AccountSelection";
import Dashboard from "./components/Dashboard";
import Messages from "./components/Messages";
import Comments from "./components/Comments";
import LiveUpdates from "./components/LiveUpdates";
import Success from "./components/Success";

function App() {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [messages, setMessages] = useState([]);
  const [posts, setPosts] = useState([]);
  const [webhookFields, setWebhookFields] = useState({
    messages: false,
    comments: false,
  });

  const navigate = useNavigate();

  const handleLogin = async () => {
    const { data } = await axios.get("http://localhost:5000/api/accounts");
    setAccounts(data);
    navigate("/accounts");
  };

  const handleSelectAccount = (account) => {
    setSelectedAccount(account);
    navigate("/dashboard");
  };

  const handleViewMessages = async () => {
    const { data } = await axios.get(
      `http://localhost:5000/api/messages/${selectedAccount.id}`
    );
    setMessages(data.data);
    navigate("/messages");
  };

  const handleSendMessage = async (recipientId, message) => {
    await axios.post(
      `http://localhost:5000/api/messages/${selectedAccount.id}`,
      { recipientId, message }
    );
    navigate("/success");
  };

  const handleViewPosts = async () => {
    const { data } = await axios.get(
      `http://localhost:5000/api/posts/${selectedAccount.id}`
    );
    setPosts(data.data);
    navigate("/comments");
  };

  const handlePostComment = async (mediaId, message) => {
    await axios.post(`http://localhost:5000/api/comments/${mediaId}`, {
      message,
    });
    navigate("/success");
  };

  const handleConfigureWebhook = async () => {
    const fields = [];
    if (webhookFields.messages) fields.push("messages");
    if (webhookFields.comments) fields.push("comments");
    await axios.post(
      `http://localhost:5000/api/webhook/${selectedAccount.id}`,
      { fields }
    );
    navigate("/success");
  };

  return (
    <Routes>
      <Route path="/" element={<Landing onLogin={handleLogin} />} />
      <Route
        path="/accounts"
        element={
          <AccountSelection
            accounts={accounts}
            onSelect={handleSelectAccount}
          />
        }
      />
      <Route
        path="/dashboard"
        element={
          <Dashboard
            account={selectedAccount}
            onViewMessages={handleViewMessages}
            onViewPosts={handleViewPosts}
            onWebhook={() => navigate("/webhook")}
          />
        }
      />
      <Route
        path="/messages"
        element={
          <Messages
            messages={messages}
            onSend={handleSendMessage}
            onBack={() => navigate("/dashboard")}
          />
        }
      />
      <Route
        path="/comments"
        element={
          <Comments
            posts={posts}
            onPostComment={handlePostComment}
            onBack={() => navigate("/dashboard")}
          />
        }
      />
      <Route
        path="/webhook"
        element={
          <LiveUpdates
            webhookFields={webhookFields}
            setWebhookFields={setWebhookFields}
            onSave={handleConfigureWebhook}
            onBack={() => navigate("/dashboard")}
          />
        }
      />
      <Route
        path="/success"
        element={<Success onBack={() => navigate("/dashboard")} />}
      />
    </Routes>
  );
}

export default App;
