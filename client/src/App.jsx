import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import RegisterDonor from "./components/RegisterDonor";
import FindDonor from "./pages/FindDonor";
import EmergencyRequest from "./pages/EmergencyRequest";
import EmergencyDashboard from "./pages/EmergencyDashboard";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminDonors from "./pages/AdminDonors";
import AdminRequests from "./pages/AdminRequests";
function App() {
  return (
    <div>
      <nav className="bg-red-600 text-white p-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex justify-between items-center">

          <h1 className="text-2xl font-bold">
            🩸 BloodLink
          </h1>

          <div className="space-x-6">
            <Link to="/">Home</Link>
            <Link to="/register">Register</Link>
            <Link to="/find">Find Donor</Link>
            <Link to="/emergency">Emergency</Link>
            <Link to="/requests">Requests</Link>
          </div>

        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterDonor />} />
        <Route path="/find" element={<FindDonor />} />
        <Route path="/emergency" element={<EmergencyRequest />} />
        <Route path="/requests" element={<EmergencyDashboard />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/donors" element={<AdminDonors />} />
        <Route path="/admin/requests" element={<AdminRequests />} />
      </Routes>

    </div>
  );
}

export default App;