<template>
    <div class="container">
        <div class="card" v-for="post in posts" :key="post.id">
            <div class="card-body">
              <h5 class="card-title">{{ post.title }}</h5>
              <p class="card-text">{{ post.detail }}</p>
              <p class="card-text">{{ post.user_id }}</p> <!--TODO user_idからユーザー名に変更する。 -->
              <a href="#" class="btn btn-primary">詳細をみる</a>
            </div>
          </div>
    </div>
</template>

<script>
    import axios from "axios";
export default {
    data() {
        return {
            posts: [],
            posts_titles: []
        }
    },
    mounted() {
        this.get()
    },
    methods: {
        get: function() {
        const data = []
        axios.get('http://127.0.0.1:8000/api/posts/')
            .then((response) => {
                console.log(response.data)
                console.log(response.data[0].title)
                response.data.forEach(item => {
                    this.posts.push(item)
                });
                console.log(data)
            })


        }
}
}


</script>

<style>
    .card {
        padding-top: 10px;
        margin-top: 10px;
    }
</style>