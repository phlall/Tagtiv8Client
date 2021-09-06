<template>
  <div>
    <NavVari :NavLinks="navLinks" />
    <BaseLayout outerClass="bg-headerblue text-gray-700">
      <div class="bg-headerblue py-4 pl-6">
        <span class="text-white text-nav"><h2>Planning Home</h2></span>
      </div>
    </BaseLayout>
    <BaseLayout outerClass="bg-bgblue text-gray-700 border-b border-gray-700">
      <div class="h-screen">
        <div class="mb-16 md:mb-8 mt-6 flex justify-center h-32">
          <div
            class="
              cursor-pointer
              relative
              sm:mx-8
              md:mx-6
              lg:mx-1
              md:w-96
              sm:w-10/12
              lg:w-96
              w-11/12
              m-auto
            "
          >
            <inline-svg :src="require(`@/assets/images/white-ribbon.svg`)" />
            <div
              class="
                absolute
                top-1/3
                h-16
                mt-0
                px-4
                text-center text-headerblue
                font-bold
                text-2xl
                pt-1
                w-full
                px-6
                sm:pt-2
              "
            >
              Introduction to Tagtiv8
            </div>
          </div>
        </div>
        <div
          class="
            grid grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3 lg:max-w-screen-lg
            md:max-w-3xl
            sm:max-w-md
            max-w-xl
            mt-6
            gap-6
            m-auto
          "
        >
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
            class="cursor-pointer relative mx-12 sm:mx-8 md:mx-6 lg:mx-2"
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
    </BaseLayout>
  </div>
</template>

<script>
import NavVari from "../components/NavVari.vue";
import InlineSvg from "vue-inline-svg";
import VueResizeText from "vue3-resize-text";
import { ContentLoader } from "vue-content-loader";
export default {
  name: "Home",
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
  components: {
    NavVari,
    InlineSvg,
    ContentLoader,
  },
};
</script>
