<template>
  <div>
    <NavVari :NavLinks="navLinks" />
    <div class="home bg-bgblue h-screen font-roboto border">
      <div class="bg-headerblue py-8 pl-6">
        <span class="text-white"><h2>Planning Home</h2></span>
      </div>
      <div class="grid grid-cols-2 w-6/12 mt-12 gap-6 m-auto">
        <div class="col-span-2 h-20">
          <h2 class="font-bold text-blue-600 text-center text-5xl w-full">
            Select Age Range
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
          this.$router.push({ name: "AgeRange" });
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
