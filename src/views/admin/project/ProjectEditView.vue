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
        selected_programing_languages: [],

        // -pars
        on_update: false,
    }},
    methods: {
        async get_project() {
            try {
                const response = await axios.get(`content/edit/${this.slug}/`)
                this.project = response.data  
            } catch (error) {
                console.error('Error fetching project:', error)
            }
        },
        async update_project(){
            try {
                this.on_update = true
                await axios.put(`content/edit/${this.slug}/`, this.project).then((response)=>{this.project = response.data})
                this.on_update = false
            
            } catch (error) {
                console.error('Error fetching project:', error)
            }
        },
        keyboard_on_save(e) {
        if (!(e.keyCode === 83 && e.ctrlKey)) {
            return;
        }
        e.preventDefault();
            this.update_project()
        },
    },
    async mounted(){
        await this.get_project()
        document.addEventListener("keydown", this.keyboard_on_save);
    },
    unmounted(){
      document.removeEventListener("keydown", this.keyboard_on_save);
    }
}

</script>

<template>
<section class="row m-0 p-0 h-100">
    <article class="col-12 col-md-4 col-lg-3 col-xl-2 m-0 p-0 position-relative">
        <button class="btn btn-lg btn-success w-100 rounded-0 border-0" @click="update_project" :disabled="on_update">
        <span v-if="!on_update">Save</span>
        <div v-else class="spinner-border text-light" role="status">
            <span class="sr-only">Loading...</span>
        </div>
        </button>

        <input v-model="project.title" class="mt-1 form-control">
        <div name="programin languages">
            <label>Programin languages</label>
            <p>{{ selected_programing_languages }}</p>
            <TagHeadSearch :alow_tags="project.programing_languages" />
        </div>
        <hr>

        <div class="text-info text-center fw-bold bg-secondary-subtle start-0 bottom-0 position-absolute w-100">
            {{ project.update }}
        </div>
    </article>
    <article class="col m-0 p-0">
        <div v-if="!project" class="bg-success fw-bold">LOADING...</div>
        <VMarkdownEditor v-else
            v-model="project.text"
            locale="en"
            :fullscreen="amit"
        />
    </article>
</section>
</template>

<style>
</style>
