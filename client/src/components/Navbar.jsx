import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-red-100 shadow-sm transition-all duration-300">
      <div className="max-w-6xl mx-auto px-6 h-16 flex justify-between items-center">
        <Link to="/" onClick={closeMenu} className="flex items-center gap-2 hover:opacity-90 transition">
          <span className="text-2xl animate-pulse-slow">🩸</span>
          <span className="text-2xl font-black bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
            BloodLink
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-2 lg:gap-4">
          <Link
            to="/"
            className={`px-3 py-2 rounded-lg text-sm font-semibold transition ${
              isActive("/") ? "bg-red-50 text-red-600" : "text-gray-600 hover:text-red-500 hover:bg-gray-50"
            }`}
          >
            Home
          </Link>
          <Link
            to="/register"
            className={`px-3 py-2 rounded-lg text-sm font-semibold transition ${
              isActive("/register") ? "bg-red-50 text-red-600" : "text-gray-600 hover:text-red-500 hover:bg-gray-50"
            }`}
          >
            Register
          </Link>
          <Link
            to="/find"
            className={`px-3 py-2 rounded-lg text-sm font-semibold transition ${
              isActive("/find") ? "bg-red-50 text-red-600" : "text-gray-600 hover:text-red-500 hover:bg-gray-50"
            }`}
          >
            Find Donor
          </Link>
          <Link
            to="/emergency"
            className={`px-3 py-2 rounded-lg text-sm font-semibold transition ${
              isActive("/emergency") ? "bg-red-50 text-red-600" : "text-gray-600 hover:text-red-500 hover:bg-gray-50"
            }`}
          >
            Emergency
          </Link>
          <Link
            to="/requests"
            className={`px-3 py-2 rounded-lg text-sm font-semibold transition ${
              isActive("/requests") ? "bg-red-50 text-red-600" : "text-gray-600 hover:text-red-500 hover:bg-gray-50"
            }`}
          >
            Requests
          </Link>
          <Link
            to="/admin"
            className="ml-2 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 hover:shadow-md hover:shadow-red-500/20 active:scale-95 transition"
          >
            Admin
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex items-center justify-center p-2 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 focus:outline-none transition"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden border-t border-red-50 bg-white/95 backdrop-blur-md px-6 py-4 space-y-2 absolute top-16 left-0 right-0 shadow-lg transition duration-200">
          <Link
            to="/"
            onClick={closeMenu}
            className={`block px-4 py-2.5 rounded-xl text-base font-semibold transition ${
              isActive("/") ? "bg-red-50 text-red-600" : "text-gray-600 hover:text-red-500 hover:bg-red-55"
            }`}
          >
            Home
          </Link>
          <Link
            to="/register"
            onClick={closeMenu}
            className={`block px-4 py-2.5 rounded-xl text-base font-semibold transition ${
              isActive("/register") ? "bg-red-50 text-red-600" : "text-gray-600 hover:text-red-500 hover:bg-red-55"
            }`}
          >
            Register
          </Link>
          <Link
            to="/find"
            onClick={closeMenu}
            className={`block px-4 py-2.5 rounded-xl text-base font-semibold transition ${
              isActive("/find") ? "bg-red-50 text-red-600" : "text-gray-600 hover:text-red-500 hover:bg-red-55"
            }`}
          >
            Find Donor
          </Link>
          <Link
            to="/emergency"
            onClick={closeMenu}
            className={`block px-4 py-2.5 rounded-xl text-base font-semibold transition ${
              isActive("/emergency") ? "bg-red-50 text-red-600" : "text-gray-600 hover:text-red-500 hover:bg-red-55"
            }`}
          >
            Emergency
          </Link>
          <Link
            to="/requests"
            onClick={closeMenu}
            className={`block px-4 py-2.5 rounded-xl text-base font-semibold transition ${
              isActive("/requests") ? "bg-red-50 text-red-600" : "text-gray-600 hover:text-red-500 hover:bg-red-55"
            }`}
          >
            Requests
          </Link>
          <Link
            to="/admin"
            onClick={closeMenu}
            className="block text-center px-4 py-3 bg-red-600 text-white rounded-xl text-base font-bold shadow-md shadow-red-500/10 hover:bg-red-700 transition"
          >
            Admin Dashboard
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;