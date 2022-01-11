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
        <div class="w-80">
          <h2 class="pt-2 text-smlg">
            {{ user.username }}
          </h2>
        </div>
        <div class="w-72 ml-5 pl-4">
          <h2 class="pt-2 text-smlg">
            {{ user.school }}
          </h2>
        </div>
      </BaseButton>

      <div class="flex justify-end my-2 h-8">
        <div class="w-16">
          <div
            v-show="user.isAdmin"
            class="
              bg-green-500
              rounded
              px-2
              py-1
              mr-1
              text-nav text-center text-white
            "
          >
            admin
          </div>
        </div>
        <div
          class="
            mr-1
            text-white
            py-1 py-1
            text-nav
            bg-blue-600
            rounded
            h-8
            w-8
            text-center
          "
        >
          {{ user.logonsCount }}
        </div>

        <div class="mr-2 h-8">
          <button
            type="button"
            :disabled="false"
            class="text-white py-1 px-3 bg-buttonblue text-nav rounded h-8"
            @click="changePassword()"
          >
            Reset Pwd
          </button>
        </div>
        <div class="mr-1">
          <BaseButton
            type="submit"
            :disabled="false"
            class="text-white py-1 px-3 bg-buttonblue mr-2 text-nav rounded h-8"
            @click="deleteUser(user.id)"
          >
            Delete
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
  emits: ["deleteUser"],
  data() {
    return {
      open: this.isOpen,
      grouped: [],
    };
  },
  methods: {
    userDetail() {
      //alert(this.user.id);
      //this.$router.push("UserDetail", user);
      this.$emit("showModal", { userId: this.user.id });
    },
    // itemCategories(item) {
    //  // alert(JSON.stringify(item));
    //   //alert(JSON.stringify(_.groupBy(item, (item) => item.resourceName)));
    //   //return _.groupBy(item, (item) => item.subject.resourceName);
    //   return null;
    // },
    deleteUser(userId) {
      if (confirm("Do you want to permanently delete this user?")) {
        this.$store
          .dispatch("user/deleteUser", { userId })
          .then(() => {
            this.$emit("deleteUser", { userId });
          })
          .catch(() => {});
      }
    },
    changePassword() {},
    // setResourceContent(resourceItem, type) {
    //   let resourceObj = {
    //     id: this.resource.id,
    //     ageGroups: this.resource.ageGroups,
    //     name: this.resource.name,
    //     resourceContent: resourceItem,
    //   };
    //   this.$emit("setContent", { resourceObj, resourceType: type });
    // },
    // handleToggle() {
    //   let strClass = "";
    //   if (this.resource.resourceContent.length && !this.open) {
    //     strClass += "cursor-pointer hover:bg-gridrowbluehover text-gray-600";
    //   }
    //   if (this.resource.resourceContent.length && this.open) {
    //     strClass += "cursor-pointer bg-gridrowbluedark text-white";
    //   }
    //   return strClass;
    // },
    // toggle() {
    //   this.open = !this.open;
    // },
    // setFavorite(item) {
    //   const itemId = item.id;
    //   const fav = item.isFavorite;
    //   item.isFavorite = !item.isFavorite;
    //   if (fav) {
    //     this.$store
    //       .dispatch("user/deleteFavorite", { itemId })
    //       .then(() => {})
    //       .catch(() => {
    //         item.isFavorite = !item.isFavorite;
    //       });
    //   } else {
    //     this.$store
    //       .dispatch("user/addFavorite", { itemId })
    //       .then(() => {})
    //       .catch(() => {
    //         item.isFavorite = !item.isFavorite;
    //       });
    //   }
    // },
  },
};
</script>
