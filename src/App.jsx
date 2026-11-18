import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { productsData, categoriesData } from './productsData'
import Navbar from './Navbar'
import ProductsSection from './ProductsSection'
import CartSection from './CartSection'
import CompareSection from './CompareSection'
import OrdersSection from './OrdersSection'
import WishlistSection from './WishlistSection'

function App() {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("default")
  const [compareList, setCompareList] = useState([])
  const [couponInput, setCouponInput] = useState('')
  const [discountPercent, setDiscountPercent] = useState(0)
  const [couponMsg, setCouponMsg] = useState('')

  const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem('amazon_wishlist')) || [])
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('amazon_cart')) || [])
  const [orders, setOrders] = useState(() => JSON.parse(localStorage.getItem('amazon_orders')) || [])

  useEffect(() => localStorage.setItem('amazon_wishlist', JSON.stringify(wishlist)), [wishlist])
  useEffect(() => localStorage.setItem('amazon_cart', JSON.stringify(cart)), [cart])
  useEffect(() => localStorage.setItem('amazon_orders', JSON.stringify(orders)), [orders])

  const filtered = productsData.filter((p) => {
    const catMatch = selectedCategory === "All" || p.category === selectedCategory
    const searchMatch = p.name.toLowerCase().includes(searchTerm.toLowerCase())
    return catMatch && searchMatch
  })

  const sortedProducts = [...filtered].sort((a, b) => {
    if (sortBy === "low") return a.price - b.price
    if (sortBy === "high") return b.price - a.price
    return 0
  })

  function toggleCompare(product) {
    const exists = compareList.some((item) => item.id === product.id)
    if (exists) {
      setCompareList(compareList.filter((item) => item.id !== product.id))
    } else if (compareList.length < 2) {
      setCompareList([...compareList, product])
    } else {
      alert("Maximum 2 products mattum thaan compare panna mudiyum bro!")
    }
  }

  function toggleWishlist(product) {
    const exists = wishlist.some((item) => item.id === product.id)
    setWishlist(exists ? wishlist.filter((i) => i.id !== product.id) : [...wishlist, product])
  }

  function addToCart(product) {
    const found = cart.find((item) => item.id === product.id)
    if (found) {
      setCart(cart.map((item) => item.id === product.id ? { ...item, qty: item.qty + 1 } : item))
    } else {
      setCart([...cart, { ...product, qty: 1 }])
    }
  }

  function decreaseQty(id) {
    const found = cart.find((item) => item.id === id)
    if (found.qty === 1) setCart(cart.filter((item) => item.id !== id))
    else setCart(cart.map((item) => item.id === id ? { ...item, qty: item.qty - 1 } : item))
  }

  function applyCoupon() {
    const code = couponInput.trim().toUpperCase()
    if (code === 'SAVE10') { setDiscountPercent(10); setCouponMsg('10% Discount Applied!') }
    else if (code === 'VALAVAN20') { setDiscountPercent(20); setCouponMsg('20% VIP Discount Applied!') }
    else { setDiscountPercent(0); setCouponMsg('Invalid Code! Try SAVE10 or VALAVAN20') }
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0)
  const discount = Math.round((subtotal * discountPercent) / 100)
  const finalTotal = subtotal - discount

  function placeOrder() {
    const newOrder = {
      id: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleString(),
      items: [...cart],
      discount,
      total: finalTotal
    }
    setOrders([newOrder, ...orders])
    setCart([])
    setDiscountPercent(0)
    setCouponInput('')
    setCouponMsg('')
    navigate('/orders')
  }

  return (
    <div className="min-h-screen bg-slate-100 pb-10">
      <Navbar searchTerm={searchTerm} onSearchChange={setSearchTerm} ordersCount={orders.length} wishlistCount={wishlist.length} cartCount={totalItems} />
      <main className="max-w-4xl mx-auto p-6">
        <Routes>
          <Route path="/" element={
            <div>
              <ProductsSection categories={categoriesData} selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} sortBy={sortBy} onSortChange={setSortBy} products={sortedProducts} wishlist={wishlist} compareList={compareList} onToggleCompare={toggleCompare} onToggleWishlist={toggleWishlist} onAddToCart={addToCart} />
              <CompareSection compareList={compareList} onRemoveCompare={(id) => setCompareList(compareList.filter((c) => c.id !== id))} onClearCompare={() => setCompareList([])} />
              <WishlistSection wishlist={wishlist} onMoveToCart={(item) => { addToCart(item); toggleWishlist(item) }} />
            </div>
          } />
          <Route path="/cart" element={
            <CartSection cart={cart} onIncrease={addToCart} onDecrease={decreaseQty} onRemove={(id) => setCart(cart.filter((i) => i.id !== id))} couponInput={couponInput} setCouponInput={setCouponInput} onApplyCoupon={applyCoupon} couponMsg={couponMsg} subtotal={subtotal} discountPercent={discountPercent} discount={discount} finalTotal={finalTotal} onPlaceOrder={placeOrder} />
          } />
          <Route path="/orders" element={
            orders.length === 0 ? <div className="bg-white p-8 rounded-xl border text-center"><p className="text-slate-500 font-bold">No orders placed yet!</p></div> : <OrdersSection orders={orders} />
          } />
        </Routes>
      </main>
    </div>
  )
}

export default App
