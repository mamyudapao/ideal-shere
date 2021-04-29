<template>
  <div>
    <PostCard :articles="articles"></PostCard>
  </div>
</template>

<script>
import axios from "axios";
import PostCard from "../components/modules/PostCard";
export default {
  data() {
    return {
      articles: [],
    };
  },
  props: ['article'],
  components: {
    PostCard,
  },
  async beforeMount() {
    await this.$emit("get_user");
  },
  mounted() {
    this.get();
    this.getNotifications();
  },
  methods: {
    get: async function() {
      await axios.get("http://127.0.0.1:8000/api/posts/").then((response) => {
        console.log("aaa")
        this.articles = response.data;
      });
    },
    getNotifications: async function() {
      this.$emit("get_notifications");
    }
  },
};
</script>

