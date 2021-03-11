<template>
  <div>
    <div class="navbar-right">
      <!-- Button trigger modal -->
      <button
        type="button"
        class="btn"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        <font-awesome-icon :icon="['fa', 'plus-square']" />
      </button>

      <!-- Modal -->
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">新規投稿！</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <label for="cusno">タイトル</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="アイディアのタイトル"
                  v-model="post.title"
                />
                <label for="oldday">アイディアの詳細説明</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="アイディアの詳細説明"
                  v-model="post.detail"
                />
                <label for="oldday">募集の有無</label>
                <input
                  type="checkbox"
                  class="form-control"
                  placeholder="募集の有無"
                  v-model="post.invitation"
                  :checked="true"
                  :unchecked="false"
                />
                <label for="oldday">募集人数</label>
                <input
                  type="number"
                  class="form-control"
                  placeholder="募集人数"
                  v-model="post.member_number"
                />
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                閉じる
              </button>
              <button @click="send_post" class="btn btn-primary">
                送信
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: [],
    };
  },
  computed: {
    access_token() {
      return this.$store.getters.access_token;
    },
  },
  methods: {
    send_post: function() {
      this.$emit('emit-post', this.post);
    }
  },
};
</script>

<style>
form {
  width: 18%;
  position: absolute;
  top: 25%;
  left: 1.5rem;
}
</style>
