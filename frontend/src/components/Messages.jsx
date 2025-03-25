function Messages({ messages, onSend, onBack }) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md border border-black p-6">
        <h2 className="text-xl font-bold text-black mb-4">Messages</h2>
        {messages.map((msg) => (
          <div key={msg.id} className="mb-4">
            <p className="text-black">
              {msg.participants[0].username}: {msg.messages[0]?.text}
            </p>
            <input
              type="text"
              placeholder="Type a reply..."
              className="w-full border border-black p-2 mt-2"
              onKeyPress={(e) =>
                e.key === "Enter" &&
                onSend(msg.participants[0].id, e.target.value)
              }
            />
          </div>
        ))}
        <button onClick={onBack} className="text-black underline">
          Back
        </button>
      </div>
    </div>
  );
}
export default Messages;
