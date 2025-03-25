function AccountSelection({ accounts, onSelect }) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md border border-black p-6">
        <h2 className="text-xl font-bold text-black mb-4">Select Account</h2>
        <p className="text-black mb-4">Choose an Instagram account:</p>
        {accounts.map((account) => (
          <button
            key={account.id}
            onClick={() => onSelect(account)}
            className="w-full border border-black text-black p-2 mb-2 text-left"
          >
            @{account.username}
          </button>
        ))}
      </div>
    </div>
  );
}
export default AccountSelection;
