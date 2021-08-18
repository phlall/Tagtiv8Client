<template>
  <div class="notification-bar" :class="notificationTypeClass">
    <p>{{ notification.message }}</p>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    notification: {
      type: Object,
      required: true,
    },
  },
  computed: {
    notificationTypeClass() {
      return `-text-${this.notification.type}`;
    },
  },
  data() {
    return {
      timeout: null,
    };
  },
  mounted() {
    this.timeout = setTimeout(() => this.remove(this.notification), 15000);
  },
  methods: mapActions("notification", ["remove"]),
  beforeUnmount() {
    clearTimeout(this.timeout);
  },
};
</script>

<style scoped>
.notification-bar {
  margin: 2em 0 2em;
}
</style>
