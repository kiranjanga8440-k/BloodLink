function Profile({ donor }) {
  return (
    <div className="max-w-md mx-auto mt-8 bg-white p-6 rounded-xl shadow">

      <h2 className="text-2xl font-bold mb-4">
        Donor Profile
      </h2>

      <p><b>Name:</b> {donor.name}</p>
      <p><b>Age:</b> {donor.age}</p>
      <p><b>Blood Group:</b> {donor.bloodGroup}</p>

      <p>
        <b>Status:</b>
        {donor.verified ? " ✅ Verified" : " ❌ Not Verified"}
      </p>

      <p>
        <b>Last Donation:</b>
        {donor.lastDonationDate
          ? new Date(donor.lastDonationDate).toLocaleDateString()
          : "Never Donated"}
      </p>

      <p>
        <b>Total Donations:</b>
        {donor.totalDonations}
      </p>

    </div>
  );
}

export default Profile;