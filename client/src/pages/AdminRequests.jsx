import { useEffect, useState } from "react";
import axios from "axios";
import API from "../api";

function AdminRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    const res = await axios.get(`${API}/api/emergency`);
    setRequests(res.data);
  };

  const deleteRequest = async (id) => {
    try {
      const res = await axios.delete(`${API}/api/emergency/${id}`);
      alert(res.data.message);
      fetchRequests();
    } catch (error) {
      alert("Error deleting request");
    }
  };

  return (
    <div className="min-h-screen bg-red-50 p-8">
      <h1 className="text-4xl font-bold text-center text-red-600 mb-8">
        Emergency Requests
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {requests.map((req) => (
          <div key={req._id} className="bg-white p-6 rounded-xl shadow-lg">

            <h2 className="text-2xl font-bold text-red-500">
              {req.bloodGroup}
            </h2>

            <p><strong>Patient:</strong> {req.patientName}</p>
            <p><strong>City:</strong> {req.city}</p>
            <p><strong>Hospital:</strong> {req.hospital}</p>
            <p><strong>Phone:</strong> {req.phone}</p>

            <button
              onClick={() => deleteRequest(req._id)}
              className="mt-4 w-full bg-red-600 text-white p-2 rounded-lg"
            >
              Delete Request
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminRequests;