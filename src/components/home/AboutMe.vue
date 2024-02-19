<template>
<section class="about-me-section p-3 p-lg-5 theme-bg-light">
<div class="container">
<div class="profile-teaser row">

<div class="col">
<h2 class="name font-weight-bold mb-1">Faruk Şeker</h2>
<div class="tagline mb-3">Software Engineer</div>
<div class="bio mb-4">
    Hello, I am a new software developer, focusing on web development. I would like to help and contribute to your web projects; I am eager to take on roles.
    <hr>
    I have a <router-link class="text-link" :to="{name:'blog-list'}">blog</router-link> where I share my development process. 
    <br>
    Check out my project <router-link class="text-link" :to="{name:'blog-list'}">portfolio</router-link> and online resume.
</div>
<div class="mb-4">
    <a class="btn btn-primary me-2 mb-3" href="portfolio.html">
        <i class="fas fa-arrow-alt-circle-right me-2"></i> <span class="d-none d-md-inline">View</span>
        Portfolio
    </a>
    <a class="btn btn-secondary mb-3" href="resume.html">
        <i class="fas fa-file-alt me-2"></i>
        <span class="d-none d-md-inline">View</span>
        Resume
    </a>
</div>
</div>

<div class="col-md-5 col-lg-5">
<img class="profile-image img-fluid mb-3 mb-lg-0 me-md-0" src="https://res.cloudinary.com/dlusw5ukg/image/upload/v1702395429/portfolyo/user/avatar/1658757630979_fgft8p.webp" alt="">
</div>
</div>
</div>
</section>
</template>

<script setup>
</script>