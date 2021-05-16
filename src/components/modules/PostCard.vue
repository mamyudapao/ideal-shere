<template>
  <div class="container">
    <div class="card" v-for="article in articles" :key="article.id">
      <div class="card-body">
        <h5 class="card-title">{{ article.title }}</h5>
        <p class="card-text">{{ article.detail }}</p>
        <p class="card-text">{{ article.author }}</p>
        <!--TODO user_idからユーザー名に変更する。 -->
        <router-link :to="`detail/${article.id}`">詳細を見る</router-link>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['articles']
};
</script>

<style>
.card {
  padding-top: 10px;
  margin-top: 10px;
}
</style>
