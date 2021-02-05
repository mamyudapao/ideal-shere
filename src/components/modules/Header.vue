<template>
  <div>
    <nav
      class="navbar navbar-expand-lg navbar-light"
      style="background:#ffffff"
    >
      <div class="container-fluid">
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
                      v-model="title"
                    />
                    <label for="oldday">アイディアの詳細説明</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="アイディアの詳細説明"
                      v-model="detail"
                    />
                    <label for="oldday">カテゴリー</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="カテゴリー"
                      v-model="category"
                    />
                    <label for="oldday">募集の有無</label>
                    <input
                      type="checkbox"
                      class="form-control"
                      placeholder="募集の有無"
                      v-model="invitation"
                      :checked="true"
                      :unchecked="false"
                    />
                    <label for="oldday">募集人数</label>
                    <input
                      type="number"
                      class="form-control"
                      placeholder="募集人数"
                      v-model="member_number"
                    />
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button @click="post" class="btn btn-primary">
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
  import axios from "axios";
export default {
  data() {
    return {
      title: "",
      detail: "",
      category: "",
      invitation: false,
      member_number: "",
    };
  },
  methods: {
    post: function() {
      let toString_title = String(this.title)
      let toString_detail = String(this.detail)
      let toString_category = String(this.category)
      let toString_invitation = String(this.invitation)
      let toString_member_number = String(this.member_number)
      axios.post('http://127.0.0.1:8000/api/posts/', {
        user_id: "1",
        title: toString_title,
        detail: toString_detail,
        category: toString_category,
        member_number: toString_member_number,
        invitation: toString_invitation
      }) .then(function (response) {
    console.log(response.data);
  })
    }
  },
};
</script>

<style>
#navbar-list {
  padding-left: 10rem;
}
</style>
