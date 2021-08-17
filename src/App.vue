<template>
  <div>
    <div id="nav">
      <navTop />
      <!-- <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> -->
    </div>
     <NotificationContainer/>
    <router-view />
  </div>
</template>
<script>
import navTop from "./components/NavTop.vue";
import NotificationContainer from "./components/NotificationContainer.vue";
// import navBar from "./components/NavBar.vue";

export default {
  components: {
    navTop,
    NotificationContainer,
  },
};
</script>
