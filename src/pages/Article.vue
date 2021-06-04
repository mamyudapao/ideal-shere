<template>
  <div>
    <router-link class="user-profile-button container" :to="{name: 'user_profile', params: {id: article.user}}">

      <h2>
        <img
          class="author-image"
          :src="article.author_image"
          alt=""
          srcset=""
        />
        {{ article.author_name }}
      </h2>
    </router-link>

    <h1>{{ article.title }}</h1>

    <p class="container article-detail">
      {{ article.detail }}
    </p>

    <h3>募集目安: {{ article.member_number }}</h3>
    <h3>現在: {{ article.count_participants }}</h3>
    <hr />
    <h2 id="comment-header">コメント</h2>
    <div class="mb-3 container comment-header">
      <label for="exampleFormControlTextarea1" class="form-label"
        >コメントをする</label
      >
      <textarea
        class="form-control"
        id="exampleFormControlTextarea1"
        rows="1"
        v-model="send_comment"
      ></textarea>
      <button @click="postComment" class="btn btn-dark">送信</button>
      <div v-if="!article.user_has_participated">
        <button
          id="register-action-in-project"
          @click="participateIn"
          class="btn btn-dark"
        >
          参加する！!
        </button>
      </div>
      <div v-else>
        <button
          id="register-action-in-project"
          @click="participateOut"
          class="btn btn-dark"
        >
          プロジェクトから抜ける
        </button>
      </div>
    </div>
    <div class="commentsection container">
      <hr />
      <div class="comments" v-for="comment in comments" :key="comment.id">
        <router-link :to="{name: 'user_profile', params: {id: comment.author_id}}" class="user-profile-button">

          <h4 class="username">
            <img
              :src="comment.author_image"
              class="comment-author"
            />
            {{ comment.author }}
          </h4>
        </router-link>
        <p>
          {{ comment.content }}
        </p>
        <div class="under-comment">
          <div>
            <div v-if="comment.user_has_voted">
              <button
                v-bind:class="{ clickedLikeButton: comment.user_has_voted }"
                :id="comment.id"
                @click="destroyLike(comment)"
              >
                <font-awesome-icon :icon="['fas', 'heart']" />
              </button>
            </div>
            <div v-else>
              <button
                v-bind:class="{ clickedLikeButton: comment.user_has_voted }"
                :id="comment.id"
                @click="postLike(comment)"
              >
                <font-awesome-icon :icon="['fas', 'heart']" />
              </button>
            </div>
          </div>
          <span class="created-at"
            >{{ comment.likes_count }} {{ comment.created_at }}</span
          >
        </div>
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../api-axios";
export default {
  data() {
    return {
      article: null,
      comments: null, //getしたコメントを入れる用
      members: [], //参加者一覧
      send_comment: "", //formから送信する用
      send_comment_for_like: "", //likeをpostするためのcommentのIDを入れる用
      my_liked_list: [], //自分自身がlikeした用
    };
  },
  async mounted() {
    await this.getArticle();
    await this.getComments();
  },
  computed: {
    access_token() {
      return this.$store.getters.access_token;
    },
  },
  methods: {
    getArticle: async function() {
      await axios
        .get(`/api/posts/${this.$route.params.id}`, {
          headers: {
            Authorization: `Bearer ${this.access_token}`,
          },
        })
        .then((response) => {
          this.article = response.data;
        });
    },
    getComments: async function() {
      //コメントを取ってくるための関数
      await axios
        .get(`/api/posts/${this.$route.params.id}/comments`, {
          headers: {
            Authorization: `Bearer ${this.access_token}`,
          },
        })
        .then((response) => {
          this.comments = response.data;
          for (let i = 0; i < Object.keys(this.comments).length; i++) {
            let created_at = new Date(this.comments[i].created_at);
            this.comments[i].created_at = created_at.toLocaleString();
          }
        });
    },

    postComment: async function() {
      // TODO: created_atを日本標準時間で投稿
      await axios
        .post(
          `/api/posts/${this.$route.params.id}/comments`,
          {
            content: this.send_comment,
            likes: null,
            post_id: this.$route.params.id,
          },
          {
            headers: {
              Authorization: `Bearer ${this.access_token}`,
            },
          }
        )
        .then(() => {
          this.send_comment = "";
          this.getComments();
        });
    },
    postLike: async function(comment) {
      await axios
        .post(
          `/api/comments/${comment.id}/likes`,
          {
            post_id: this.$route.params.id,
          },
          {
            headers: {
              Authorization: `Bearer ${this.access_token}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          comment.user_has_voted = true;
          comment.likes_count += 1;
        });
    },
    destroyLike: async function(comment) {
      await axios
        .patch(
          `/api/comments/${comment.id}/likes`,
          {},
          {
            headers: {
              Authorization: `Bearer ${this.access_token}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          comment.user_has_voted = false;
          comment.likes_count -= 1;
        });
    },
    participateIn: async function() {
      axios
        .post(
          `/api/posts/${this.$route.params.id}/participants`,
          {},
          {
            headers: {
              Authorization: `Bearer ${this.access_token}`,
            },
          }
        )
        .then(() => {
          this.article.count_participants += 1;
          this.article.user_has_participated = true;
        });
    },
    participateOut: async function() {
      axios
        .patch(
          `/api/posts/${this.$route.params.id}/participants`,
          {},
          {
            headers: {
              Authorization: `Bearer ${this.access_token}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          this.article.count_participants -= 1;
          this.article.user_has_participated = false;
        });
    },
  },
};
</script>

<style>
button {
  display: block;
}
.author-image {
  width: 50px;
  height: 50px;
  border: 1px solid;
  border-radius: 50%;
}

.comment-author {
  width: 50px;
  height: 50px;
  border: 1px solid;
  border-radius: 50%;
}

.tags {
  display: flex;
  justify-content: center;
}

.tag {
  border: 1px solid;
  border-radius: 6px;
  margin-top: 15px;
  margin-right: 50px;
  background-color: whitesmoke;
}
.article-detail {
  font-size: 25px;
  line-height: 2.5rem;
}

#comment-header {
  text-align: left;
  margin-left: 5rem;
  margin-bottom: 3.5rem;
}
.username {
  text-align: left;
}
.comment-button {
  position: fixed;
  top: 90vh;
  right: 4vw;
}

.noClickedLikeButton {
  color: white;
}

.clickedLikeButton {
  color: red;
}

.under-comment {
  display: flex;
  justify-content: center;
}

#register-action-in-project {
  position: fixed;
  top: 90vh;
  right: 10vh;
}
.user-profile-button{
  text-decoration: none;
  color: inherit;
}
</style>
