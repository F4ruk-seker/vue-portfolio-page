<script setup>
import { onMounted, ref } from 'vue'
import ProjectPreview from '../../../components/admin/project/ProjectPreview.vue';
import axios from 'axios';


const projcets = ref(null)
const content_types = ref(null)

async function get_project_list(){
    const response = await axios.get('/content/edit/')
    projcets.value = await response.data
}

async function get_content_types(){
    await axios.get('/content/type/').then((response) => {
        content_types.value  = response.data
    })
}

onMounted(async ()=>{
    await get_project_list()
    await get_content_types()
})

</script>

<template>
<section class="d-flex h-100">
    <article class="container justify-content-center my-auto">
        <div class="row border p-3 shadow rounded overflow-y-auto" style="height: 80vh;">
            <div class="col-2 col-md-4 pt-3 rounded-1 border">
                <strong>Content Type</strong>
                <hr>
                <ul class="list-unstyled overflow-y-auto" style="height: 65vh;">
                    <li class="">
                        <button class="btn btn-light border-bottom d-flex rounded-0 mb-2 w-100 fw-semibold">
                            <span class="ms-0 ms-md-5">All</span>
                        </button>
                    </li>
                    <li 
                    v-for="content_type in content_types" v-bind:key="content_type.id"
                    >
                        <button class="btn btn-light d-flex rounded-0 mb-2 w-100 fw-semibold">
                            <span class="ms-0 ms-md-5">{{ content_type.name }}</span>
                        </button>
                    </li>
                </ul>
            </div>
            <div class="col overflow-y-auto" style="height: 76vh;">
                <ProjectPreview v-for="project in projcets" v-bind:key="project.id" :project="project"/>
            </div>
        </div>
    </article>
</section>
</template>

<style>
</style>
