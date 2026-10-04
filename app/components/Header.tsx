export default function Header() {
  return (
    <header className="bg-gradient-to-r from-amber-900 to-green-900 text-white p-6 shadow-lg">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-3xl font-bold">🐄</div>
          <div>
            <h1 className="text-2xl font-bold">Lazy Cow</h1>
            <p className="text-amber-100 text-sm">Craft Leather Studio</p>
          </div>
        </div>
        <nav className="hidden md:flex gap-6 text-amber-100">
          <a href="#products" className="hover:text-white transition">Products</a>
          <a href="#about" className="hover:text-white transition">About</a>
          <a href="#contact" className="hover:text-white transition">Contact</a>
        </nav>
      </div>
    </header>
  );
}
