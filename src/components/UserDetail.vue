<template>
  <div v-if="user">
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
    <!-- <div class="flex mt-6">
                    <div>
                      <BaseButton
                        type="button"
                        @click="sortAz('month')"
                        class="flex"
                      >
                        <div class="font-bold pt-1">Month</div>
                        <div class="ml-2">
                          <font-awesome-icon
                            :icon="[
                              'fas',
                              sorted('username') ? 'caret-down' : 'caret-up',
                            ]"
                            class="text-gray-600 text-3xl"
                          />
                        </div>
                      </BaseButton>
                    </div>
                    <div>
                      <BaseButton
                        type="button"
                        @click="sortAz('year')"
                        class="flex"
                      >
                        <div class="font-bold pt-1">Year</div>
                        <div class="ml-2">
                          <font-awesome-icon
                            :icon="[
                              'fas',
                              sorted('username') ? 'caret-down' : 'caret-up',
                            ]"
                            class="text-gray-600 text-3xl"
                          />
                        </div>
                      </BaseButton>
                    </div>
                  </div> -->
    <div class="w-full sm:3/4 lg:w-1/2 m-auto mt-6">
      <form class="form" v-on:submit.prevent="update">
        <div class="px-8 text-red-500">
          <BaseInput
            v-model="firstName"
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
            v-model="lastName"
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
        <div class="px-8 text-red-500">
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
        <!-- <div class="mt-4 pb-4 px-8">
          <BaseInput
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
        </div> -->
        <div class="mt-4 px-8">
          <input
            type="checkbox"
            id="checkbox"
            v-model="isAdmin"
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
            v-model="isActive"
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
            v-model="isSubscribed"
            class="h-4 w-4"
          />
          <label for="checkbox">{{
            isSubscribed ? " Subscribed user" : " Check to Subscribe"
          }}</label>
        </div>
        <!-- <div>
            <Datepicker v-model="dateFrom" />
          </div> -->
        <div v-show="isSubscribed">
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
              <input
                disabled
                type="text"
                :value="formatDateShort(this.subscribedTo)"
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
                v-model="subscribedMonths"
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
    <div class="mt-12">
      {{ userId.userId }} {{ user.id }}
      <!-- <Register :user="userDetail"></Register> -->
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
  props: {
    userId: Number,
  },
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
      //alert(newValue);
      //this.user.subscribedMonths = newValue;
      this.setSubscribedTo();
      //this.subscriptionTo = this.addMonths(this.dateFrom, newValue);
    },
    isSubscribed: function (newValue) {
      if (!newValue) {
        this.subscribedTo = {};
        //this.subscribedMonths = 3;
      }
    },
    dateFrom: function () {
      //this.dateFrom = newValue;
      this.setSubscribedTo();
      // alert("dateFrom");
      // this.user.subscribedTo = this.addMonths(
      //   newValue,
      //   this.user.subscribedMonths
      // );
    },
  },
  validations() {
    //var vm = this;
    return {
      email: { required, email },
      // password: {
      //   required,
      //   containsUppercase(value) {
      //     return /[A-Z]/.test(value);
      //   },
      //   containsLowercase(value) {
      //     return /[a-z]/.test(value);
      //   },
      //   containsNumber(value) {
      //     return /[0-9]/.test(value);
      //   },
      //   // containsSpecial: function (value) {
      //   //   return /[#?!@$%^&*-]/.test(value)
      //   // }
      // },
      firstName: { required },
      lastName: { required },
      school: { required },
      // subscriptionPeriod: {
      //   isSubscription(value) {
      //     if (vm.isSubscribed && value > 0) {
      //       return true;
      //     }
      //     if (!vm.isSubscribed) {
      //       return true;
      //     }
      //     return false;
      //   },
      // },
    };
  },
  created() {
    this.subscribedTo = new Date();
    this.getUserDetail();
  },
  methods: {
    formatSubscribedTo() {
      return this.formatDateShort(this.subscribedTo);
    },
    getUserDetail() {
      // this.showDetailModal = true;
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
        //this.legit = true;
        this.$store
          .dispatch("user/update", {
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
          })
          .then((error) => {
            if (!error) {
              // (this.email = ""),
              //   (this.password = ""),
              //   (this.firstName = ""),
              //   (this.lastName = ""),
              //   (this.school = ""),
              //   (this.isAdmin = false);
              this.user = {};
              this.$emit("closeModal");
            } else {
              // this.$router.push({ name: "Login" });
            }
          });
      }
    },
    closeModal() {
      this.$emit("closeModal");
    },
  },
};
</script>
