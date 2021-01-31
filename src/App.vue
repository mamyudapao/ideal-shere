<template>
  <div id="app">
    <PostCard></PostCard>
    <router-link to="home">Home</router-link>
    <router-view/>
    
  </div>
</template>

<script>
import PostCard from './components/modules/PostCard'
export default {
  name: 'App',
  components: {
    PostCard
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
