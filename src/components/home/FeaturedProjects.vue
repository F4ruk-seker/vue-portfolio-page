<template>
<section class="featured-section p-3 p-lg-5">
    <div class="container">
        <h2 class="section-title font-weight-bold mb-5">Featured Projects</h2>
        <div v-if="show_load_anim" class="row">
            <div class="col-md-6 mb-5">
                <div class="card project-card">
                    <div class="row no-gutters">
                        <div class="col-12 col-xl-5 card-img-holder placeholder-glow" style="height: 250px;">
                            <div class="w-100 placeholder" style="height: 250px;"></div>
                        </div>
                        <div class="col-12 col-xl-7">
                            <div class="card-body">
                                <h5 class="card-title placeholder-glow font-weight-bold mb-3"><span class=" placeholder col-8"></span></h5>
                            <p class="card-text placeholder-glow">
                                <span class=" placeholder col-3"></span>
                            </p>
                            <p class="card-text placeholder-glow"><span class="placeholder col-8"></span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="row">
            <div class="col-md-6 mb-5" v-for="project in project_list" v-bind:key="project.id">
                <div class="card project-card">
                    <div class="row no-gutters">
                        <div class="col-12 col-xl-5 card-img-holder">
                            <img :src="project.seo_image_url" class="card-img" :alt="project.seo_image_alt">
                        </div>
                        <div class="col-12 col-xl-7">
                            <div class="card-body">
                                <h5 class="card-title">
                                <router-link class="theme-link" :to="{
                                    name:'project',
                                    params: {slug:project.slug}
                                }">
                                    {{ project.title }}
                                </router-link>
                            </h5>
                            <p class="card-text">
                                {{ project.seo_description }}
                            </p>
                            <p class="card-text"><small class="text-muted"><i class="fa-regular fa-eye me-1"></i>{{ project.view }}</small></p>
                            </div>
                        </div>
                    </div>
                    <div class="link-mask">
                        
                        <router-link class="link-mask-link" :to="{name:'project',params: {slug:project.slug}}"></router-link>
                        <div class="link-mask-text">
                            <router-link class="btn btn-secondary" :to="{name:'project',params: {slug:project.slug}}">
                                <i class="fas fa-eye me-2"></i> View Case Study
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
<div class="text-center py-3">
    <router-link :to="{name:'projects'}">
        <i class="fas fa-arrow-alt-circle-right me-2"></i>
        View Portfolio
    </router-link>
</div>
</section>
</template>


<script setup>
import { onMounted, ref } from 'vue'
import axios from "axios";

// humanize_date
const latest_count = ref(4)
const project_list = ref([])
const show_load_anim = ref(true)

async function get_latest_blog() {
    await axios.get(`content/all/?content_type=project&latest=${latest_count.value}`).then((response)=>{
        project_list.value = response.data
        show_load_anim.value = false
    })
}

onMounted(get_latest_blog)

</script>