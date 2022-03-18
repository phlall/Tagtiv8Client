<template>
  <teleport to="#title">Register | Active Learning Games</teleport>
  <div>
    <!-- <NavVari /> -->
    <BaseLayout outerClass="bg-headerblue text-gray-700 font-roboto">
      <div class="bg-headerblue py-4 flex">
        <div>
          <span class="text-white leading-2"
            ><BaseButton
              type="submit"
              :disabled="false"
              class="text-white text-nav font-bold pt-2 pb-1 px-6"
              @click="$router.push('home')"
            >
              <font-awesome-icon
                :icon="['fas', 'caret-left']"
                class="text-xl"
              />
              <span class="inline-block align-top ml-2"> Back </span>
            </BaseButton></span
          >
        </div>
        <div class="pt-2 text-nav text-white ml-4">Register new user</div>
      </div>
    </BaseLayout>
    <BaseLayout
      outerClass="bg-bgblue text-gray-700 border-b border-gray-700 font-roboto"
    >
      <div class="w-full sm:3/4 lg:w-1/2 m-auto mt-6">
        <form class="form" v-on:submit.prevent="login">
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
          <div class="mt-4 pb-4 px-8">
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
          </div>
          <div class="mt-4 px-8">
            <input
              type="checkbox"
              id="checkbox"
              v-model="isAdmin"
              class="h-4 w-4"
            />
            <label for="checkbox">{{
              isAdmin
                ? " Is an Administrator"
                : " Check for Administrator status"
            }}</label>
          </div>

          <div class="mt-4 px-8">
            <input
              type="checkbox"
              id="isActive"
              v-model="isActive"
              class="h-4 w-4"
            />
            <label for="isActive" class="ml-1">{{
              isActive
                ? "Active - user will show on site"
                : "Inactive - user is hidden"
            }}</label>
          </div>
          <div
            :class="isSubscribed ? 'border-2 border-gray-300 rounded-md' : ' '"
          >
            <div class="pl-8" :class="isSubscribed ? 'mt-3' : 'mt-4'">
              <input
                type="checkbox"
                id="isSubscribed"
                v-model="isSubscribed"
                class="h-4 w-4"
              />
              <label for="checkbox" class="ml-1">{{
                isSubscribed ? " Subscribed user" : " Check to Subscribe"
              }}</label>
            </div>

            <div v-show="isSubscribed">
              <div class="flex flex-row pl-2">
                <div class="basis-1/2">
                  <div class="text-md">From</div>
                  <Datepicker
                    v-model="dateFrom"
                    autoApply
                    :closeOnAutoApply="false"
                    format="dd/MM/yyyy"
                    inputClassName="h-10"
                  />
                </div>
                <div class="grow ml-8">
                  <div class="text-md">To</div>
                  <input
                    :value="formatDateShort(this.subscriptionTo)"
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

              <div class="py-4 pl-2">
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
    </BaseLayout>
  </div>
</template>
<script>
import { mapState } from "vuex";
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import formatDateMixin from "../Mixins/formatDate.js";
import Datepicker from "vue3-date-time-picker";
import "vue3-date-time-picker/dist/main.css";
import { ref } from "vue";
//import NavVari from "@/components/NavVari.vue";

export default {
  name: "Register",
  mixins: [formatDateMixin],
  setup() {
    const date = ref(new Date());
    // In case of a range picker, you'll receive [Date, Date]
    const format = (date) => {
      const day = this.getDay(this.subscriptionTo);
      const month = this.getMonth(this.subscriptionTo);
      const year = date.getYear(this.subscriptionTo);

      return `${day}/${month}/${year}`;
    };
    // const dateTo = ref(this.subscriptionTo);
    // const formatTo = (dateTo) => {
    //   const day = ("0" + dateTo.getDate()).slice(-2);
    //   const month = ("0" + dateTo.getMonth() + 1).slice(-2);
    //   const year = formatTo.getFullYear();

    //   return `${day}/${month}/${year}`;
    // };

    // const format =
    //   ("0" + date.value.getDate()).slice(-2) +
    //   "/" +
    //   ("0" + (date.value.getMonth() + 1)).slice(-2) +
    //   "/" +
    //   date.value.getFullYear();

    return { v$: useVuelidate(), date, format };
  },
  data() {
    return {
      subscriptionPeriods: [
        { label: "3 Months", value: 3 },
        { label: "6 Months", value: 6 },
        { label: "one year", value: 12 },
        { label: "two years", value: 24 },
        { label: "five years", value: 60 },
      ],
      subscriptionPeriod: 3,
      subscriptionTo: new Date(),
      isActive: true,
      isSubscribed: false,
      days: [],
      dateFrom: new Date(),
      dateTo: null,
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      school: "",
      isAdmin: false,
      showPassword: false,
      error: "",
      legit: false,
    };
  },
  created() {
    this.setSubscribedTo();
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
  watch: {
    subscriptionPeriod: function () {
      //this.subscriptionTo = this.addMonths(this.dateFrom, newValue);
      this.setSubscribedTo();
    },
    // isSubscribed: function (newValue) {
    //   if (!newValue) {
    //     this.subscriptionPeriod = 3;
    //     this.subscriptionTo = new Date();
    //   }
    // },
    dateFrom: function () {
      // this.subscriptionTo = this.addMonths(newValue, this.subscriptionPeriod);
      this.setSubscribedTo();
    },
  },
  computed: {
    ...mapState(["user"]),
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
  methods: {
    setSubscribedTo() {
      this.subscriptionTo = this.addMonths(
        this.dateFrom,
        this.subscriptionPeriod
      );
    },
    login() {
      this.v$.$touch();
      if (!this.v$.$invalid) {
        //this.legit = true;
        this.$store
          .dispatch("user/register", {
            username: this.email,
            password: this.password,
            firstName: this.firstName,
            lastName: this.lastName,
            school: this.school,
            isAdmin: this.isAdmin,
            isSubscribed: this.isSubscribed,
            isActive: this.isActive,
            SubscribedFrom: this.dateFrom,
            SubscribedTo: this.subscriptionTo,
            SubscribedMonths: this.subscriptionPeriod,
          })
          .then((error) => {
            if (!error) {
              (this.email = ""),
                (this.password = ""),
                (this.firstName = ""),
                (this.lastName = ""),
                (this.school = ""),
                (this.isAdmin = false);
            } else {
              // this.$router.push({ name: "Login" });
            }
          });
      }
    },
    // format(value) {
    //   return this.formatDateShort(value);
    // },
    // onDayClick(day) {
    //   const idx = this.days.findIndex((d) => d.id === day.id);
    //   if (idx >= 0) {
    //     this.days.splice(idx, 1);
    //   } else {
    //     this.days.push({
    //       id: day.id,
    //       date: day.date,
    //     });
    //   }
    // },
  },
  components: {
    Datepicker,
  },
};
</script>
