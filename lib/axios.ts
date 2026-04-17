import axios from "axios";

const axiosInstance = axios.create();

// Interceptor to catch backend errors and emit a global toast event
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    try {
      if (error && error.response) {
        const data = error.response.data;
        const message = data?.detail || data?.error || error.message || "Request failed";
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("app:toast", { detail: { message, type: "error" } }));
        }
      }
    } catch (e) {
      // swallow any toast errors
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
