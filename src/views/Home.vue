<template>
  <div>
    <NavVari :NavLinks="navLinks" />
    <div class="home bg-bgblue h-screen font-roboto">
      <div class="bg-headerblue py-8 pl-6">
        <span class="text-white"><h2>Planning Home</h2></span>
      </div>
      <div class="grid grid-cols-2 lg:grid-cols-3 w-9/12 mt-12 gap-6 m-auto">
        <div class="col-span-2 lg:col-span-3 h-20">
          <h2
            class="font-bold text-blue-600 text-center text-5xl w-full h-screen"
          >
            Introduction to Tagtiv8
          </h2>
        </div>
        <template v-if="!loaded">
          <div v-for="i in 3" :key="i">
            <ContentLoader
              viewBox="0 0 250 110"
              :speed="2"
              primaryColor="#b2e0fe"
              secondaryColor="#ecebeb"
            >
              <rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
              <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
              <rect x="0" y="56" rx="3" ry="3" width="410" height="6" />
              <rect x="0" y="72" rx="3" ry="3" width="380" height="6" />
              <rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
              <circle cx="20" cy="20" r="20" />
            </ContentLoader>
          </div>
        </template>
        <div
          v-for="(subject, index) in subjects"
          :key="index"
          @click="setPlan(subject)"
          class="cursor-pointer relative"
          v-else
        >
          <inline-svg
            :src="require(`@/assets/images/${subject.image}.svg`)"
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
            {{ subject.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavVari from "../components/NavVari.vue";
import InlineSvg from "vue-inline-svg";
import VueResizeText from "vue3-resize-text";
import { ContentLoader } from "vue-content-loader";
export default {
  directives: {
    ResizeText: VueResizeText.ResizeText,
  },
  data() {
    return {
      navLinks: ["Plans", "MainSite", "Account"],
      subjects: [],
      loaded: false,
    };
  },
  created() {
    this.getSubjects();
  },
  methods: {
    getSubjects() {
      this.$store.dispatch("user/getSubjects").then((subjects) => {
        this.subjects = subjects;
        this.loaded = true;
      });
    },
    setPlan(subject) {
      this.$store
        .dispatch("user/setPlan", { name: subject.name, id: subject.id })
        .then((error) => {
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
    ContentLoader,
  },
};
</script>
