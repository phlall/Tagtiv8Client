<template>
  <div>
    <NavVari :NavLinks="navLinks" />
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
          <ResourceItem
            :resource="resource"
            loaded="loaded"
            @setContent="setResourceContent($event)"
          />
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
  name: "Lesson Plan",
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
    setResourceContent({ resourceObj, resourceType }) {
      //let res = resourceObj;
      alert(JSON.stringify(resourceObj));
      this.$store
        .dispatch("user/setResourceContent", { resourceObj })
        .then(() => {
          if (resourceType === "lessonPlan") {
            this.$router.push("lessonplan");
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
  components: {
    NavVari,
    ResourceItem,
  },
};
</script>
