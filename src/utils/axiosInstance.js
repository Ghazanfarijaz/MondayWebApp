import axios from "axios";

// const BASE_URL = process.env.REACT_APP_API_DEPLOYED_URL;
const BASE_URL = "http://localhost:8080";

const accessToken = localStorage.getItem("accessToken") || "";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
});
