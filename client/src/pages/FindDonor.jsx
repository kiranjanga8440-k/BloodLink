import { useEffect, useState } from "react";
import axios from "axios";
import API from "../api";
import { useNavigate } from "react-router-dom";

function FindDonor() {
  const [donors, setDonors] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors = async () => {
    try {
      const res = await axios.get(`${API}/api/donors/verified`);
      setDonors(res.data);
    } catch (error) {
      console.error("Error loading donors:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredDonors = donors.filter(
    (donor) =>
      donor.bloodGroup.toLowerCase().includes(search.toLowerCase()) ||
      donor.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 sm:p-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-3">
            Find Blood Donors
          </h1>
          <p className="text-gray-500 font-medium text-sm">
            Search verified donors by blood group (e.g. A+) or city to get immediate medical support.
          </p>
        </div>

        {/* Search Input Card */}
        <div className="glass-panel p-4 rounded-2xl border border-red-50 shadow-sm max-w-2xl mx-auto mb-10 flex gap-3 items-center">
          <span className="text-xl pl-2 text-gray-400">🔍</span>
          <input
            type="text"
            placeholder="Search by Blood Group or City..."
            className="w-full bg-transparent border-0 focus:outline-none focus:ring-0 text-gray-800 font-medium placeholder-gray-400 text-base"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Donors Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm animate-pulse h-48" />
            ))}
          </div>
        ) : filteredDonors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredDonors.map((donor) => {
              const inCooldown = donor.cooldownStatus === "in-cooldown";
              return (
                <div
                  key={donor._id}
                  className="glass-card bg-white border border-gray-100 p-6 rounded-2xl flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="text-lg font-bold text-gray-900 leading-tight">
                        {donor.name}
                      </h2>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-red-50 text-red-600 border border-red-100 shadow-sm">
                        {donor.bloodGroup}
                      </span>
                    </div>

                    <div className="space-y-2 mb-6">
                      <p className="text-sm font-medium text-gray-500 flex items-center gap-2">
                        📍 <span className="text-gray-700">{donor.city}</span>
                      </p>

                      <p className="text-sm font-medium text-gray-500 flex items-center gap-2">
                        💼{" "}
                        <span className="text-gray-700">
                          {donor.totalDonations} Donation(s)
                        </span>
                      </p>

                      <div className="mt-2">
                        {inCooldown ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-100">
                            ⏳ Cooldown (Unavailable)
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                            🟢 Available for Donation
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate(`/donor/${donor._id}`)}
                    className="w-full bg-gray-50 text-gray-700 py-3 rounded-xl font-bold border border-gray-200 hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition duration-150"
                  >
                    View Details
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white border border-gray-100 rounded-2xl shadow-sm">
            <span className="text-4xl">🫙</span>
            <h3 className="text-xl font-bold text-gray-800 mt-4">No Donors Found</h3>
            <p className="text-gray-500 mt-2 text-sm max-w-sm mx-auto">
              We couldn't find any verified donors matching "{search}". Try searching for another city or blood group.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default FindDonor;