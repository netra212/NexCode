import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true, // means COOKIE laii attached gardinu.
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
