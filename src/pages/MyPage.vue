<template>
  <div class="parent-profile">
    <div class="image-block">
    <img :src="user.image">
    </div>
    <div class="profile-block">
    <p>{{ user.username }}</p>
    <h2>自己紹介文</h2>
    <p>{{ user.introduction }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      user: null,
    };
  },
  mounted() {
    this.getUser();
  },
  methods: {
    getUser: function() {
      axios
        .get(`http://localhost:8000/users/${this.$route.params.id}`)
        .then((response) => {
          console.log(response.data);
          this.user = response.data;
        });
    },
  },
};
</script>

<style>
  .parent-profile {
    display: flex;
    justify-content: center;
  }

  .image-block {
    margin-top: 150px;
  }

  .image-block img {
    height: 200px;
    width: 200px;;
    border-radius: 50%;
  }

  .profile-block {
    width: 50%;
  }
</style>
