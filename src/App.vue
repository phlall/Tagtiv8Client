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
import axios from "axios";

export default {
  created() {
    const userString = localStorage.getItem("user");
    if (userString) {
      const userData = JSON.parse(userString);
      this.$store.commit("user/SET_USER_DATA", userData);
    }
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          this.$store.dispatch("logout");
        }
        return Promise.reject(error);
      }
    );
  },
  components: {
    navTop,
    NotificationContainer,
  },
};
</script>
