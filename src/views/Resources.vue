<template>
  <div>
    <NavVari :NavLinks="navLinks" />
    <div class="home bg-bgblue h-screen font-roboto border">
      <div class="bg-headerblue py-8 pl-6">
        <span class="text-white"><h2>Planning Home</h2></span>
      </div>
      <div class="grid grid-cols-1 w-6/12 mt-12 gap-2 m-auto">
        <div class="col-span-1 h-12">
          <h3 class="font-bold text-gray-600 text-center text-xl w-full">
            Maths Resources
          </h3>
        </div>
        <div
          v-for="resource in resourceData"
          :key="resource.id"
          class="cursor-pointer bg-gridrowblue"
        >
          <ResourceItem :resource="resource" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavVari from "../components/NavVari.vue";
import ResourceItem from "../components/ResourceItem.vue";
export default {
  data() {
    return {
      navLinks: ["Resources", "MainSite", "Account"],
      resourceData: [],
    };
  },
  created() {
    this.getResources();
  },
  methods: {
    getResources() {
      this.$store.dispatch("user/getResources").then((resources) => {
        this.resourceData = resources;
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
