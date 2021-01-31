<template>
    <div class="container">
        <div class="card">
            <div class="card-body">
              <h5 class="card-title">{{ posts[0].title }}</h5>
              <p class="card-text">{{ posts[0].detail }}</p>
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

</style>