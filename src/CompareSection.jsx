function CompareSection({ compareList, onRemoveCompare, onClearCompare }) {
  if (compareList.length === 0) return null

  const priceDiff =
    compareList.length === 2
      ? Math.abs(compareList[0].price - compareList[1].price)
      : 0

  return (
    <div className="bg-white p-5 rounded-xl border border-indigo-200 mb-6 shadow-sm">
      <div className="flex justify-between items-center mb-3 border-b pb-2">
        <h2 className="text-base font-bold text-indigo-900">
          ⚖️ Compare Products ({compareList.length}/2)
        </h2>
        <button
          onClick={onClearCompare}
          className="text-xs text-rose-500 font-bold underline cursor-pointer"
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {compareList.map((item) => (
          <div key={item.id} className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 flex justify-between items-center">
            <div>
              <span className="text-2xl">{item.icon}</span>
              <h3 className="font-bold text-slate-800 mt-1">{item.name}</h3>
              <p className="text-xs text-slate-500">Category: {item.category}</p>
              <p className="text-sm font-extrabold text-indigo-700 mt-1">
                ₹{item.price.toLocaleString()}
              </p>
            </div>
            <button
              onClick={() => onRemoveCompare(item.id)}
              className="text-xs bg-white border px-2 py-1 rounded font-bold text-slate-600 cursor-pointer"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {compareList.length === 2 && (
        <div className="mt-4 bg-indigo-900 text-white p-3 rounded-lg text-center text-xs font-bold">
          💡 Price Difference: ₹{priceDiff.toLocaleString()} between {compareList[0].name} & {compareList[1].name}
        </div>
      )}
    </div>
  )
}

export default CompareSection
