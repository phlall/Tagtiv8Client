<template>
  <div class="pt-2 text-nav text-white ml-4 flex">
    <div v-for="(crumb, ci) in crumbs" :key="ci">
      <BaseButton
        @click="$router.push(crumb.route)"
        :class="
          isLast(ci) || !crumb.route.length
            ? 'cursor-default'
            : 'hover:text-gridrowbluehover'
        "
        :disabled="isLast(ci) || !crumb.route.length"
      >
        {{ crumb.name }}
      </BaseButton>
      <span v-if="!isLast(ci)" class="px-1">/</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    crumbs: {
      type: Array,
      required: true,
    },
  },
  methods: {
    isLast(index) {
      return index === this.crumbs.length - 1;
    },
    selected(crumb) {
      this.$emit("selected", crumb);
    },
  },
};
</script>
