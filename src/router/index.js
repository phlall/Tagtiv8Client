import { createRouter, createWebHashHistory } from "vue-router";
import store from "@/store";
import _ from "lodash";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import AgeRange from "../views/AgeRange.vue";
import Resources from "../views/Resources.vue";
import LessonPlan from "../views/LessonPlan.vue";
import WorkSheet from "../views/WorkSheet.vue";
import Introduction from "../views/Introduction.vue";
import Register from "../views/Register.vue";
import NotFound from "../views/NotFound.vue";
import AdminResourceContent from "../views/AdminResourceContent.vue";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "Login",
    },
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      title: "Home",
      requiresAuth: true,
      showAdmin: true,
    },
  },
  {
    path: "/about",
    name: "About",
    component: About,
    meta: {
      title: "About",
    },
  },
  {
    path: "/",
    name: "Root",
    component: Login,
    meta: {
      title: "Login",
    },
  },
  {
    path: "/home",
    name: "Plans",
    component: Home,
    meta: {
      title: "Plans",
      requiresAuth: true,
    },
  },
  {
    path: "/agerange",
    name: "AgeRange",
    component: AgeRange,
    beforeEnter: () => {
      const plan = store.getters.plan;
      if (!_.has(plan, "subject")) {
        router.push("Home");
      }
    },
    meta: {
      title: "Age Range",
      requiresAuth: true,
    },
  },
  {
    path: "/resources",
    name: "Resources",
    component: Resources,
    beforeEnter: () => {
      const plan = store.getters.plan;
      if (!_.has(plan, "ageRange") || !_.has(plan, "subject")) {
        router.push("Home");
      }
    },
    meta: {
      title: "Resources",
    },
  },
  {
    path: "/lesson-plan",
    name: "LessonPlan",
    component: LessonPlan,
    props: true,
    beforeEnter: () => {
      const rc = store.getters.resource;
      if (_.isEmpty(rc)) {
        router.push("Home");
      }
    },
    meta: {
      title: "Lesson Plan",
      // requiresAuth: true,
    },
  },
  {
    path: "/worksheet",
    name: "WorkSheet",
    component: WorkSheet,
    props: true,
    beforeEnter: () => {
      const rc = store.getters.resource;
      if (_.isEmpty(rc)) {
        router.push("Home");
      }
    },
    meta: {
      title: "Worksheet",
      requiresAuth: true,
    },
  },
  {
    path: "/introduction",
    name: "Introduction",
    component: Introduction,
    props: true,
    beforeEnter: () => {
      const rc = store.getters.resource;
      if (_.isEmpty(rc)) {
        router.push("Home");
      }
    },
    meta: {
      title: "Introduction",
      requiresAuth: true,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    props: true,
    meta: {
      title: "Register",
      requiresAuth: true,
    },
  },
  {
    path: "/resource-content",
    name: "AdminResourceContent",
    component: AdminResourceContent,
    props: true,
    meta: {
      title: "Resource Content",
      requiresAuth: true,
      showAdmin: true,
    },
  },
  {
    path: "/mainsite",
    name: "MainSite",
    meta: {
      title: "Return to Tagtiv8.com",
      linkType: "button",
    },
    beforeEnter() {
      window.location.href = "https://tagtiv8.com";
    },
  },
  {
    path: "/:catchAll(.*)",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  // hash: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem("user");

  if (to.matched.some((record) => record.meta.requiresAuth) && !loggedIn) {
    next("/Login");
  }
  next();
});
export default router;
