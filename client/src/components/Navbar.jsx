function Navbar() {
  return (
    <nav className="bg-red-600 text-white p-5 flex justify-between items-center">
      <h1 className="text-3xl font-bold">
        ❤️ BloodLink
      </h1>

      <div className="space-x-6">
        <button>Home</button>
        <button>Find Donor</button>
        <button>Become Donor</button>
        <button>Login</button>
      </div>
    </nav>
  );
}

export default Navbar;