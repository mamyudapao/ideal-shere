<template>
  <div>
    <PostCard ref="postCard"></PostCard>
  </div>
</template>

<script>
import axios from "axios";
import PostCard from "../modules/PostCard";
export default {
  data() {
    return {
      posts: [],
    };
  },
  components: {
    PostCard,
  },
  mounted() {
    this.get();
  },
  methods: {
    get: function() {
      axios.get("http://127.0.0.1:8000/api/posts/").then((response) => {
        console.log(response.data);
      });
    },
    refreshPostCard: function() {
        console.log("うまくいってる");
        this.$refs.postCard.get();
    },
  },
};
</script>

<style></style>
