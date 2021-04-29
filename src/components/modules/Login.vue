<template>
  <div>
    <h2 class="login-header">ログイン</h2>
    <div class="container">
      <div class="form-elements">
        <label>User Name</label>
        <input
          type="text"
          class="form-control"
          v-model="username"
          @keydown.enter.exact="keyDownEnter"
          @keyup.enter.exact="keyUpEnter"
        />
        <label for="password">Password</label>
        <input
          type="password"
          class="form-control"
          id="password"
          v-model="password"
          @keydown.enter.exact="keyDownEnter"
          @keyup.enter.exact="keyUpEnter"
        />
        <button
          type="button"
          class="btn btn-primary"
          id="submit"
          @click="login"
        >
          送信する
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login: async function() {
      await this.$store.dispatch("login", {
        username: this.username,
        password: this.password,
      });
      setTimeout(() => {
        if (
          localStorage.getItem("user_id") == undefined ||
          localStorage.getItem("user_id") == null
        ) {
          this.failedNotification();
        }else {
          this.successNotification();
        }
      }, 300);
      this.username = "";
      this.password = "";
    },
    keyDownEnter: function(e) {
      e.preventDefault();
    },
    keyUpEnter: function(e) {
      e.preventDefault();
      this.login();
    },
    failedNotification: function() {
      this.$toasted.show("ログインに失敗しました。");
    },
    successNotification: function() {
      this.$toasted.show("ログインに成功しました！");
    },
  },
};
</script>

<style scoped>
.login-header {
  margin-top: 1.5rem;
}
.container {
  background-color: #ffffff;
  width: 80%;
  margin: 5rem auto;
  border-radius: 1rem;
}
.form-elements {
  padding: 3rem 10rem;
}
#submit {
  margin-top: 1.5rem;
  margin-bottom: 0;
}
</style>
