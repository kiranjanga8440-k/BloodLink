import { useEffect, useState } from "react";
import axios from "axios";
import API from "../api";

function Home() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    axios
      .get(`${API}/api/donors/stats`)
      .then((res) => setStats(res.data));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-red-600 mb-6">
        BloodLink
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white shadow p-6 rounded">
          <h2>Total Donors</h2>
          <p className="text-3xl font-bold">
            {stats.totalDonors}
          </p>
        </div>

        <div className="bg-white shadow p-6 rounded">
          <h2>Verified Donors</h2>
          <p className="text-3xl font-bold">
            {stats.verifiedDonors}
          </p>
        </div>

        <div className="bg-white shadow p-6 rounded">
          <h2>Pending Verification</h2>
          <p className="text-3xl font-bold">
            {stats.unverifiedDonors}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;