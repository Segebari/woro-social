function Landing({ onLogin }) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md border border-black p-6">
        <h1 className="text-2xl font-bold text-black mb-4 text-center">Woro-Social</h1>
        <p className="text-black mb-4">
          Connect your Instagram account to manage messages and comments.
        </p>
        <button
          onClick={onLogin}
          className="w-full border border-black text-black px-4 py-2"
        >
          Login with Facebook
        </button>
      </div>
    </div>
  );
}
export default Landing;
