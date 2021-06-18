<template>
  <div>
    <!-- <h1>オープンチャット</h1>
    <div class="container chat bg-light p-1">
      <div v-for="message in open_chat_messages" :key="message.id">
        <p class="message-text">
          {{ message.username }}: {{ message.content }}<br />
        </p>
      </div>
    </div> -->

    <div class="container chat bg-light p-1">
      <div v-for="message in open_chat_messages" :key="message.id">
        <div v-if="message.user_id == user_id">
          <div class="message is-author">
            <div class="message-icon is-author"></div>
            <p class="message-text">
              <router-link
                :to="{ name: 'user_profile', params: { id: message.user_id } }"
                >{{ message.username }}</router-link
              >: {{ message.content }}
            </p>
          </div>
        </div>
        <div v-else>
          <div class="message not-author">
            <div class="message-icon"></div>
            <p class="message-text">
              <router-link
                :to="{ name: 'user_profile', params: { id: message.user } }"
                >{{ message.username }}</router-link
              >: {{ message.content }}<br />
            </p>
          </div>
        </div>
      </div>
    </div>

    <hr />
    <div class="mb-3 container comment-header">
      <textarea
        class="form-control"
        id="exampleFormControlTextarea1"
        rows="1"
        v-model="send_message"
      ></textarea>
      <button class="btn btn-dark" @click="sendMessage">送信</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user_id: this.$store.getters.user_id,
      send_message: null,
    };
  },
  props: ["open_chat_messages"],
  mounted() {
    this.$emit("getOpenChatMessages");
  },
  methods: {
    sendMessage: function() {
      this.$emit("sendOpenChatMessage", this.send_message);
      this.send_message = "";
    },
  },
};
</script>
<style></style>
