<template>
  <div>
    <nav
      class="navbar navbar-expand-lg navbar-light"
      style="background:#ffffff"
    >
      <div class="container-fluid" id="header-flex">
        <div class="left-contents">
          <router-link to="/" class="navbar-brand">idealShere</router-link>
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
                <router-link
                  :to="`/mypage/${$store.getters.user_id}`"
                  class="nav-link active"
                  aria-current="page"
                  @profile_image="updateUserIcon"
                  >マイページ</router-link
                >
              </li>
              <li>
                <div v-if="notifications">
                  <b-dropdown
                    id="dropdown-1"
                    text="通知"
                    class="nav-item"
                    block
                    variant="primary"
                  >
                    <div
                      v-for="notification in notifications"
                      :key="notification.id"
                    >
                      <div v-if="notification.action == 'Like'">
                        <b-dropdown-item @click="checkNotification(notification)">あなたのコメントにいいねがつきました！</b-dropdown-item>
                      </div>
                      <div v-else-if="notification.action == 'Comment'">
                        <b-dropdown-item @click="checkNotification(notification)">あなたの投稿にコメントがつきました！</b-dropdown-item>
                      </div>
                    </div>
                  </b-dropdown>
                </div>
                <div v-else-if="!notifications">
                  <li class="nav-item">
                    <span class="nav-link">通知</span>
                  </li>
                </div>
              </li>
              <li class="nav-item">
                <router-link to="/chat-room" class="nav-link active" aria-current="page"
                  >グループチャット</router-link
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
import axios from "../../api-axios.js";

export default {
  data() {
    return {
      post: [],
    };
  },
  props: ["notifications"],
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
    send_post:async function(event) {
      this.post = event;
      await axios.post(
        "/api/posts/",
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
      ).then(() => {
        this.successPostNotification();
      }).catch(() => {
        this.failedPostNotification();
      });
      this.$emit("refresh-articles");
    },
    updateUserIcon: function(event) {
      console.log(event);
    },
    checkNotification: function(notification) {
      this.$router.push({name: 'detail', params: {id: notification.post_id}});
      this.$emit("check-notification", notification);
    },
    successPostNotification: function() {
      this.$toasted.show("投稿に成功しました！");
    },
    failedPostNotification: function() {
      this.$toasted.show("投稿に失敗しました...");
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
