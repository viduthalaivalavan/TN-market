function WishlistSection({ wishlist, onMoveToCart }) {
  if (wishlist.length === 0) return null

  return (
    <div className="bg-white p-5 rounded-xl border mb-6">
      <h2 className="text-base font-bold text-slate-800 mb-3">
        ❤️ Your Wishlist ({wishlist.length})
      </h2>
      <div className="flex flex-wrap gap-2">
        {wishlist.map((w) => (
          <div key={w.id} className="bg-slate-50 border px-3 py-2 rounded-lg flex items-center gap-2 text-xs font-bold">
            <span>{w.icon} {w.name} (₹{w.price.toLocaleString()})</span>
            <button
              onClick={() => onMoveToCart(w)}
              className="bg-amber-400 px-2 py-0.5 rounded cursor-pointer"
            >
              Move to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WishlistSection
