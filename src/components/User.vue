<template>
  <div class="bg-gridrowblue">
    <div class="flex w-full">
      <div class="flex-grow flex">
        <div class="w-2/12">
          <h2 class="pl-4 pt-2 text-smlg text-left">
            {{ user.firstName }}
          </h2>
        </div>
        <div class="w-2/12">
          <h2 class="pt-2 text-smlg">
            {{ user.lastName }}
          </h2>
        </div>
        <div class="w-4/12">
          <h2 class="pt-2 text-smlg">
            {{ user.username }}
          </h2>
        </div>
        <div class="w-4/12">
          <h2 class="pt-2 text-smlg">
            {{ user.school }}
          </h2>
        </div>
      </div>

      <div class="flex justify-end my-2">
        <div class="w-16">
          <div
            v-show="user.isAdmin"
            class="
              bg-green-500
              rounded
              px-2
              py-1
              mr-2
              text-nav text-center text-white
            "
          >
            admin
          </div>
        </div>
        <div class="mr-2">
          <button
            type="button"
            :disabled="false"
            class="text-white py-1 px-3 bg-buttonblue text-nav"
            @click="changePassword()"
          >
            Change Password
          </button>
        </div>
        <div class="mr-1">
          <BaseButton
            type="submit"
            :disabled="false"
            class="text-white py-1 px-3 bg-buttonblue mr-2 text-nav"
            @click="deleteUser()"
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
  data() {
    return {
      open: this.isOpen,
      grouped: [],
    };
  },
  methods: {
    itemCategories(item) {
      alert(JSON.stringify(item));
      //alert(JSON.stringify(_.groupBy(item, (item) => item.resourceName)));
      //return _.groupBy(item, (item) => item.subject.resourceName);
      return null;
    },
    deleteUser() {},
    changePassword() {},
    setResourceContent(resourceItem, type) {
      let resourceObj = {
        id: this.resource.id,
        ageGroups: this.resource.ageGroups,
        name: this.resource.name,
        resourceContent: resourceItem,
      };
      this.$emit("setContent", { resourceObj, resourceType: type });
    },
    handleToggle() {
      let strClass = "";
      if (this.resource.resourceContent.length && !this.open) {
        strClass += "cursor-pointer hover:bg-gridrowbluehover text-gray-600";
      }
      if (this.resource.resourceContent.length && this.open) {
        strClass += "cursor-pointer bg-gridrowbluedark text-white";
      }
      return strClass;
    },
    toggle() {
      this.open = !this.open;
    },
    setFavorite(item) {
      const itemId = item.id;
      const fav = item.isFavorite;
      item.isFavorite = !item.isFavorite;
      if (fav) {
        this.$store
          .dispatch("user/deleteFavorite", { itemId })
          .then(() => {})
          .catch(() => {
            item.isFavorite = !item.isFavorite;
          });
      } else {
        this.$store
          .dispatch("user/addFavorite", { itemId })
          .then(() => {})
          .catch(() => {
            item.isFavorite = !item.isFavorite;
          });
      }
    },
  },
};
</script>
