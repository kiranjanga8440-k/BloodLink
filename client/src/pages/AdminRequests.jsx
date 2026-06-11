import { useEffect, useState } from "react";
import axios from "axios";
import API from "../api";

function AdminRequests() {
  const [requests, setRequests] = useState([]);
  const [matchedDonors, setMatchedDonors] = useState([]);

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

  const findMatches = async (bloodGroup, city) => {
    try {
      const res = await axios.get(
        `${API}/api/emergency/match/${bloodGroup}/${city}`
      );

      setMatchedDonors(res.data.donors);
    } catch (error) {
      console.log(error);
      alert("Error finding matches");
    }
  };

  return (
    <div className="min-h-screen bg-red-50 p-8">

      <h1 className="text-4xl font-bold text-center text-red-600 mb-8">
        Emergency Requests
      </h1>

      {/* REQUESTS */}
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
              onClick={() => findMatches(req.bloodGroup, req.city)}
              className="mt-3 w-full bg-green-600 text-white p-2 rounded-lg hover:bg-green-700"
            >
              Find Matching Donors
            </button>

            <button
              onClick={() => deleteRequest(req._id)}
              className="mt-2 w-full bg-red-600 text-white p-2 rounded-lg hover:bg-red-700"
            >
              Delete Request
            </button>

          </div>
        ))}
      </div>

      {/* MATCHED DONORS */}
      {matchedDonors.length > 0 && (
        <div className="mt-10">

          <h2 className="text-2xl font-bold text-center mb-6">
            Matching Donors
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {matchedDonors.map((donor) => (
              <div key={donor._id} className="bg-white p-6 rounded-xl shadow-lg">

                <h3 className="text-red-600 font-bold text-xl">
                  {donor.bloodGroup}
                </h3>

                <p><strong>Name:</strong> {donor.name}</p>
                <p><strong>City:</strong> {donor.city}</p>
                <p><strong>Phone:</strong> {donor.phone}</p>

              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
}

export default AdminRequests;