<script setup>
</script>

<template>
  <nav
      class="navbar navbar-expand-lg w-100 position-fixed text-light z-2 shadow"
      style="background: linear-gradient(90deg, rgba(2,0,36,.01) 0%, rgba(2,171,228,.1) 50%, rgba(0,212,255,.01) 100%);backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px);"
  >
    <div class="container">
      <a class="navbar-brand logo text-light fw-bold d-block d-lg-none" href="#">Faruk Şeker</a>
      <button data-bs-toggle="collapse" class="navbar-toggler btn btn-light" data-bs-target="#navbarNav">
        <span class="visually-hidden">Toggle navigation</span>
        <i class="fa-solid fa-bars text-light"></i>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link fw-bold text-light active" aria-current="page"
            href="/#"
            >Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link fw-bold text-light" aria-current="About" href="/#about">About</a>
          </li>
          <li class="nav-item">
            <a class="nav-link fw-bold text-light" aria-current="Experiences" href="/#experiences">Experiences</a>
          </li>
          <li class="nav-item">
            <a class="nav-link fw-bold text-light" aria-current="Contact" href="/#contact">Contact</a>
          </li>
        </ul>
        <div class="w-100"></div>
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link
                class="nav-link fw-bold text-light" aria-current="projects"
                :to="{
                   name:'projects'
                }"
            >Projects</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link fw-bold text-light" aria-current="Game" href="#Game">Game</a>
          </li>
          <li class="nav-item">
            <a class="nav-link fw-bold text-light" aria-current="Blog" href="#blog">Blog</a>
          </li>
          <li class="nav-item">
            <router-link class="nav-link fw-bold text-light" aria-current="Login" :to="{'name':'login'}" >Login</router-link>
          </li>
        </ul>
      </div>

    </div>
  </nav>
</template>

<style scoped>

</style>
