import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

function isTokenExpired(token) {
  try {
    const decoded = jwtDecode(token);

    const exp = decoded.exp;
    if (!exp) {
      console.error("Le jeton ne contient pas de date d'expiration");
      return true;
    }

    const now = Math.floor(Date.now() / 1000);
    return exp < now;
  } catch (error) {
    console.error("Erreur lors du décodage du jeton:", error);
    return true;
  }
}

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = Cookies.get("token");
    if (token && !isTokenExpired(token)) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { axiosInstance, isTokenExpired };
