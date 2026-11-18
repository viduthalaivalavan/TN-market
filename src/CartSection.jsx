function CartSection({
  cart,
  onIncrease,
  onDecrease,
  onRemove,
  couponInput,
  setCouponInput,
  onApplyCoupon,
  couponMsg,
  subtotal,
  discountPercent,
  discount,
  finalTotal,
  onPlaceOrder
}) {
  return (
    <div className="bg-white p-5 rounded-xl border">
      <h2 className="text-lg font-bold text-slate-800 mb-3 border-b pb-2">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-slate-500 text-sm text-center py-4">Cart is empty.</p>
      ) : (
        <div>
          <div className="space-y-2 mb-4">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border">
                <div>
                  <p className="font-bold text-sm">{item.icon} {item.name}</p>
                  <p className="text-xs text-slate-500">₹{item.price.toLocaleString()} each</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => onDecrease(item.id)} className="px-2 bg-slate-200 rounded font-bold cursor-pointer">-</button>
                  <span className="text-sm font-bold">{item.qty}</span>
                  <button onClick={() => onIncrease(item)} className="px-2 bg-slate-200 rounded font-bold cursor-pointer">+</button>
                  <span className="font-bold text-sm w-20 text-right">₹{(item.price * item.qty).toLocaleString()}</span>
                  <button onClick={() => onRemove(item.id)} className="text-xs text-rose-500 font-bold ml-2 cursor-pointer">X</button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value)}
              placeholder="Promo code (SAVE10 / VALAVAN20)"
              className="flex-1 p-2 border rounded text-sm uppercase"
            />
            <button onClick={onApplyCoupon} className="bg-slate-800 text-white px-4 rounded text-sm font-bold cursor-pointer">
              Apply
            </button>
          </div>
          {couponMsg && <p className="text-xs font-bold text-emerald-600 mb-3">{couponMsg}</p>}

          <div className="border-t pt-3 text-sm space-y-1">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>
            {discountPercent > 0 && (
              <div className="flex justify-between text-emerald-600 font-bold">
                <span>Discount ({discountPercent}%):</span>
                <span>- ₹{discount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-lg pt-2 border-t">
              <span>Total:</span>
              <span className="text-emerald-600">₹{finalTotal.toLocaleString()}</span>
            </div>
            <button onClick={onPlaceOrder} className="w-full mt-3 bg-amber-400 hover:bg-amber-500 font-bold py-2.5 rounded-lg cursor-pointer">
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartSection
