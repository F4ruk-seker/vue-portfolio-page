<script setup>
import { onMounted, ref } from 'vue'
import ProjectPreview from '../../../components/admin/project/ProjectPreview.vue';
import axios from 'axios';


const projcets = ref(null)

async function get_project_list(){
    const response = await axios.get('/content/edit/')
    projcets.value = await response.data

}

onMounted(()=>{
    get_project_list()
})

</script>

<template>
<section class="d-flex h-100">
    <article class="container justify-content-center my-auto">
        <div v-if="!projcets" class="bg-success-subtle p-1">LOADING...</div>
        <ProjectPreview v-else v-for="project in projcets" v-bind:key="project.id" :project="project"/>
    </article>
</section>
</template>

<style>
</style>
