'use client';

import Image from 'next/image';

const products = [
  {
    id: 1,
    name: 'Classic Belt',
    category: 'Belts',
    price: '$45',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop',
    description: 'Genuine leather belt, handstitched'
  },
  {
    id: 2,
    name: 'Leather Wallet',
    category: 'Wallets',
    price: '$35',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop',
    description: 'Compact bifold wallet with RFID protection'
  },
  {
    id: 3,
    name: 'Crossbody Bag',
    category: 'Bags',
    price: '$65',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop',
    description: 'Spacious leather crossbody bag'
  },
  {
    id: 4,
    name: 'Tote Bag',
    category: 'Bags',
    price: '$75',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop',
    description: 'Premium leather tote for everyday use'
  },
  {
    id: 5,
    name: 'Dress Belt',
    category: 'Belts',
    price: '$55',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop',
    description: 'Formal leather belt with brass buckle'
  },
  {
    id: 6,
    name: 'Card Holder',
    category: 'Wallets',
    price: '$25',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop',
    description: 'Slim leather card holder'
  }
];

export default function Products({ onOrderClick }: { onOrderClick: () => void }) {
  return (
    <section id="products" className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-4xl font-bold text-center text-amber-900 mb-12">
          Our Collections
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition transform hover:scale-105 bg-amber-50"
            >
              <div className="relative w-full h-48 bg-gray-200">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 right-2 bg-green-700 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {product.category}
                </div>
              </div>

              <div className="p-6">
                <h4 className="text-xl font-bold text-amber-900 mb-2">
                  {product.name}
                </h4>
                <p className="text-gray-600 text-sm mb-4">
                  {product.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-green-700">
                    {product.price}
                  </span>
                  <button
                    onClick={onOrderClick}
                    className="bg-amber-900 hover:bg-green-900 text-white px-4 py-2 rounded transition"
                  >
                    Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
