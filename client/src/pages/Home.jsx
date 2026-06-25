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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${API}/api/donors/stats`);
        setStats(res.data);
      } catch (error) {
        console.error("Failed to load statistics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      {/* Hero Section */}
      <div className="relative overflow-hidden dark-crimson-gradient text-white py-24 sm:py-32 shadow-inner">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-semibold tracking-wider uppercase mb-6 animate-pulse-slow">
            ❤️ Saving Lives Daily
          </div>

          <h1 className="text-5xl sm:text-7xl font-black tracking-tight mb-8">
            Blood<span className="text-red-500">Link</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-200 font-medium max-w-2xl mx-auto mb-12 leading-relaxed">
            Connecting real-time blood donors with patients in urgent need. Register today, get verified, and stand ready to make a difference.
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              to="/register"
              className="bg-red-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-red-700 hover:shadow-lg hover:shadow-red-600/30 active:scale-98 transition duration-200"
            >
              Become a Donor
            </Link>

            <Link
              to="/find"
              className="bg-white/10 text-white border border-white/20 px-8 py-4 rounded-xl font-bold backdrop-blur-sm hover:bg-white hover:text-red-950 active:scale-98 transition duration-200"
            >
              Find Blood Donors
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-6xl mx-auto px-6 mt-12 md:mt-16 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          <div className="glass-panel p-6 md:p-8 rounded-2xl border border-red-50 flex items-center gap-4 md:gap-6 bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-red-50 flex items-center justify-center text-2xl md:text-3xl shadow-sm text-red-600 font-bold shrink-0">
              🩸
            </div>
            <div>
              <p className="text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-wider">Total Donors</p>
              {loading ? (
                <div className="h-7 w-16 bg-gray-200 rounded animate-pulse mt-1" />
              ) : (
                <h3 className="text-3xl md:text-4xl font-black text-gray-900 mt-0.5">{stats.totalDonors}</h3>
              )}
            </div>
          </div>

          <div className="glass-panel p-6 md:p-8 rounded-2xl border border-red-50 flex items-center gap-4 md:gap-6 bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-emerald-50 flex items-center justify-center text-2xl md:text-3xl shadow-sm text-emerald-600 font-bold shrink-0">
              ✅
            </div>
            <div>
              <p className="text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-wider">Verified Donors</p>
              {loading ? (
                <div className="h-7 w-16 bg-gray-200 rounded animate-pulse mt-1" />
              ) : (
                <h3 className="text-3xl md:text-4xl font-black text-emerald-600 mt-0.5">{stats.verifiedDonors}</h3>
              )}
            </div>
          </div>

          <div className="glass-panel p-6 md:p-8 rounded-2xl border border-red-50 flex items-center gap-4 md:gap-6 bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-amber-50 flex items-center justify-center text-2xl md:text-3xl shadow-sm text-amber-600 font-bold shrink-0">
              ⏳
            </div>
            <div>
              <p className="text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-wider">Unverified/Pending</p>
              {loading ? (
                <div className="h-7 w-16 bg-gray-200 rounded animate-pulse mt-1" />
              ) : (
                <h3 className="text-3xl md:text-4xl font-black text-amber-600 mt-0.5">{stats.unverifiedDonors}</h3>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            How BloodLink Helps
          </h2>
          <p className="text-gray-500 font-medium">
            A comprehensive, automated platform to bridge the gap between donors and emergency requests instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:border-red-100 hover:shadow-lg transition duration-300">
            <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-2xl mb-6">
              🔍
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Intelligent Compatibility
            </h3>
            <p className="text-gray-500 leading-relaxed text-sm">
              Queries support full medical blood group matching (e.g., A+ recipients match O-, A-, O+, and A+ donors) to widen the donor pool.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:border-red-100 hover:shadow-lg transition duration-300">
            <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-2xl mb-6">
              🚨
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Automated Email Alerts
            </h3>
            <p className="text-gray-500 leading-relaxed text-sm">
              Creating an emergency request triggers automatic Nodemailer alerts to matching verified donors in the target city instantly.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:border-red-100 hover:shadow-lg transition duration-300">
            <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-2xl mb-6">
              ⏱️
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              90-Day Cooldown Protection
            </h3>
            <p className="text-gray-500 leading-relaxed text-sm">
              Keeps donors safe by tracking last donation dates and preventing them from showing up as active matches during their recovery cooldown.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;