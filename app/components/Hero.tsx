export default function Hero({ onOrderClick }: { onOrderClick: () => void }) {
  return (
    <section className="bg-gradient-to-b from-amber-100 to-amber-50 py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-5xl font-bold text-amber-900 mb-4">
          Handcrafted Leather Goods
        </h2>
        <p className="text-xl text-green-700 mb-8 max-w-2xl mx-auto">
          Premium quality leather products made with love and attention to detail.
          Each piece is uniquely crafted in our studio.
        </p>
        <button
          onClick={onOrderClick}
          className="bg-gradient-to-r from-amber-900 to-green-900 text-white px-8 py-3 rounded-lg font-bold text-lg hover:shadow-lg transition transform hover:scale-105"
        >
          Shop Now
        </button>
      </div>
    </section>
  );
}
