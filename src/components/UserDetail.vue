<template>
  <div v-if="loaded">
    <div
      class="
        flex flex-row
        w-full
        border-b border-red-600
        font-bold
        text-xl
        pb-1
      "
    >
      <div class="mr-2">{{ user.firstName }}</div>
      <div class="flex-grow">{{ user.lastName }}</div>
      <div class="flex-grow">{{ user.username }}</div>
      <div class="flex-grow">{{ user.school }}</div>
    </div>
    <div class="flex my-4">
      <div class="flex-grow">
        <span class="font-bold">Created:</span>
        {{ formatDate(user.created) }}
      </div>
      <div class="flex-grow">
        <span class="font-bold"> Password last changed:</span>
        {{ formatDate(user.passwordChanged) }}
      </div>
    </div>
    <div class="w-full sm:3/4 lg:w-1/2 m-auto mt-6">
      <form class="form" v-on:submit.prevent="update">
        <div class="px-8 mt-16">
          <BaseInput
            v-model="school"
            type="text"
            placeholder="School Name"
            class="
              w-full
              border
              pl-2
              border-gray-500
              focus:outline-none focus:ring-2
              h-14
              focus:ring-purple-400 focus:border-transparent
            "
            @blur="v$.school.$touch"
          />
          <div class="pt-1 h-8">
            <p v-if="v$.school.required.$invalid && v$.school.$dirty">
              School name is required.
            </p>
          </div>
        </div>
        <div class="px-8">
          <BaseInput
            v-model="email"
            type="email"
            placeholder="Enter your email"
            class="
              w-full
              border
              pl-2
              border-gray-500
              focus:outline-none focus:ring-2
              h-14
              focus:ring-purple-400 focus:border-transparent
            "
            @blur="v$.email.$touch"
          />
          <div class="pt-1 h-8 text-red-500">
            <p v-if="v$.email.email.$invalid">
              Please enter a valid email address.
            </p>
            <p v-if="v$.email.required.$invalid && v$.email.$dirty">
              Email is required.
            </p>
          </div>
        </div>
        <div class="mt-4 px-8">
          <input
            type="checkbox"
            id="isAdmin"
            v-model="isAdmin"
            class="h-4 w-4"
          />
          <label for="isAdmin" class="ml-1">{{
            isAdmin ? " Is an Administrator" : " Check for Administrator status"
          }}</label>
        </div>

        <div class="mt-4 px-8">
          <input
            type="checkbox"
            id="isActive"
            v-model="isActive"
            class="h-4 w-4"
          />
          <label for="isActive" class="ml-2">{{
            isActive
              ? "Active - user will show on site"
              : "Inactive - user is hidden"
          }}</label>
        </div>
        <div :class="isSubscribed ? 'bg-gray-200 rounded-md' : ''">
          <div class="mt-4 pl-8 pt-2">
            <input
              type="checkbox"
              id="isSubscribed"
              v-model="isSubscribed"
              class="h-4 w-4"
            />
            <label for="isSubscribed" class="ml-1">{{
              isSubscribed ? " Subscribed user" : " Check to Subscribe"
            }}</label>
          </div>
          <div v-show="isSubscribed" class="mt-4">
            <div class="flex flex-row pl-2">
              <div class="basis-1/2">
                <div class="text-md">From</div>
                <Datepicker
                  v-model="dateFrom"
                  autoApply
                  :closeOnAutoApply="false"
                  format="dd/MM/yyyy"
                  inputClassName="h-10 mt-1"
                />
              </div>
              <div class="grow ml-8">
                <div class="text-md">To</div>
                <input
                  disabled
                  type="text"
                  :value="formatDateShort(this.subscribedTo)"
                  class="h-10 w-64 border pl-2 mt-1 border-gray-300 bg-white"
                  placeholder="Subscribed to"
                />
              </div>
            </div>

            <div class="py-4 pl-2">
              <h3>Choose Subscription period</h3>
              <div class="pt-4">
                <BaseRadioGroup
                  v-model="subscribedMonths"
                  name="Subscription"
                  :options="subscriptionPeriods"
                />
              </div>
            </div>
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
              UPDATE
            </BaseButton>
          </div>
          <p v-if="v$.$anyError" class="text-xslg text-red-500">
            Please fill out the required field(s).
          </p>
        </div>
      </form>
    </div>
  </div>
  <div v-else>
    <!-- Loading... -->
    <ContentLoader
      viewBox="0 0 250 110"
      :speed="1.2"
      primaryColor="#c2e0fe"
      secondaryColor="#eeeeed"
    >
      <rect x="0" y="4" rx="3" ry="3" height="4" class="w-full" />
      <rect x="0" y="12" rx="3" ry="3" height="4" class="w-9/12" />
      <rect x="0" y="22" rx="3" ry="3" height="4" class="w-full" />
      <rect x="0" y="30" rx="3" ry="3" height="4" class="w-9/12" />
      <rect x="0" y="40" rx="3" ry="3" class="w-full" height="4" />
      <rect x="0" y="48" rx="3" ry="3" height="4" class="w-9/12" />
    </ContentLoader>
  </div>
</template>
<script>
// const props = {
//   userDetail: {
//     type: Object,
//   },
// };
import _ from "lodash";
import { mapState } from "vuex";
//import UserLogonDatePart from "../components/UserLogonDatePart.vue";
import { ContentLoader } from "vue-content-loader";
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import formatDateMixin from "../Mixins/formatDate.js";
import Datepicker from "vue3-date-time-picker";
import { ref } from "vue";
export default {
  name: "User Detail",
  emits: ["closeDetailModal"],
  props: {
    userId: Number,
  },
  mixins: [formatDateMixin],
  components: { ContentLoader, Datepicker },
  computed: {
    ...mapState(["user"]),
    formattedDate() {
      return this.formatDate(this.date);
    },
    dates() {
      return this.days.map((day) => day.date);
    },
    attributes() {
      return this.dates.map((date) => ({
        highlight: true,
        dates: date,
      }));
    },
  },
  setup() {
    const date = ref(new Date());
    const format = (date) => {
      const day = this.getDay(this.subscriptionTo);
      const month = this.getMonth(this.subscriptionTo);
      const year = date.getYear(this.subscriptionTo);

      return `${day}/${month}/${year}`;
    };
    return { v$: useVuelidate(), date, format };
  },
  data() {
    return {
      user: {},
      email: "",
      school: "",
      lastName: "",
      firstName: "",
      subscribedMonths: 3,
      subscribedTo: new Date(),
      isSubscribed: false,
      isActive: true,
      isAdmin: false,
      days: [],
      dateFrom: new Date(),
      dateTo: null,
      loaded: false,
      subscriptionPeriods: [
        { label: "3 Months", value: 3 },
        { label: "6 Months", value: 6 },
        { label: "one year", value: 12 },
        { label: "two years", value: 24 },
        { label: "five years", value: 60 },
      ],
      open: false,
    };
  },
  watch: {
    subscribedMonths: function () {
      this.setSubscribedTo();
    },
    dateFrom: function () {
      this.setSubscribedTo();
    },
  },
  validations() {
    return {
      email: { required, email },
      school: { required },
    };
  },
  created() {
    this.subscribedTo = new Date();
    this.loaded = false;
    this.getUserDetail();
  },
  methods: {
    formatSubscribedTo() {
      return this.formatDateShort(this.subscribedTo);
    },
    getUserDetail() {
      this.$store
        .dispatch("user/getUser", this.userId)
        .then((user) => {
          this.user = user;
          this.email = user.username;
          this.school = user.school;
          this.firstName = user.firstName;
          this.lastName = user.lastName;
          this.isActive = user.isActive;
          this.isAdmin = user.isAdmin;
          this.isSubscribed = user.isSubscribed;
          if (!_.isNull(this.user.subscribedFrom)) {
            this.dateFrom = this.user.subscribedFrom;
          }
          if (!_.isNull(this.user.subscribedMonths)) {
            this.subscribedMonths = this.user.subscribedMonths;
          }
          if (!_.isNull(this.user.subscribedTo)) {
            this.subscribedTo = this.user.subscribedTo;
          } else {
            this.setSubscribedTo();
          }
          this.loaded = true;
        })
        .catch(() => {
          this.$router.push("Home");
        });
    },
    setSubscribedTo() {
      this.subscribedTo = this.addMonths(this.dateFrom, this.subscribedMonths);
    },
    update() {
      this.v$.$touch();
      if (!this.v$.$invalid) {
        const user = {
          id: this.userId.userId,
          username: this.email,
          password: this.password,
          firstName: this.firstName,
          lastName: this.lastName,
          school: this.school,
          isAdmin: this.isAdmin,
          isSubscribed: this.isSubscribed,
          isActive: this.isActive,
          subscribedFrom: this.dateFrom,
          subscribedTo: this.subscribedTo,
          subscribedMonths: this.subscribedMonths,
        };
        this.$store.dispatch("user/update", user).then((error) => {
          if (!error) {
            //this.user = {};
            this.$emit("closeDetailModal", user);
          } else {
            // this.$router.push({ name: "Login" });
          }
        });
      }
    },
  },
};
</script>
