<template>
  <div>
    <NavVari :NavLinks="navLinks" />
    <BaseLayout outerClass="bg-headerblue text-gray-700 font-roboto">
      <div class="bg-headerblue py-4 flex">
        <div>
          <span class="text-white leading-2"
            ><BaseButton
              type="submit"
              :disabled="false"
              class="text-white text-nav bg-red-500 font-bold pt-2 pb-1 px-6"
              @click="$router.push('ageRange')"
            >
              <font-awesome-icon
                :icon="['fas', 'caret-left']"
                class="text-xl"
              />
              <span class="inline-block align-top ml-2"> Back </span>
            </BaseButton></span
          >
        </div>
        <div class="pt-2 text-nav text-white ml-4">
          Planning Home / {{ plan.subject.name }} / {{ plan.ageRange }}
        </div>
      </div>
    </BaseLayout>
    <BaseLayout outerClass="bg-bgblue text-gray-700 border-b border-gray-700">
      <div class="bg-bgblue h-screen font-roboto border">
        <div class="grid grid-cols-2 mt-12 gap-2 m-auto">
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
            <ResourceItem
              :resource="resource"
              loaded="loaded"
              @setContent="setResourceContent($event)"
            />
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
export default {
  name: "Lesson Plan",
  data() {
    return {
      navLinks: ["MainSite"],
      resourceData: [],
      sortOrder: "asc",
      loaded: false,
    };
  },
  created() {
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
          this.resourceData = _.orderBy(resources, ["name"], ["asc"]);
          this.loaded = true;
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
  },
};
</script>
