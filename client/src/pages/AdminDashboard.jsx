import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-red-50 p-8">
      <h1 className="text-4xl font-bold text-center text-red-600 mb-10">
        BloodLink Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">

        <Link to="/admin/donors">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl cursor-pointer">
            <h2 className="text-2xl font-bold">
              🩸 Donors
            </h2>
            <p className="mt-2">
              Manage blood donors.
            </p>
          </div>
        </Link>

        <Link to="/admin/requests">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl cursor-pointer">
            <h2 className="text-2xl font-bold">
              🚑 Emergency Requests
            </h2>
            <p className="mt-2">
              Manage emergency requests.
            </p>
          </div>
        </Link>
        

      </div>

      <div className="text-center mt-10">
        <button
          className="bg-red-600 text-white px-6 py-3 rounded-lg"
          onClick={() => {
            localStorage.removeItem("admin");
            window.location.href = "/admin-login";
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default AdminDashboard;