import { useState } from "react";
import axios from "axios";
import API from "../api";

function RegisterDonor() {
  const [donor, setDonor] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    bloodGroup: "",
    city: "",
    lastDonationDate: "",
    aadhaarNumber: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setDonor({
      ...donor,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^[0-9]{10}$/.test(donor.phone)) {
      alert("Please enter a valid 10-digit phone number");
      return;
    }

    if (!/^[0-9]{12}$/.test(donor.aadhaarNumber)) {
      alert("Please enter a valid 12-digit Aadhaar Number");
      return;
    }

    if (parseInt(donor.age) < 18) {
      alert("You must be at least 18 years old to register as a donor.");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        ...donor,
        lastDonationDate: donor.lastDonationDate || null,
        age: parseInt(donor.age),
      };

      const response = await axios.post(
        `${API}/api/donors/register`,
        payload
      );

      alert(response.data.message || "Registered Successfully!");
      
      // Reset form
      setDonor({
        name: "",
        email: "",
        phone: "",
        age: "",
        bloodGroup: "",
        city: "",
        lastDonationDate: "",
        aadhaarNumber: "",
      });
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message || "Registration failed.");
      } else {
        alert("Something went wrong!");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="max-w-2xl mx-auto px-6 py-12">
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-red-100 shadow-xl relative overflow-hidden bg-white">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-100/30 rounded-full blur-2xl pointer-events-none" />

        <div className="text-center mb-8">
          <span className="text-4xl">❤️</span>
          <h2 className="text-3xl font-black text-gray-900 mt-4 tracking-tight">
            Register as a Donor
          </h2>
          <p className="text-gray-500 font-medium mt-2 text-sm">
            Join the community and save lives. Your details are safe with us.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={donor.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 bg-white/50 transition duration-150"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={donor.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 bg-white/50 transition duration-150"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Phone Number</label>
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={donor.phone}
                onChange={(e) =>
                  setDonor({
                    ...donor,
                    phone: e.target.value.replace(/[^0-9]/g, ""),
                  })
                }
                maxLength={10}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 bg-white/50 transition duration-150"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Age</label>
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={donor.age}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 bg-white/50 transition duration-150"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Blood Group</label>
              <select
                name="bloodGroup"
                value={donor.bloodGroup}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 bg-white/50 transition duration-150"
                required
              >
                <option value="">Select Blood Group</option>
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
                placeholder="City"
                value={donor.city}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 bg-white/50 transition duration-150"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Aadhaar Number (12-digit)</label>
            <input
              type="text"
              name="aadhaarNumber"
              placeholder="Aadhaar Number"
              value={donor.aadhaarNumber}
              onChange={(e) =>
                setDonor({
                  ...donor,
                  aadhaarNumber: e.target.value.replace(/[^0-9]/g, ""),
                })
              }
              maxLength={12}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 bg-white/50 transition duration-150"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              Last Donation Date <span className="text-gray-400 font-normal lowercase">(Optional - used to track cooldown)</span>
            </label>
            <input
              type="date"
              name="lastDonationDate"
              value={donor.lastDonationDate}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 bg-white/50 transition duration-150"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full mt-4 bg-red-600 text-white py-4 rounded-xl font-bold hover:bg-red-700 hover:shadow-lg hover:shadow-red-600/20 active:scale-[0.99] disabled:opacity-50 disabled:scale-100 transition duration-150"
          >
            {submitting ? "Registering..." : "Complete Registration"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default RegisterDonor;