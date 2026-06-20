import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function DonorDetails() {
  const { id } = useParams();
  const [donor, setDonor] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/donors/${id}`)
      .then((res) => setDonor(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!donor) return <h2>Loading...</h2>;

  return (
    <div>
      <h2>{donor.name}</h2>

      <p>Blood Group: {donor.bloodGroup}</p>
      <p>Age: {donor.age}</p>
      <p>Phone: {donor.phone}</p>
      <p>Email: {donor.email}</p>
      <p>City: {donor.city}</p>
      <p>
        Availability:
        {donor.available ? " Available" : " Unavailable"}
      </p>
    </div>
  );
}

export default DonorDetails;