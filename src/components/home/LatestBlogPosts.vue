<template>
<section class="latest-blog-section p-3 p-lg-5">
    <div class="container">
        <h2 class="section-title font-weight-bold mb-5">Latest Blog Posts</h2>
        <div class="row">
            <div class="col-md-4 mb-5" v-for="(blog, index) in blog_list" v-bind:key="index">
                <div class="card blog-post-card">
                    <div class="ratio ratio-1x1">
                        <img class="card-img-top" :src="blog.ceo_image_url" alt="image" style="object-fit:cover; background-position:center">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">
                            <a class="theme-link" href="https://themes.3rdwavemedia.com/devcard/bs5/2.2/blog-post.html">
                                {{ blog.title }}
                            </a>
                        </h5>
                        <p class="card-text">
                            {{ blog.ceo_description }}
                        </p>
                        <p class="mb-0"><a class="text-link" href="https://themes.3rdwavemedia.com/devcard/bs5/2.2/blog-post.html">Read more →</a></p>

                    </div>
                    <div class="card-footer">
                        <small class="text-muted">Published  {{ blog.humanize_date.update }} ago</small>
                    </div>
                </div>
            </div>
        </div>
    <div class="text-center py-3">
        <a href="https://themes.3rdwavemedia.com/devcard/bs5/2.2/blog-home.html" class="btn btn-primary">
            <svg class="svg-inline--fa fa-circle-right me-2" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM294.6 135.1l99.9 107.1c3.5 3.8 5.5 8.7 5.5 13.8s-2 10.1-5.5 13.8L294.6 376.9c-4.2 4.5-10.1 7.1-16.3 7.1C266 384 256 374 256 361.7l0-57.7-96 0c-17.7 0-32-14.3-32-32l0-32c0-17.7 14.3-32 32-32l96 0 0-57.7c0-12.3 10-22.3 22.3-22.3c6.2 0 12.1 2.6 16.3 7.1z"></path></svg><!-- <i class="fas fa-arrow-alt-circle-right me-2"></i> Font Awesome fontawesome.com -->
            View Blog
        </a>
    </div>
</div>
</section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from "axios";
// humanize_date
const latest_count = ref(3)
const blog_list = ref([])

async function get_latest_blog() {
    await axios.get(`content/all/?content_type=blog&latest=${latest_count.value}`).then((response)=>{
        blog_list.value = response.data
    })
}

onMounted(get_latest_blog)
</script>