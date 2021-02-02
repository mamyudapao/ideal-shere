<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light" style="background:#ffffff">
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
                  <router-link to="/" class="nav-link active" aria-current="page">Home</router-link>
              </li>
              <li class="nav-item">
                  <router-link to="/" class="nav-link active" aria-current="page">マイページ</router-link>
              </li>
              <li class="nav-item">
                  <router-link to="/" class="nav-link active" aria-current="page">通知</router-link>
              </li>
              <li class="nav-item">
                  <router-link to="/" class="nav-link active" aria-current="page">DM</router-link>
              </li>
            </ul>
        </div>

        </div>
        
        <i class="bi bi-plus-square"></i> 
       <div class="navbar-right">
       <font-awesome-icon icon="user-secret" />
      </div>
    </div>
    </nav>
  </div>
</template>

<script></script>

<style>
  #navbar-list {
    padding-left: 10rem;
  }
</style>
