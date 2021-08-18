<template>
  <div>
    <NavVari :NavLinks="navLinks" />
    <div class="home bg-bgblue h-screen font-roboto">
      <div class="bg-headerblue py-8 pl-6">
        <span class="text-white"><h2>Planning Home</h2></span>
      </div>
      <div class="grid grid-cols-2 lg:grid-cols-3 w-9/12 mt-12 gap-6 m-auto">
        <div class="col-span-2 lg:col-span-3 h-20">
          <h2 class="font-bold text-blue-600 text-center text-5xl w-full">
            Introduction to Tagtiv8
          </h2>
        </div>
        <div
          v-for="(plan, index) in plans"
          :key="index"
          @click="setPlan(plan.name)"
          class="cursor-pointer relative"
        >
          <inline-svg
            :src="require(`@/assets/images/${plan.image}.svg`)"
          ></inline-svg>
          <div
            class="
              absolute
              top-1/3
              w-full
              h-12
              text-center text-white
              pt-2
              font-bold
            "
            v-resize-text="{
              ratio: 1.5,
              delay: 0,
            }"
          >
            {{ plan.name }}
          </div>
          <!-- <h2
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
            {{ plan.name }}
          </h2> -->
        </div>
        <!-- <BaseSvgIcon name="blue-ribbon"/> -->
        <!-- <div  v-for="(plan, index) in plans" :key="index" @click="setPlan(plan.name)">
      <BaseSvgIcon :name="plan.name"/>
      </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import NavVari from "../components/NavVari.vue";
import InlineSvg from "vue-inline-svg";
import VueResizeText from "vue3-resize-text";

export default {
  directives: {
    ResizeText: VueResizeText.ResizeText,
  },
  data() {
    return {
      navLinks: ["Plans", "MainSite", "Account"],
      plans: [
        { name: "English", image: "blue-ribbon" },
        { name: "Physical Challenges", image: "orange-ribbon" },
        { name: "Tree Tag Orienteering", image: "green-ribbon" },
        { name: "Maths", image: "red-ribbon" },
        { name: "Thinking Challenges", image: "lightgreen-ribbon" },
        { name: "Miscellaneous Magic Moves", image: "black-ribbon" },
        { name: "Foundation Subjects", image: "royalblue-ribbon" },
        { name: "Blended Challenges", image: "pink-ribbon" },
        { name: "Create Your Own Games", image: "purple-ribbon" },
      ],
    };
  },
  methods: {
    setPlan(planName) {
      this.$store.dispatch("user/setPlan", { planName }).then((error) => {
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
