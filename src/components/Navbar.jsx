import { ShoppingCart, User } from 'lucide-react'
import { Link } from 'react-router-dom'

function Navbar({ cartCount, onCartClick, isAuthenticated }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mt-4 flex items-center justify-between rounded-full shadow-lg px-4 py-2 border border-white/10 bg-white/5 backdrop-blur">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold bg-gradient-to-r from-fuchsia-400 via-cyan-300 to-lime-300 bg-clip-text text-transparent">GlowHaus</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm text-white/70">
            <a href="#candles" className="hover:text-white">Candele</a>
            <a href="#about" className="hover:text-white">Chi siamo</a>
            <a href="#contact" className="hover:text-white">Contatti</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link to={isAuthenticated ? '/account' : '/login'} className="p-2 rounded-full hover:bg-white/10">
              <User className="w-5 h-5 text-white" />
            </Link>
            <button onClick={onCartClick} className="relative p-2 rounded-full hover:bg-white/10">
              <ShoppingCart className="w-5 h-5 text-white" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 text-[10px] bg-fuchsia-600 text-white rounded-full px-1.5 py-0.5">
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
