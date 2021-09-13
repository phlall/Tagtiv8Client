<template>
  <div>
    <NavVari />
    <BaseLayout outerClass="text-gray-700 font-roboto">
      <form class="form" v-on:submit.prevent="submit">
        <div class="px-8 my-12 text-gray-500 text-xlg">
          <h2 class="text-lg">SUBJECT</h2>
          <div class="mb-8 border border-gray-300 w-80">
            <select v-model="subjectId" class="py-2 w-full h-12">
              <option disabled value="">Please select one</option>
              <option
                v-for="subject in subjects"
                :key="subject.id"
                v-bind:value="subject.id"
                class="my-1 ml-2"
              >
                {{ subject.name }}
              </option>
            </select>
          </div>
          <BaseInput
            v-model="name"
            type="text"
            placeholder="Activity"
            class="
              w-80
              border
              pl-2
              border-gray-500
              focus:outline-none focus:ring-2
              h-12
              focus:ring-purple-400 focus:border-transparent
            "
          />
          <div class="pt-1 h-8 text-red-500">
            <p v-if="v$.name.required.$invalid">Activity is required.</p>
          </div>

          <div class="pl-2 w-6/12 mt-6">
            <h2 class="text-lg">AGEGROUPS</h2>
            <div class="flex mt-2">
              <div class="flex-grow h-16">
                <input
                  type="checkbox"
                  value="EYFS"
                  v-model="ageGroups"
                  class="mr-2 h-4 w-4"
                />
                <label>EYFS</label>
              </div>
              <div class="flex-grow h-16">
                <input
                  type="checkbox"
                  value="KS1"
                  v-model="ageGroups"
                  class="mr-2 h-4 w-4"
                />
                <label>KS1</label>
              </div>
              <div class="flex-grow h-16">
                <input
                  type="checkbox"
                  value="LKS2"
                  v-model="ageGroups"
                  class="mr-2 h-4 w-4"
                />
                <label>LKS2</label>
              </div>
              <div class="flex-grow h-16">
                <input
                  type="checkbox"
                  value="UKS2"
                  v-model="ageGroups"
                  class="mr-2 h-4 w-4"
                />
                <label>UKS2</label>
              </div>
            </div>
          </div>
          <div class="text-gray-500">
            <BaseInput
              v-model="lessonPlan"
              type="text"
              placeholder="Lesson Plan"
              class="
                w-80
                border border-gray-500
                focus:outline-none focus:ring-2
                h-12
                pl-2
                focus:ring-purple-400 focus:border-transparent
              "
            />
            <div class="pt-1 h-8 text-red-500">
              <p v-if="v$.lessonPlan.required.$invalid">
                Lesson Plan is required.
              </p>
            </div>
          </div>
          <div class="text-gray-500">
            <BaseInput
              v-model="worksheet"
              type="text"
              placeholder="Worksheet"
              class="
                w-80
                border
                pl-2
                border-gray-500
                focus:outline-none focus:ring-2
                h-12
                focus:ring-purple-400 focus:border-transparent
              "
            />
            <div class="pt-1 h-8 text-red-500">
              <p v-if="v$.worksheet.required.$invalid">
                Worksheet is required.
              </p>
            </div>
          </div>
          <div>
            <h2 class="text-lg mt-2">BLENDED SUBJECTS</h2>
            <div class="flex w-5/12 mt-2">
              <div class="flex-grow h-16">
                <input
                  type="checkbox"
                  value="blended"
                  v-model="blended"
                  class="mr-2 h-4 w-4"
                />
                <label>Blended</label>
              </div>
              <div class="flex-grow h-16">
                <input
                  type="checkbox"
                  value="KS1"
                  v-model="physical"
                  class="mr-2 h-4 w-4"
                />
                <label>Physical</label>
              </div>
              <div class="flex-grow h-16">
                <input
                  type="checkbox"
                  value="LKS2"
                  v-model="thinking"
                  class="mr-2 h-4 w-4"
                />
                <label>Thinking</label>
              </div>
            </div>
          </div>
          <div>
            <h2 class="text-lg my-2">RESOURCES</h2>
            <div v-for="item in resourceData" :key="item.id">
              <input
                type="checkbox"
                :value="item.id"
                v-model="resourceIds"
                class="mr-2 h-4 w-4 mt-1"
              />
              <label>{{ item.name }}</label>
            </div>
          </div>
          <div class="flex px-8 mt-6 mb-32">
            <div class="w-1/2 mr-2">
              <BaseButton
                type="submit"
                :disabled="v$.$invalid"
                :class="
                  v$.$invalid ? 'opacity-50 cursor-default' : 'cursor-pointer'
                "
                class="text-white h-12 w-full bg-buttonblue font-bold"
              >
                SUBMIT
              </BaseButton>
            </div>
            <p v-if="v$.$anyError" class="text-xslg text-red-500">
              Please fill out the required field(s).
            </p>
          </div>
        </div>
      </form>
    </BaseLayout>
  </div>
</template>

<script>
import NavVari from "@/components/NavVari.vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import _ from "lodash";
export default {
  name: "Resource Content",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      name: "",
      ageGroups: [],
      resourceIds: [],
      error: "",
      subjectId: {},
      subjects: [],
      loaded: false,
      worksheet: "",
      lessonPlan: "",
      blended: false,
      thinking: false,
      physical: false,
      resourceData: [],
    };
  },
  created() {
    this.loaded = false;
    // this.getResources();
    this.getSubjects();
  },
  methods: {
    submit() {
      this.v$.$touch();
      if (!this.v$.$invalid) {
        //this.legit = true;
        this.$store
          .dispatch("admin/addResource", {
            name: this.name,
            ageGroups: this.ageGroups.join(),
            worksheet: this.worksheet,
            lessonPlan: this.lessonPlan,
            blended: this.blended,
            thinking: this.thinking,
            physical: this.physical,
            resourceData: this.resourceData,
          })
          .then((error) => {
            if (!error) {
              //  this.$router.push({ name: "Home" });
            } else {
              // this.$router.push({ name: "Login" });
            }
          });
      }
    },
    getSubjects() {
      this.$store.dispatch("user/getSubjects").then((subjects) => {
        this.subjects = subjects;
        this.loaded = true;
      });
    },
    getResources() {
      this.$store
        .dispatch("admin/getResources", this.subjectId)
        .then((subject) => {
          if (subject) {
            this.loaded = true;
            this.resourceData = _.orderBy(subject.resources, ["name"], ["asc"]);
          }
        })
        .catch(() => {
          this.$router.push("Home");
        });
    },
  },
  watch: {
    subjectId: function () {
      this.getResources();
    },
  },
  validations() {
    return {
      name: { required },
      lessonPlan: { required },
      worksheet: { required },
    };
  },
  components: {
    NavVari,
  },
};
</script>
