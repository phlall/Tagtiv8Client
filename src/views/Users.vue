<template>
  <teleport to="title"> Users| Active Learning Games</teleport>
  <ModalDialog :show="showModal" :user="userDetail" @closeModal="closeModal">
  </ModalDialog>
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
    <BaseLayout outerClass="text-gray-700 font-roboto">
      <div class="bg-bgblue my-8 mx-4 sm:mx-0">
        <div class="mt-4 m-auto">
          <div class="pl-1">
            <h3 class="font-bold text-gray-600 text-left pt-2 text-lg">
              Users
            </h3>
          </div>
        </div>
      </div>
      <div class="flex flex-wrap w-10/12 pl-2">
        <div class="flex flex-grow">
          <div class="w-2/12">
            <BaseButton type="button" @click="sortAz('firstName')" class="flex">
              <div class="font-bold pt-1">First Name</div>
              <div class="ml-2">
                <font-awesome-icon
                  :icon="[
                    'fas',
                    sorted('firstName') ? 'caret-down' : 'caret-up',
                  ]"
                  class="text-gray-600 text-3xl"
                />
              </div>
            </BaseButton>
          </div>
          <div class="w-2/12">
            <BaseButton
              type="button"
              :disabled="false"
              @click="sortAz('lastName')"
              class="flex"
            >
              <div class="font-bold pt-1">Last Name</div>
              <div class="ml-2">
                <font-awesome-icon
                  :icon="[
                    'fas',
                    sorted('lastName') ? 'caret-down' : 'caret-up',
                  ]"
                  class="text-gray-600 text-3xl"
                />
              </div>
            </BaseButton>
          </div>
          <div class="w-3/12 pl-3">
            <BaseButton
              type="button"
              :disabled="false"
              @click="sortAz('username')"
              class="flex"
            >
              <div class="font-bold pt-1">Email</div>
              <div class="ml-2">
                <font-awesome-icon
                  :icon="[
                    'fas',
                    sorted('username') ? 'caret-down' : 'caret-up',
                  ]"
                  class="text-gray-600 text-3xl"
                />
              </div>
            </BaseButton>
          </div>
          <div class="w-3/12 pl-8">
            <BaseButton
              type="button"
              :disabled="false"
              @click="sortAz('school')"
              class="flex"
            >
              <div class="font-bold pt-1">School</div>
              <div class="ml-2">
                <font-awesome-icon
                  :icon="['fas', sorted('school') ? 'caret-down' : 'caret-up']"
                  class="text-gray-600 text-3xl"
                />
              </div>
            </BaseButton>
          </div>
          <div class="pl-8">
            <BaseButton
              type="button"
              :disabled="false"
              @click="sortAz('isAdmin')"
              class="flex"
            >
              <div class="font-bold pt-1">Admin</div>
              <div class="ml-2">
                <font-awesome-icon
                  :icon="['fas', sorted('isAdmin') ? 'caret-up' : 'caret-down']"
                  class="text-gray-600 text-3xl"
                />
              </div>
            </BaseButton>
          </div>
          <div class="flex-grow pl-2">
            <BaseButton
              type="button"
              :disabled="false"
              @click="sortAz('logonsCount')"
              class="flex"
            >
              <div class="font-bold pt-1">Logons</div>
              <div class="ml-2">
                <font-awesome-icon
                  :icon="[
                    'fas',
                    sorted('logonsCount') ? 'caret-up' : 'caret-down',
                  ]"
                  class="text-gray-600 text-3xl"
                />
              </div>
            </BaseButton>
          </div>
        </div>
        <div>
          <div></div>
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
        <User :user="user" @showModal="getUserDetail" />
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
import ModalDialog from "../components/ModalDialog.vue";
export default {
  name: "Users",
  data() {
    return {
      navLinks: ["MainSite"],
      users: [],
      userDetail: {},
      sortOrder: "asc",
      sortItem: "",
      loaded: false,
      showModal: false,
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
    closeModal() {
      this.showModal = false;
    },
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
    // setUser(resourceItem, type) {
    //   let resourceObj = {
    //     id: this.resource.id,
    //     ageGroups: this.resource.ageGroups,
    //     name: this.resource.name,
    //     resourceContent: resourceItem,
    //   };
    //   this.$emit("setContent", { resourceObj, resourceType: type });
    // },
    sortAz(sortItem) {
      this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
      this.sortItem = sortItem;
      this.users = _.orderBy(this.users, [sortItem], [this.sortOrder]);
    },
    getUserDetail(userId) {
      this.showModal = true;
      this.$store
        .dispatch("user/getUser", userId)
        .then((user) => {
          this.userDetail = user;
        })
        .catch(() => {
          this.$router.push("Home");
        });
    },
    sorted(sortItem) {
      return this.sortItem == sortItem && this.sortOrder === "asc";
    },
  },
  components: {
    NavVari,
    User,
    ContentLoader,
    ModalDialog,
  },
};
</script>
