import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import API from "../api";

function Home() {
  const [stats, setStats] = useState({
    totalDonors: 0,
    verifiedDonors: 0,
    unverifiedDonors: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${API}/api/donors/stats`);
        setStats(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-red-50">

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">

          <h1 className="text-6xl font-bold mb-6">
            🩸 BloodLink
          </h1>

          <p className="text-xl mb-10">
            Connecting Blood Donors with Patients in Need
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              to="/register"
              className="bg-white text-red-600 px-8 py-4 rounded-xl font-bold shadow-lg hover:scale-105 transition"
            >
              Register as Donor
            </Link>

            <Link
              to="/find"
              className="border-2 border-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-red-600 transition"
            >
              Find Donor
            </Link>
          </div>

        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-6xl mx-auto px-6 -mt-10">
        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <h2 className="text-4xl mb-2">❤️</h2>
            <p className="text-3xl font-bold text-red-600">
              {stats.totalDonors}
            </p>
            <p>Total Donors</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <h2 className="text-4xl mb-2">✅</h2>
            <p className="text-3xl font-bold text-green-600">
              {stats.verifiedDonors}
            </p>
            <p>Verified Donors</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <h2 className="text-4xl mb-2">❌</h2>
            <p className="text-3xl font-bold text-orange-600">
              {stats.unverifiedDonors}
            </p>
            <p>Unverified Donors</p>
          </div>

        </div>
      </div>

      {/* Features */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center text-red-600 mb-12">
          Why BloodLink?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold mb-3">
              🔍 Quick Search
            </h3>
            <p>
              Find blood donors instantly by blood group and city.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold mb-3">
              🚨 Emergency Requests
            </h3>
            <p>
              Post urgent blood requirements and reach donors quickly.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold mb-3">
              ✅ Verified Donors
            </h3>
            <p>
              Maintain trust with verified donor profiles.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}

export default Home;