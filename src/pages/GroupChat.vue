<template>
  <div>
    <h1>チャットルーム一覧</h1>
    <!-- TODO: チャットルームを並べる-->
    <div v-for="project in userProjects" :key="project.id" class="list-group container">
      <button @click="goToChatRoom(project)" class="list-group-item">{{project.title}}</button>
    </div>
    <!-- <h2 @click="goToChatRoom(project)">{{project.title}}</h2> -->
  </div>
</template>

<script>
export default {
    props: ['user-projects'],
    methods: {
        goToChatRoom: function(chatRoom) {
            this.$router.push(`/chat-room/${chatRoom.id}`);
        }
    }
}
</script>

<style scoped>
</style>
