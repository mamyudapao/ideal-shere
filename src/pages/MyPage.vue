<template>
  <div class="parent-profile">
    <div class="image-block">
      <input
        type="file"
        ref="input"
        id="fileInput"
        @input="$emit('profile_image', $event.target.files[0])"
      />
      <button @click="btnClick">
        <img :src="user.image" />
      </button>
    </div>
    <div class="profile-block">
      <p>{{ user.username }}</p>
      <h2>自己紹介文</h2>
      <p>{{ user.introduction }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["user"],
  data() {
    return {
      input_file: null, //画像が来る
    };
  },
  mounted() {
    this.$emit("get_user");
  },
  methods: {
    btnClick: function() {
      this.$refs.input.click();
    },
  },
};
</script>

<style>
.parent-profile {
  display: flex;
  justify-content: center;
}

.image-block {
  margin-top: 150px;
}

.image-block input {
  display: none;
}

.image-block img {
  height: 200px;
  width: 200px;
  border-radius: 50%;
}

.profile-block {
  width: 50%;
}
</style>
