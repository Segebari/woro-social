function Dashboard({ account, onViewMessages, onViewPosts, onWebhook }) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md border border-black p-6">
        <h2 className="text-xl font-bold text-black mb-4">Dashboard</h2>
        <p className="text-black mb-4">Account: @{account.username}</p>
        <button
          onClick={onViewMessages}
          className="w-full border border-black text-black p-2 mb-2"
        >
          Messages
        </button>
        <button
          onClick={onViewPosts}
          className="w-full border border-black text-black p-2 mb-2"
        >
          Comments
        </button>
        <button
          onClick={onWebhook}
          className="w-full border border-black text-black p-2 mb-2"
        >
          LiveUpdates
        </button>
      </div>
    </div>
  );
}
export default Dashboard;
