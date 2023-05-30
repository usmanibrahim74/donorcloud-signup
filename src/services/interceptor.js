import axios from "axios";

let app_url = "https://app.donorcloud.co.uk";
if (window.origin.includes("localhost")) {
  app_url = "http://127.0.0.1:8000";
}

const instance = axios.create({
  baseURL: app_url + "/api/onboarding",
});

instance.interceptors.request.use((request) => {
  return request;
});
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    throw error;
  }
);

export default instance;
