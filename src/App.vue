<template>
  <div id="nav">
    <navTop />
  </div>
  <router-view class="text-gray-600" />
  <NotificationContainer />
</template>
<script>
import NotificationContainer from "@/components/NotificationContainer.vue";
import navTop from "./components/NavTop.vue";
import axios from "axios";

export default {
  created() {
    // localStorage.clear();
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
    const planString = localStorage.getItem("plan");
    if (planString) {
      // alert(JSON.stringify(planString));
      const plan = JSON.parse(planString);
      this.$store.commit("user/SET_PLAN", plan);
    }
  },
  components: {
    navTop,
    NotificationContainer,
  },
};
</script>
