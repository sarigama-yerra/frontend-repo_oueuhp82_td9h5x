function CandleCard({ candle, onAddToCart, onBuyNow }) {
  return (
    <div className="group bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-square overflow-hidden">
        <img src={candle.image} alt={candle.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{candle.name}</h3>
        <p className="text-sm text-gray-600 line-clamp-2 mt-1">{candle.description}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-teal-700 font-bold">${candle.price.toFixed(2)}</span>
          <div className="flex gap-2">
            <button onClick={() => onAddToCart(candle)} className="px-3 py-1.5 text-sm rounded-full bg-teal-600 text-white hover:bg-teal-700">Add</button>
            <button onClick={() => onBuyNow(candle)} className="px-3 py-1.5 text-sm rounded-full bg-lime-500 text-white hover:bg-lime-600">Buy</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CandleCard
