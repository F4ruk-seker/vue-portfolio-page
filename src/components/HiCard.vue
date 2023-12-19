<script setup>
</script>

<template>
<section class="d-flex bg-light" style="background: url('/img/bishop.jpg') no-repeat center; object-fit: contain; height: 100vh">
<article class="m-auto justify-content-center text-center">
  <div class="row">
    <div class="col-12 col-md-6">
      <img class="rounded" alt="faruk şeker " src="https://github.com/F4ruk-seker.png">
    </div>
    <div class="col-12 col-md-6  m-auto">
      <h1 class="fw-bold text-info">
        Software developer
      </h1>
      <p class="fw-semibold text-light">
        Hello, I am a web developer
      </p>
      <hr class="text-light mx-5">
      <p class="text-light">
        FARUK ŞEKER
      </p>
    </div>
  </div>
</article>
<article class="position-absolute text-light bottom-0 m-1">
  <i class="fa-solid fa-eye"></i> 250
</article>
<article class="position-absolute text-light bottom-0 text-center w-100 mb-5 z-1">
  <a class="btn btn-outline-light border-0 shadow" href="#about">
    <i class="fa-solid fa-arrow-down-short-wide"></i> About Me
  </a>
</article>
</section>
</template>

<style scoped>
ul li:after {
  margin-right: .25rem;
  content: ",";
}
ul li:last-child:after {
  content: ".";
}
</style>
