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
      setDonors(res.data);
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
          <div className="donor-card">
            <h3>{donor.name}</h3>

            <p>
              <strong>Blood Group:</strong> {donor.bloodGroup}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {donor.available ? "🟢 Available" : "🔴 Unavailable"}
            </p>

            <button
              onClick={() => navigate(`/donor/${donor._id}`)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FindDonor;