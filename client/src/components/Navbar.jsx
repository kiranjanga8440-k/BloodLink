import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-red-100 shadow-sm transition-all duration-300">
      <div className="max-w-6xl mx-auto px-6 h-16 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition">
          <span className="text-2xl animate-pulse-slow">🩸</span>
          <span className="text-2xl font-black bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
            BloodLink
          </span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-4">
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
            className={`ml-2 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 hover:shadow-md hover:shadow-red-500/20 active:scale-95 transition`}
          >
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;