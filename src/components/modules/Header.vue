<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light" style="background:#ffffff">
      <div class="left-contets"></div>
      <div class="container-fluid">
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
      
    </nav>
  </div>
</template>

<script></script>

<style>
</style>
