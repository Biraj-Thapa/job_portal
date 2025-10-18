import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// 🔒 Attach token to every request automatically
api.interceptors.request.use((config) => {
  const auth = localStorage.getItem("auth");
  if (auth) {
    const { token } = JSON.parse(auth);
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
