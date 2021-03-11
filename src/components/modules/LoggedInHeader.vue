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
        <div class="nav-right">
          <PostForm @emit-post="send_post($event)"></PostForm>
          <button type="button" @click="logout" id="logout-button">
            <font-awesome-icon :icon="['fas', 'sign-out-alt']" />
          </button>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import PostForm from "./PostForm";
import axios from "axios";
export default {
  data() {
    return {
      post: [],
    };
  },
  components: {
    PostForm,
  },
  computed: {
    isAutenticated() {
      return this.$store.getters.access_token !== null;
    },
    access_token() {
      return this.$store.getters.access_token;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
    send_post: function(event) {
      this.post = event;
      axios.post(
        "http://127.0.0.1:8000/api/posts/",
        {
          title: this.post.title,
          detail: this.post.detail,
          member_number: this.post.member_number,
          invitation: this.post.invitation,
        },
        {
          headers: {
            Authorization: `Bearer ${this.access_token}`,
          },
        }
      );
      this.$emit("refresh-articles");
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

#logout-button {
  border: none;
  background: transparent;
}
</style>
