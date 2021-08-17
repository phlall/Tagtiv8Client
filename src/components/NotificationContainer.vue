<template>
  <div class="notification-container">
    <NotificationBar
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import NotificationBar from "./NotificationBar.vue";

export default {
  components: { NotificationBar },
  computed: mapState("notification", ["notifications"]),
};
</script>

<style scoped>
.notification-container {
  position: absolute;
  z-index: 1000;
  bottom: 60px;
  left: 20px;
  padding-right: 40px;
  padding-left: 20px;
  color: #fafafa;
  background-color: #a80e0e;
}
</style>
