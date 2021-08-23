<template>
  <div>
    <NavVari :NavLinks="navLinks" />
    <!-- <div class="m-auto w-6/12 mt-12" v-if="loading">
      <ContentLoader
        viewBox="0 0 250 110"
        :speed="2"
        primaryColor="#b2e0fe"
        secondaryColor="#ecebeb"
      >
        <rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
        <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
        <rect x="0" y="56" rx="3" ry="3" width="410" height="6" />
        <rect x="0" y="72" rx="3" ry="3" width="380" height="6" />
        <rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
        <circle cx="20" cy="20" r="20" />
      </ContentLoader>
    </div> -->
    <div class="home bg-bgblue h-screen font-roboto border">
      <div class="bg-headerblue py-8 pl-6">
        <span class="text-white"><h2>Planning Home</h2></span>
      </div>
      <div class="grid grid-cols-2 w-6/12 mt-12 gap-2 m-auto">
        <div class="pl-1">
          <h3 class="font-bold text-gray-600 text-left pt-2 text-lg">
            Maths Resources
          </h3>
        </div>
        <div class="flex justify-end pt-2 pr-1">
          <div class="mr-3">Sort:</div>
          <div>
            <BaseButton
              type="button"
              :disabled="false"
              @click="sortAz()"
              v-if="!loggedIn"
            >
              A-Z
            </BaseButton>
          </div>
          <div class="mx-2">|</div>
          <div>
            <BaseButton
              type="button"
              :disabled="false"
              @click="sortFavorites()"
              v-if="!loggedIn"
            >
              Favorites
            </BaseButton>
          </div>
        </div>

        <div
          v-for="resource in resourceData"
          :key="resource.id"
          class="col-span-2"
        >
          <ResourceItem :resource="resource" loaded="loaded" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavVari from "../components/NavVari.vue";
import ResourceItem from "../components/ResourceItem.vue";
import _ from "lodash";
export default {
  data() {
    return {
      navLinks: ["Resources", "MainSite", "Account"],
      resourceData: [],
      sortOrder: "asc",
      loaded: false,
    };
  },
  created() {
    this.getResources();
  },
  methods: {
    getSort() {
      this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
    },
    sortAz() {
      this.getSort();
      this.resourceData = _.orderBy(
        this.resourceData,
        ["name"],
        [this.sortOrder]
      );
    },
    sortFavorites() {
      this.getSort();
      this.resourceData = _.orderBy(
        this.resourceData,
        [
          "resourceContent",
          function (o) {
            return o.isFavorite;
          },
        ],
        [this.sortOrder]
      );
    },
    getResources() {
      this.$store
        .dispatch("user/getResources")
        .then((resources) => {
          this.resourceData = _.orderBy(resources, ["name"], ["asc"]);
          this.loaded = true;
        })
        .catch(() => {
          this.$router.push("Home");
        });
    },
  },
  name: "Home",
  components: {
    NavVari,
    ResourceItem,
  },
};
</script>
