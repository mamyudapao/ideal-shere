<template>
  <div class="container">
    <div class="card" v-for="post in posts" :key="post.id">
      <div class="card-body">
        <h5 class="card-title">{{ post.title }}</h5>
        <p class="card-text">{{ post.detail }}</p>
        <p class="card-text">{{ post.author }}</p>
        <!--TODO user_idからユーザー名に変更する。 -->
        <router-link :to="`detail/${post.id}`">詳細を見る</router-link>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      posts: [],
    };
  },
  mounted() {
    this.get();
  },
  methods: {
    get: function() {
      axios.get("http://127.0.0.1:8000/api/posts/").then((response) => {
        this.posts = response.data;
      });
    },
  },
};
</script>

<style>
.card {
  padding-top: 10px;
  margin-top: 10px;
}
</style>
