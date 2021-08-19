<template>
  <div>
    <NavVari :NavLinks="navLinks" />
    <div class="home bg-bgblue h-screen font-roboto border">
      <div class="bg-headerblue py-8 pl-6">
        <span class="text-white"><h2>Planning Home</h2></span>
      </div>
      <div class="grid grid-cols-1 w-6/12 mt-12 gap-6 m-auto">
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
          <div class="flex w-full border border-red-700">
            <div class="flex-shrink">
              <h2
                class="
                  w-full
                  h-10
                  pl-4
                  text-gray-600
                  pt-2
                  text-lg
                  xl:text-lg
                  2xl:text-lg
                "
              >
                {{ resource.name }}
              </h2>
            </div>

            <div class="flex-grow text-right">Arrow</div>
          </div>
          <div
            v-for="item in resource.resourceContent"
            :key="item.id"
            class="cursor-pointer bg-white"
          >
            <div class="flex w-full border border-red-700">
              <div class="flex-shrink">
                <h2
                  class="
                    w-full
                    h-10
                    pl-4
                    text-gray-600
                    pt-2
                    text-lg
                    xl:text-lg
                    2xl:text-lg
                  "
                >
                  {{ item.name }}
                </h2>
              </div>

              <div class="flex-grow flex justify-end">
                <div class="">Button 1</div>
                <div>Button 1</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavVari from "../components/NavVari.vue";
//import { ApiService } from "@/services/apiService";
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
    //InlineSvg,
  },
};
</script>
