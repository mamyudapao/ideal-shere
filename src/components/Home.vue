<template>
    <div>
        
    </div>
</template>

<script>
    import axios from "axios";
    export default {
        data() {
            return {
                ideas: [],
            }
        },
        mounted() {
            this.get()
        },
        methods: {
            get: function(){
                axios.get('http://127.0.0.1:8000/api/posts/')
                .then((response) => {
                    console.log(response.data)
                })
            }
        }
    }
</script>

<style>

</style>