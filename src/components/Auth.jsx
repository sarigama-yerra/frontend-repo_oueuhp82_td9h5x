import { useState } from 'react'

function Auth({ onAuthSuccess, mode = 'login' }) {
  const [tab, setTab] = useState(mode)
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      if (tab === 'signup') {
        const res = await fetch(`${baseUrl}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: form.name, email: form.email, password: form.password })
        })
        if (!res.ok) throw new Error('Registration failed')
      }
      const res2 = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, password: form.password })
      })
      if (!res2.ok) throw new Error('Login failed')
      const data = await res2.json()
      localStorage.setItem('token', data.access_token)
      onAuthSuccess?.()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-white to-lime-50 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border p-6">
        <div className="flex gap-2 p-1 bg-gray-100 rounded-full mb-6">
          <button onClick={() => setTab('login')} className={`flex-1 py-2 rounded-full text-sm font-medium ${tab==='login'?'bg-white shadow':'text-gray-600'}`}>Login</button>
          <button onClick={() => setTab('signup')} className={`flex-1 py-2 rounded-full text-sm font-medium ${tab==='signup'?'bg-white shadow':'text-gray-600'}`}>Create account</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {tab === 'signup' && (
            <input type="text" placeholder="Name" className="w-full border rounded-lg px-3 py-2" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required />
          )}
          <input type="email" placeholder="Email" className="w-full border rounded-lg px-3 py-2" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required />
          <input type="password" placeholder="Password" className="w-full border rounded-lg px-3 py-2" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button disabled={loading} className="w-full py-2 rounded-full bg-teal-600 text-white hover:bg-teal-700 disabled:opacity-50">{loading? 'Please wait...' : (tab==='signup'?'Create and login':'Login')}</button>
        </form>
      </div>
    </div>
  )
}

export default Auth
