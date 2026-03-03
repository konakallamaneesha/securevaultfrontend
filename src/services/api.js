import axios from "axios";

const API = axios.create({
  baseURL: "https://backend-3t2r.onrender.com/api",
});

export default API;