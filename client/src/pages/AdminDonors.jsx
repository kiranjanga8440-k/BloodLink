import { useEffect, useState } from "react";
import axios from "axios";
import API from "../api";
import { Link } from "react-router-dom";

function AdminDonors() {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.get(`${API}/api/donors`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDonors(res.data);
    } catch (error) {
      console.error("Error fetching donors:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteDonor = async (id) => {
    if (!window.confirm("Are you sure you want to delete this donor profile? This action is permanent.")) {
      return;
    }
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.delete(`${API}/api/donors/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert(res.data.message || "Donor profile deleted.");
      fetchDonors();
    } catch (error) {
      console.error(error);
      alert("Error deleting donor");
    }
  };

  const verifyDonor = async (id) => {
    try {
      const token = localStorage.getItem("adminToken");
      await axios.put(`${API}/api/donors/verify/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Donor verified successfully");
      fetchDonors();
    } catch (err) {
      console.error(err);
      alert("Verification failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 sm:p-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
          <div>
            <Link to="/admin" className="text-sm font-semibold text-red-600 hover:text-red-700 transition">
              ← Admin Dashboard
            </Link>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight mt-1">
              Registered Donors
            </h1>
          </div>
          <span className="bg-red-50 text-red-600 border border-red-100 font-bold px-4 py-2 rounded-xl text-sm">
            👥 Total Profiles: {donors.length}
          </span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm animate-pulse h-56" />
            ))}
          </div>
        ) : donors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {donors.map((donor) => {
              const inCooldown = donor.cooldownStatus === "in-cooldown";
              return (
                <div
                  key={donor._id}
                  className="glass-card bg-white border border-gray-100 p-6 rounded-2xl flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex flex-col">
                        <h2 className="text-lg font-bold text-gray-900 leading-tight">
                          {donor.name}
                        </h2>
                        <span className="text-xs text-gray-400 font-semibold mt-1">
                          Age: {donor.age} • 📍 {donor.city}
                        </span>
                      </div>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-black bg-red-50 text-red-600 border border-red-100">
                        {donor.bloodGroup}
                      </span>
                    </div>

                    <div className="space-y-2 border-t border-gray-100 pt-4 mb-6">
                      <p className="text-sm font-semibold text-gray-700 flex justify-between">
                        <span className="text-gray-400 font-medium">Phone:</span>
                        <span>{donor.phone}</span>
                      </p>

                      <p className="text-sm font-semibold text-gray-700 flex justify-between">
                        <span className="text-gray-400 font-medium">Donations:</span>
                        <span>{donor.totalDonations}</span>
                      </p>

                      <p className="text-sm font-semibold text-gray-700 flex justify-between">
                        <span className="text-gray-400 font-medium">Status:</span>
                        {donor.verified ? (
                          <span className="text-emerald-600 font-bold">✓ Verified</span>
                        ) : (
                          <span className="text-amber-600 font-bold">⏳ Pending Verification</span>
                        )}
                      </p>

                      <p className="text-sm font-semibold text-gray-700 flex justify-between">
                        <span className="text-gray-400 font-medium">Last Donation:</span>
                        <span className="font-semibold text-gray-800">
                          {donor.lastDonationDate
                            ? new Date(donor.lastDonationDate).toLocaleDateString()
                            : "Never"}
                        </span>
                      </p>

                      <div className="mt-4">
                        {inCooldown ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-50 text-amber-700 border border-amber-100 w-full justify-center">
                            ⏳ Cooldown (Resting)
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100 w-full justify-center">
                            🟢 Active / Available
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {!donor.verified && (
                      <button
                        onClick={() => verifyDonor(donor._id)}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl font-bold transition duration-150 active:scale-99"
                      >
                        Verify Identity
                      </button>
                    )}
                    <button
                      onClick={() => deleteDonor(donor._id)}
                      className="w-full bg-red-50 hover:bg-red-100 text-red-600 py-2.5 rounded-xl font-bold transition duration-150 active:scale-99"
                    >
                      Delete Profile
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white border border-gray-100 rounded-2xl shadow-sm">
            <span className="text-4xl">👥</span>
            <h3 className="text-xl font-bold text-gray-800 mt-4">No Donors Registered</h3>
            <p className="text-gray-500 mt-2 text-sm max-w-sm mx-auto">
              No donor profiles have registered yet. Click the registration link to add profiles.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDonors;