import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import RegisterDonor from "./components/RegisterDonor";
import FindDonor from "./pages/FindDonor";
import EmergencyRequest from "./pages/EmergencyRequest";
import EmergencyDashboard from "./pages/EmergencyDashboard";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminDonors from "./pages/AdminDonors";
import AdminRequests from "./pages/AdminRequests";
import DonorDetails from "./pages/DonorDetails";

function App() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterDonor />} />
        <Route path="/find" element={<FindDonor />} />
        <Route path="/emergency" element={<EmergencyRequest />} />
        <Route path="/requests" element={<EmergencyDashboard />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/donors" element={<ProtectedRoute><AdminDonors /></ProtectedRoute>} />
        <Route path="/admin/requests" element={<ProtectedRoute><AdminRequests /></ProtectedRoute>} />
        <Route path="/donor/:id" element={<DonorDetails />} />
      </Routes>

    </div>
  );
}

export default App;