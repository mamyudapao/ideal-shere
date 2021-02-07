<template>
  <div>
    <nav
      class="navbar navbar-expand-lg navbar-light"
      style="background:#ffffff"
    >
      <div class="container-fluid" id="header-flex">
        <div class="left-contents">
          <a class="navbar-brand" href="#">idealShere</a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>

        <div class="navbar-center" id="navbar-list">
          <div class="collapse navbar-collapse " id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <router-link to="/" class="nav-link active" aria-current="page"
                  >Home</router-link
                >
              </li>
              <li class="nav-item">
                <router-link to="/" class="nav-link active" aria-current="page"
                  >マイページ</router-link
                >
              </li>
              <li class="nav-item">
                <router-link to="/" class="nav-link active" aria-current="page"
                  >通知</router-link
                >
              </li>
              <li class="nav-item">
                <router-link to="/" class="nav-link active" aria-current="page"
                  >DM</router-link
                >
              </li>
            </ul>
          </div>
        </div>

        <!-- form modalでホーム画面内に出したいので、routerではなくコンポーネントを入れる。 -->
        <div class="nav-right" v-if="!isAuthenticated">
          <PostForm></PostForm>
          <router-link to="/signin" class="nav-link active" id="signin-icon"
            ><font-awesome-icon :icon="['fas', 'user-plus']"
          /></router-link>
          <router-link to="/login" class="nav-link active" id="login-icon"
            ><font-awesome-icon :icon="['fas', 'sign-in-alt']"
          /></router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import PostForm from "./PostForm";
export default {
  components: {
    PostForm,
  },
  computed: {
    isAutenticated() {
      return this.$store.getters.access_token !== null;
    },
  },
};
</script>

<style>
#navbar-list {
}

.nav-right {
  display: flex;
}

#signin-icon {
  color: black;
  padding-top: 8px;
}

#login-icon {
  color: black;
  padding-top: 8px;
}
</style>
