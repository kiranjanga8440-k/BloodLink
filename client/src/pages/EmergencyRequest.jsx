import { useState } from "react";
import axios from "axios";

import API from "../api";
function EmergencyRequest() {
  const [form, setForm] = useState({
    patientName: "",
    bloodGroup: "",
    hospital: "",
    city: "",
    phone: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API}/api/emergency`, form);

      alert("Emergency Request Submitted!");

      setForm({
        patientName: "",
        bloodGroup: "",
        hospital: "",
        city: "",
        phone: "",
      });
    } catch (error) {
      alert("Something went wrong");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-red-50 p-8">
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-red-600 mb-6">
          Emergency Blood Request
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="patientName"
            placeholder="Patient Name"
            className="w-full border p-3 rounded-lg"
            value={form.patientName}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="bloodGroup"
            placeholder="Blood Group Needed"
            className="w-full border p-3 rounded-lg"
            value={form.bloodGroup}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="hospital"
            placeholder="Hospital"
            className="w-full border p-3 rounded-lg"
            value={form.hospital}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            className="w-full border p-3 rounded-lg"
            value={form.city}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Contact Number"
            className="w-full border p-3 rounded-lg"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <button
            className="w-full bg-red-600 text-white p-3 rounded-lg hover:bg-red-700"
          >
            Submit Request
          </button>

        </form>
      </div>
    </div>
  );
}

export default EmergencyRequest;