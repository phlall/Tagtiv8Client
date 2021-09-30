<template>
  <div
    class="
      pt-3
      sm:pt-2
      text-navxs
      sm:text-nav
      text-white
      sm:ml-4 sm:mr-4
      mr-2
      flex
      sm:justify-end
      justify-start
      sm:pl-0
    "
  >
    <div
      v-for="(crumb, ci) in crumbs"
      :key="ci"
      class="flex flex-nowrap mb-auto"
    >
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
      <div v-if="!isLast(ci)" class="px-1 inline-block">/</div>
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
