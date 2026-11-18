import { Link, useLocation } from 'react-router-dom'

function Navbar({ searchTerm, onSearchChange, ordersCount, cartCount }) {
  const location = useLocation()

  return (
    <header className="bg-slate-900 text-white p-4 sticky top-0 z-10 shadow-md">
      <div className="max-w-4xl mx-auto flex flex-wrap justify-between items-center gap-3">
        
        {/* Fresh Green TN Box Logo + TN Market Brand Name */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="bg-gradient-to-br from-emerald-600 to-green-800 text-white font-black text-base px-2.5 py-1 rounded-lg border-2 border-emerald-300 shadow-sm tracking-tighter">
            TN
          </div>
          <span className="text-xl font-extrabold tracking-tight text-white">
            TN <span className="text-emerald-400">Market</span>
          </span>
        </Link>

        {/* Search Bar */}
        {location.pathname === '/' && (
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search Fruits, Grocery, Mobiles..."
            className="flex-1 max-w-md px-3 py-1.5 rounded-lg bg-white text-slate-900 text-sm focus:outline-none"
          />
        )}

        {/* Navigation Links */}
        <nav className="flex gap-2 text-xs sm:text-sm font-bold">
          <Link
            to="/"
            className={`px-3 py-1.5 rounded-lg transition ${
              location.pathname === '/' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 hover:bg-slate-700'
            }`}
          >
            🏠 Home
          </Link>
          <Link
            to="/orders"
            className={`px-3 py-1.5 rounded-lg transition ${
              location.pathname === '/orders' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 hover:bg-slate-700'
            }`}
          >
            📦 Orders ({ordersCount})
          </Link>
          <Link
            to="/cart"
            className={`px-3 py-1.5 rounded-lg transition ${
              location.pathname === '/cart' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 hover:bg-slate-700'
            }`}
          >
            🛒 Cart ({cartCount})
          </Link>
        </nav>

      </div>
    </header>
  )
}

export default Navbar
