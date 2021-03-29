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
    <p v-if="!introduction_edit" @click="introduction_edit = true">
      {{ introduction }}
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
</style>
