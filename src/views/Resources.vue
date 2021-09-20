<template>
  <div>
    <NavVari :NavLinks="navLinks" />
    <BaseLayout outerClass="bg-headerblue text-gray-700 font-roboto">
      <div class="bg-headerblue py-4 flex ml-2 sm:ml-0">
        <div class="flex-none">
          <span class="text-white leading-2"
            ><BaseButton
              type="submit"
              :disabled="false"
              class="
                text-white text-nav
                w-20
                h-10
                bg-red-500
                font-bold
                pt-1
                m-auto
                sm:ml-0
              "
              @click="$router.push('agerange')"
            >
              <font-awesome-icon
                :icon="['fas', 'caret-left']"
                class="text-xl"
              />
              <span class="inline-block align-top ml-2"> Back </span>
            </BaseButton></span
          >
        </div>
        <div class="pt-2 text-nav text-white ml-4 flex-grow">
          Planning Home / {{ plan.subject.name }} / {{ plan.ageRange }}
        </div>
      </div>
    </BaseLayout>
    <BaseLayout outerClass="bg-bgblue text-gray-700 border-b border-gray-700">
      <div class="bg-bgblue mb-64 font-roboto border">
        <div class="grid grid-cols-2 mt-12 gap-2 m-auto">
          <div class="pl-1">
            <h3 class="font-bold text-gray-600 text-left pt-2 text-lg">
              {{ plan.subject.name }} Resources
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
          <div v-if="!loaded" class="col-span-2">
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
            <ResourceItem
              v-if="intro != null"
              :resource="intro"
              :intro="true"
              @setContent="setResourceContent($event)"
            />
            <div
              v-for="resource in resourceData"
              :key="resource.id"
              class="my-1"
            >
              <ResourceItem
                :resource="resource"
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
      intro: {},
    };
  },
  created() {
    this.loaded = false;
    this.getResources();
  },
  methods: {
    setResourceContent({ resourceObj, resourceType }) {
      this.$store
        .dispatch("user/setResourceContent", { resourceObj })
        .then(() => {
          if (resourceType === "lessonPlan") {
            this.$router.push("lesson-plan");
          } else {
            this.$router.push("worksheet");
          }
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
            this.intro = intr[0];
            // this.resourceData.unshift(info[0]);

            const match = _.filter(resources, (car) => {
              return car.resourceContent.length;
            });
            this.resourceData = _.orderBy(match, ["name"], ["asc"]);
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
