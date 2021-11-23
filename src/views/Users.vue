<template>
  <teleport to="title"> Users| Active Learning Games</teleport>
  <div>
    <NavVari :NavLinks="navLinks" />
    <BaseLayout outerClass="bg-headerblue text-gray-700 font-roboto">
      <div class="bg-headerblue flex flex-wrap py-4 ml-4 sm:ml-0">
        <div class="mr-2">
          <span class="text-white leading-2"
            ><BaseButton
              type="submit"
              :disabled="false"
              class="text-white text-nav bg-red-500 font-bold pt-2 pb-1 px-6"
              @click="$router.push('agerange')"
            >
              <font-awesome-icon
                :icon="['fas', 'caret-left']"
                class="text-xl"
              />
              <span class="hidden sm:inline-block align-top ml-2"> Back </span>
            </BaseButton></span
          >
        </div>
        <div class="flex-grow">
          <BaseBreadcrumbs class="" :crumbs="crumbs" />
        </div>
      </div>
    </BaseLayout>
    <BaseLayout outerClass="text-gray-700">
      <div class="bg-bgblue mb-64 font-roboto mx-4 sm:mx-0">
        <div class="mt-12 m-auto">
          <div class="flex flex-wrap w-full">
            <div class="pl-1">
              <h3 class="font-bold text-gray-600 text-left pt-2 text-lg">
                Users
              </h3>
            </div>
            <div class="flex justify-end flex-grow pt-2 pr-1">
              <div class="mr-3">Sort:</div>
              <div>
                <BaseButton
                  type="button"
                  :disabled="false"
                  @click="sortAz('lastName')"
                  v-if="!loggedIn"
                >
                  Last Name
                </BaseButton>
              </div>
              <div>
                <BaseButton
                  type="button"
                  :disabled="false"
                  @click="sortAz('firstName')"
                  v-if="!loggedIn"
                >
                  First Name
                </BaseButton>
              </div>
              <div class="mx-2">|</div>
            </div>
          </div>
          <div v-if="!loaded" class="col-span-2 mx-4 sm:mx-0">
            <ContentLoader
              viewBox="0 0 250 110"
              :speed="1.2"
              primaryColor="#c2e0fe"
              secondaryColor="#eeeeed"
            >
              <rect x="0" y="4" rx="3" ry="3" height="4" class="w-full" />
              <rect x="0" y="12" rx="3" ry="3" height="4" class="w-9/12" />
              <rect x="0" y="22" rx="3" ry="3" height="4" class="w-full" />
              <rect x="0" y="30" rx="3" ry="3" height="4" class="w-9/12" />
              <rect x="0" y="40" rx="3" ry="3" class="w-full" height="4" />
              <rect x="0" y="48" rx="3" ry="3" height="4" class="w-9/12" />
            </ContentLoader>
          </div>
          <div v-for="user in users" :key="user.id" class="my-1">
            <User :user="user" />
          </div>
        </div>
      </div>
    </BaseLayout>
  </div>
</template>

<script>
import NavVari from "../components/NavVari.vue";
import User from "../components/User.vue";
import _ from "lodash";
import { mapGetters } from "vuex";
import { ContentLoader } from "vue-content-loader";
export default {
  name: "Users",
  data() {
    return {
      navLinks: ["MainSite"],
      users: [],
      sortOrder: "asc",
      loaded: false,
    };
  },
  computed: {
    ...mapGetters(["plan"]),
  },
  created() {
    this.loaded = false;
    this.createCrumbs();
    this.getUsers();
  },
  methods: {
    createCrumbs() {
      this.crumbs = [{ name: "Planning Home", route: "home" }];
    },
    getUsers() {
      this.$store
        .dispatch("user/getUsers")
        .then((users) => {
          if (users) {
            this.loaded = true;
            this.users = _.orderBy(users, ["lastName"], ["asc"]);
          }
        })
        .catch(() => {
          this.$router.push("Home");
        });
    },
    setUser(resourceItem, type) {
      let resourceObj = {
        id: this.resource.id,
        ageGroups: this.resource.ageGroups,
        name: this.resource.name,
        resourceContent: resourceItem,
      };
      this.$emit("setContent", { resourceObj, resourceType: type });
    },
    sortAz(sortItem) {
      this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
      this.users = _.orderBy(this.users, [sortItem], [this.sortOrder]);
    },
  },
  components: {
    NavVari,
    User,
    ContentLoader,
  },
};
</script>
