<template>
<section class="latest-blog-section p-3 p-lg-5">
    <div class="container">
        <h2 class="section-title font-weight-bold mb-5">Latest Blog Posts</h2>
        <div class="row">
            <div class="col-md-4 mb-5" v-for="(blog, index) in blog_list" v-bind:key="index">
                <div class="card blog-post-card">
                    <div class="ratio ratio-1x1">
                        <img class="card-img-top" :src="blog.seo_image_url" :alt="blog.seo_image_alt" style="object-fit:cover; background-position:center">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">
                            <router-link 
                            class="theme-link"
                            :to="{name: 'blog-content', params: {slug:blog.slug}}">
                                {{ blog.title }}
                            </router-link>
                        </h5>
                        <p class="card-text">
                            {{ blog.ceo_description }}
                        </p>
                        <p class="mb-0">
                            <router-link class="theme-link" :to="{name: 'blog-content', params: {slug:blog.slug}}">
                                Read more →
                            </router-link></p>

                    </div>
                    <div class="card-footer">
                        <small class="text-muted">Published  {{ blog.humanize_date.update }} ago</small>
                    </div>
                </div>
            </div>
        </div>
    <div class="text-center py-3">
        <router-link class="theme-link" :to="{name: 'blog-list',}">
            <i class="fas fa-arrow-alt-circle-right me-2"></i>
            View Blog
        </router-link>
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