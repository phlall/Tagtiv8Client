/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
import ApiService from "@/services/apiService.js";
import _ from "lodash";
export const namespaced = true;

export const state = {
  user: "",
  plan: {},
};
export const mutations = {
  SET_USER_DATA(state, data) {
    state.user = data;
    localStorage.setItem("user", JSON.stringify(data));
    // axios.defaults.headers.common["Authorization"] = "Bearer ${userData.token}";
  },
  LOGOUT() {
    localStorage.removeItem("user");
    localStorage.removeItem("plan");
    state.user = "";
    state.plan = {};
  },
  SET_FAVORITE(state, blnFavorite) {
    if (!_.isEmpty(state.plan.resource)) {
      state.plan.resource.resourceContent.isFavorite = blnFavorite;
    }
  },
  SET_PLAN(state, plan) {
    state.plan = plan;
    localStorage.setItem("plan", JSON.stringify(plan));
  },
  SET_SUBJECT(state, subject) {
    state.plan.subject = subject;
    localStorage.setItem("plan", JSON.stringify(state.plan));
  },
  SET_AGERANGE(state, ageRange) {
    state.plan.ageRange = ageRange.ageRange;
    localStorage.setItem("plan", JSON.stringify(state.plan));
  },
  SET_RESOURCE_CONTENT(state, resourceItem) {
    state.plan.resource = resourceItem;
    localStorage.setItem("plan", JSON.stringify(state.plan));
  },
  CLEAR_RESOURCE(state) {
    state.plan.resource = {};
  },
};

export const actions = {
  login({ commit, dispatch }, credentials) {
    return ApiService.login(credentials)
      .then((response) => {
        commit("SET_USER_DATA", response.data);
        const notification = {
          type: "success",
          message: "login successful",
        };
        dispatch("notification/add", notification, { root: true });
      })
      .catch((error) => {
        const notification = {
          type: "error",
          message: `Username or Password not found ${error.message}`,
        };
        dispatch("notification/add", notification, { root: true });
        return error;
      });
  },
  logout({ commit }) {
    commit("LOGOUT");
  },
  register({ dispatch }, credentials) {
    return ApiService.register(credentials)
      .then((response) => {
        let notification = "";
        if (_.has(response.data, "message")) {
          notification = {
            type: "error",
            message: response.data.message,
          };
        } else {
          notification = {
            type: "success",
            message: "Registration successful",
          };
          dispatch("notification/add", notification, { root: true });
        }
      })
      .catch((error) => {
        const notification = {
          type: "error",
          message: `Registration failed  -  ${error.message} - check duplicate user`,
        };
        dispatch("notification/add", notification, { root: true });
        return error;
      });
  },
  resetPassword({ dispatch }, credentials) {
    return ApiService.resetPassword(credentials).then(({ data }) => {
      const notification = {
        type: "success",
        message: data.message,
      };
      dispatch("notification/add", notification, { root: true });
    });
  },
  getUsers({ dispatch }) {
    return ApiService.getUsers().then((response) => {
      const notification = {
        type: "success",
        message: "Users returned",
      };
      dispatch("notification/add", notification, { root: true });
      return response.data;
    });
  },
  getUser({ dispatch }, userId) {
    return ApiService.getUser(userId.userId)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        const notification = {
          type: "error",
          message: `User not found  -  ${error.message}`,
        };
        dispatch("notification/add", notification, { root: true });
        return error;
      });
  },
  deleteUser({ dispatch }, userId) {
    return ApiService.delete(userId.userId).then((response) => {
      const notification = {
        type: "success",
        message: "User deleted",
      };
      dispatch("notification/add", notification, { root: true });
      return response.data;
    });
  },
  getResources({ state, commit, dispatch }) {
    if (state.plan.ageRange != null && state.plan.subject != null) {
      return ApiService.getResources(
        state.plan.ageRange,
        state.plan.subject.id,
        state.user.id
      )
        .then((response) => {
          commit("CLEAR_RESOURCE");
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
    } else {
      const notification = {
        type: "error",
        message: "Please reset yor plan",
      };
      dispatch("notification/add", notification, { root: true });
    }
    return null;
  },
  setPassword({ commit, dispatch }, credentials) {
    return ApiService.setPassword(credentials).then(() => {
      commit("LOGOUT");
      const notification = {
        type: "success",
        message: "Your password is reset",
      };
      dispatch("notification/add", notification, { root: true });
    });
  },
  setPlan({ commit }, subject) {
    commit("SET_SUBJECT", subject);
  },
  setAgeRange({ commit }, ageRange) {
    commit("SET_AGERANGE", ageRange);
  },
  setResourceContent({ commit }, content) {
    if (_.has(content, "resourceObj")) {
      commit("SET_RESOURCE_CONTENT", content.resourceObj);
    }
    return true;
  },
  getSubjects({ dispatch }) {
    return ApiService.getSubjects()
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        const notification = {
          type: "error",
          message: `Username or Password not found ${error.message}`,
        };
        dispatch("notification/add", notification, { root: true });
        return error;
      });
  },
  deleteFavorite({ state, dispatch }, obj) {
    return ApiService.deleteFavorite(state.user.id, obj.itemId).catch(
      (error) => {
        const notification = {
          type: "error",
          message: `Error deleting favorite - ${error.message}`,
        };
        dispatch("notification/add", notification, { root: true });
        return error;
      }
    );
  },
  addFavorite({ state, dispatch }, obj) {
    return ApiService.addFavorite({
      userId: state.user.id,
      resourceContentId: obj.itemId,
    }).catch((error) => {
      const notification = {
        type: "error",
        message: `Error adding favorite - ${error.message}`,
      };
      dispatch("notification/add", notification, { root: true });
      return error;
    });
  },

  setPlanObj() {
    let planObj = localStorage.getItem("plan");
    if (!_.isEmpty(planObj)) {
      state.plan = planObj;
    }
  },
};
