<template>
  <teleport to="title">
    {{ plan.ageRange }} {{ plan.subject.name }} Introduction | Active Learning
    Games</teleport
  >
  <div>
    <BaseLayout outerClass="bg-headerblue text-gray-700 font-roboto">
      <div class="flex flex-wrap bg-headerblue py-4 ml-2 md:ml-0">
        <div>
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
          <BaseBreadcrumbs class="" :crumbs="crumbs" />
        </div>
      </div>
    </BaseLayout>
    <BaseLayout>
      <div v-if="!loaded" class="w-full mt-12">
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
        <div class="flex flex-wrap w-full mt-12">
          <div class="pl-2 sm:pl-0 flex-shrink mt-0 sm:mt-3">
            <h3 class="text-left pt-2 text-xlsm font-bold">
              {{ plan.resource.name }}
              <!-- {{ plan.subject.name }}  -->
              <!-- {{ plan.resource.resourceContent.name }} -->
            </h3>
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
import { mapGetters } from "vuex";
import { GetFile } from "@/assets/js/aws.js";
import pdfvuer from "pdfvuer";
import ApiService from "@/services/apiService.js";
import { ContentLoader } from "vue-content-loader";
//import _ from "lodash";
export default {
  name: "Introduction",
  props: ["contentId"],
  components: {
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
    createCrumbs() {
      this.crumbs = [
        { name: "Planning Home", route: "home" },
        // { name: "Introduction", route: "resources" },
        { name: this.plan.resource.name, route: "" },
      ];
    },
    load() {
      GetFile.from(encodeURI(this.plan.resource.resourceContent.workSheet))
        .then((file) => {
          this.getPdf(file);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onClick() {
      ApiService.getFile(this.plan.resource.resourceContent.workSheet).then(
        (response) => {
          var fileURL = window.URL.createObjectURL(new Blob([response.data]));
          var fileLink = document.createElement("a");

          fileLink.href = fileURL;
          fileLink.setAttribute(
            "download",
            this.plan.resource.resourceContent.workSheet
          );
          document.body.appendChild(fileLink);

          fileLink.click();
        }
      );
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
    setFavorite() {
      let rs = this.plan.resource.resourceContent;
      const rsId = rs.id;
      if (rs.isFavorite) {
        rs.isFavorite = false;
        this.$store
          .dispatch("user/deleteFavorite", { itemId: rsId })
          .then(() => {})
          .catch(() => {
            rs.isFavorite = true;
          });
      } else {
        rs.isFavorite = true;
        this.$store
          .dispatch("user/addFavorite", { itemId: rsId })
          .then(() => {})
          .catch(() => {
            rs.isFavorite = false;
          });
      }
    },
  },
};
</script>
