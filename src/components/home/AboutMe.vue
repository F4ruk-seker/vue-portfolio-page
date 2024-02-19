<template>
<section class="about-me-section p-3 p-lg-5 theme-bg-light">
<div class="container">
<div class="profile-teaser row">

<div class="col">

<div class="bio mb-4">
    <div v-if="show_load_anim">
        <h2 class="card-title placeholder-glow">
        <span class="placeholder col-6"></span>
        </h2>
        <br>
        <h5 class="card-title placeholder-glow">
            <span class="placeholder col-6"></span>
        </h5>
        <p class="card-text placeholder-glow">
            <span class="placeholder col-10"></span><br>
            <span class="placeholder col-6"></span><br>
            <br>
            <span class="placeholder col-4"></span><br>
            <span class="placeholder col-4"></span>
        </p>
    </div>
    <div v-else>
    <h2 class="name font-weight-bold mb-1">Faruk Şeker</h2>
    <div class="tagline mb-3">Software Engineer</div>
    Hello, I am a new software developer, focusing on web development. I would like to help and contribute to your web projects; I am eager to take on roles.
    <hr>
    I have a <router-link class="text-link" :to="{name:'blog-list'}">blog</router-link> where I share my development process. 
    <br>
    Check out my project <router-link class="text-link" :to="{name:'blog-list'}">portfolio</router-link> and online resume.
    </div>

</div>
<div class="mb-4">
    <div v-if="show_load_anim">
    <button class="btn btn-success disabled placeholder col-6"></button>
    </div>
    <div v-else>
        <router-link class="btn btn-primary me-2 mb-3" :to="{name:'projects'}">
            <i class="fas fa-arrow-alt-circle-right me-2"></i> <span class="d-none d-md-inline">View</span>
            Portfolio
        </router-link>
    </div>

    <!--a class="btn btn-secondary mb-3" href="resume.html">
        <i class="fas fa-file-alt me-2"></i>
        <span class="d-none d-md-inline">View</span>
        Resume
    </a-->
</div>
</div>

<div class="col-md-5 col-lg-5">
    <div class="placeholder-glow" v-if="show_load_anim">
        <div class="placeholder w-100" style="height: 250px;"></div>
    </div>
    <img v-else class="profile-image img-fluid mb-3 mb-lg-0 me-md-0" src="https://res.cloudinary.com/dlusw5ukg/image/upload/v1702395429/portfolyo/user/avatar/1658757630979_fgft8p.webp" alt="">
</div>
</div>
</div>
</section>
</template>

<script>
export default {
    props: ['show_load_anim']
}
</script>