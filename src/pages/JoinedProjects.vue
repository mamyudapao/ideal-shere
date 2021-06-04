<template>
  <div>
    参加中のプロジェクト
    <div class="container">
      <div class="card" v-for="project in userJoinProjects" :key="project.id">
        <div class="card-body">
          <h5 class="card-title">{{ project.title }}</h5>
          <p class="card-text">{{ project.detail }}</p>
          <p class="card-text">{{ project.author }}</p>
          <!--TODO user_idからユーザー名に変更する。 -->
          <router-link :to="{ name: 'detail', params: { id: project.id } }"
            >詳細を見る</router-link
          >
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["userJoinProjects"],
  mounted() {
    this.getUserJoinProject()
  },
  methods: {
    getUserJoinProject: function() {
      this.$emit("getUserJoinProjects", {user_id: this.$route.params.id})
    }
  }
};
</script>

<style></style>
