import ApiService from "@/services/apiService.js";
//import _ from "lodash";
export const namespaced = true;

export const state = {};

export const mutations = {};

export const actions = {
  getResources({ dispatch }, subjectId) {
    return ApiService.getResourcesBySubject(subjectId)
      .then((response) => {
        // commit("CLEAR_RESOURCE");
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
        // commit("CLEAR_RESOURCE");
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
