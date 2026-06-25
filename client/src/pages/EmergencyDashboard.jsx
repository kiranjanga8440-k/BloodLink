import { useEffect, useState } from "react";
import axios from "axios";
import API from "../api";

function EmergencyDashboard() {
  const [requests, setRequests] = useState([]);
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

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 sm:p-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-3xl animate-pulse inline-block">🚑</span>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight mt-2 mb-3">
            Emergency Blood Requests
          </h1>
          <p className="text-gray-500 font-medium text-sm">
            Active urgent blood request queues. If you match any compatibility list, contact the hospital directly to assist.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm animate-pulse h-48" />
            ))}
          </div>
        ) : requests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {requests.map((item) => (
              <div
                key={item._id}
                className="glass-card bg-white border border-red-50 p-6 rounded-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="inline-flex items-center px-4 py-1.5 rounded-full text-base font-black bg-red-100 text-red-600 border border-red-200 shadow-sm">
                      {item.bloodGroup}
                    </span>
                    <span className="text-xs text-gray-400 font-bold bg-gray-50 px-2 py-1 rounded border border-gray-100">
                      🚨 URGENT
                    </span>
                  </div>

                  <div className="space-y-2 mb-6">
                    <p className="text-sm font-semibold text-gray-800">
                      <span className="text-gray-400 font-medium mr-1.5">Patient:</span>
                      {item.patientName}
                    </p>
                    <p className="text-sm font-semibold text-gray-800">
                      <span className="text-gray-400 font-medium mr-1.5">Hospital:</span>
                      {item.hospital}
                    </p>
                    <p className="text-sm font-semibold text-gray-800">
                      <span className="text-gray-400 font-medium mr-1.5">City:</span>
                      {item.city}
                    </p>
                  </div>
                </div>

                <a
                  href={`tel:${item.phone}`}
                  className="w-full text-center bg-red-600 text-white py-3 rounded-xl font-bold hover:bg-red-700 hover:shadow-lg hover:shadow-red-600/20 active:scale-98 transition duration-150 block"
                >
                  📞 Contact Coordinator
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white border border-gray-100 rounded-2xl shadow-sm">
            <span className="text-4xl">🕊️</span>
            <h3 className="text-xl font-bold text-gray-800 mt-4">No Active Requests</h3>
            <p className="text-gray-500 mt-2 text-sm max-w-sm mx-auto">
              There are currently no active emergency blood requests. Thank you to all our active donors!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default EmergencyDashboard;