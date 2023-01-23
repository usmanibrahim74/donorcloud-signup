import axios from "axios";

let accessToken = "5d8550b4140f1fd54685af696e4d6d45";
const scriptElement = document.getElementById("synergi-donorcloud-script")
if (scriptElement) {
  accessToken = scriptElement.getAttribute("data-access-token");
}

// // Request interceptor
axios.interceptors.request.use(
  config => {
    config.headers['X-Token'] = accessToken;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

const url = (api) => {
  
  return window.SynergiApiURL + '/' + api;
};
export default {
  saveDonation(payload) {
    return axios.post(url("donations"), payload);
  },
  makePayment(payload) {
    return axios.post(url("payments/pay"), payload);
  },
  fetchProjects(category_id) {
    return axios.get(url("projects"));
  },
  fetchProject(project_id) {
    return axios.get(url(`projects/${project_id}`));
  },
  fetchGatewayKey(gateway){
    return axios.get(url(`payments/gateways/${gateway}/key`));
  },
  assets(asset) {
    return import.meta.env.VITE_ASSETS_URL+ "/" + asset;
  },
};
