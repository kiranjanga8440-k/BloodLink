import { useState } from "react";
import axios from "axios";
import API from "../api";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${API}/api/admin/login`,
        { email, password }
      );

      alert(res.data.message);

      localStorage.setItem("admin", "true");

      window.location.href = "/admin";
    } catch (err) {
      alert("Invalid Credentials");
    }
  };

  return (
    <form onSubmit={login} className="max-w-md mx-auto p-8">
      <input
        type="email"
        placeholder="Admin Email"
        className="w-full border p-3 mb-4"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full border p-3 mb-4"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="w-full bg-red-600 text-white p-3">
        Login
      </button>
    </form>
  );
}

export default AdminLogin;