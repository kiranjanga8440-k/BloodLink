import { useState } from "react";
import axios from "axios";

function RegisterDonor() {
  const [donor, setDonor] = useState({
    name: "",
    email: "",
    phone: "",
    bloodGroup: "",
    city: "",
  });

  const handleChange = (e) => {
    setDonor({
      ...donor,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ phone validation
    if (!/^[0-9]{10}$/.test(donor.phone)) {
      alert("Please enter a valid 10-digit phone number");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/donors/register",
        donor
      );

      alert(response.data.message);
      console.log(response.data);

      // reset form after success
      setDonor({
        name: "",
        email: "",
        phone: "",
        bloodGroup: "",
        city: "",
      });
    } catch (error) {
      console.log(error);
      alert("Something went wrong!");
    }
  };

  return (
    <section className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg mt-10 mb-10">

      <h2 className="text-4xl font-bold text-center text-red-600 mb-8">
        Become a Blood Donor
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={donor.name}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={donor.email}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={donor.phone}
          onChange={(e) =>
            setDonor({
              ...donor,
              phone: e.target.value.replace(/[^0-9]/g, ""),
            })
          }
          maxLength={10}
          className="w-full border p-3 rounded-lg"
          required
        />

        <select
          name="bloodGroup"
          value={donor.bloodGroup}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
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

        <input
          type="text"
          name="city"
          placeholder="City"
          value={donor.city}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          required
        />

        <button
          type="submit"
          className="w-full bg-red-600 text-white p-3 rounded-lg hover:bg-red-700"
        >
          Register as Donor
        </button>

      </form>

    </section>
  );
}

export default RegisterDonor;