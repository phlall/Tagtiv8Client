<template>
  <div :class="outerClass">
    <BaseLayout outerClass="bg-white text-gray-700 font-roboto pb-2">
      <div class="flex flex-wrap">
        <div class="pt-4 pb-1 pl-3 sm:pl-0 w-56">
          <img src="@/assets/images/logo.png" />
        </div>
        <div class="flex-grow pt-8 flex justify-end">
          <div
            v-for="(link, index) in NavLinks"
            :key="index"
            class="lg:inline-block hidden"
          >
            <div v-if="getLinkType(link)">
              <BaseButton
                type="submit"
                :disabled="false"
                class="
                  text-white
                  h-8
                  bg-indigo-400
                  px-3
                  ml-2
                  align-middle
                  font-bold
                  inline-flex
                  items-center
                  bg-buttonblue
                  hover:bg-buttonblueHover
                "
                @click="$router.push('MainSite')"
              >
                <font-awesome-icon
                  :icon="['fas', 'caret-left']"
                  class="text-xl inline-block mr-3"
                />
                {{ getTitle(link) }}
              </BaseButton>
            </div>
            <div v-if="!getLinkType(link) && loggedIn" class="pt-1">
              <router-link class="px-2" :to="link"
                >{{ getTitle(link) }}
              </router-link>
            </div>
          </div>
          <div>
            <BaseButton
              type="submit"
              class="
                text-white
                h-8
                py-1
                px-3
                ml-2
                font-bold
                lg:inline-block
                hidden
                bg-buttonblue
                hover:bg-buttonblueHover
              "
              @click="goPath('Register')"
              v-if="loggedIn && checkUser() && showAdmin()"
            >
              REGISTER
            </BaseButton>
            <BaseButton
              type="submit"
              :class="'bg-buttonblue'"
              class="
                text-white
                h-8
                bg-buttonblue
                py-1
                px-3
                ml-2
                font-bold
                lg:inline-block
                hidden
                hover:bg-buttonblueHover
              "
              @click="goPath('resource-content')"
              v-if="loggedIn && checkUser() && showAdmin()"
            >
              ADD CONTENT
            </BaseButton>
          </div>
          <div class="">
            <!-- <BaseButton
              type="submit"
              :disabled="false"
              class="
                hidden
                lg:inline-block
                text-white
                h-8
                bg-buttonblue
                py-1
                px-3
                ml-2
                font-bold
                hover:bg-buttonblueHover
              "
              @click="$router.push('Login')"
              v-if="!loggedIn"
            >
              LOG IN
            </BaseButton> -->
            <BaseButton
              type="submit"
              :class="'bg-buttonblue'"
              :disabled="false"
              class="
                hidden
                lg:inline-block
                text-white
                h-8
                bg-buttonblue
                px-3
                py-1
                ml-2
                font-bold
                hover:bg-buttonblueHover
              "
              @click="logout"
              v-if="loggedIn"
            >
              LOG OUT
            </BaseButton>
          </div>
          <div
            class="
              block
              lg:hidden
              font-bold
              text-right text-smlg
              ml-2
              pr-2
              sm:pr-0
              w-12
              sm:w-10
            "
            v-if="loggedIn"
          >
            <button
              @click="toggle"
              class="
                border
                rounded
                text-teal-lighter
                border-teal-light
                hover:bg-buttonblueHover hover:border-buttonblue
                h-10
                w-full
                shadow
                bg-buttonblue
                text-white
              "
            >
              <font-awesome-icon :icon="['fas', 'bars']" v-if="!open" />
              <font-awesome-icon :icon="['fas', 'times']" v-else />
            </button>
          </div>
        </div>
      </div>
      <div
        :class="open ? 'block' : 'hidden'"
        class="
          w-full
          bg-gray-200
          lg:hidden
          z-50
          absolute
          top-50
          left-0
          border-b border-gray-400
        "
      >
        <div class="text-sm py-0 bg-buttonblue">
          <ul>
            <li
              class="
                pt-2
                pb-1
                font-bold
                border-t border-b border-blue-300
                bg-buttonblue
                hover:bg-buttonblueHover
              "
              v-for="(link, index) in NavLinks"
              :key="index"
            >
              <div class="flex">
                <div class="flex-grow">
                  <BaseButton
                    type="button"
                    class="
                      font-bold
                      pl-6
                      w-full
                      text-left text-gray-100
                      hover:text-white
                      text-left
                    "
                    @click="goPath('resource-content')"
                    v-if="loggedIn && checkUser()"
                  >
                    <router-link :to="link">{{ getTitle(link) }}</router-link>
                  </BaseButton>
                </div>
                <div>
                  <font-awesome-icon
                    :icon="['fas', 'caret-right']"
                    class="text-xl inline-block mr-3"
                  />
                </div>
              </div>
            </li>
            <li
              class="
                pt-2
                pb-1
                font-bold
                border-b border-blue-300
                bg-buttonblue
                hover:bg-buttonblueHover
              "
              v-if="loggedIn && checkUser() && showAdmin()"
            >
              <div class="flex">
                <div class="flex-grow">
                  <BaseButton
                    type="button"
                    class="
                      font-bold
                      pl-6
                      w-full
                      text-left text-gray-100
                      hover:text-white
                    "
                    @click="goPath('resource-content')"
                  >
                    ADD CONTENT
                  </BaseButton>
                </div>
                <div>
                  <font-awesome-icon
                    :icon="['fas', 'caret-right']"
                    class="text-xl inline-block mr-3"
                  />
                </div>
              </div>
            </li>
            <li
              class="
                pt-2
                pb-1
                font-bold
                border-b border-blue-300
                bg-buttonblue
                hover:bg-buttonblueHover
              "
              v-if="loggedIn && checkUser() && showAdmin()"
            >
              <div class="flex">
                <div class="flex-grow">
                  <BaseButton
                    type="button"
                    class="
                      font-bold
                      pl-6
                      w-full
                      text-left text-gray-100
                      hover:text-white
                    "
                    @click="goPath('Register')"
                    v-if="loggedIn && checkUser() && showAdmin()"
                  >
                    REGISTER
                  </BaseButton>
                </div>
                <div>
                  <font-awesome-icon
                    :icon="['fas', 'caret-right']"
                    class="text-xl inline-block mr-3"
                  />
                </div>
              </div>
            </li>
            <li
              class="
                pt-2
                pb-1
                font-bold
                border-b border-blue-300
                bg-buttonblue
                hover:bg-buttonblueHover
              "
              v-if="loggedIn && checkUser() && showAdmin()"
            >
              <div class="flex">
                <div class="flex-grow">
                  <BaseButton
                    type="button"
                    class="
                      font-bold
                      pl-6
                      w-full
                      text-left text-gray-100
                      hover:text-white
                    "
                    @click="logout"
                    v-if="loggedIn && checkUser()"
                  >
                    LOG OUT
                  </BaseButton>
                </div>
                <div>
                  <font-awesome-icon
                    :icon="['fas', 'caret-right']"
                    class="text-xl inline-block mr-3"
                  />
                </div>
              </div>
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
import { mapGetters } from "vuex";
import _ from "lodash";
const { width } = useWindowSize();
export default {
  props: {
    label: {
      type: String,
      default: "",
    },
    NavLinks: {
      type: Array,
      default: () => ["MainSite"],
    },
    outerClass: {
      type: String,
      default: "",
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
    ...mapGetters(["userToken"]),
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
  },
  unmounted() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    goPath(path) {
      this.$router.push(path);
    },
    checkUser() {
      return _.has(this.userToken, "isAdmin");
    },
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
    showAdmin() {
      const isAdminMeta = this.$route.meta;
      return isAdminMeta.showAdmin;
    },
    getLinkType(routeName) {
      const route = this.$router.resolve({
        name: routeName,
      });
      if (route && route.meta.linkType) {
        return route.meta.linkType == "button";
      }
      return false;
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
