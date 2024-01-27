<script setup>
import { onMounted, ref } from 'vue'
import ProjectPreview from '../../../components/admin/project/ProjectPreview.vue';
import axios from 'axios';

const projcets = ref(null)

async function get_project_list(){
    const response = await axios.get('/project/all/')
    projcets.value = await response.data.result

}

onMounted(()=>{
    get_project_list()
})

</script>

<template>
<div v-if="!projcets" class="bg-success-subtle p-1">LOADING...</div>
<ProjectPreview v-else v-for="project in projcets" v-bind:key="project.id" :project="project"/>
</template>

<style>
</style>
