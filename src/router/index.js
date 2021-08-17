/* eslint-disable import/no-unresolved */
import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Research from "../views/Research.vue";
import Gallery from "../views/Gallery.vue";
import Testimonials from "../views/Testimonials.vue";
import WhatWeOffer from "../views/WhatWeOffer.vue";
import MediaBlogs from "../views/MediaBlogs.vue";
import Contact from "../views/Contact.vue";
import Shop from "../views/Shop.vue";
import About from "../views/About.vue";
import Account from "../views/Account.vue";

const routes = [

  {
    path: "/",
    name: "Login",
    component: Login,
    meta: {
      title: "Login",
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
    path: "/account",
    name: "Account",
    component: Account,
    meta: {
      title: "My Account",
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
    path: "/home",
    name: "Plans",
    component: Home,
    meta: {
      title: "Plans",
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
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
