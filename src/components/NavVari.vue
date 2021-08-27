<template>
  <div>
    <BaseLayout outerClass="bg-white text-gray-700 border-b border-gray-700">
      <div class="flex flex-wrap">
        <div>
          <img src="@/assets/images/tagtiv8logo.png" class="w-32 p-0" />
        </div>
        <div class="flex-grow pt-8">
          <div class="hidden lg:block font-bold text-right text-nav">
            <router-link
              class="px-2"
              v-for="(link, index) in NavLinks"
              :key="index"
              :to="link"
              >{{ getTitle(link) }}</router-link
            >

            <BaseButton
              type="submit"
              :class="'bg-buttonblue'"
              :disabled="false"
              class="text-white h-8 bg-indigo-400 py-1 px-3 ml-2 font-bold"
              @click="$router.push('Login')"
              v-if="!loggedIn"
            >
              LOG IN
            </BaseButton>
            <BaseButton
              type="submit"
              :class="'bg-buttonblue'"
              :disabled="false"
              class="text-white h-8 bg-indigo-400 px-3 py-1 ml-2 font-bold"
              something="else"
              @click="logout"
              v-else
            >
              LOG OUT
            </BaseButton>
          </div>
          <div class="block lg:hidden font-bold text-right text-smlg">
            <button
              @click="toggle"
              class="
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
            </button>
          </div>
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
      <div class="text-right justify-end"></div>
    </BaseLayout>
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
