<template>
  <div>
    <div @click="setPlan(subject)" class="cursor-pointer relative">
      <inline-svg
        :src="require(`@/assets/images/${subject.image}.svg`)"
      ></inline-svg>
      <div
        class="
          absolute
          top-1/3
          w-full
          h-12
          text-center text-white
          pt-2
          font-bold
        "
        v-resize-text="{
          ratio: 1.5,
          delay: 0,
        }"
      >
        {{ subject.name }}
      </div>
    </div>
  </div>
</template>

<script>
//import { ContentLoader } from "vue-content-loader";
export default {
  props: {
    subject: {
      type: Object,
      required: true,
    },
    loaded: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      open: false,
    };
  },
  components: {
    // ContentLoader,
  },
  methods: {
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
        // item.isFavorite = false;
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
