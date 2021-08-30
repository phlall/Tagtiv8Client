<template>
  <div>
    <NavVari :NavLinks="navLinks" />
    <BaseLayout outerClass="bg-headerblue text-gray-700">
      <div class="bg-headerblue py-8 pl-6">
        <span class="text-white"><h2>Planning Home</h2></span>
      </div>
    </BaseLayout>
    <BaseLayout outerClass="bg-bgblue text-gray-700 border-b border-gray-700">
      <div class="h-screen">
        <div
          class="
            grid grid-cols-1
            md:grid-cols-2 md:max-w-screen-md md:max-w-3xl
            sm:max-w-md
            max-w-md
            pt-12
            gap-6
            mx-12
            sm:m-auto
          "
        >
          <div class="md:col-span-2 lg:col-span-2 h-20">
            <h2
              class="
                font-bold
                text-blue-600 text-center
                md:text-4xl
                text-3xl
                w-full
                h-screen
              "
            >
              Select age range
            </h2>
          </div>
          <div
            v-for="(ageRange, index) in ageGroups"
            :key="index"
            @click="setAgeGroup(ageRange.title)"
            class="cursor-pointer relative"
          >
            <inline-svg
              :src="require(`@/assets/images/${ageRange.img}.svg`)"
            ></inline-svg>
            <h2
              class="
                absolute
                top-1/3
                w-full
                h-12
                text-center text-white
                pt-2
                text-lg
                xl:text-2xl
                2xl:text-3xl
                font-bold
              "
            >
              {{ ageRange.title }}
            </h2>
          </div>
        </div>
      </div>
    </BaseLayout>
  </div>
</template>

<script>
import NavVari from "../components/NavVari.vue";
import InlineSvg from "vue-inline-svg";
import { AgeGroups } from "../assets/js/utils.js";
export default {
  data() {
    return {
      navLinks: ["Resources", "MainSite", "Account"],
      ageGroups: AgeGroups(),
    };
  },
  methods: {
    setAgeGroup(ageRange) {
      this.$store.dispatch("user/setAgeRange", { ageRange }).then((error) => {
        if (!error) {
          this.$router.push({ name: "Resources" });
        } else {
          this.$router.push({ name: "Login" });
        }
      });
    },
  },
  name: "Home",
  components: {
    NavVari,
    InlineSvg,
  },
};
</script>
