'use client';

import { useState } from 'react';

const products = ['Classic Belt', 'Leather Wallet', 'Crossbody Bag', 'Tote Bag', 'Dress Belt', 'Card Holder'];

export default function OrderForm({ onClose }: { onClose: () => void }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    product: '',
    quantity: '1',
    color: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send order confirmation email to customer
      const customerEmailResponse = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: formData.email,
          subject: 'Order Confirmation - Lazy Cow Studio',
          name: formData.name,
          product: formData.product,
          quantity: formData.quantity,
          color: formData.color,
          message: formData.message
        })
      });

      if (!customerEmailResponse.ok) {
        throw new Error('Failed to send confirmation email');
      }

      // Send order notification email to admin
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: 'hello@lazycow.com',
          subject: 'New Order Received - Lazy Cow Studio',
          name: formData.name,
          product: formData.product,
          quantity: formData.quantity,
          color: formData.color,
          message: formData.message,
          customerEmail: formData.email,
          isAdmin: true
        })
      });

      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 2000);
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Error submitting order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-4">✅</div>
        <h3 className="text-2xl font-bold text-green-700 mb-2">Order Submitted!</h3>
        <p className="text-gray-600">We'll contact you soon to confirm your order.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-bold text-amber-900 mb-2">
          Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
          placeholder="Your name"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-amber-900 mb-2">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-amber-900 mb-2">
          Product
        </label>
        <select
          name="product"
          value={formData.product}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
        >
          <option value="">Select a product</option>
          {products.map(p => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-bold text-amber-900 mb-2">
          Quantity
        </label>
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          min="1"
          max="10"
          className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-amber-900 mb-2">
          Color Preference
        </label>
        <input
          type="text"
          name="color"
          value={formData.color}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
          placeholder="e.g., Brown, Black, Tan"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-amber-900 mb-2">
          Special Requests
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
          placeholder="Any custom requests?"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-amber-900 to-green-900 text-white py-3 rounded-lg font-bold hover:shadow-lg transition disabled:opacity-50"
      >
        {loading ? 'Submitting...' : 'Submit Order'}
      </button>
    </form>
  );
}
