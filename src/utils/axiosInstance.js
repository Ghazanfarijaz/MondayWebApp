import axios from "axios";

const BASE_URL = "https://beb15-service-23360785-a4c1a002.us.monday.app";
// const BASE_URL = "http://localhost:8080";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});
