<template>
  <div class="bg-gridrowblue">
    <div class="flex w-full">
      <BaseButton
        class="
          flex-grow flex
          hover:bg-blue-300 hover:cursor-pointer
          rounded
          mr-2
          text-left
        "
        @click="userDetail()"
      >
        <div class="w-32">
          <h2 class="pl-4 pt-2 text-smlg text-left">
            {{ user.firstName }}
          </h2>
        </div>
        <div class="w-32">
          <h2 class="pt-2 text-smlg">
            {{ user.lastName }}
          </h2>
        </div>
        <div class="w-80 overflow-hidden">
          <h2 class="pt-2 text-smlg">
            {{ user.username }}
          </h2>
        </div>
        <div class="flex-grow ml-5 pl-4 pr-2">
          <h2 class="pt-2 text-smlg">
            {{ user.school }}
          </h2>
        </div>
      </BaseButton>

      <div class="flex justify-end my-2 h-8">
        <div
          v-show="user.isSubscribed"
          class="
            bg-yellow-500
            rounded
            w-8
            h-8
            px-1
            pt-1.5
            text-nav text-center text-white
          "
          :class="!user.isAdmin ? 'mr-10' : 'mr-1'"
        >
          {{ user.subscribedMonths }}
          <!-- <font-awesome-icon
            :icon="['fas', 'check']"
            class="text-white text-md"
          /> -->
        </div>
        <div
          v-show="user.isAdmin"
          class="
            bg-green-500
            rounded
            w-8
            h-8
            px-1
            pt-1.5
            mr-1
            text-nav text-center text-white
          "
        >
          <font-awesome-icon
            :icon="['fas', 'check']"
            class="text-white text-md"
          />
        </div>
        <div class="mr-1 text-center">
          <button
            type="button"
            :disabled="false"
            class="
              text-white
              bg-blue-600
              text-nav
              rounded
              h-8
              w-8
              hover:opacity-50
            "
            @click="userLogons()"
          >
            {{ user.logonsCount }}
          </button>
        </div>

        <div class="mr-2 h-8">
          <button
            type="button"
            :disabled="false"
            class="
              text-white
              bg-buttonblue
              hover:opacity-50
              text-nav
              rounded
              h-8
              w-8
            "
            @click="changePassword()"
          >
            <font-awesome-icon :icon="['fa', 'unlock']" />
          </button>
        </div>
        <div class="mr-1">
          <BaseButton
            type="submit"
            :disabled="false"
            class="
              text-white
              py-1
              px-3
              bg-pink-800
              mr-2
              text-nav
              rounded
              h-8
              hover:opacity-50
            "
            @click="deleteUser()"
          >
            <font-awesome-icon :icon="['fa', 'user-times']" />
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import _ from "lodash";
export default {
  name: "User",
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  emits: ["deleteUser", "showChangePassword", "showUserLogons"],
  data() {
    return {
      open: this.isOpen,
      grouped: [],
    };
  },
  methods: {
    userDetail() {
      this.$emit("showUserDetail", { userId: this.user.id });
    },
    userLogons() {
      this.$emit("showUserLogons", { userId: this.user.id });
    },
    deleteUser() {
      if (confirm("Do you want to permanently delete this user?")) {
        this.$store
          .dispatch("user/deleteUser", this.user.id)
          .then(() => {
            this.$emit("deleteUser", this.user.id);
          })
          .catch(() => {});
      }
    },
    changePassword() {
      this.$emit("showChangePassword", this.user);
    },
  },
};
</script>
