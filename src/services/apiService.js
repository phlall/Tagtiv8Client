import axios from "axios";
import store from "@/store";

const apiClient = axios.create({
  // baseURL: "https://tagtiv8.herokuapp.com/api/",
  baseURL: "https://localhost:49155/api/",
  withCredentials: false, // This is the default
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Referrer-Policy": "origin"
  },
  timeout: 15000,
});

export default {
  // Menus
  setAuthHeader() {
    if (store.getters.userToken != null) {
      apiClient.defaults.headers.common.Authorization = `Bearer ${store.getters.userToken.token}`;
      return true;
    }
    return false;
  },

  // User
  register(credentials) {
    return apiClient.post("/auth/register", credentials);
  },
  resetPassword(credentials) {
    return apiClient.post("/bdpwr/v1/reset-password", credentials);
  },
  setPassword(credentials) {
    return apiClient.post("/bdpwr/v1/set-password", credentials);
  },
  login(credentials) {
    return apiClient.post("users/authenticate", credentials);
  },
  getUsers() {
    if (this.setAuthHeader()) {
      return apiClient.get("/wp/v2/users?context=edit");
    }
    return null;
  },
};
