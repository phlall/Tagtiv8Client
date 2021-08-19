<template>
  <div>
    <div class="flex w-full">
      <div class="flex-shrink">
        <h2
          class="
            w-full
            h-10
            pl-4
            text-gray-600
            pt-2
            text-lg
            xl:text-lg
            2xl:text-lg
          "
        >
          {{ resource.name }}
        </h2>
      </div>

      <div class="flex-grow text-right">
        <BaseButton
          type="button"
          :disabled="false"
          class="py-1 px-2 mr-2"
          @click="toggle"
        >
          <span class="text-3xl">
            <font-awesome-icon
              :icon="['fas', open ? 'caret-up' : 'caret-down']"
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
        class="flex w-full pt-2"
        :class="
          index != resource.resourceContent.length - 1
            ? 'border-b border-gray-300'
            : ''
        "
        v-show="open"
      >
        <div class="flex-shrink">
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
        <div class="flex-grow flex justify-end">
          <div class="mr-2">
            <BaseButton type="button" :disabled="false" class="py-1 px-2">
              <span class="ml-4">
                <font-awesome-icon :icon="['fas', 'star']"
              /></span>
            </BaseButton>
          </div>
          <div class="mr-2">
            <BaseButton
              type="button"
              :disabled="false"
              class="text-white py-1 px-2 w-full bg-buttonblue font-bold"
            >
              Lesson Plan
            </BaseButton>
          </div>
          <div class="mr-1">
            <BaseButton
              type="submit"
              :disabled="false"
              class="text-white py-1 px-2 w-full bg-buttonblue font-bold mr-2"
              something="else"
            >
              Work Sheet
            </BaseButton>
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
  },
  data() {
    return {
      open: false,
    };
  },
  methods: {
    toggle() {
      this.open = !this.open;
    },
  },
};
</script>
