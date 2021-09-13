import { createStore } from "vuex";
import * as user from "@/store/modules/user.js";
import * as notification from "@/store/modules/notification.js";
import * as admin from "@/store/modules/admin.js";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    notification,
    admin,
  },
  getters: {
    loggedIn(state) {
      return !!state.user.user;
    },
    userToken: (state) => state.user.user,
    plan: (state) => state.user.plan,
    resource: (state) => state.user.plan.resource,
  },
});
