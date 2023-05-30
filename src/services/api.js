import axios from "./interceptor";

// // Request interceptor
axios.interceptors.request.use(
  (config) => {
    // config.headers["X-Token"] = accessToken;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default {};
