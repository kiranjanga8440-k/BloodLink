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
  const [submitting, setSubmitting] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Submit request
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^[0-9]{10}$/.test(form.phone)) {
      alert("Please enter a valid 10-digit phone number");
      return;
    }

    setSubmitting(true);
    try {
      const res = await axios.post(`${API}/api/emergency`, form);

      alert(res.data.message || "Emergency Request Submitted!");

      // reset form
      setForm({
        patientName: "",
        bloodGroup: "",
        hospital: "",
        city: "",
        phone: "",
      });
    } catch (error) {
      console.error(error);
      alert("Something went wrong while submitting request");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-red-50/30 p-6 sm:p-12">
      <div className="max-w-xl mx-auto">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-red-200/50 shadow-xl relative overflow-hidden bg-white">
          {/* Subtle warning glow */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center mb-8">
            <span className="text-4xl animate-bounce inline-block">🚨</span>
            <h1 className="text-3xl font-black text-red-600 mt-4 tracking-tight">
              Emergency Request
            </h1>
            <p className="text-gray-500 font-medium mt-2 text-sm max-w-sm mx-auto">
              Post an urgent request to matching compatible donors in your area. Email notifications will dispatch instantly.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Patient Name</label>
              <input
                type="text"
                name="patientName"
                placeholder="Patient Full Name"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 bg-white/50 transition duration-150"
                value={form.patientName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Blood Group</label>
                <select
                  name="bloodGroup"
                  value={form.bloodGroup}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 bg-white/50 transition duration-150"
                  required
                >
                  <option value="">Select</option>
                  <option>A+</option>
                  <option>A-</option>
                  <option>B+</option>
                  <option>B-</option>
                  <option>AB+</option>
                  <option>AB-</option>
                  <option>O+</option>
                  <option>O-</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">City</label>
                <input
                  type="text"
                  name="city"
                  placeholder="e.g. New York"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 bg-white/50 transition duration-150"
                  value={form.city}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Hospital Name</label>
              <input
                type="text"
                name="hospital"
                placeholder="Hospital Name & Branch"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 bg-white/50 transition duration-150"
                value={form.hospital}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Contact Number</label>
              <input
                type="text"
                name="phone"
                placeholder="10-digit phone number"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 bg-white/50 transition duration-150"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full mt-4 bg-red-600 text-white py-4 rounded-xl font-bold hover:bg-red-700 hover:shadow-lg hover:shadow-red-600/20 active:scale-[0.99] disabled:opacity-50 disabled:scale-100 transition duration-150"
            >
              {submitting ? "Submitting..." : "Submit Emergency Request"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EmergencyRequest;