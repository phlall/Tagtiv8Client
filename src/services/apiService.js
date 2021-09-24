import axios from "axios";
import store from "@/store";

const apiClient = axios.create({
  baseURL: "https://tagtiv8.herokuapp.com/api/",
  //baseURL: "https://localhost:49155/api/",
  withCredentials: false, // This is the default
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Referrer-Policy": "origin",
  },
  timeout: 25000,
});
const clientUrl = "http://localhost:8080/pdf/";
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
    return apiClient.post("users/register", credentials);
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
  getFile(file) {
    const fullUrl = new URL(clientUrl + file);
    return apiClient.get(fullUrl, { responseType: "blob" });
  },
  getSubjects() {
    if (this.setAuthHeader()) {
      return apiClient.get("Subject");
    }
    return null;
  },
  getResources(agerange, subjectid, userId) {
    if (this.setAuthHeader()) {
      return apiClient.get(
        `Resource/GetContentBySubject/${agerange}/${subjectid}/${userId}`
      );
    }
    return null;
  },
  addResource(content) {
    if (this.setAuthHeader()) {
      return apiClient.post("Resource/AddContentMultiple", content);
    }
    return null;
  },
  getResourcesBySubject(subjectid) {
    if (this.setAuthHeader()) {
      return apiClient.get(`Subject/${subjectid}`);
    }
    return null;
  },
  deleteFavorite(userId, resourceContentId) {
    if (this.setAuthHeader()) {
      return apiClient.delete(
        `Favorites/DeleteByUserContent/${userId}/${resourceContentId}`
      );
    }
    return null;
  },
  addFavorite(credentials) {
    if (this.setAuthHeader()) {
      return apiClient.post("Favorites/PostFavorite", credentials);
    }
    return null;
  },
};
