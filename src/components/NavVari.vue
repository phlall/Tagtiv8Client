<template>
  <div class="relative">
    <div
      class="
        border-b border-gray-700
        flex
        items-center
        justify-between
        text-center
        w-full
      "
    >
      <div class="flex lg:justify-end lg:w-4/12 ml-4 lg:ml-0 lg:pr-4">
        <img
          src="@/assets/images/logomain.png"
          class="object-none object-center"
        />
      </div>
      <div class="flex-grow flex justify-end">
        <div class="hidden lg:block font-bold">
          <router-link
            class="p-2"
            v-for="(link, index) in NavLinks"
            :key="index"
            :to="link"
            >{{ getTitle(link) }}</router-link
          >
        </div>
        <div class="">
          <BaseButton
            type="submit"
            :class="'bg-buttonblue'"
            :disabled="false"
            class="text-white h-8 bg-indigo-400 px-3 py-1 mr-6 ml-2 font-bold"
            @click="$router.push('Login')"
            v-if="!loggedIn"
          >
            LOG IN
          </BaseButton>
          <BaseButton
            type="submit"
            :class="'bg-buttonblue'"
            :disabled="false"
            class="text-white h-8 bg-indigo-400 px-3 py-1 mr-6 ml-2 font-bold"
            something="else"
            @click="logout"
            v-else
          >
            LOG OUT
          </BaseButton>
        </div>
      </div>
      <div class="block lg:hidden mr-4">
        <button
          @click="toggle"
          class="
            flex
            items-center
            px-3
            py-2
            border
            rounded
            text-teal-lighter
            border-teal-light
            hover:text-gray-800 hover:border-gray-700
          "
        >
          <font-awesome-icon :icon="['fas', 'bars']" v-if="!open" />
          <font-awesome-icon :icon="['fas', 'times']" v-else />
          <!-- <svg class="fill-current h-3 w-3"
        viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg> -->
        </button>
      </div>
    </div>
    <div
      :class="open ? 'block' : 'invisible'"
      class="
        w-full
        items-center
        w-auto
        bg-gray-300
        lg:hidden
        z-50
        absolute
        top-50
        left-0
        opacity-95
        border-b border-gray-400
      "
    >
      <div class="text-sm py-4">
        <ul>
          <li
            class="py-1 ml-6 font-bold"
            v-for="(link, index) in NavLinks"
            :key="index"
          >
            <router-link :to="link">{{ getTitle(link) }}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { useWindowSize } from "vue-window-size";
import { authComputed } from "../store/helpers.js";
const { width } = useWindowSize();
export default {
  props: {
    label: {
      type: String,
      default: "",
    },
    NavLinks: {
      type: Array,
      default: () => [
        "About",
        "Research",
        "Gallery",
        "Testimonials",
        "WhatWeOffer",
        "Shop",
        "MediaBlogs",
        "Contact",
      ],
    },
  },
  data() {
    return {
      open: false,
      windowWidth: width,
    };
  },
  computed: {
    ...authComputed,
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
  },
  unmounted() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    logout() {
      this.$store.dispatch("user/logout");
      this.$router.push("Login");
    },
    toggle() {
      this.open = !this.open;
    },
    handleResize() {
      if (this.windowWidth > 1024) {
        this.open = false;
      }
    },
    getTitle(routeName) {
      const route = this.$router.resolve({
        name: routeName,
      });
      if (route && route.meta.title) {
        return route.meta.title.toUpperCase();
      }
      return null;
    },
  },
};
</script>
