import axios from "axios";

let app_url = "https://app.donorcloud.co.uk";
if (["localhost",'127.0.0.1'].some(origin => window.origin.includes(origin))) {
  app_url = "http://donorcloud.local";
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
