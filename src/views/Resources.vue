<template>
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
        <div class="grid grid-cols-2 mt-12 gap-2 m-auto">
          <div class="col-span-2 flex flex-wrap w-full">
            <div class="pl-1">
              <h3
                class="font-bold text-gray-600 text-left pt-2 text-lg"
                v-show="resourceData.length"
              >
                {{ plan.subject.name }} Resources
              </h3>
            </div>
            <div class="flex justify-end flex-grow pt-2 pr-1">
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
          <div v-else class="col-span-2">
            <div v-if="intro">
              <ResourceItem
                :resource="intro"
                :intro="true"
                :isOpen="!resourceData.length"
                @setContent="setResourceContent($event)"
              />
            </div>
            <div
              v-for="resource in resourceData"
              :key="resource.id"
              class="my-1"
            >
              <ResourceItem
                :resource="resource"
                :isView="isView"
                @setContent="setResourceContent($event)"
              />
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  </div>
</template>

<script>
import NavVari from "../components/NavVari.vue";
import ResourceItem from "../components/ResourceItem.vue";
import _ from "lodash";
import { mapGetters } from "vuex";
import { ContentLoader } from "vue-content-loader";
export default {
  name: "Resources",
  data() {
    return {
      navLinks: ["MainSite"],
      resourceData: [],
      sortOrder: "asc",
      loaded: false,
      intro: null,
      isView: false,
    };
  },
  created() {
    this.loaded = false;
    this.createCrumbs();
    this.getResources();
  },
  methods: {
    createCrumbs() {
      this.crumbs = [
        { name: "Planning Home", route: "home" },
        { name: this.plan.subject.name, route: "" },
        { name: this.plan.ageRange, route: "" },
      ];
    },
    setResourceContent({ resourceObj, resourceType }) {
      this.$store
        .dispatch("user/setResourceContent", { resourceObj })
        .then(() => {
          this.$router.push({ name: resourceType });
        })
        .catch(() => {
          //this.$router.push("Home");
        });
    },
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
          if (resources) {
            this.loaded = true;
            let intr = _.remove(resources, function (n) {
              return n.name.includes("Introduction");
            });
            if (intr.length) {
              this.intro = intr[0];
            }
            if (this.plan.subject.name == "Sustain") {
              this.isView = true;
            }
            const match = _.filter(resources, (car) => {
              return car.resourceContent.length;
            });
            this.resourceData = _.orderBy(match, ["name"], ["asc"]);
            // this.resourceData = _.sortBy(match, function (emp) {
            //   return _.chain(emp)
            //     .sortBy("name")
            //     .get("resourceContent")
            //     .sortBy("name")
            //     .map("name")
            //     .first()
            //     .value();
            // });
          }
        })
        .catch(() => {
          this.$router.push("Home");
        });
    },
  },
  computed: {
    ...mapGetters(["plan"]),
  },
  components: {
    NavVari,
    ResourceItem,
    ContentLoader,
  },
};
</script>
