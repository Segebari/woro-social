function Comments({ posts, onPostComment, onBack }) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md border border-black p-6">
        <h2 className="text-xl font-bold text-black mb-4">Comments</h2>
        {posts.map((post) => (
          <div key={post.id} className="mb-4">
            <p className="text-black">Post: {post.caption}</p>
            {post.comments?.data.map((comment) => (
              <p key={comment.id} className="text-black ml-4">
                - {comment.text}
              </p>
            ))}
            <input
              type="text"
              placeholder="Type a reply..."
              className="w-full border border-black p-2 mt-2"
              onKeyPress={(e) =>
                e.key === "Enter" && onPostComment(post.id, e.target.value)
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
export default Comments;
