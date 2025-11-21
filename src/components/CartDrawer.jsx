import { X } from 'lucide-react'

function CartDrawer({ open, items, onClose, onCheckout, onRemove }) {
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  return (
    <div className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`}>
      <div
        className={`absolute inset-0 bg-black/60 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      <aside
        className={`absolute right-0 top-0 h-full w-80 bg-[#0b0f16] text-white shadow-2xl border-l border-white/10 transform transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-lg font-semibold">Il tuo carrello</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-180px)]">
          {items.length === 0 ? (
            <p className="text-sm text-white/70">Il carrello è vuoto.</p>
          ) : (
            items.map((item) => (
              <div key={item._id} className="flex items-center gap-3 border-b border-white/10 pb-3">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-white/70">${item.price.toFixed(2)} × {item.quantity}</p>
                </div>
                <button onClick={() => onRemove(item._id)} className="text-xs text-fuchsia-300 hover:underline">Rimuovi</button>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-white/70">Subtotale</span>
            <span className="font-semibold">${subtotal.toFixed(2)}</span>
          </div>
          <button
            disabled={items.length === 0}
            onClick={onCheckout}
            className="w-full py-2 rounded-full bg-gradient-to-r from-fuchsia-600 via-cyan-500 to-lime-500 text-black font-semibold hover:opacity-90 disabled:opacity-50"
          >
            Vai al checkout
          </button>
        </div>
      </aside>
    </div>
  )
}

export default CartDrawer
