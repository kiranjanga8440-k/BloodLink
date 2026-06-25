import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import API from "../api";

function DonorDetails() {
  const { id } = useParams();
  const [donor, setDonor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDonor();
  }, [id]);

  const fetchDonor = async () => {
    try {
      const res = await axios.get(`${API}/api/donors/${id}`);
      setDonor(res.data);
    } catch (error) {
      console.error("Error loading donor profile:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50/50 flex justify-center items-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 font-semibold text-sm">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!donor) {
    return (
      <div className="min-h-screen bg-gray-50/50 flex flex-col justify-center items-center p-6 text-center">
        <span className="text-4xl">❌</span>
        <h2 className="text-2xl font-black text-gray-900 mt-4">Donor Not Found</h2>
        <p className="text-gray-500 mt-2 max-w-xs text-sm">
          The requested donor profile does not exist or has been removed.
        </p>
        <Link to="/find" className="mt-6 bg-red-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-red-700 transition">
          Back to Search
        </Link>
      </div>
    );
  }

  const inCooldown = donor.cooldownStatus === "in-cooldown";

  return (
    <div className="min-h-screen bg-gray-50/50 flex justify-center items-center p-6 sm:p-12">
      <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-red-50 shadow-xl w-full max-w-lg relative overflow-hidden bg-white">
        {/* Profile Header Background Banner */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-500 to-red-700" />

        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center text-4xl font-black text-red-600 shadow-sm mx-auto mb-4 border border-red-100">
            {donor.bloodGroup}
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            {donor.name}
          </h1>
          <p className="text-gray-500 text-sm font-semibold mt-1">
            📍 {donor.city}
          </p>

          <div className="mt-3">
            {inCooldown ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-100">
                ⏳ In Recovery Cooldown
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                🟢 Available for Donation
              </span>
            )}
          </div>
        </div>

        <div className="space-y-4 border-t border-b border-gray-100 py-6 mb-8">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500 font-semibold uppercase tracking-wider text-xs">Age</span>
            <span className="text-gray-900 font-bold">{donor.age} Years</span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500 font-semibold uppercase tracking-wider text-xs">Total Donations</span>
            <span className="text-gray-900 font-bold">{donor.totalDonations} donation(s)</span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500 font-semibold uppercase tracking-wider text-xs">Last Donation</span>
            <span className="text-gray-900 font-bold">
              {donor.lastDonationDate
                ? new Date(donor.lastDonationDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "No registered donation"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <a
            href={`tel:${donor.phone}`}
            className="flex items-center justify-center gap-2 bg-red-600 text-white py-3 rounded-xl font-bold hover:bg-red-700 hover:shadow-lg hover:shadow-red-600/20 active:scale-98 transition duration-150"
          >
            📞 Call Donor
          </a>

          <a
            href={`mailto:${donor.email}`}
            className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-3 rounded-xl font-bold border border-gray-200 hover:bg-gray-200 active:scale-98 transition duration-150"
          >
            ✉️ Email Donor
          </a>
        </div>

        <div className="text-center mt-6">
          <Link to="/find" className="text-sm font-semibold text-gray-400 hover:text-red-500 transition">
            ← Back to Donor Search
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DonorDetails;