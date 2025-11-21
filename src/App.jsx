import { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import CandleCard from './components/CandleCard'
import CartDrawer from './components/CartDrawer'
import Auth from './components/Auth'

function Home() {
  const [candles, setCandles] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState([])
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'))

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    fetch(`${baseUrl}/candles`).then(r=>r.json()).then(setCandles).catch(()=>{})
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
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-lime-50">
      <Navbar cartCount={cart.reduce((s,i)=>s+i.quantity,0)} onCartClick={()=>setCartOpen(true)} isAuthenticated={isAuthenticated} />

      <section className="pt-28">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-teal-800">Bright, Fresh Aromas</h1>
            <p className="text-gray-600 mt-2">Hand-poured candles that lift the room with citrus, florals, and ocean notes.</p>
          </div>

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
    // For demo, cart could be lifted to context or localStorage; here we'll keep empty and show message
  }, [])

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const handlePlaceOrder = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }
    if (cart.length === 0) {
      setMessage('Your cart is empty. Go back and add some candles!')
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
      if (!res.ok) throw new Error('Checkout failed')
      const data = await res.json()
      setMessage(`Order created! Total $${data.total}. Shipping to ${data.address.street}, ${data.address.city}`)
    } catch (e) {
      setMessage(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-lime-50 p-6">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border p-4">
          <h2 className="text-lg font-semibold mb-3">Shipping address</h2>
          <div className="space-y-2">
            <input value={address.street} onChange={e=>setAddress({...address, street:e.target.value})} className="w-full border rounded-lg px-3 py-2" placeholder="Street address" />
            <input value={address.city} onChange={e=>setAddress({...address, city:e.target.value})} className="w-full border rounded-lg px-3 py-2" placeholder="City" />
            <div className="grid grid-cols-2 gap-2">
              <input value={address.postal_code} onChange={e=>setAddress({...address, postal_code:e.target.value})} className="w-full border rounded-lg px-3 py-2" placeholder="Postal code" />
              <input value={address.country} onChange={e=>setAddress({...address, country:e.target.value})} className="w-full border rounded-lg px-3 py-2" placeholder="Country" />
            </div>
          </div>

          <h2 className="text-lg font-semibold mt-6 mb-3">Payment</h2>
          <div className="flex gap-2">
            {['card','paypal','apple_pay'].map(m => (
              <button key={m} onClick={()=>setPayment(m)} className={`px-3 py-1.5 rounded-full text-sm border ${payment===m?'bg-teal-600 text-white border-teal-600':'bg-white'}`}>{m.replace('_',' ').toUpperCase()}</button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border p-4">
          <h2 className="text-lg font-semibold mb-3">Order summary</h2>
          {cart.length === 0 ? (
            <p className="text-sm text-gray-600">Your cart is empty.</p>
          ) : (
            <div className="space-y-3">
              {cart.map(i => (
                <div key={i._id} className="flex justify-between text-sm">
                  <span>{i.name} × {i.quantity}</span>
                  <span>${(i.price*i.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between font-semibold border-t pt-2">
                <span>Total</span>
                <span>${cart.reduce((s,i)=>s+i.price*i.quantity,0).toFixed(2)}</span>
              </div>
            </div>
          )}

          <button onClick={handlePlaceOrder} disabled={loading} className="mt-4 w-full py-2 rounded-full bg-lime-500 text-white hover:bg-lime-600 disabled:opacity-50">{loading? 'Placing order...' : 'Place order'}</button>
          {message && <p className="text-sm mt-2 text-teal-700">{message}</p>}
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
