<template>
  <div id="nav">
        <navTop/>
        <navBar/>
    <!-- <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> -->
  </div>
  <router-view />
</template>
<script>
import navTop from "./components/NavTop.vue";
import navBar from "./components/NavBar.vue";

export default {
  components: {
   navBar,
   navTop
  }
}
</script>

