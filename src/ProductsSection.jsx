function ProductsSection({
  categories,
  selectedCategory,
  onSelectCategory,
  sortBy,
  onSortChange,
  products,
  wishlist,
  compareList,
  onToggleCompare,
  onToggleWishlist,
  onAddToCart
}) {
  return (
    <div>
      <div className="flex flex-wrap justify-between items-center gap-3 mb-5">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-bold cursor-pointer ${
                selectedCategory === cat ? 'bg-slate-900 text-amber-400' : 'bg-white text-slate-700 border'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="bg-white border px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 cursor-pointer"
        >
          <option value="default">Sort: Featured</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {products.map((item) => {
          const isWishlisted = wishlist.some((w) => w.id === item.id)
          const isCompared = compareList.some((c) => c.id === item.id)
          return (
            <div key={item.id} className="bg-white p-4 rounded-xl border flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{item.icon}</span>
                <div>
                  <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded font-bold text-slate-500">
                    {item.category}
                  </span>
                  <h3 className="font-bold text-slate-800">{item.name}</h3>
                  <p className="text-slate-600 text-sm font-semibold">₹{item.price.toLocaleString()}</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => onToggleCompare(item)}
                  className={`px-2 py-1.5 rounded-lg border text-xs font-bold cursor-pointer ${
                    isCompared ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-600'
                  }`}
                >
                  ⚖️
                </button>
                <button
                  onClick={() => onToggleWishlist(item)}
                  className="p-1.5 rounded-lg border hover:bg-slate-100 cursor-pointer text-sm"
                >
                  {isWishlisted ? '❤️' : '🤍'}
                </button>
                <button
                  onClick={() => onAddToCart(item)}
                  className="bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold py-2 px-3 rounded-lg text-xs cursor-pointer"
                >
                  Add
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ProductsSection
