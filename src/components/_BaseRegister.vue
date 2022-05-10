<template>
  <div class="w-full sm:3/4 lg:w-1/2 m-auto mt-6" v-if="checkIsUser()">
    <form class="form" v-on:submit.prevent="login">
      <div class="px-8 text-red-500">
        <BaseInput
          v-model="user.firstName"
          type="text"
          placeholder="First Name"
          class="
            w-full
            border
            pl-2
            border-gray-500
            focus:outline-none focus:ring-2
            h-14
            focus:ring-purple-400 focus:border-transparent
          "
          @blur="v$.firstName.$touch"
        />
        <div class="pt-1 h-8 text-red-500">
          <p v-if="v$.firstName.required.$invalid && v$.firstName.$dirty">
            First name is required.
          </p>
        </div>
      </div>
      <div class="px-8 text-red-500">
        <BaseInput
          v-model="user.lastName"
          type="text"
          placeholder="Last Name"
          class="
            w-full
            border
            pl-2
            border-gray-500
            focus:outline-none focus:ring-2
            h-14
            focus:ring-purple-400 focus:border-transparent
          "
          @blur="v$.lastName.$touch"
        />
        <div class="pt-1 h-8">
          <p v-if="v$.lastName.required.$invalid && v$.lastName.$dirty">
            Last name is required.
          </p>
        </div>
      </div>
      <div class="px-8 text-red-500">
        <BaseInput
          v-model="user.school"
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
      <div class="px-8 text-red-500">
        <BaseInput
          v-model="user.email"
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
      <div class="mt-4 pb-4 px-8">
        <BaseInput
          v-if="userCheck()"
          v-model="password"
          type="password"
          class="
            h-14
            w-full
            border
            pl-2
            border-gray-500
            focus:outline-none
            focus:ring-2
            focus:ring-purple-400
            focus:border-transparent
            bg-white
          "
          placeholder="Enter your password"
          @blur="v$.password.$touch"
        />
        <div class="pt-1 h-8 text-red-500 outline-0">
          <p v-if="v$.password.$invalid && v$.password.$dirty">
            Please enter a valid password.
          </p>
          <p v-if="v$.password.required.$invalid && v$.password.$dirty">
            Password is required.
          </p>
        </div>
      </div>
      <div class="mt-4 px-8">
        <input
          type="checkbox"
          id="checkbox"
          v-model="user.isAdmin"
          class="h-4 w-4"
        />
        <label for="checkbox">{{
          isAdmin ? " Is an Administrator" : " Check for Administrator status"
        }}</label>
      </div>

      <div class="mt-4 px-8">
        <input
          type="checkbox"
          id="isActive"
          v-model="user.isActive"
          class="h-4 w-4"
        />
        <label for="checkbox">{{
          isActive
            ? "Active - user will show on site"
            : "Inactive - user is hidden"
        }}</label>
      </div>
      <div class="mt-4 px-8">
        <input
          type="checkbox"
          id="isSubscribed"
          v-model="user.isSubscribed"
          class="h-4 w-4"
        />
        <label for="checkbox">{{
          isSubscribed ? " Subscribed user" : " Check to Subscribe"
        }}</label>
      </div>
      <!-- <div>
            <Datepicker v-model="dateFrom" />
          </div> -->
      <div v-show="user.isSubscribed">
        <div class="flex flex-row bg-red-200">
          <div class="basis-1/2">
            <Datepicker
              v-model="dateFrom"
              autoApply
              :closeOnAutoApply="false"
              format="dd/MM/yyyy"
              inputClassName="h-10"
            />
          </div>
          <div class="grow border border-red-400">
            <BaseInput
              v-model="subscriptionTo"
              disabled
              type="text"
              class="h-10 w-64 border ml-4 pl-2 border-gray-300 bg-white"
              placeholder="Subscribed to"
            />
            <!-- <Datepicker
                  v-model="subscriptionTo"
                  autoApply
                  :closeOnAutoApply="false"
                  locale="en-gb"
                /> -->
          </div>
        </div>

        <div>
          <h3>Choose Subscription period</h3>
          <div>
            <BaseRadioGroup
              v-model="subscriptionPeriod"
              name="Subscription"
              :options="subscriptionPeriods"
            />
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
            REGISTER
          </BaseButton>
        </div>
        <p v-if="v$.$anyError" class="text-xslg text-red-500">
          Please fill out the required field(s).
        </p>
      </div>
    </form>
  </div>
  <div v-else>
    <div>
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
  </div>
</template>

<script>
const props = {
  user: {
    type: Object,
  },
};
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
  name: "UserLogons",
  props,
  emits: ["deleteUser", "showChangePassword", "showUserLogons"],
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
    // In case of a range picker, you'll receive [Date, Date]
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
      subscriptionPeriod: this.user.subscribedMonths ?? 12,
      subscriptionTo: this.user.subscriptionTo ?? new Date(),
      isSubscribed: true,
      isActive: true,
      days: [],
      dateFrom: this.user.subscribedFrom ?? new Date(),
      dateTo: null,
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
    subscriptionPeriod: function (newValue) {
      //alert();
      this.subscriptionTo = this.addMonths(this.dateFrom, newValue);
    },
    isSubscribed: function (newValue) {
      if (!newValue) {
        this.subscriptionPeriod = 0;
        this.subscriptionTo = {};
      }
    },
    dateFrom: function (newValue) {
      // alert("dateFrom");
      this.subscriptionTo = this.addMonths(newValue, this.subscriptionPeriod);
    },
  },
  validations() {
    var vm = this;
    return {
      email: { required, email },
      password: {
        required,
        containsUppercase(value) {
          return /[A-Z]/.test(value);
        },
        containsLowercase(value) {
          return /[a-z]/.test(value);
        },
        containsNumber(value) {
          return /[0-9]/.test(value);
        },
        // containsSpecial: function (value) {
        //   return /[#?!@$%^&*-]/.test(value)
        // }
      },
      firstName: { required },
      lastName: { required },
      school: { required },
      subscriptionPeriod: {
        isSubscription(value) {
          if (vm.isSubscribed && value > 0) {
            return true;
          }
          if (!vm.isSubscribed) {
            return true;
          }
          return false;
        },
      },
    };
  },
  methods: {
    checkIsUser() {
      return !_.isEmpty(this.user);
    },
  },
};
</script>
