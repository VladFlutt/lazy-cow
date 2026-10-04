export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-amber-900 to-green-900 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h4 className="text-xl font-bold mb-4">Lazy Cow Studio</h4>
            <p className="text-amber-100">
              Handcrafted leather goods made with passion and precision.
            </p>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-amber-100">
              <li><a href="#products" className="hover:text-white transition">Products</a></li>
              <li><a href="#about" className="hover:text-white transition">About Us</a></li>
              <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-4">Contact</h4>
            <p className="text-amber-100">
              📧 hello@lazycow.com<br/>
              📞 (555) 123-4567<br/>
              📍 Craftville, USA
            </p>
          </div>
        </div>

        <div className="border-t border-amber-700 pt-8 text-center text-amber-100">
          <p>&copy; 2024 Lazy Cow Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
