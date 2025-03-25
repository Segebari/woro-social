function Success({ onBack }) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md border border-black p-6 text-center">
        <h2 className="text-xl font-bold text-black mb-4">Success</h2>
        <p className="text-black mb-4">Action completed.</p>
        <button onClick={onBack} className="text-black underline">
          Back
        </button>
      </div>
    </div>
  );
}
export default Success;
