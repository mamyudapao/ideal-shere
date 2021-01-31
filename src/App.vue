<template>
  <div id="app">
    <Header></Header>
    <PostCard></PostCard>
    <router-link to="home">Home</router-link>
    <router-view/>
    
  </div>
</template>

<script>
import PostCard from './components/modules/PostCard'
import Header from './components/modules/Header'
export default {
  name: 'App',
  components: {
    PostCard,
    Header,
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
}
</style>
