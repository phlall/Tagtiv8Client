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
              class="text-white text-nav bg-red-500 font-bold pt-2 pb-1 px-6"
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
            />
            <div class="pt-1 h-8 text-red-500">
              <p v-if="v$.firstName.required.$invalid">
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
            />
            <div class="pt-1 h-8">
              <p v-if="v$.lastName.required.$invalid">Last name is required.</p>
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
            />
            <div class="pt-1 h-8">
              <p v-if="v$.school.required.$invalid">School name is required.</p>
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
            />
            <div class="pt-1 h-8 text-red-500">
              <p v-if="v$.email.email.$invalid">
                Please enter a valid email address.
              </p>
              <p v-if="v$.email.required.$invalid">Email is required.</p>
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
            />
            <div class="pt-1 h-8 text-red-500 outline-0">
              <p v-if="v$.password.$invalid">Please enter a valid password.</p>
              <p v-if="v$.password.required.$invalid">Email is required.</p>
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
//import NavVari from "@/components/NavVari.vue";

export default {
  name: "Register",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
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
  validations() {
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
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
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
            isadmin: this.isAdmin,
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
  },
  components: {
    //NavVari,
  },
};
</script>
