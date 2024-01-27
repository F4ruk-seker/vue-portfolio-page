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
        project: ref('')
    }},
    methods: {
        async get_project() {
            try {
                const response = await axios.get(`project/edit/${this.slug}/`)
                this.project = response.data  // Corrected typo here
            } catch (error) {
                console.error('Error fetching project:', error)
            }
        },
    },
    mounted(){
        this.get_project()
    }
}
</script>

<template>
<div v-if="!project" class="bg-success fw-bold">LOADING...</div>
<VMarkdownEditor v-else
    v-model="project.context"
    locale="en"
/>
</template>

<style>
</style>
