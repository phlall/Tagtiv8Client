<template>
  <div>
    <div class="w-full sm:3/4 lg:w-1/2 m-auto mt-6">
      <div class="pb-4 pl-8">
        <h2 class="font-bold text-xl text-gray-600">
          Password Change for {{ user.firstName }} {{ user.lastName }}
        </h2>
      </div>
      <form class="form" v-on:submit.prevent="submit">
        <div class="mt-4 pb-2 px-8">
          <div class="flex">
            <div class="flex-initial w-72">
              <BaseInput
                v-model="password"
                :type="passwordFieldType"
                class="
                  h-12
                  border
                  pl-2
                  border-gray-500
                  focus:outline-none
                  focus:ring-2
                  focus:ring-purple-400
                  focus:border-transparent
                  bg-white
                  w-full
                "
                placeholder="Enter your password"
                @blur="v$.password.$touch"
              />
            </div>
            <div class="pt-4 pl-4">
              <button
                type="password"
                v-on:click.enter.prevent="switchVisibility"
              >
                <font-awesome-icon :icon="['fas', eyeIcon]" class="text-xl" />
              </button>
            </div>
          </div>
          <div class="pt-1 h-12 text-red-500 outline-0">
            <p v-if="v$.password.$invalid && v$.password.$dirty">
              Please enter a valid password.
            </p>
            <p v-if="v$.password.required.$invalid && v$.password.$dirty">
              Password is required.
            </p>
          </div>
        </div>
        <div class="pb-4 px-8">
          <BaseInput
            v-model="confirmPassword"
            :type="passwordFieldType"
            class="
              h-12
              w-72
              border
              pl-2
              border-gray-500
              focus:outline-none
              focus:ring-2
              focus:ring-purple-400
              focus:border-transparent
              bg-white
            "
            placeholder="Confirm your password"
            @blur="v$.confirmPassword.$touch"
          />
          <div class="pt-1 h-12 text-red-500 outline-0">
            <p
              v-if="
                v$.confirmPassword.required.$invalid &&
                v$.confirmPassword.$dirty
              "
            >
              Please enter a valid confirm password.
            </p>
            <p v-if="v$.confirmPassword.$invalid && v$.confirmPassword.$dirty">
              Matching Password is required.
            </p>
          </div>
        </div>
        <div class="px-8 mb-32">
          <div class="w-1/2 mr-2 mb-8">
            <BaseButton
              class="text-white h-12 w-full bg-buttonblue font-bold"
              v-on:click.enter.prevent="generatedPassword()"
            >
              Generate Password
            </BaseButton>
          </div>
          <div class="w-1/2 mr-2 mt-6">
            <BaseButton
              type="submit"
              :disabled="v$.$invalid"
              :class="
                v$.$invalid ? 'opacity-50 cursor-default' : 'cursor-pointer'
              "
              class="text-white h-12 w-full bg-buttonblue font-bold"
            >
              Save Password
            </BaseButton>
          </div>
          <p v-if="v$.$anyError" class="text-xslg text-red-500">
            Please fill out the required field(s).
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
const props = {
  user: {
    type: Object,
  },
};
export default {
  name: "Change Password",
  emits: ["closePasswordModal"],
  props,
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      password: "",
      confirmPassword: "",
      showPassword: false,
      error: "",
      legit: false,
      passwordLength: 10,
      refreshPassword: false,
      passwordFieldType: "password",
      eyeIcon: "eye-slash",
      optiondata: [
        {
          name: "lowercase",
          status: true,
          chars: "abcdefghjkmnopqrstuvwxyz",
        },
        {
          name: "uppercase",
          status: true,
          chars: "ABCDEFGHJKLMNOPQRSTUVWXYZ",
        },
        {
          name: "numbers",
          status: true,
          chars: "0123456789",
        },
        {
          name: "specialchars",
          status: false,
          chars: "!$%&?+*#-/",
        },
      ],
    };
  },
  validations() {
    return {
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
      },
      confirmPassword: {
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
        equalsPassword(value) {
          return this.password == value;
        },
        // sameAsPassword: sameAs("password"),
      },
    };
  },
  computed: {
    ...mapState(["user"]),
    charset() {
      return [...this.optiondata]
        .map((element) => {
          if (element.status === true) return element.chars;
        })
        .join("");
    },
  },
  methods: {
    switchVisibility() {
      this.passwordFieldType =
        this.passwordFieldType === "password" ? "text" : "password";
      this.eyeIcon = this.eyeIcon == "eye-slash" ? "eye" : "eye-slash";
    },
    generatedPassword() {
      this.refreshPassword;

      var pwd = [
        ...window.crypto.getRandomValues(new Uint32Array(this.passwordLength)),
      ]
        .map((value) => this.charset[value % this.charset.length])
        .join("");
      this.password = pwd;
      this.confirmPassword = pwd;
      //return pwd;
    },
    submit() {
      this.v$.$touch();
      if (!this.v$.$invalid) {
        //this.legit = true;
        this.$store
          .dispatch("user/resetPassword", {
            password: this.password,
            id: this.user.id,
            userName: this.user.username,
          })
          .then((error) => {
            if (!error) {
              (this.password = ""), (this.confirmPassword = "");
              this.$emit("closePasswordModal");
            }
          });
      }
    },
  },
};
</script>
