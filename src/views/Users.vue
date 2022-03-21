<template>
  <teleport to="title"> Users| Active Learning Games</teleport>
  <ModalDialog :show="showModal" @closeModal="closeModal">
    <UserLogons :userId="userId" @deleteUser="deleteUser" />
  </ModalDialog>
  <ModalDialog :show="showDetailModal" @closeModal="closeDetailModal">
    <UserDetail
      :userId="userId"
      @deleteUser="deleteUser"
      @closeDetailModal="closeUpdateModal"
    />
  </ModalDialog>
  <ModalDialog :show="showPasswordModal" @closeModal="closePasswordModal">
    <ChangePassword
      :user="userDetail"
      @closePasswordModal="closePasswordModal"
    />
  </ModalDialog>
  <div>
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
        <div class="mt-2 m-auto">
          <div class="pl-1">
            <h1 class="font-bold text-gray-600 text-left pt-2 text-2xl">
              Users
            </h1>
          </div>
        </div>
      </div>
      <!-- <div class="container text-center mx-auto p-4">
        <div class="flex justify-center rounded-lg text-lg" role="group">
          <button
            class="
              bg-white
              text-blue-500
              hover:bg-blue-500 hover:text-white
              border border-r-0 border-blue-500
              rounded-l-lg
              px-4
              py-2
              mx-0
              outline-none
              focus:shadow-outline
            "
            @click="filterAttrs('active')"
          >
            Active
          </button>
          <button
            class="
              bg-white
              text-blue-500
              hover:bg-blue-500 hover:text-white
              border border-blue-500
              px-4
              py-2
              mx-0
              outline-none
              focus:shadow-outline
            "
            @click="filterAttrs('subscribed')"
          >
            Subscribed
          </button>
          <button
            class="
              bg-white
              text-blue-500
              hover:bg-blue-500 hover:text-white
              border border-l-0 border-blue-500
              rounded-r-lg
              px-4
              py-2
              mx-0
              outline-none
              focus:shadow-outline
            "
            @click="filterAttrs('admin')"
          >
            Admin
          </button>
        </div>
      </div> -->
      <div class="flex flex-wrap w-10/12 pl-2">
        <div class="flex flex-grow">
          <div class="flex-initial w-28 mr-2">
            <BaseButton type="button" @click="sortAz('firstName')" class="flex">
              <div class="font-bold pt-1">First Name</div>
              <div class="ml-2 mt-1">
                <font-awesome-icon
                  :icon="['fas', sortIcon('firstName')]"
                  class="text-gray-600 text-2xl"
                />
              </div>
            </BaseButton>
          </div>
          <div class="flex-initial w-32">
            <BaseButton
              type="button"
              :disabled="false"
              @click="sortAz('lastName')"
              class="flex"
            >
              <div class="font-bold pt-1">Last Name</div>
              <div class="ml-2 mt-1">
                <font-awesome-icon
                  :icon="['fas', sortIcon('lastName')]"
                  class="text-gray-600 text-2xl"
                />
              </div>
            </BaseButton>
          </div>
          <div class="flex-initial w-80 pl-0">
            <BaseButton
              type="button"
              :disabled="false"
              @click="sortAz('username')"
              class="flex"
            >
              <div class="font-bold pt-1">Email</div>
              <div class="ml-2 mt-1">
                <font-awesome-icon
                  :icon="['fas', sortIcon('username')]"
                  class="text-gray-600 text-2xl"
                />
              </div>
            </BaseButton>
          </div>
          <div class="flex-initial w-52 ml-8">
            <BaseButton
              type="button"
              :disabled="false"
              @click="sortAz('school')"
              class="flex"
            >
              <div class="font-bold pt-1">School</div>
              <div class="ml-2 mt-1">
                <font-awesome-icon
                  :icon="['fas', sortIcon('school')]"
                  class="text-gray-600 text-2xl"
                />
              </div>
            </BaseButton>
          </div>
          <div class="flex-initial mr-2 ml-8">
            <BaseButton
              type="button"
              :disabled="false"
              @click="sortAz('isSubscribed')"
              class="flex"
            >
              <div class="font-bold pt-1 text-yellow-500">Subscribed</div>
              <div class="ml-2 mt-1">
                <font-awesome-icon
                  :icon="['fas', sortIcon('isSubscribed')]"
                  class="text-gray-600 text-2xl"
                />
              </div>
            </BaseButton>
          </div>
          <div class="flex-initial">
            <BaseButton
              type="button"
              :disabled="false"
              @click="sortAz('isAdmin')"
              class="flex"
            >
              <div class="font-bold pt-1 text-green-500">Admin</div>
              <div class="ml-2 mt-1">
                <font-awesome-icon
                  :icon="['fas', sortIcon('isAdmin')]"
                  class="text-gray-600 text-2xl"
                />
              </div>
            </BaseButton>
          </div>
          <div class="flex-grow ml-6">
            <BaseButton
              type="button"
              :disabled="false"
              @click="sortAz('logonsCount')"
              class="flex"
            >
              <div class="mt-1">
                <font-awesome-icon
                  :icon="['fas', sortIcon('logonsCount')]"
                  class="text-gray-600 text-2xl"
                />
              </div>
              <div class="font-bold pt-1 ml-2 text-blue-600">Logons</div>
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
      <div v-for="user in usersPage" :key="user.id" class="my-1">
        <User
          :user="user"
          @showUserLogons="showUserLogons"
          @showUserDetail="showUserDetail"
          @showChangePassword="showChangePassword"
          @deleteUser="deleteUser"
        />
      </div>
      <div>
        <div class="container flex justify-center mx-auto mt-8">
          <ul class="flex">
            <li>
              <button
                class="
                  h-10
                  px-5
                  text-gray-600
                  bg-white
                  border border-r-0 border-gray-600
                "
                :disabled="skipCount == 0"
                :class="
                  skipCount == 0
                    ? 'text-blue-200'
                    : 'text-gray-600 hover:bg-gray-100'
                "
                @click="skipCount -= 1"
              >
                Prev
              </button>
            </li>

            <li v-for="(page, index) in totalPages" :key="index">
              <button
                class="
                  h-10
                  px-5
                  text-gray-600
                  bg-white
                  border border-r-0 border-gray-600
                "
                :class="
                  index == skipCount
                    ? 'bg-blue-200'
                    : 'text-gray-600 hover:bg-gray-100'
                "
                @click="skipCount = index"
              >
                {{ index + 1 }}
              </button>
            </li>
            <li>
              <button
                class="h-10 px-5 text-gray-600 bg-white border border-gray-600"
                :disabled="skipCount + 1 >= totalPages"
                :class="
                  skipCount + 1 >= totalPages
                    ? 'text-blue-200'
                    : 'text-gray-600 hover:bg-gray-100'
                "
                @click="skipCount += 1"
              >
                Next
              </button>
            </li>
          </ul>
        </div>
      </div>
    </BaseLayout>
  </div>
</template>

<script>
import User from "../components/User.vue";
import _ from "lodash";
import { mapGetters } from "vuex";
import { ContentLoader } from "vue-content-loader";
import ModalDialog from "../components/ModalDialog.vue";
import UserLogons from "../components/UserLogons.vue";
import UserDetail from "../components/UserDetail.vue";
import ChangePassword from "../components/ChangePassword.vue";
export default {
  name: "Users",
  data() {
    return {
      navLinks: ["MainSite"],
      users: [],
      filteredUsers: [],
      usersPage: [],
      userDetail: {},
      // userLogons: {},
      sortOrder: "asc",
      sortItem: "",
      loaded: false,
      showModal: false,
      showDetailModal: false,
      showPasswordModal: false,
      takeCount: 20,
      skipCount: 0,
      totalPages: 0,
      userId: 0,
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
  watch: {
    skipCount: function () {
      this.goPage();
    },
  },
  methods: {
    // filterAttrs() {},
    goPage() {
      const context = this;
      const dropCount = this.skipCount * context.takeCount;
      this.usersPage = _.take(
        _.drop(context.users, dropCount),
        context.takeCount
      );
    },
    closeModal() {
      this.userDetail = {};
      this.showModal = false;
    },
    closeUpdateModal(obj) {
      let user = _.find(this.users, { id: obj.id });
      user.school = obj.school;
      user.isAdmin = obj.isAdmin;
      user.username = obj.username;
      this.userDetail = {};
      this.showDetailModal = false;
    },
    closeDetailModal() {
      this.showDetailModal = false;
    },
    closePasswordModal() {
      this.showPasswordModal = false;
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
            this.usersPage = _.take(this.users, this.takeCount);
            this.totalPages = Math.ceil(this.users.length / 20);
          }
        })
        .catch(() => {
          this.$router.push("Home");
        });
    },
    showChangePassword(user) {
      this.showPasswordModal = true;
      this.userDetail = user;
    },
    showUserLogons(userId) {
      this.showModal = true;
      this.userId = userId;
    },
    showUserDetail(userId) {
      this.userId = userId;
      this.showDetailModal = true;
    },
    deleteUser(userId) {
      _.remove(this.users, {
        id: userId,
        //id: userId.userId,
      });
      this.goPage();
    },
    sortAz(sortItem) {
      this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
      this.sortItem = sortItem;
      this.users = _.orderBy(this.users, [sortItem], [this.sortOrder]);
      this.goPage();
    },
    sortIcon(sortItem) {
      if (this.sortItem == sortItem) {
        if (this.sortOrder == "asc") {
          return "sort-down";
        } else {
          return "sort-up";
        }
      }
      return "sort";
    },
    sorted(sortItem) {
      return this.sortItem == sortItem && this.sortOrder === "asc";
    },
  },
  components: {
    ChangePassword,
    UserLogons,
    User,
    ContentLoader,
    ModalDialog,
    UserDetail,
  },
};
</script>
