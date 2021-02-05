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
        <label for="email" class="form-label">email</label>
        <input
          type="email"
          class="form-control"
          id="email"
          placeholder="example@example.com"
          v-model="email"
        />
      </div>
      <div class="mb-3">
        <label for="password1">パスワード</label>
        <input type="password" id="password1" placeholder="password" v-model="password" />
      </div>
      <div class="mb-3">
        <label for="password1">パスワード確認</label>
        <input
          type="password"
          id="password2"
          placeholder="passwordを再度入力"
          v-model="password2"
        />
      </div>
      <button class="btn btn-success" @click="signin">送信</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            username: '',
            password: '',
            password2: ''
        };
    },
    methods: {
        signin() {
            this.$store.dispatch('signin', {
                email: this.email,
                username: this.username,
                password: this.password,
                password2: this.password
            })
            this.email = '';
            this.username ='';
            this.password ='';
            this.password2 ='';
        }
    }
}    
</script>

<style></style>
