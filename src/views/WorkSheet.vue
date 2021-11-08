<template>
  <teleport to="title">
    {{ plan.ageRange }} {{ plan.subject.name }} | Active Learning
    Games</teleport
  >
  <div>
    <div><NavVari /></div>
    <BaseLayout outerClass="bg-headerblue text-gray-700 font-roboto">
      <div class="bg-headerblue py-4 flex flex-wrap ml-2 md:ml-0">
        <div class="mr-2">
          <span class="text-white leading-2"
            ><BaseButton
              type="submit"
              :disabled="false"
              class="text-white text-nav bg-red-500 font-bold pt-2 pb-1 px-6"
              @click="$router.push('resources')"
            >
              <font-awesome-icon
                :icon="['fas', 'caret-left']"
                class="text-xl"
              />
              <span class="hidden sm:inline-block align-top ml-2"> Back </span>
            </BaseButton></span
          >
        </div>
        <div class="flex-grow">
          <BaseBreadcrumbs class="" :crumbs="crumbs" @selected="selected" />
        </div>
      </div>
    </BaseLayout>
    <BaseLayout>
      <div v-if="!loaded" class="mx-4 sm:mx-0 mt-12">
        <ContentLoader
          viewBox="0 0 250 110"
          :speed="1.2"
          primaryColor="#c2e0fe"
          secondaryColor="#eeeeed"
        >
          <rect x="0" y="4" rx="3" ry="3" height="4" class="w-full" />
          <rect x="0" y="12" rx="3" ry="3" height="4" class="w-full" />
          <rect x="0" y="20" rx="3" ry="3" height="4" class="w-9/12" />
        </ContentLoader>
      </div>
      <div class="font-roboto" v-else>
        <div class="flex flex-wrap w-full mt-6 sm:mt-8">
          <div class="pl-2 sm:pl-0 flex-shrink mt-0 sm:mt-3">
            <h3 class="text-left text-xslg sm:text-smlg">
              {{ plan.resource.name }} -
              {{ plan.resource.resourceContent.name }} - Activity Card
            </h3>
          </div>
          <div
            class="
              flex-grow flex flex-wrap
              pt-2
              mr-2
              mt-0
              lg:mr-0
              justify-start
              sm:justify-end
            "
          >
            <div class="pt-1 sm:pt-0">
              <BaseButton
                type="button"
                class="
                  text-white
                  h-8
                  px-3
                  ml-2
                  align-middle
                  inline-flex
                  items-center
                  bg-buttonblue
                  hover:bg-buttonblueHover
                  text-navxs
                  lg:text-xslg
                "
                @click="setFavorite(item)"
              >
                Add to Favorites
                <font-awesome-icon
                  :icon="['fas', 'star']"
                  class="text-lg ml-3 mr-1"
                  :class="
                    plan.resource.resourceContent.isFavorite
                      ? 'text-red-600'
                      : 'text-gray-200'
                  "
                />
              </BaseButton>
            </div>
            <div class="pt-1 sm:pt-0">
              <BaseButton
                type="submit"
                class="
                  text-white
                  h-8
                  px-3
                  ml-2
                  align-middle
                  inline-flex
                  items-center
                  bg-buttonblue
                  hover:bg-buttonblueHover
                  text-navxs
                  lg:text-xslg
                "
                @click="$router.push('lesson-plan')"
              >
                View Lesson Plan
                <font-awesome-icon
                  :icon="['far', 'file-alt']"
                  class="text-xl ml-3 mr-1"
                />
              </BaseButton>
            </div>
            <div class="pt-1 sm:pt-0">
              <BaseButton
                type="submit"
                class="
                  text-white
                  h-8
                  px-3
                  ml-2
                  align-middle
                  inline-flex
                  items-center
                  bg-buttonblue
                  hover:bg-buttonblueHover
                  text-navxs
                  lg:text-xslg
                "
                @click.prevent="savePdf()"
              >
                Download
                <font-awesome-icon
                  :icon="['fas', 'file-download']"
                  class="text-xl ml-3 mr-1"
                />
              </BaseButton>
            </div>
          </div>
        </div>
        <div class="m-auto bg-gray-100 mt-4 md:px-4">
          <div
            id="pdfvuer"
            class="mx-2 overflow-x-hidden overflow-y-scroll m-auto"
          >
            <pdf
              :src="pdfdata"
              v-for="i in numPages"
              :key="i"
              :id="i"
              :page="i"
              v-model:scale="scale"
              style="width: 100%; margin: 20px auto"
              :annotation="true"
              :resize="true"
              @link-clicked="handle_pdf_link"
            >
              <template v-slot:loading> loading content here... </template>
            </pdf>
          </div>
        </div>
      </div>
    </BaseLayout>
  </div>
</template>

<script>
import NavVari from "@/components/NavVari.vue";
import { GetFile } from "@/assets/js/aws.js";
import { mapGetters } from "vuex";
import pdfvuer from "pdfvuer";
import { Favorites } from "@/Mixins/Favorites.js";
import { ContentLoader } from "vue-content-loader";
//import _ from "lodash";
export default {
  name: "Work Sheet",
  props: ["contentId"],
  mixins: [Favorites],
  components: {
    NavVari,
    pdf: pdfvuer,
    ContentLoader,
  },
  data() {
    return {
      page: 1,
      numPages: 0,
      pdfdata: undefined,
      errors: [],
      scale: "page-width",
      loaded: false,
      crumbs: [],
      pdfFile: null,
    };
  },
  computed: {
    ...mapGetters(["plan"]),
    formattedZoom() {
      return Number.parseInt(this.scale * 100);
    },
  },
  mounted() {
    this.load();
  },
  created() {
    this.createCrumbs();
  },
  watch: {
    show: function (s) {
      if (s) {
        this.getPdf();
      }
    },
    page: function (p) {
      if (
        window.pageYOffset <= this.findPos(document.getElementById(p)) ||
        (document.getElementById(p + 1) &&
          window.pageYOffset >= this.findPos(document.getElementById(p + 1)))
      ) {
        // window.scrollTo(0,this.findPos(document.getElementById(p)));
        document.getElementById(p).scrollIntoView();
      }
    },
  },
  methods: {
    savePdf() {
      var FileSaver = require("file-saver");
      FileSaver.saveAs(
        this.pdfFile,
        this.plan.resource.resourceContent.workSheet
      );
    },
    createCrumbs() {
      this.crumbs = [
        { name: "Planning Home", route: "home" },
        { name: this.plan.subject.name, route: "resources" },
        { name: this.plan.ageRange, route: "agerange" },
        { name: this.plan.resource.name, route: "" },
      ];
    },
    load() {
      GetFile.from(encodeURI(this.plan.resource.resourceContent.workSheet))
        .then((file) => {
          this.pdfFile = file;
          this.getPdf(file);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handle_pdf_link: function (params) {
      var page = document.getElementById(String(params.pageNumber));
      page.scrollIntoView();
    },
    getPdf(file) {
      var self = this;
      self.pdfdata = pdfvuer.createLoadingTask(file);
      self.pdfdata.then((pdf) => {
        self.numPages = pdf.numPages;
        this.loaded = true;
        window.onscroll = function () {
          changePage();
        };
        function changePage() {
          var i = 1,
            count = Number(pdf.numPages);
          do {
            if (
              window.pageYOffset >= self.findPos(document.getElementById(i)) &&
              window.pageYOffset <= self.findPos(document.getElementById(i + 1))
            ) {
              self.page = i;
            }
            i++;
          } while (i < count);
          if (window.pageYOffset >= self.findPos(document.getElementById(i))) {
            self.page = i;
          }
        }
      });
    },
    findPos(obj) {
      return obj.offsetTop;
    },
  },
};
</script>
