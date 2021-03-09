<template>
  <div>
    <template>
      <div>
        <nav
          class="navbar navbar-expand-lg navbar-light"
          style="background:#ffffff"
        >
          <div class="container-fluid" id="header-flex">
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

            <!-- form modalでホーム画面内に出したいので、routerではなくコンポーネントを入れる。 -->
            <div class="nav-right">
              <router-link to="/signin" class="nav-link active" id="signin-icon"
                ><font-awesome-icon :icon="['fas', 'user-plus']"
              /></router-link>
              <router-link to="/login" class="nav-link active" id="login-icon"
                ><font-awesome-icon :icon="['fas', 'sign-in-alt']"
              /></router-link>
            </div>
          </div>
        </nav>
      </div>
    </template>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
