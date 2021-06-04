<template>
  <div>
    <h1>ルーム名</h1>
    <div class="container chat bg-light p-1">
      <div v-for="message in messages" :key="message.id">
        <div v-if="message.user == user_id">
          <div class="message is-author">
            <div class="message-icon is-author"></div>
            <p class="message-text">
              <router-link :to="{name: 'user_profile', params: {id: message.user}}">{{ message.user_name }}</router-link>: {{ message.message }}<br>
              {{ message.created_at }}
            </p>
          </div>
        </div>
        <div v-else>
          <div class="message not-author">
            <div class="message-icon"></div>
            <p class="message-text">
              <router-link :to="{name: 'user_profile', params: {id: message.user}}">{{ message.user_name }}</router-link>: {{ message.message }}<br />
              {{ message.created_at }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <hr>
    <div class="mb-3 container comment-header">
      <textarea
        class="form-control"
        id="exampleFormControlTextarea1"
        rows="1"
        v-model="send_message"
      ></textarea>
      <button class="btn btn-dark" @click="sendMessage">送信</button>
      </div>
      <button class="btn btn-success" @click="getChatRoom">チャットを更新</button>
    </div>
</template>

<script>
export default {
  data() {
    return {
      user_id: this.$store.getters.user_id,
      send_message: null
    };
  },
  props: ["messages"],
  async mounted() {
    await this.getChatRoom();
  },
  methods: {
    getChatRoom: function() {
      console.log(this.$route.params);
      this.$emit("get-chat-room", this.$route.params.id);
    },
    sendMessage: function() {
      this.$emit("send-message", {message: this.send_message,room: this.$route.params.id});
    }
  },
};
</script>

<style>
.is-author {
  text-align: right;
}
.not-author {
  text-align: left;
}
.chat {
  border-radius: 1rem;
}
</style>
