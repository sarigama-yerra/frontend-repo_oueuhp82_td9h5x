import { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from './components/Navbar'
import CandleCard from './components/CandleCard'
import CartDrawer from './components/CartDrawer'
import Auth from './components/Auth'

const FALLBACK_CANDLES = [
  {
    _id: 'ex-1',
    name: 'Midnight Citrus',
    description: 'Note di arancia sanguigna e bergamotto con un tocco di vaniglia.',
    price: 18.5,
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop'
  },
  {
    _id: 'ex-2',
    name: 'Lavanda Notturna',
    description: 'Lavanda rilassante e salvia, perfetta per le serate lente.',
    price: 16.0,
    image: 'https://images.unsplash.com/photo-1581035600750-d7acee438114?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxMYXZhbmRhJTIwTm90dHVybmF8ZW58MHwwfHx8MTc2MzcyMzgwNXww&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80'
  },
  {
    _id: 'ex-3',
    name: 'Oceano Scuro',
    description: 'Breze marina, muschio blu e legno di cedro.',
    price: 20.0,
    image: 'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?q=80&w=1200&auto=format&fit=crop'
  },
  {
    _id: 'ex-4',
    name: 'Cacao & Ambra',
    description: 'Caldo abbraccio di cacao amaro e ambra dorata.',
    price: 19.0,
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=1200&auto=format&fit=crop'
  },
  {
    _id: 'ex-5',
    name: 'Foresta di Mezzanotte',
    description: 'Pino nero, pepe rosa e resina di abete.',
    price: 21.0,
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop'
  },
  {
    _id: 'ex-6',
    name: 'Vaniglia Stellata',
    description: 'Vaniglia bourbon e zucchero di canna con scorzette di limone.',
    price: 17.5,
    image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1200&auto=format&fit=crop'
  }
]

function Home() {
  const [candles, setCandles] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState([])
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'))

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    let mounted = true
    fetch(`${baseUrl}/candles`)
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(data => { if (mounted) setCandles(data) })
      .catch(() => { if (mounted) setCandles(FALLBACK_CANDLES) })
    return () => { mounted = false }
  }, [baseUrl])

  const addToCart = (candle) => {
    setCart(prev => {
      const exists = prev.find(i => i._id === candle._id)
      if (exists) return prev.map(i => i._id === candle._id ? { ...i, quantity: i.quantity + 1 } : i)
      return [...prev, { ...candle, quantity: 1 }]
    })
  }

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i._id !== id))

  const handleBuyNow = (candle) => {
    if (!isAuthenticated) {
      window.location.href = '/login'
      return
    }
    addToCart(candle)
    setCartOpen(true)
  }

  const handleCheckout = () => {
    if (!isAuthenticated) {
      window.location.href = '/login'
      return
    }
    window.location.href = '/checkout'
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0f] via-[#0f1220] to-[#0a0a0f] text-white relative overflow-hidden">
      <Navbar cartCount={cart.reduce((s,i)=>s+i.quantity,0)} onCartClick={()=>setCartOpen(true)} isAuthenticated={isAuthenticated} />

      {/* Splash/Hero super animato */}
      <section className="pt-28 pb-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="relative text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="inline-block"
            >
              <motion.h1
                initial={{ letterSpacing: '-0.06em' }}
                animate={{ letterSpacing: ['-0.06em', '0.02em', '0em'] }}
                transition={{ duration: 1.4, ease: 'easeOut' }}
                className="text-5xl md:text-7xl font-extrabold tracking-tight"
              >
                <span className="bg-gradient-to-r from-fuchsia-400 via-cyan-300 to-lime-300 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(99,102,241,.35)]">
                  Candele Che Illuminano La Notte
                </span>
              </motion.h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-4 text-base md:text-lg text-white/70"
            >
              Profumi audaci, vibrazioni scure e un bagliore che non dorme mai.
            </motion.p>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="mt-6 flex justify-center"
            >
              <a href="#candles" className="px-5 py-3 rounded-full font-semibold bg-fuchsia-500/20 border border-fuchsia-400/40 text-fuchsia-200 hover:bg-fuchsia-500/30 hover:border-fuchsia-300 transition-colors">Scopri le Candele</a>
            </motion.div>

            {/* Glow animato di sfondo */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ duration: 1.2 }}
              className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full blur-3xl"
              style={{ background: 'radial-gradient(50% 50% at 50% 50%, rgba(168,85,247,0.35) 0%, rgba(34,211,238,0.25) 35%, rgba(132,204,22,0.18) 70%, rgba(0,0,0,0) 100%)' }}
            />
          </div>
        </div>
      </section>

      {/* Griglia prodotti "caselle" delle candele */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-white/90">Le Nostre Candele</h2>
          <div id="candles" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {candles.map(c => (
              <CandleCard key={c._id} candle={c} onAddToCart={(x)=>{ if(!isAuthenticated){ window.location.href='/login'; return } addToCart(x)}} onBuyNow={handleBuyNow} />
            ))}
          </div>
        </div>
      </section>

      <CartDrawer open={cartOpen} items={cart} onClose={()=>setCartOpen(false)} onCheckout={handleCheckout} onRemove={removeFromCart} />
    </div>
  )
}

function Checkout() {
  const navigate = useNavigate()
  const [cart, setCart] = useState([])
  const [address, setAddress] = useState({ street: '', city: '', postal_code: '', country: '' })
  const [payment, setPayment] = useState('card')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    // In una versione completa salveremmo il carrello in stato globale o localStorage
  }, [])

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const handlePlaceOrder = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }
    if (cart.length === 0) {
      setMessage('Il carrello è vuoto. Aggiungi qualche candela!')
      return
    }
    setLoading(true)
    try {
      const res = await fetch(`${baseUrl}/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          items: cart.map(i => ({ candle_id: i._id, quantity: i.quantity })),
          address,
          payment_method: payment,
        })
      })
      if (!res.ok) throw new Error('Checkout non riuscito')
      const data = await res.json()
      setMessage(`Ordine creato! Totale $${data.total}. Spedizione a ${data.address.street}, ${data.address.city}`)
    } catch (e) {
      setMessage(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0f] via-[#0f1220] to-[#0a0a0f] text-white p-6">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-4">
          <h2 className="text-lg font-semibold mb-3">Indirizzo di spedizione</h2>
          <div className="space-y-2">
            <input value={address.street} onChange={e=>setAddress({...address, street:e.target.value})} className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 placeholder-white/40" placeholder="Via e numero" />
            <input value={address.city} onChange={e=>setAddress({...address, city:e.target.value})} className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 placeholder-white/40" placeholder="Città" />
            <div className="grid grid-cols-2 gap-2">
              <input value={address.postal_code} onChange={e=>setAddress({...address, postal_code:e.target.value})} className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 placeholder-white/40" placeholder="CAP" />
              <input value={address.country} onChange={e=>setAddress({...address, country:e.target.value})} className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 placeholder-white/40" placeholder="Paese" />
            </div>
          </div>

          <h2 className="text-lg font-semibold mt-6 mb-3">Pagamento</h2>
          <div className="flex gap-2">
            {['card','paypal','apple_pay'].map(m => (
              <button key={m} onClick={()=>setPayment(m)} className={`px-3 py-1.5 rounded-full text-sm border ${payment===m?'bg-fuchsia-500/30 text-fuchsia-100 border-fuchsia-400/40':'bg-white/5 border-white/10 text-white/80'}`}>{m.replace('_',' ').toUpperCase()}</button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-4">
          <h2 className="text-lg font-semibold mb-3">Riepilogo ordine</h2>
          {cart.length === 0 ? (
            <p className="text-sm text-white/70">Il carrello è vuoto.</p>
          ) : (
            <div className="space-y-3">
              {cart.map(i => (
                <div key={i._id} className="flex justify-between text-sm">
                  <span>{i.name} × {i.quantity}</span>
                  <span>${(i.price*i.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between font-semibold border-t border-white/10 pt-2">
                <span>Totale</span>
                <span>${cart.reduce((s,i)=>s+i.price*i.quantity,0).toFixed(2)}</span>
              </div>
            </div>
          )}

          <button onClick={handlePlaceOrder} disabled={loading} className="mt-4 w-full py-2 rounded-full bg-gradient-to-r from-fuchsia-600 via-cyan-500 to-lime-500 text-black font-semibold hover:opacity-90 disabled:opacity-50">{loading? 'Invio ordine...' : 'Conferma ordine'}</button>
          {message && <p className="text-sm mt-2 text-white/80">{message}</p>}
        </div>
      </div>
    </div>
  )
}

function LoginPage() {
  const navigate = useNavigate()
  return <Auth onAuthSuccess={()=>navigate('/')} />
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  )
}

export default App
