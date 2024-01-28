<script>
import axios from 'axios';
import { ref } from 'vue'
import { VMarkdownEditor } from 'vue3-markdown'
import 'vue3-markdown/dist/style.css'


export default{
    name: 'ProjectEditView',
    props: ['slug'],
    components: {VMarkdownEditor},
    data:()=>{return{
        project: ref(''),
        amit: true
    }},
    methods: {
        async get_project() {
            try {
                const response = await axios.get(`project/edit/${this.slug}/`)
                this.project = response.data  
            } catch (error) {
                console.error('Error fetching project:', error)
            }
        },
        async update_project(){
            try {
                await axios.put(`project/edit/${this.slug}/`, this.project)
            } catch (error) {
                console.error('Error fetching project:', error)
            }
        }
    },
    mounted(){
        this.get_project()
    }
}
</script>

<template>
<div class="float-end me-5 my-2">
    <button class=" btn btn-sm btn-success" @click="update_project">Save</button>
</div>

<div class="mx-2 h-100">
    <input v-model="project.title" class=" form-control">
    <hr>
    <div v-if="!project" class="bg-success fw-bold">LOADING...</div>
    <VMarkdownEditor v-else
        v-model="project.context"
        locale="en"
        :fullscreen="amit"
    />
</div>
</template>

<style>
</style>
