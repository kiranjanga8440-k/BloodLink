import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-red-50">

      {/* Hero Section */}
      <div className="text-center py-24 px-6">

        <h1 className="text-6xl font-bold text-red-600">
          🩸 BloodLink
        </h1>

        <p className="text-2xl mt-6 text-gray-700">
          Save Lives. Donate Blood.
        </p>

        <p className="mt-4 text-gray-500">
          Find emergency blood donors in your city.
        </p>

        <div className="mt-10 space-x-4">

          <Link
            to="/register"
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700"
          >
            Become a Donor
          </Link>

          <Link
            to="/find"
            className="border border-red-600 text-red-600 px-6 py-3 rounded-lg hover:bg-red-100"
          >
            Find Donor
          </Link>

        </div>

      </div>

      {/* Feature Cards */}

      <div className="grid md:grid-cols-3 gap-6 p-8">

        <Link to="/register">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition duration-300 cursor-pointer">

            <h2 className="text-2xl font-bold">
              🩸 Register
            </h2>

            <p className="mt-2 text-gray-600">
              Become a blood donor and help save lives.
            </p>

          </div>
        </Link>

        <Link to="/find">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition duration-300 cursor-pointer">

            <h2 className="text-2xl font-bold">
              🔍 Search
            </h2>

            <p className="mt-2 text-gray-600">
              Find donors by blood group and city.
            </p>

          </div>
        </Link>

        <Link to="/emergency">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition duration-300 cursor-pointer">

            <h2 className="text-2xl font-bold">
              🚑 Emergency
            </h2>

            <p className="mt-2 text-gray-600">
              Submit urgent blood requests instantly.
            </p>

          </div>
        </Link>

      </div>

      {/* Footer */}

      <div className="text-center py-8 text-gray-500">
        © 2026 BloodLink | Save Lives Through Technology 🩸
      </div>

    </div>
  );
}

export default Home;