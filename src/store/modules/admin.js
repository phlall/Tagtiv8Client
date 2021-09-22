import ApiService from "@/services/apiService.js";
//import _ from "lodash";
export const namespaced = true;

export const state = {};

export const mutations = {};

export const actions = {
  getResources({ dispatch }, subjectId) {
    return ApiService.getResourcesBySubject(subjectId)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        const notification = {
          type: "error",
          message: `resources not found ${error.message}`,
        };
        dispatch("notification/add", notification, { root: true });
        // return error;
      });
  },
  addResource({ dispatch }, content) {
    return ApiService.addResource(content)
      .then((response) => {
        const notification = {
          type: "success",
          message: "Resource Content added",
        };
        dispatch("notification/add", notification, { root: true });
        return response.data;
      })
      .catch((error) => {
        const notification = {
          type: "error",
          message: `resource not created ${error.message}`,
        };
        dispatch("notification/add", notification, { root: true });
        // return error;
      });
  },
};
