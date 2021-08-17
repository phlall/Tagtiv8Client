<template>
<div>
 <NavVari :NavLinks="navLinks" />
  <div class="home bg-blue-200 h-screen">
    <div class="bg-blue-700 py-8 pl-6"><span class="text-white"><h2>Planning Home </h2></span>  </div>
    <div class="grid grid-cols-3 w-10/12 ml-16 mt-12 gap-6">
    <div class="col-span-3 h-20 bg-white flex items-center pl-12 shadow-lg mb-2">
      <h2 class="align-bottom font-bold">Introduction to Tagtiv8</h2></div>
      <div v-for="(plan, index) in plans" :key="index" @click="setPlan(plan.name)"
          class="h-20 bg-white flex items-center pl-12 shadow-lg hover:shadow-inner hover:bg-gray-100 cursor-pointer">
          <h2 class="align-bottom">{{ plan.name }}</h2>
      </div>
  </div>
  </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "../components/HelloWorld.vue";
import NavVari from "../components/NavVari.vue";

export default {
  data() {
    return {
      navLinks: [
        "Plans",
        "MainSite",
        "Account",
      ],
      plans: [
        { name: "English", image: "English" },
        { name: "Physical Challenges", image: "Physical Challenges" },
        { name: "Tree Tag Orienteering", image: "Tree Tag Orienteering" },
        { name: "Maths", image: "Maths" },
        { name: "Thinking Challenges", image: "Thinking Challenges" },
        { name: "Miscellaneous Magic Moves", image: "Miscellaneous Magic Moves" },
        { name: "Foundation Subjects", image: "Foundation Subjects" },
        { name: "Blended Challenges", image: "Blended Challenges" },
        { name: "Create Your Own Games", image: "Create Your Own Games" },

      ],

    };
  },
  methods: {
    setPlan(planName) {
      this.$store
        .dispatch("user/setPlan", { planName })
        .then((error) => {
          if (!error) {
            this.$router.push({ name: "Home" });
          } else {
            this.$router.push({ name: "Login" });
          }
        });
    },

  },
  name: "Home",
  components: {
    NavVari,
  },
};
</script>
