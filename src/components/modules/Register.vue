<template>
  <div>
    <h2 class="register-header">アカウント登録</h2>
    <div class="container">
      <div class="form-elements">
        <label for="email">Email</label>
        <input
          type="email"
          class="form-control"
          id="email"
          v-model="email"
          @keydown.enter.exact="keyDownEnter"
          @keyup.enter.exact="keyUpEnter"
        />
        <label for="username">User Name</label>
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
        <label for="password-confirm">Passwordを再度入力</label>
        <input
          type="password"
          class="form-control"
          id="password-confirm"
          v-model="password2"
          @keydown.enter.exact="keyDownEnter"
          @keyup.enter.exact="keyUpEnter"
        />
        <button
          type="button"
          class="btn btn-primary"
          id="submit"
          @click="signin"
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
      email: "",
      username: "",
      password: "",
      password2: "",
    };
  },
  methods: {
    signin() {
      this.$store.dispatch("signin", {
        email: this.email,
        username: this.username,
        password: this.password,
        password2: this.password,
      });
      setTimeout(() => {
        if (
          localStorage.getItem("user_id") == undefined ||
          localStorage.getItem("user_id") == null
        ) {
          this.failedNotification();
        } else {
          this.successNotification();
        }
      }, 500);
      this.email = "";
      this.username = "";
      this.password = "";
      this.password2 = "";
    },
    keyDownEnter: function(e) {
      e.preventDefault();
    },
    keyUpEnter: function(e) {
      e.preventDefault();
      this.signin();
    },
    failedNotification: function() {
      this.$toasted.show("アカウント登録に失敗しました。");
    },
    successNotification: function() {
      this.$toasted.show("ようこそidealShereへ！");
    },
  },
};
</script>

<style scoped>
.register-header {
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
