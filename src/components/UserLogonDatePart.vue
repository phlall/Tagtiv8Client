<template>
  <div>
    <div class="flex">
      <div class="flex-grow pl-4 pb-2 flex">
        <div class="flex-grow pt-2">
          {{ day.parent }}
        </div>
        <div
          class="
            bg-red-700
            px-1.5
            h-5
            rounded-full
            mr-4
            mt-2
            text-center text-white text-sm
          "
        >
          {{ logonsCount }}
        </div>
        <div class="text-right h-4 pb-2 pt-0 pr-4 align-top">
          <!-- {{ getYearLogons("year", logon.parent) }} -->
          <BaseButton @click="open = !open">
            <font-awesome-icon
              :icon="['fas', open ? 'caret-down' : 'caret-up']"
              class="text-gray-500 text-3xl"
            />
          </BaseButton>
        </div>
      </div>
    </div>
    <div class="text-right">
      <div v-if="open" class="pb-2">
        <div
          v-for="(time, index2) in day.children"
          :key="index2"
          class="pb-1 pr-1"
        >
          <div class="px-6">
            {{ getTime(time.logonDateTime) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const props = {
  day: {
    type: Object,
  },
  logonsCount: {
    type: Number,
  },
};
import formatDateMixin from "../Mixins/formatDate.js";
export default {
  name: "UserLogonDatePart",
  props,
  mixins: [formatDateMixin],
  data() {
    return {
      open: false,
    };
  },
};
</script>
