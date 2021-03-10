<template>
  <div>
    <div class="container">
      <h2>ログイン画面へようこそ</h2>
      <form class="form-inline">
        <div class="mb-3">
          <label for="username" class="form-label">ユーザーネーム</label>
          <input
            type="text"
            class="form-control"
            id="username"
            placeholder="username"
            v-model="username"
          />
        </div>
        <div class="mb-3">
          <label for="password1">パスワード</label>
          <input
            type="password"
            id="password1"
            placeholder="password"
            v-model="password"
          />
        </div>
        <button type="button" class="btn btn-success" @click="login">送信</button>
      </form>
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
    login() {
      this.$store.dispatch("login", {
        username: this.username,
        password: this.password,
      });
      this.username = "";
      this.password = "";
    },
  },
};
</script>

<style></style>
