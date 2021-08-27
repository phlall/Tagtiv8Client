<template>
  <div class="w-full">
    <div class="flex justify-center pl-16" :class="outerClass">
      <div class="grid grid-cols-12 w-full max-w-screen-xl">
        <div class="col-start-1 col-span-11 w-full" :class="innerClass">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    outerClass: {
      type: String,
      default: "",
    },
    innerClass: {
      type: String,
      default: "",
    },
  },
};
</script>
