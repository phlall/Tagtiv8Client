/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
import ApiService from "@/services/apiService.js";
// import axios from "axios";

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
    // state.user = null;
    localStorage.removeItem("user");
    state.user = "";
    state.plan = {};
  },
  SET_PLAN(state, subject) {
    state.plan.subject = subject;
  },
  SET_AGERANGE(state, ageRange) {
    state.plan.ageRange = ageRange.ageRange;
  },
};

export const actions = {
  register({ commit, dispatch }, credentials) {
    return ApiService.register(credentials).then(({ response }) => {
      commit("SET_USER_DATA", response.data);
      const notification = {
        type: "success",
        message: "YRegistration successful",
      };
      dispatch("notification/add", notification, { root: true });
    });
  },
  resetPassword({ dispatch }, credentials) {
    return ApiService.resetPassword(credentials).then(({ data }) => {
      // commit('SET_RESET_DATA', data)
      const notification = {
        type: "success",
        message: data.message,
      };
      dispatch("notification/add", notification, { root: true });
    });
  },
  getUsers({ dispatch }) {
    return ApiService.getUsers().then((data) => {
      const notification = {
        type: "success",
        message: "Users returned",
      };
      dispatch("notification/add", notification, { root: true });
      return data;
    });
  },
  getResources({ state, dispatch }) {
    if (state.plan.ageRange != null && state.plan.subject != null) {
      return ApiService.getResources(state.plan.ageRange, state.plan.subject.id)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          const notification = {
            type: "error",
            message: `resources not found ${error.message}`,
          };
          dispatch("notification/add", notification, { root: true });
          return error;
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
    commit("SET_PLAN", subject);
  },
  setAgeRange({ commit }, ageRange) {
    commit("SET_AGERANGE", ageRange);
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
};
