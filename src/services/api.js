import axios from "axios";

const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL || "http://localhost:3000/api",
  headers: {
    Accept: "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    let message = "Connection failed. Please try again.";

    if (error.response) {
      const data = error.response.data;
      if (data && data.error) {
        message = data.error;
      } else {
        message = `Server error: ${error.response.status}`;
      }
    } else if (error.request) {
      message = "Connection failed. Please try again.";
    }

    const normalizedError = new Error(message);
    normalizedError.status = error.response?.status;
    normalizedError.originalError = error;
    return Promise.reject(normalizedError);
  }
);

export default api;
