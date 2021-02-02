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


       <div class="navbar-right">
       <!-- Button trigger modal -->
<button type="button" class="btn" data-toggle="modal" data-target="#exampleModal">
  <font-awesome-icon :icon="['fa','plus-square']" />

</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
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
