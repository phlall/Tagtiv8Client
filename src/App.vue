<template>
  <div id="nav">
    <navTop />
  </div>
  <router-view />
  <NotificationContainer />
</template>
<script>
import NotificationContainer from "@/components/NotificationContainer.vue";
import navTop from "./components/NavTop.vue";

export default {
  components: {
    navTop,
    NotificationContainer,
  },
};
</script>
