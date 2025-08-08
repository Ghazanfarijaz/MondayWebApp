import axios from "axios";

// const BASE_URL_BEFORE_SANITIZATION = "https://c138b-service-23360785-a4c1a002.us.monday.app";

const BASE_URL = "https://e8272-service-23360785-a4c1a002.us.monday.app";
// const BASE_URL = "http://localhost:8080";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});
