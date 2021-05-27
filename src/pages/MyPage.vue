<template>
  <div class="parent-profile">
    <input
      type="file"
      ref="input"
      id="file-input"
      @input="$emit('profile_image', $event.target.files[0])"
    />
    <button @click="btnClick" id="profile-image-button">
      <img :src="user.image" id="profile-image" />
    </button>
    <div class="form-group">
      <h1 v-if="!username_edit" @click="username_edit = true">
        {{ username }}
      </h1>
      <input
        v-if="username_edit"
        type="text"
        class="form-control"
        id="username_input"
        :placeholder="user.username"
        v-model="username"
        @blur="username_edit = false"
      />
    </div>
    <p v-if="!introduction_edit && introduction != null && introduction !='' " @click="introduction_edit = true">
      {{ introduction }}
    </p>
    <p v-else-if="!introduction_edit" @click="introduction_edit = true">
      自己紹介を入力してください。
    </p>
    <input
      v-if="introduction_edit"
      type="text"
      class="form-control"
      id="username_input"
      :placeholder="user.introduction"
      v-model="introduction"
      @blur="introduction_edit = false"
    />
    <div class="projects-group">
      <span id="made_projects">
        <h4>投稿</h4>
        <router-link :to="`${$store.getters.user_id}/made_projects`">
          <p>{{user.made_projects}}</p>
        </router-link>
      </span>
      <span id="joined_projects">
        <h4>参加</h4>
        <router-link to="">
          <p>{{user.projects.length}}</p>
        </router-link>
      </span>
    </div>
    <button class="btn btn-primary" id="edit_save" @click="updateUserProfile">Save</button>
  </div>
</template>

<script>
export default {
  props: ["user"],
  data() {
    return {
      input_file: null,
      username_edit: false,
      introduction_edit: false,
      username: null,
      introduction: null,
      initial_update: false,
    };
  },
  async beforeMount() {
    await this.$emit("get_user");
  },
  updated() {
    if (!this.initial_update) {
      this.username = this.user.username;
      this.introduction = this.user.introduction;
      this.initial_update = true;
    }
  },
  methods: {
    btnClick: function() {
      this.$refs.input.click();
    },
    updateUserProfile: function() {
      this.$emit('update_profile', {
        username: this.username,
        introduction: this.introduction,
      });
    }
  },
};
</script>

<style>
.parent-profile {
}
#file-input {
  display: none;
}

#profile-image-button {
  display: inline;
}

#profile-image {
  height: 250px;
  width: 250px;
  border-radius: 50%;
}

#username {
  margin-top: 50px;
}

#edit_save {
  position: relative;
  top: 40vh;
  left: 85vh;
}
.projects-group {
  display: flex;
  justify-content: center;
}
#made_projects{
  margin: 1rem;
}
#joined_projects {
  margin: 1rem;
}
</style>
