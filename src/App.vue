<template>
  <div id="app">
    <LoggedInHeader
      v-if="isAuthenticated"
      @refresh-articles="refresh_article"
      @check-notification="checkNotification"
      :notifications="notifications"
    ></LoggedInHeader>
    <LoggedOutHeader v-else></LoggedOutHeader>
    <router-view
      ref="home"
      @profile_image="updateUserIcon"
      @get_user="getUser()"
      @get_notifications="getNotifications"
      @update_profile="updateProfile"
      @get-chat-room="getChatRoom($event)"
      @send-message="sendMessage($event)"
      @getUserProjects="getUser()"
      @getUserJoinProjects="getUserJoinProjects($event)"
      @getMadeProjects="getMadeProjects($event)"
      :user="user"
      :user-projects="projects"
      :userJoinProjects="userJoinProjects"
      :messages="messages"
      :madeProjects="madeProjects"
    ></router-view>
  </div>
</template>

<script>
import LoggedInHeader from "./components/modules/LoggedInHeader";
import LoggedOutHeader from "./components/modules/LoggedOutHeader";
import axios from "./api-axios";
export default {
  name: "App",
  components: {
    LoggedInHeader,
    LoggedOutHeader,
  },
  data() {
    return {
      user: null,
      projects: null,
      notifications: null,
      messages: null,
      madeProjects: null,
      userJoinProjects: null,
    };
  },
  mounted() {
    this.getNotifications();
    this.getUser();
  },
  updated() {},
  computed: {
    isAuthenticated() {
      return this.$store.getters.access_token !== null;
    },
    access_token() {
      return this.$store.getters.access_token;
    },
  },
  methods: {
    refresh_article:async function() {
      await this.$refs.home.get();
    },
    getUser: async function() {
      await axios
        .get(`/users/${this.$store.getters.user_id}`)
        .then((response) => {
          console.log(response.data);
          this.user = response.data;
          this.projects = response.data.projects;
        });
    },
    updateUserIcon: async function(event) {
      console.log(event);
      const fd = new FormData();
      fd.append("image", event);
      await axios
        .patch(
          `/users/${this.$store.getters.user_id}`,
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
          `/users/${this.$store.getters.user_id}`,
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
      axios
        .get(`/api/notifications/`, {
          headers: {
            Authorization: `Bearer ${this.access_token}`,
          },
        })
        .then((response) => {
          console.log("get notification");
          this.notifications = response.data;
          if (Object.keys(this.notifications).length == 0) {
            this.notifications = null;
          }
        });
    },
    checkNotification: async function(event) {
      await axios.patch(
        `/api/notifications/${event.id}`,
        {
          checked: true,
        },
        {
          headers: {
            Authorization: `Bearer ${this.access_token}`,
          },
        }
      );
      await this.getNotifications();
    },
    getChatRoom: async function(room) {
      console.log(room);
      axios
        .get(`/api/chat/`, {
          params: {
            room: room,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.messages = response.data;
          this.convertUTCtoJST(this.messages);
        });
    },
    convertUTCtoJST: function(item) {
      for (let i = 0; i < Object.keys(item).length; i++) {
        let japanTime = new Date(item[i].created_at);
        this.messages[i].created_at = japanTime.toLocaleString({
          timeZone: "Asia/Tokyo",
        });
      }
    },
    sendMessage: function(data) {
      axios
        .post(
          `/api/chat/`,
          {
            message: data.message,
            room: data.room,
            user: this.$store.getters.user_id,
          },
          {
            headers: {
              Authorization: `Bearer ${this.access_token}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          this.getChatRoom(data.room);
        });
    },
    getMadeProjects: async function(event) {
      axios.get(`api/posts/user/${event.user_id}`,{ headers: {
        Authorization: `Bearer ${this.access_token}`
      }}).then((response) =>{
        this.madeProjects = response.data;
      })
    },
    getUserJoinProjects: async function(event) {
      axios.get(`/users/${event.user_id}`,{ headers: {
        Authorization: `Bearer ${this.access_token}`
      }}).then((response) =>{
        console.log(response.data);
        this.userJoinProjects = response.data.projects;
      })
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
