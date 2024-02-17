<template>
<section class="featured-section p-3 p-lg-5">
    <div class="container">
        <h2 class="section-title font-weight-bold mb-5">Featured Projects</h2>
        <div class="row">
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
                        <a href="https://themes.3rdwavemedia.com/devcard/bs5/2.2/project.html"></a>
                        <div class="link-mask-text">
                            <router-link class="btn btn-secondary" :to="{name:'project',params: {slug:project.slug}}">
                                <svg class="svg-inline--fa fa-eye me-2" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="eye" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg=""><path fill="currentColor" d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"></path></svg><!-- <i class="fas fa-eye me-2"></i> Font Awesome fontawesome.com -->View Case Study
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

async function get_latest_blog() {
    await axios.get(`content/all/?content_type=project&latest=${latest_count.value}`).then((response)=>{
        project_list.value = response.data
    })
}

onMounted(get_latest_blog)

</script>