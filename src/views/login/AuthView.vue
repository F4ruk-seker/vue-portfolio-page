<script setup>
import NavBar from "@/components/NavBar.vue";
</script>

<template>
<NavBar />
<section class="d-block d-md-flex" style="background: url('https://res.cloudinary.com/dlusw5ukg/image/upload/v1703990688/portfolio/jade-stephens-T-unsplash_zeheas.jpg') no-repeat center; object-fit: cover; height: 100vh">
    <article class="justify-content-center  m-auto col-12 col-sm-10 col-md-4 col-lg-3" style="background: transparent!important;backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px);">
    <RouterView />
    </article>
</section>
<footer class="position-absolute bottom-0 pb-3 w-100" style="background: linear-gradient(90deg, rgba(20,0,36,.01) 0%, rgba(45,171,228,.1) 50%, rgba(1,212,255,.01) 100%);backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px);">
  <article class="container fw-bold text-light">
      Pars Border Service!
  </article>
</footer>
</template>