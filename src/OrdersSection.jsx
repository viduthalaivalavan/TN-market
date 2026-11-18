function OrdersSection({ orders }) {
  if (orders.length === 0) return null

  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 mt-6 shadow-sm">
      <h2 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">
        🧾 Your Order History & Invoices ({orders.length})
      </h2>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            
            {/* Invoice Header */}
            <div className="flex flex-wrap justify-between items-center border-b border-slate-200 pb-2 mb-3 text-xs">
              <div>
                <span className="font-bold text-slate-800">ORDER ID: </span>
                <span className="font-mono text-indigo-600 font-bold">{order.id}</span>
              </div>
              <span className="text-slate-500">{order.date}</span>
            </div>

            {/* Purchased Items List */}
            <div className="space-y-1.5 mb-3">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between text-xs text-slate-700">
                  <span>{item.icon} {item.name} (x{item.qty})</span>
                  <span className="font-semibold">₹{(item.price * item.qty).toLocaleString()}</span>
                </div>
              ))}
            </div>

            {/* Invoice Billing Footer */}
            <div className="border-t border-slate-200 pt-2 flex justify-between items-center text-xs">
              <div>
                {order.discount > 0 ? (
                  <span className="text-emerald-600 font-bold">
                    Saved ₹{order.discount.toLocaleString()} with Coupon
                  </span>
                ) : (
                  <span className="text-slate-400">Standard Checkout</span>
                )}
              </div>
              <div className="text-sm font-extrabold text-slate-900">
                Paid: <span className="text-emerald-600">₹{order.total.toLocaleString()}</span>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

export default OrdersSection
