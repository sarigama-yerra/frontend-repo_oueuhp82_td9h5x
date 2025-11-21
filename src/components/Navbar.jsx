import { ShoppingCart, User } from 'lucide-react'
import { Link } from 'react-router-dom'

function Navbar({ cartCount, onCartClick, isAuthenticated }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mt-4 flex items-center justify-between bg-white/70 backdrop-blur-md rounded-full shadow-lg px-4 py-2 border border-white/40">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold bg-gradient-to-r from-teal-600 to-lime-600 bg-clip-text text-transparent">GlowHaus</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700">
            <a href="#candles" className="hover:text-teal-600">Candles</a>
            <a href="#about" className="hover:text-teal-600">About</a>
            <a href="#contact" className="hover:text-teal-600">Contact</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link to={isAuthenticated ? '/account' : '/login'} className="p-2 rounded-full hover:bg-gray-100">
              <User className="w-5 h-5 text-gray-700" />
            </Link>
            <button onClick={onCartClick} className="relative p-2 rounded-full hover:bg-gray-100">
              <ShoppingCart className="w-5 h-5 text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 text-[10px] bg-teal-600 text-white rounded-full px-1.5 py-0.5">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
