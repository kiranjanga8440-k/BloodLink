import { useState } from "react";
import axios from "axios";
import API from "../api";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    setSubmitting(true);
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
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 flex justify-center items-center p-6">
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-red-50 shadow-xl w-full max-w-md bg-white">
        <div className="text-center mb-8">
          <span className="text-4xl">🔐</span>
          <h2 className="text-3xl font-black text-gray-900 mt-4 tracking-tight">
            Admin Portal
          </h2>
          <p className="text-gray-500 font-medium mt-2 text-sm">
            Sign in to access BloodLink administrative systems.
          </p>
        </div>

        <form onSubmit={login} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Admin Email</label>
            <input
              type="email"
              placeholder="admin@bloodlink.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 bg-white/50 transition duration-150"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 bg-white/50 transition duration-150"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            disabled={submitting}
            className="w-full mt-4 bg-red-600 text-white py-4 rounded-xl font-bold hover:bg-red-700 hover:shadow-lg hover:shadow-red-600/20 active:scale-[0.99] disabled:opacity-50 disabled:scale-100 transition duration-150"
          >
            {submitting ? "Signing in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;