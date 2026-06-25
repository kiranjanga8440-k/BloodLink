import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50/50 p-6 sm:p-10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-4xl">🎛️</span>
          <h1 className="text-4xl font-black text-gray-900 mt-2 tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-gray-500 font-medium text-sm mt-1">
            System administration controls. Manage verified donors and active emergency queues.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <Link to="/admin/donors" className="block group">
            <div className="glass-card bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:border-red-200 transition duration-300 flex flex-col justify-between h-48">
              <div>
                <span className="text-3xl mb-4 block group-hover:scale-110 transition duration-200">🩸</span>
                <h2 className="text-2xl font-black text-gray-900 group-hover:text-red-600 transition">
                  Manage Donors
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  View registered profiles, verify donor identities, or remove profiles.
                </p>
              </div>
              <span className="text-xs font-bold text-red-600 uppercase tracking-widest group-hover:translate-x-1 inline-flex items-center gap-1 transition">
                Open →
              </span>
            </div>
          </Link>

          <Link to="/admin/requests" className="block group">
            <div className="glass-card bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:border-red-200 transition duration-300 flex flex-col justify-between h-48">
              <div>
                <span className="text-3xl mb-4 block group-hover:scale-110 transition duration-200">🚑</span>
                <h2 className="text-2xl font-black text-gray-900 group-hover:text-red-600 transition">
                  Emergency Requests
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  Monitor patient queues, verify matches, and check donor compatibility.
                </p>
              </div>
              <span className="text-xs font-bold text-red-600 uppercase tracking-widest group-hover:translate-x-1 inline-flex items-center gap-1 transition">
                Open →
              </span>
            </div>
          </Link>
        </div>

        <div className="text-center mt-16">
          <button
            className="bg-gray-800 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-red-600 active:scale-98 hover:shadow-lg hover:shadow-red-600/10 transition duration-200"
            onClick={() => {
              localStorage.removeItem("adminToken");
              window.location.href = "/admin-login";
            }}
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;