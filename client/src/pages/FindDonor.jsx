import { useEffect, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL || "https://bloodlink-2-emlj.onrender.com";
function FindDonor() {
  const [donors, setDonors] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchDonors();
  }, []);
  const res = await axios.get(`${API}/api/donors`);
setDonors(res.data);
const fetchDonors = async () => {
  try {
    const res = await axios.get(`${API}/api/donors`);
    setDonors(res.data);
  } catch (error) {
    console.log("Error fetching donors:", error);
  }
};

  const filteredDonors = donors.filter(
    (donor) =>
      donor.bloodGroup.toLowerCase().includes(search.toLowerCase()) ||
      donor.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center text-red-600 mb-8">
        Find Blood Donors
      </h1>

      <input
        type="text"
        placeholder="Search by Blood Group or City"
        className="w-full p-3 rounded-lg border mb-8"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid md:grid-cols-3 gap-6">
        {filteredDonors.map((donor) => (
          <div
            key={donor._id}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-3xl font-bold text-red-500">
              {donor.bloodGroup}
            </h2>

            <p className="mt-4">
              <strong>Name:</strong> {donor.name}
            </p>

            <p>
              <strong>City:</strong> {donor.city}
            </p>

            <p>
              <strong>Phone:</strong> {donor.phone}
            </p>

            <button className="mt-5 w-full bg-red-500 text-white p-3 rounded-lg hover:bg-red-600">
              Request Blood
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FindDonor;