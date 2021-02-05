<template>
  <div id="app">
    <Header></Header>
    <router-view/>
    
  </div>
</template>

<script>
import Header from './components/modules/Header'
export default {
  name: 'App',
  components: {
    Header,
  }
}
</script>

<style>
#app {
  font-family: 'Noto Sans JP', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  background: linear-gradient(to right top, #65dfc9, #6cdbeb);
}


</style>
