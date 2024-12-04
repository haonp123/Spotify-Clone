import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://spotify-clone-api-7j3b.onrender.com/api",
  withCredentials: true,
});
