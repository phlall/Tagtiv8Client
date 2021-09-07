<template>
  <div>
    <div><NavVari /></div>
    <BaseLayout outerClass="bg-headerblue text-gray-700 font-roboto">
      <div class="bg-headerblue py-4 flex">
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
              <span class="inline-block align-top ml-2"> Back </span>
            </BaseButton></span
          >
        </div>
        <div class="pt-2 text-nav text-white ml-4">
          Planning Home / {{ plan.subject.name }} / {{ plan.resource.name }}
        </div>
      </div>
    </BaseLayout>
    <div class="w-full m-auto text-center flex justify-center font-roboto">
      <div class="grid grid-cols-2 mt-12 max-w-screen-lg">
        <div class="pl-1">
          <h3 class="text-left pt-2 text-smlg">
            {{ plan.resource.name }} -
            {{ plan.resource.resourceContent.name }} Work Sheet
          </h3>
        </div>
        <div class="flex justify-end pt-2">
          <div class="mr-3 text-xslg">Add to Favorites:</div>
          <div>
            <BaseButton
              type="button"
              :disabled="false"
              class="text-md"
              @click="setFavorite(item)"
              :class="
                plan.resource.resourceContent.isFavorite
                  ? 'text-red-600'
                  : 'text-gray-200'
              "
            >
              <span> <font-awesome-icon :icon="['fas', 'star']" /></span>
            </BaseButton>
          </div>
          <div class="ml-4 text-xslg">View Lesson Plan</div>
          <div>
            <BaseButton
              type="button"
              :disabled="false"
              v-if="!loggedIn"
              class="text-lg"
              @click="$router.push('lesson-plan')"
            >
              <span class="ml-4">
                <font-awesome-icon :icon="['far', 'file-alt']"
              /></span>
            </BaseButton>
          </div>
          <div class="ml-4 text-xslg">Download</div>
          <div>
            <BaseButton
              type="button"
              :disabled="false"
              v-if="!loggedIn"
              class="text-md"
              @click.prevent="onClick()"
            >
              <span class="ml-4 text-lg">
                <font-awesome-icon :icon="['fas', 'file-download']"
              /></span>
            </BaseButton>
            <!-- <a :href="fred" @click.prevent="downloadItem()">
              <span class="ml-4 text-lg">
                <font-awesome-icon :icon="['fas', 'file-download']" /></span
            ></a> -->
          </div>
        </div>
        <div class="col-span-2 bg-gray-100 mt-4">
          <div
            id="pdfvuer"
            class="h-screen/1 mx-2 overflow-x-hidden overflow-y-scroll"
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
    </div>
  </div>
</template>

<script>
import NavVari from "@/components/NavVari.vue";
import { mapGetters } from "vuex";
//import pdf from "vue3-pdf";
import pdfvuer from "pdfvuer";
import ApiService from "@/services/apiService.js";
//import _ from "lodash";
export default {
  name: "Work Sheet",
  props: ["contentId"],
  components: {
    NavVari,
    pdf: pdfvuer,
  },
  data() {
    return {
      page: 1,
      numPages: 0,
      pdfdata: undefined,
      errors: [],
      scale: "page-width",
    };
  },
  computed: {
    ...mapGetters(["plan"]),
    formattedZoom() {
      return Number.parseInt(this.scale * 100);
    },
  },
  mounted() {
    this.getPdf();
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
    downloadItem() {
      this.$store
        .dispatch(
          "user/getFile",
          "http://localhost:8080/pdf/" +
            this.plan.resource.resourceContent.workSheet
        )
        .then((response) => {
          const blob = new Blob([response.data], { type: "application/pdf" });
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = this.plan.resource.resourceContent.name;
          link.click();
          URL.revokeObjectURL(link.href);
        })
        .catch(console.error);
      // .catch(() => {
      //   this.$router.push("Home");
      // });
    },
    handle_pdf_link: function (params) {
      // Scroll to the appropriate place on our page - the Y component of
      // params.destArray * (div height / ???), from the bottom of the page div
      var page = document.getElementById(String(params.pageNumber));
      page.scrollIntoView();
    },
    getPdf() {
      var self = this;
      self.pdfdata = pdfvuer.createLoadingTask(
        "/pdf/" + this.plan.resource.resourceContent.workSheet
      );
      self.pdfdata.then((pdf) => {
        self.numPages = pdf.numPages;
        window.onscroll = function () {
          changePage();
          //stickyNav();
        };

        // Get the offset position of the navbar
        //var sticky = $("#buttons")[0].offsetTop;

        // Add the sticky class to the self.$refs.nav when you reach its scroll position. Remove "sticky" when you leave the scroll position
        // function stickyNav() {
        //   if (window.pageYOffset >= sticky) {
        //     $("#buttons")[0].classList.remove("hidden");
        //   } else {
        //     $("#buttons")[0].classList.add("hidden");
        //   }
        // }

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
