import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import API from "../api";

function DonorDetails() {
  const { id } = useParams();
  const [donor, setDonor] = useState(null);

  useEffect(() => {
    fetchDonor();
  }, []);

  const fetchDonor = async () => {
    try {
        console.log("Donor ID:", id);

        const res = await axios.get(`${API}/api/donors/${id}`);

        console.log("Response:", res.data);

        setDonor(res.data);
    } catch (error) {
        console.log("ERROR:", error);
    }
  };

  if (!donor) {
    return <h2 className="text-center mt-10">Loading...</h2>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-red-600 mb-6 text-center">
          Donor Details
        </h1>

        <p><strong>Name:</strong> {donor.name}</p>
        <p><strong>Blood Group:</strong> {donor.bloodGroup}</p>
        <p><strong>Age:</strong> {donor.age}</p>
        <p><strong>Phone:</strong> {donor.phone}</p>
        <p><strong>Email:</strong> {donor.email}</p>
        <p><strong>City:</strong> {donor.city}</p>
        <p>
          <strong>Status:</strong>{" "}
          {donor.available ? "🟢 Available" : "🔴 Unavailable"}
        </p>
      </div>
    </div>
  );
}

export default DonorDetails;