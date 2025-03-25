function LiveUpdates({ webhookFields, setWebhookFields, onSave, onBack }) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md border border-black p-6">
        <h2 className="text-xl font-bold text-black mb-4">Webhook</h2>
        <label className="block mb-2">
          <input
            type="checkbox"
            checked={webhookFields.messages}
            onChange={(e) =>
              setWebhookFields({ ...webhookFields, messages: e.target.checked })
            }
            className="mr-2"
          />
          <span className="text-black">Messages</span>
        </label>
        <label className="block mb-2">
          <input
            type="checkbox"
            checked={webhookFields.comments}
            onChange={(e) =>
              setWebhookFields({ ...webhookFields, comments: e.target.checked })
            }
            className="mr-2"
          />
          <span className="text-black">Comments</span>
        </label>
        <p className="text-black mb-4">URL: https://your-app.com/webhook</p>
        <button
          onClick={onSave}
          className="w-full border border-black text-black p-2 mb-2"
        >
          Save
        </button>
        <button onClick={onBack} className="text-black underline">
          Back
        </button>
      </div>
    </div>
  );
}
export default LiveUpdates;
