import { useEffect, useState } from "react";
import axios from "axios";
import API from "../api";
import { Link } from "react-router-dom";

function AdminRequests() {
  const [requests, setRequests] = useState([]);
  const [matchedDonors, setMatchedDonors] = useState([]);
  const [activeRequestId, setActiveRequestId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${API}/api/emergency`);
      setRequests(res.data);
    } catch (error) {
      console.error("Error loading emergency requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteRequest = async (id) => {
    if (!window.confirm("Are you sure you want to close this emergency request?")) {
      return;
    }
    try {
      const res = await axios.delete(`${API}/api/emergency/${id}`);
      alert(res.data.message || "Request closed successfully.");
      if (activeRequestId === id) {
        setMatchedDonors([]);
        setActiveRequestId(null);
      }
      fetchRequests();
    } catch (error) {
      console.error(error);
      alert("Error deleting request");
    }
  };

  const findMatches = async (id, bloodGroup, city) => {
    try {
      setActiveRequestId(id);
      const res = await axios.get(
        `${API}/api/emergency/match/${bloodGroup}/${city}`
      );
      setMatchedDonors(res.data.donors);
    } catch (error) {
      console.error(error);
      alert("Error finding matches");
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
              Emergency Requests
            </h1>
          </div>
          <span className="bg-red-50 text-red-600 border border-red-100 font-bold px-4 py-2 rounded-xl text-sm">
            🚨 Active Requests: {requests.length}
          </span>
        </div>

        {/* Requests List */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm animate-pulse h-56" />
            ))}
          </div>
        ) : requests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {requests.map((req) => {
              const isActiveMatch = activeRequestId === req._id;
              return (
                <div
                  key={req._id}
                  className={`glass-card bg-white border p-6 rounded-2xl flex flex-col justify-between transition duration-200 ${
                    isActiveMatch ? "border-red-500 ring-2 ring-red-500/10 shadow-md" : "border-gray-100"
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-base font-black bg-red-100 text-red-600 border border-red-200">
                        {req.bloodGroup}
                      </span>
                      <span className="text-xs text-red-600 font-bold uppercase tracking-wider bg-red-50 border border-red-100 px-2 py-1 rounded">
                        Emergency
                      </span>
                    </div>

                    <div className="space-y-2 border-t border-gray-100 pt-4 mb-6">
                      <p className="text-sm font-semibold text-gray-700 flex justify-between">
                        <span className="text-gray-400 font-medium">Patient:</span>
                        <span>{req.patientName}</span>
                      </p>
                      <p className="text-sm font-semibold text-gray-700 flex justify-between">
                        <span className="text-gray-400 font-medium">Hospital:</span>
                        <span className="max-w-[150px] text-right truncate" title={req.hospital}>{req.hospital}</span>
                      </p>
                      <p className="text-sm font-semibold text-gray-700 flex justify-between">
                        <span className="text-gray-400 font-medium">City:</span>
                        <span>{req.city}</span>
                      </p>
                      <p className="text-sm font-semibold text-gray-700 flex justify-between">
                        <span className="text-gray-400 font-medium">Contact:</span>
                        <span>{req.phone}</span>
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={() => findMatches(req._id, req.bloodGroup, req.city)}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl font-bold transition duration-150 active:scale-99"
                    >
                      Find Compatible Donors
                    </button>
                    <button
                      onClick={() => deleteRequest(req._id)}
                      className="w-full bg-red-50 hover:bg-red-100 text-red-600 py-2.5 rounded-xl font-bold transition duration-150 active:scale-99"
                    >
                      Close Request
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white border border-gray-100 rounded-2xl shadow-sm mb-12">
            <span className="text-4xl">🕊️</span>
            <h3 className="text-xl font-bold text-gray-800 mt-4">No Active Requests</h3>
            <p className="text-gray-500 mt-2 text-sm max-w-sm mx-auto">
              There are currently no active emergency blood requests queues.
            </p>
          </div>
        )}

        {/* Matched Donors Dashboard */}
        {activeRequestId && (
          <div className="border-t border-gray-200 pt-12 animate-fade-in">
            <div className="text-center max-w-xl mx-auto mb-8">
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                Compatible Donors Matching Request
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Found {matchedDonors.length} medically compatible blood donor profiles in the target city.
              </p>
            </div>

            {matchedDonors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {matchedDonors.map((donor) => {
                  const inCooldown = donor.cooldownStatus === "in-cooldown";
                  const isEligible = donor.isEligible;
                  return (
                    <div key={donor._id} className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="font-bold text-gray-900 leading-tight">
                            {donor.name}
                          </h3>
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-black bg-red-50 text-red-600 border border-red-100">
                            {donor.bloodGroup}
                          </span>
                        </div>

                        <div className="space-y-2 border-t border-gray-50 pt-3 mb-6">
                          <p className="text-sm font-semibold text-gray-700 flex justify-between">
                            <span className="text-gray-400 font-medium">City:</span>
                            <span>{donor.city}</span>
                          </p>
                          <p className="text-sm font-semibold text-gray-700 flex justify-between">
                            <span className="text-gray-400 font-medium">Contact:</span>
                            <span>{donor.phone}</span>
                          </p>
                          <p className="text-sm font-semibold text-gray-700 flex justify-between">
                            <span className="text-gray-400 font-medium">Verification:</span>
                            <span>{donor.verified ? "✅ Verified" : "❌ Pending"}</span>
                          </p>
                          <p className="text-sm font-semibold text-gray-700 flex justify-between">
                            <span className="text-gray-400 font-medium">Availability:</span>
                            {inCooldown ? (
                              <span className="text-amber-600 font-bold">⏳ Cooldown</span>
                            ) : (
                              <span className="text-emerald-600 font-bold">🟢 Available</span>
                            )}
                          </p>
                        </div>
                      </div>

                      {isEligible ? (
                        <a
                          href={`tel:${donor.phone}`}
                          className="w-full text-center bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl font-bold transition duration-150 block"
                        >
                          📞 Call Available Donor
                        </a>
                      ) : (
                        <button
                          disabled
                          className="w-full bg-gray-100 text-gray-400 py-2 rounded-xl font-bold cursor-not-allowed"
                        >
                          Unavailable (In Cooldown/Unverified)
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-10 bg-white border border-gray-100 rounded-2xl shadow-sm max-w-xl mx-auto">
                <span className="text-3xl">🏜️</span>
                <h4 className="text-lg font-bold text-gray-800 mt-3">No Compatible Matches Found</h4>
                <p className="text-gray-500 mt-2 text-sm">
                  We couldn't find any medically compatible donors registered in this city.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminRequests;