<template>
  <div class="bg-gray-600">
    <div
      class="flex w-full pb-2"
      :class="handleToggle()"
      @click="toggle()"
      v-if="!isOpen"
    >
      <div class="flex-shrink">
        <h2
          class="
            w-full
            h-10
            pl-4
            pt-3
            text-lg
            xl:text-lg
            2xl:text-lg
            text-gray-200
          "
        >
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
              :class="!open ? 'text-gray-400' : 'text-white'"
          /></span>
        </BaseButton>
      </div>
    </div>
    <div class="bg-gray-400">
      <div
        class="w-full bg-white"
        v-for="(item, index) in grouped"
        :key="index"
        v-show="open"
      >
        <!-- <div class="border-t border-gray-400 w-full">
          <ResourceItem :resource="item" @setContent="setContent($event)" />
        </div> -->
        <div
          class="
            border-t border-gray-400
            w-full
            pl-6
            py-2
            bg-gridrowblue
            text-lg
          "
        >
          {{ item.name }}
        </div>
        <div
          v-for="(activity, activityIndex) in item.resourceContent"
          :key="activityIndex"
          class="bg-white px-4 pl-8"
        >
          <div
            class="grid grid-cols-1 sm:grid-cols-2 w-full pt-2"
            :class="activityIndex != 0 ? 'border-t border-gray-300' : ''"
          >
            <div>
              <h2
                class="
                  w-full
                  h-8
                  sm:h-10
                  text-gray-600
                  pt-1
                  sm:pt-2
                  text-sm
                  xl:text-base
                  2xl:text-base
                  text-center
                  sm:text-left
                "
                :class="
                  resource.resourceContent.length <= 1 && intro
                    ? 'text-lg font-bold'
                    : ''
                "
              >
                {{ activity.name }}
              </h2>
            </div>
            <div class="flex justify-center sm:justify-end">
              <div class="mr-2 pb-1 sm:pb-0 flex-grow text-right">
                <BaseButton
                  type="button"
                  :disabled="false"
                  class="py-1 px-2"
                  @click="setFavorite(item)"
                >
                  <span class="ml-4">
                    <font-awesome-icon
                      :icon="['fas', 'star']"
                      :class="
                        item.isFavorite ? 'text-red-600' : 'text-gray-200'
                      "
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
                  @click="setResourceContent(activity, 'LessonPlan')"
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
                  @click="setResourceContent(activity, 'WorkSheet')"
                >
                  Activity Card
                </BaseButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
//import ResourceItem from "../components/ResourceItem.vue";
export default {
  name: "ResourceBlendedItem",
  props: {
    resource: {
      type: Object,
      required: true,
    },
    intro: {
      type: Boolean,
      default: false,
    },
    isView: {
      type: Boolean,
      default: false,
    },
    isOpen: {
      type: Boolean,
      default: false,
    },
    isBlended: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      open: this.isOpen,
      grouped: [],
    };
  },
  created() {
    let rs = this.resource.resourceContent;

    // this.grouped = _.groupBy(rs, (rs) => rs.resourceContent.resourceName);
    this.grouped = _(rs)
      .groupBy((o) => o.resourceName)
      .map((resourceContent, name) => ({ name, resourceContent }))
      .orderBy("name") //using ES6 shorthand to generate the objects
      .value();

    //this.grouped = this.resource.resourceContent;
  },
  components: {
    // ResourceItem,
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
        strClass += "cursor-pointer hover:bg-gray-500 text-gray-600";
      }
      if (this.resource.resourceContent.length && this.open) {
        strClass += "cursor-pointer bg-gray-400 text-white";
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
