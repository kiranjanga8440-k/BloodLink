import { useEffect, useState } from "react";
import axios from "axios";
import API from "../api";

function AdminDonors() {
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors = async () => {
    const res = await axios.get(`${API}/api/donors`);
    setDonors(res.data);
  };

  const deleteDonor = async (id) => {
    try {
      const res = await axios.delete(`${API}/api/donors/${id}`);
      alert(res.data.message);
      fetchDonors();
    } catch (error) {
      console.log(error.response?.data);
      console.log(error.response?.status);
      console.log(error.message);

      alert("Error deleting donor");
    }
  };

  return (
    <div className="min-h-screen bg-red-50 p-8">
      <h1 className="text-4xl font-bold text-center text-red-600 mb-8">
        Registered Donors
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {donors.map((donor) => (
          <div
            key={donor._id}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold text-red-500">
              {donor.bloodGroup}
            </h2>

            <p><strong>Name:</strong> {donor.name}</p>
            <p><strong>City:</strong> {donor.city}</p>
            <p><strong>Phone:</strong> {donor.phone}</p>
            <p><b>Age:</b> {donor.age}</p>

            <p>
              <b>Verified:</b>
              {donor.verified ? " ✅ Verified" : " ❌ Not Verified"}
            </p>

            <p>
              <b>Last Donation:</b>
              {donor.lastDonationDate
                ? new Date(donor.lastDonationDate).toLocaleDateString()
                : "Never Donated"}
            </p>

            <p>
              <b>Total Donations:</b>
              {donor.totalDonations}
            </p>
            <button
              className="mt-4 w-full bg-red-600 text-white p-2 rounded-lg hover:bg-red-700"
              onClick={() => deleteDonor(donor._id)}
            >
              Delete Donor
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDonors;