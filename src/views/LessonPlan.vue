<template>
  <div>
    <div><NavVari /></div>
    <div class="grid grid-cols-2 w-9/12 mt-12 m-auto bg-gray-300">
      <div class="pl-1">
        <h3 class="font-bold text-gray-600 text-left pt-2">
          {{ resource.name }} {{ resource.resourceContent.name }} Lesson Plan
        </h3>
      </div>
      <div class="flex justify-end pt-2 pr-1">
        <div class="mr-3 text-sm">Add to Favorites:</div>
        <div>
          <BaseButton
            type="button"
            :disabled="false"
            class=""
            @click="setFavorite(item)"
            :class="
              resource.resourceContent.isFavorite
                ? 'text-red-600'
                : 'text-gray-200'
            "
          >
            <span class=""> <font-awesome-icon :icon="['fas', 'star']" /></span>
          </BaseButton>
        </div>
        <div class="ml-4 text-sm">View Work Sheet</div>
        <div>
          <BaseButton
            type="button"
            :disabled="false"
            v-if="!loggedIn"
            @click="setFavorite(item)"
          >
            <span class="ml-4">
              <font-awesome-icon
                :icon="['far', 'faFileAlt']"
                :class="
                  resource.resourceContent.isFavorite
                    ? 'text-red-600'
                    : 'text-gray-200'
                "
            /></span>
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavVari from "@/components/NavVari.vue";
import { mapGetters } from "vuex";
//import _ from "lodash";
export default {
  props: ["contentId"],
  components: {
    NavVari,
  },
  created() {
    //this.getContent();
  },
  methods: {
    setFavorite() {
      let rs = this.resource.resourceContent;
      const rsId = rs.id;
      if (rs.isFavorite) {
        rs.isFavorite = false;
        this.$store
          .dispatch("user/deleteFavorite", { itemId: rsId })
          .then(() => {})
          .catch(() => {
            rs.isFavorite = true;
          });
      } else {
        rs.isFavorite = true;
        this.$store
          .dispatch("user/addFavorite", { itemId: rsId })
          .then(() => {})
          .catch(() => {
            rs.isFavorite = false;
          });
      }
    },
  },
  computed: {
    ...mapGetters(["resource"]),
  },
};
</script>
