/* eslint-disable import/no-unresolved */
<template>
  <div>
    <NavVari />
    <div class="w-full m-auto text-center flex justify-center">
      <div class="grid grid-cols-12 mt-16 max-w-screen-lg">
        <div
          class="
            lg:col-span-6 lg:ml-4
            md:col-span-5
            invisible
            md:visible
            h-0
            md:h-full
            p-4
          "
        >
          <img src="@/assets/images/tagitiva.png" class="w-full" />
        </div>
        <div
          class="
            col-span-12
            md:col-span-7
            lg:col-span-6
            max-w-screen-sm
            md:max-w-screen-lg
            m-auto
          "
        >
          <div
            class="
              shadow-lg
              p-8
              mx-6
              lg:ml-8 lg:mr-4
              xlg:mr-8
              text-center
              border-t border-gray-100
            "
          >
            <div class="w-full px-8 mb-4">
              <h1 class="text-3xl pb-4">Welcome</h1>
              <p class="mx-12">Access your account to view our session plans</p>
            </div>
            <form class="form" v-on:submit.prevent="login">
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
                />
                <div class="pt-1 h-8">
                  <p v-if="v$.email.email.$invalid">
                    Please enter a valid email address.
                  </p>
                  <p v-if="v$.email.required.$invalid">Email is required.</p>
                </div>
              </div>
              <div class="mt-4 px-8">
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
                  "
                  placeholder="Enter your password"
                />
                <div class="pt-1 h-8">
                  <p v-if="v$.password.$invalid">
                    Please enter a valid password.
                  </p>
                </div>
              </div>
              <div class="flex px-8 mt-6">
                <div class="w-full mr-2">
                  <BaseButton
                    type="submit"
                    :disabled="false"
                    class="text-white h-12 w-full bg-buttonblue font-bold"
                    something="else"
                  >
                    REGISTER
                  </BaseButton>
                </div>
                <div class="w-full ml-2">
                  <BaseButton
                    type="submit"
                    :disabled="false"
                    class="text-white h-12 w-full bg-buttonblue font-bold"
                    something="else"
                  >
                    LOG IN
                  </BaseButton>
                </div>
              </div>
              <!-- <div class="mx-8">
                                <input
                                    type="password"
                                    class="input"
                                    placeholder="Enter your password"
                                    v-model="password" required>
                                </div> -->
              <!-- <div class="validation_error on_passcode" id="errorPasscode">
                                    MUST ENTER A VALID PASSCODE</div>

                            <div class="alert alert-danger" v-if="errorVisible"></div> -->
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import NavVari from "@/components/NavVari.vue";

export default {
  name: "LoginPage",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      email: "",
      password: "",
      showPassword: false,
      error: "",
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
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    login() {
      this.$store
        .dispatch("user/login", {
          username: this.email,
          password: this.password,
        })
        .then((error) => {
          if (!error) {
            this.$router.push({ name: "Home" });
          } else {
            this.$router.push({ name: "Login" });
          }
        });
    },
  },
  components: {
    NavVari,
  },
};
</script>
