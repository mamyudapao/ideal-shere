<template>
  <div>
    投稿したプロジェクト
    <div class="container">
      <div class="card" v-for="madeProject in madeProjects" :key="madeProject.id">
        <div class="card-body">
          <h5 class="card-title">{{ madeProject.title }}</h5>
          <p class="card-text">{{ madeProject.detail }}</p>
          <p class="card-text">{{ madeProject.author }}</p>
          <!--TODO user_idからユーザー名に変更する。 -->
          <router-link :to="{ name: 'detail', params: {id: madeProject.id}}">詳細を見る</router-link>
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['madeProjects'],
    mounted() {
      this.getMadePosts();
    },
    methods: {
      getMadePosts: function(){
        this.$emit('getMadeProjects',{user_id: this.$route.params['id']});
      }
    }
  }
</script>

<style></style>
