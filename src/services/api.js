import axios from "axios";

const API = axios.create({
  baseURL: "https://securevaultbackend-nhyk.onrender.com/api",
});

export default API;