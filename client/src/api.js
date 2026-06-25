const API =
  window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? "http://localhost:5000"
    : "https://bloodlink-2-emlj.onrender.com";
export default API;