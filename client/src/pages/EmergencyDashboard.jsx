import { useEffect, useState } from "react";
import axios from "axios";
const API = import.meta.env.VITE_API_URL || "https://bloodlink-2-emlj.onrender.com";
function EmergencyDashboard() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${API}/api/emergency`);

      setRequests(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-red-50 p-8">
      <h1 className="text-4xl font-bold text-center text-red-600 mb-8">
        Emergency Blood Requests
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {requests.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-3xl font-bold text-red-500">
              {item.bloodGroup}
            </h2>

            <p className="mt-4">
              <strong>Patient:</strong> {item.patientName}
            </p>

            <p>
              <strong>Hospital:</strong> {item.hospital}
            </p>

            <p>
              <strong>City:</strong> {item.city}
            </p>

            <p>
              <strong>Phone:</strong> {item.phone}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmergencyDashboard;