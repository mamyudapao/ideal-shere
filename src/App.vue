<template>
  <div id="app">
    <LoggedInHeader
      v-if="isAuthenticated"
      @refresh-articles="refresh_article"
    ></LoggedInHeader>
    <LoggedOutHeader v-else></LoggedOutHeader>
    <router-view ref="home"></router-view>
  </div>
</template>

<script>
import LoggedInHeader from "./components/modules/LoggedInHeader";
import LoggedOutHeader from "./components/modules/LoggedOutHeader";
export default {
  name: "App",
  components: {
    LoggedInHeader,
    LoggedOutHeader,
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.access_token !== null;
    },
  },
  methods: {
    refresh_article: function() {
      this.$refs.home.get();
    },
  },
};
</script>

<style>
#app {
  font-family: "Noto Sans JP", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  background: #6cdbeb !important;
}

button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;
  appearance: none;
}
</style>
