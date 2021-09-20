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
                sm:ml-0
              "
              @click="$router.push('home')"
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
          Planning Home / {{ plan.subject.name }} / Age Range
        </div>
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
                w-full
                h-screen
                text-5xl
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
                text-3xl
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
import { mapGetters } from "vuex";
export default {
  name: "AgeRange",
  data() {
    return {
      navLinks: ["MainSite"],
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
  computed: {
    ...mapGetters(["plan"]),
  },
  components: {
    NavVari,
    InlineSvg,
  },
};
</script>
