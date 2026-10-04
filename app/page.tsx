'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Products from '@/components/Products';
import OrderForm from '@/components/OrderForm';
import Footer from '@/components/Footer';

export default function Home() {
  const [showOrderForm, setShowOrderForm] = useState(false);

  return (
    <main className="min-h-screen bg-amber-50">
      <Header />
      <Hero onOrderClick={() => setShowOrderForm(true)} />
      <Products onOrderClick={() => setShowOrderForm(true)} />

      {showOrderForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-h-[90vh] overflow-y-auto w-full max-w-md">
            <div className="flex justify-between items-center p-6 border-b border-amber-200">
              <h2 className="text-2xl font-bold text-amber-900">Order Now</h2>
              <button
                onClick={() => setShowOrderForm(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
              >
                ×
              </button>
            </div>
            <div className="p-6">
              <OrderForm onClose={() => setShowOrderForm(false)} />
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
