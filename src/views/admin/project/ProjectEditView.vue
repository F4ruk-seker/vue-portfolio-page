<script>
import TagHeadSearch from '@/components/TagHeadSearch.vue';
import axios from 'axios';
import { ref } from 'vue'
import { VMarkdownEditor } from 'vue3-markdown'
import 'vue3-markdown/dist/style.css'


export default{
    name: 'ProjectEditView',
    props: ['slug'],
    components: { VMarkdownEditor, TagHeadSearch },
    data:()=>{return{
        project: ref(''),
        amit: true,
        selected_programing_languages: []
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
    async mounted(){
        await this.get_project()
    }
}
</script>

<template>
<div class="float-end me-5 my-2">
    <button class=" btn btn-sm btn-success" @click="update_project">Save</button>
</div>

<div class="mx-2 h-100">
    <input v-model="project.title" class=" form-control">
    <div name="programin languages">
        <label>Programin languages</label>
        <p>{{  }}</p>
        <TagHeadSearch :alow_tags="project.programing_languages" />
    </div>
    <hr>
    <div v-if="!project" class="bg-success fw-bold">LOADING...</div>
    <VMarkdownEditor v-else
        v-model="project.text"
        locale="en"
        :fullscreen="amit"
    />
</div>
</template>

<style>
</style>
