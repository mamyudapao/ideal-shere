<template>
  <div>
    <img :src="user.image" class="profile-image"/>
    <h1>{{ user.username }}</h1>
    <p>{{ user.introduction }}</p>
    <div class="projects-group">
      <span id="made_projects">
        <h4>投稿</h4>
        <router-link :to="{name: 'made_projects', params: {id: user.id}}">
          <p>{{ user.made_projects }}</p>
        </router-link>
      </span>
      <span id="joined_projects">
        <h4>参加</h4>
        <router-link :to="{name: 'joined_projects', params: {id: user.id}}">
          <p>{{ user.projects.length }}</p>
        </router-link>
      </span>
    </div>
  </div>
</template>
<script>
import axios from "../api-axios.js";
export default {
  data() {
    return {
      user: null,
    };
  },
  mounted() {
    this.getUserProfile();
  },
  methods: {
    getUserProfile: async function() {
      axios.get(`users/${this.$route.params["id"]}`).then((response) => {
        this.user = response.data;
      });
    },
  },
};
</script>
<style></style>
