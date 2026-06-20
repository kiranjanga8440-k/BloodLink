import { useEffect, useState } from "react";
import axios from "axios";
import API from "../api";
import { useNavigate } from "react-router-dom";

function FindDonor() {
  const [donors, setDonors] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors = async () => {
    try {
      const res = await axios.get(`${API}/api/donors/verified`);
      setDonors(res.data);
    } catch (error) {
      console.log(error);
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
        {filteredDonors.length > 0 ? (
          filteredDonors.map((donor) => (
            <div
              key={donor._id}
              className="bg-white shadow-md rounded-lg p-5"
            >
              <h2 className="text-xl font-bold text-red-600 mb-2">
                {donor.name}
              </h2>

              <p className="mb-2">
                <strong>Blood Group:</strong> {donor.bloodGroup}
              </p>

              <p className="mb-4">
                <strong>Status:</strong>{" "}
                {donor.available
                  ? "🟢 Available"
                  : "🔴 Unavailable"}
              </p>

              <button
                onClick={() => navigate(`/donor/${donor._id}`)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                View Details
              </button>
            </div>
          ))
        ) : (
          <p className="text-center col-span-3">
            No donors found.
          </p>
        )}
      </div>
    </div>
  );
}

export default FindDonor;