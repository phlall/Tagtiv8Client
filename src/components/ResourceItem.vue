<template>
  <div class="bg-gridrowblue">
    <div class="flex w-full" :class="handleToggle()" @click="toggle()">
      <div class="flex-shrink">
        <h2 class="w-full h-10 pl-4 pt-2 text-lg xl:text-lg 2xl:text-lg">
          {{ resource.name }}
        </h2>
      </div>
      <div class="flex-grow text-right">
        <BaseButton
          type="button"
          :disabled="!resource.resourceContent.length"
          class="py-1 px-2 mr-2"
        >
          <span class="text-3xl">
            <font-awesome-icon
              :icon="['fas', open ? 'caret-up' : 'caret-down']"
              :class="
                resource.resourceContent.length
                  ? 'text-gray-600'
                  : 'text-gray-400'
              "
          /></span>
        </BaseButton>
      </div>
    </div>
    <div
      v-for="(item, index) in resource.resourceContent"
      :key="index"
      class="cursor-pointer bg-white px-4"
    >
      <div
        class="grid grid-cols-1 sm:grid-cols-2 w-full pt-2"
        :class="
          index != resource.resourceContent.length - 1
            ? 'border-b border-gray-300'
            : ''
        "
        v-show="open"
      >
        <div>
          <h2
            class="
              w-full
              h-10
              text-gray-600
              pt-1
              text-sm
              xl:text-base
              2xl:text-base
            "
          >
            {{ item.name }}
          </h2>
        </div>
        <div class="flex justify-end">
          <div v-if="intro">
            <div class="mr-2">
              <button
                type="button"
                :disabled="false"
                class="
                  text-white
                  py-1
                  px-2
                  w-24
                  sm:w-28
                  bg-buttonblue
                  font-bold
                  text-xs
                  sm:text-base
                "
                @click="setResourceContent(item, 'Introduction')"
              >
                Introduction
              </button>
            </div>
          </div>
          <div v-else class="flex">
            <div class="mr-2">
              <BaseButton
                type="button"
                :disabled="false"
                class="py-1 px-2"
                @click="setFavorite(item)"
              >
                <span class="ml-4">
                  <font-awesome-icon
                    :icon="['fas', 'star']"
                    :class="item.isFavorite ? 'text-red-600' : 'text-gray-200'"
                /></span>
              </BaseButton>
            </div>
            <div class="mr-2">
              <button
                type="button"
                :disabled="false"
                class="
                  text-white
                  py-1
                  px-2
                  w-24
                  sm:w-28
                  bg-buttonblue
                  font-bold
                  text-xs
                  sm:text-base
                "
                @click="setResourceContent(item, 'LessonPlan')"
              >
                Lesson Plan
              </button>
            </div>
            <div class="mr-1">
              <BaseButton
                type="submit"
                :disabled="false"
                class="
                  text-white
                  py-1
                  px-2
                  bg-buttonblue
                  font-bold
                  mr-2
                  w-24
                  sm:w-28
                  text-xs
                  sm:text-base
                "
                @click="setResourceContent(item, 'WorkSheet')"
              >
                Work Sheet
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    resource: {
      type: Object,
      required: true,
    },
    // loaded: {
    //   type: Boolean,
    // },
    intro: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      open: false,
    };
  },
  methods: {
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
