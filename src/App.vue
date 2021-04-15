<template>
  <div id="app">
    <LoggedInHeader
      v-if="isAuthenticated"
      @refresh-articles="refresh_article"
      :notifications="notifications"
    ></LoggedInHeader>
    <LoggedOutHeader v-else></LoggedOutHeader>
    <router-view
      ref="home"
      @profile_image="updateUserIcon"
      @get_user="getUser()"
      @update_profile="updateProfile"
      :user="user"
    ></router-view>
  </div>
</template>

<script>
import LoggedInHeader from "./components/modules/LoggedInHeader";
import LoggedOutHeader from "./components/modules/LoggedOutHeader";
import axios from "axios";
export default {
  name: "App",
  components: {
    LoggedInHeader,
    LoggedOutHeader,
  },
  data() {
    return {
      user: null,
      notifications: null,
    };
  },
  mounted() {
    this.getNotifications();
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.access_token !== null;
    },
    access_token() {
      return this.$store.getters.access_token;
    },
  },
  methods: {
    refresh_article: function() {
      this.$refs.home.get();
    },
    getUser: async function() {
      await axios
        .get(`http://localhost:8000/users/${this.$route.params.id}`)
        .then((response) => {
          console.log(response.data);
          this.user = response.data;
        });
    },
    updateUserIcon: async function(event) {
      console.log(event);
      const fd = new FormData();
      fd.append("image", event);
      await axios
        .patch(
          `http://localhost:8000/users/${this.$store.getters.user_id}`,
          fd,
          {
            headers: {
              Authorization: `Bearer ${this.access_token}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
        });
      this.getUser();
    },
    updateProfile: async function(event) {
      console.log(event);
      axios
        .patch(
          `http://localhost:8000/users/${this.$store.getters.user_id}`,
          {
            username: event.username,
            introduction: event.introduction,
          },
          {
            headers: {
              Authorization: `Bearer ${this.access_token}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
        });
    },
    getNotifications: async function() {
      axios.get(`http://localhost:8000/api/notification/`, {
        headers: {
          Authorization: `Bearer ${this.access_token}`,
        },
      }).then((response) => {
        this.notifications = response.data;
      });
    },
  },
};
</script>

<style>
#app {
  font-family: "Noto Sans JP", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  background: #6cdbeb !important;
}

button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;
  appearance: none;
}
</style>
