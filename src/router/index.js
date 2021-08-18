import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Research from "../views/Research.vue";
import Gallery from "../views/Gallery.vue";
import Testimonials from "../views/Testimonials.vue";
import WhatWeOffer from "../views/WhatWeOffer.vue";
import MediaBlogs from "../views/MediaBlogs.vue";
import Contact from "../views/Contact.vue";
import Shop from "../views/Shop.vue";
import Account from "../views/Account.vue";
import AgeRange from "../views/AgeRange.vue";
import Resources from "../views/Resources.vue";
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
    name: "MainSite",
    component: Login,
    meta: {
      title: "BACK TO MAIN SITE",
    },
  },
  {
    path: "/home",
    name: "Plans",
    component: Home,
    meta: {
      title: "Plans",
    },
  },
  {
    path: "/account",
    name: "Account",
    component: Account,
    meta: {
      title: "My Account",
    },
  },
  {
    path: "/research",
    name: "Research",
    component: Research,
    meta: {
      requiresAuth: true,
      title: "Research",
      // sidebar: false,
      // hideBar: true
    },
  },
  {
    path: "/gallery",
    name: "Gallery",
    component: Gallery,
    meta: {
      title: "Gallery",
    },
  },
  {
    path: "/testimonials",
    name: "Testimonials",
    component: Testimonials,
    meta: {
      title: "Testimonials",
    },
  },
  {
    path: "/what-we-offer",
    name: "WhatWeOffer",
    component: WhatWeOffer,
    meta: {
      title: "What We Offer",
    },
  },
  {
    path: "/shop",
    name: "Shop",
    component: Shop,
    meta: {
      title: "Shop",
    },
  },
  {
    path: "/media-blogs",
    name: "MediaBlogs",
    component: MediaBlogs,
    meta: {
      title: "Media & Blogs",
    },
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact,
    meta: {
      title: "Contact",
    },
  },
  {
    path: "/agerange",
    name: "AgeRange",
    component: AgeRange,
    meta: {
      title: "Age Range",
    },
  },
  {
    path: "/resources",
    name: "Resources",
    component: Resources,
    meta: {
      title: "Resources",
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
