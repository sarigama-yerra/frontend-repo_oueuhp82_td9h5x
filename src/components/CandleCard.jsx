import { motion } from 'framer-motion'

function CandleCard({ candle, onAddToCart, onBuyNow }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4 }}
      className="group rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur hover:bg-white/10 hover:border-white/20 transition-all"
    >
      <div className="aspect-square overflow-hidden">
        <img src={candle.image} alt={candle.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white">{candle.name}</h3>
        <p className="text-sm text-white/70 line-clamp-2 mt-1">{candle.description}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-fuchsia-200 font-bold">${candle.price.toFixed(2)}</span>
          <div className="flex gap-2">
            <button onClick={() => onAddToCart(candle)} className="px-3 py-1.5 text-sm rounded-full bg-fuchsia-600/90 text-white hover:bg-fuchsia-600">Aggiungi</button>
            <button onClick={() => onBuyNow(candle)} className="px-3 py-1.5 text-sm rounded-full bg-cyan-500/90 text-black font-semibold hover:bg-cyan-400">Compra</button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default CandleCard
