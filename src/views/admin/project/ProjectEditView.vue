<script>
import axios from 'axios';
import { ref } from 'vue'
import { VMarkdownEditor } from 'vue3-markdown'
import 'vue3-markdown/dist/style.css'


export default{
    name: 'ProjectEditView',
    props: ['slug'],
    components: { VMarkdownEditor },
    data:()=>{return{
        project: ref(''),
        amit: true,
        selected_programing_languages: [],
        //content_type = ''
        //content_types:[],
        content_type_tags: [],

        // -pars
        on_update: false,
    }},
    methods: {
        async get_project() {
            try {
                const response = await axios.get(`content/edit/${this.slug}/`)
                this.project = response.data  
                await this.get_content_type_tags(this.project.content_type)
            } catch (error) {
                console.error('Error fetching project:', error)
            }
        },
        async get_content_type_tags(content_type){
            const response = await axios.get('content/type/' + content_type)
            
            // this.content_types = response.data.other_content_types
            this.content_type_tags = []
            response.data.sub_tags.forEach(tag_category => {
                tag_category.tags.forEach(tag => {
                    for (const selected_tag of this.project.tags) {
                    if (selected_tag.id === tag.id) {
                        tag.slected = true;
                        break;
                    }
                }
                    this.content_type_tags.push(tag)
                });
            });
        },
        async update_project(){
            try {
                this.on_update = true

                this.project.tags = []
                this.content_type_tags.forEach(tag => {
                    if (tag.slected){
                        this.project.tags.push(tag)        
                    }
                })

                await axios.put(`content/edit/${this.slug}/`, this.project).then((response)=>{this.project = response.data})
                this.on_update = false
            
            } catch (error) {
//                if (error.response.status === 400){
//              }
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
        
        <button 
            :class="'w-100 mt-2 btn ' + (project.show ? 'btn-primary': 'btn-outline-primary')"
            @click="project.show = !project.show">{{ project.show ? 'Hide' : 'Show' }}
        </button>
        
        <div class="mx-2" name="edit">
            <hr>
            <div class="mb-3">
            <label class="fw-semibold ms-2">
                Title
            </label>
            <input v-model="project.title" class="mt-1 form-control">
            </div>
            <div class="mb-3">
                <label class="fw-semibold ms-2">
                    slug
                </label>
                <input v-model="project.slug" class="mt-1 form-control disabled" disabled>
            </div>
            
            <div class="d-flex">
                <strong class="my-auto">SEO</strong>
                <hr class="ms-2 w-100">
            </div>
            <label class="ms-2">ceo description</label>
            <input v-model="project.ceo_description" class="mt-1 form-control" placeholder="ceo description">
            
            <label class="ms-2">ceo image url</label>
            <input v-model="project.ceo_image_url" class="mt-1 form-control" placeholder="image url">

            <label class="ms-2">ceo image description</label>
            <input v-model="project.ceo_image_alt" class="mt-1 form-control" placeholder="ceo image description">
            <hr>
            <label class="fw-bold">
                Content Type : <span class="text-success">{{ project.content_type }}</span>
            </label>
            <hr>

            <div class="d-flex">
                <strong class="my-auto">Tag's</strong>
                <hr class="ms-2 w-100">
            </div>
            
            <ul class="list-unstyled overflow-y-auto" style="max-height: 20vh;">
                <li 
                v-for="(tag,index) in content_type_tags" 
                v-bind:key="index"
                :class="'d-flex rounded p-2 me-2 mb-2 btn btn-' + (tag.slected ? 'primary':'secondary')"
                @click="tag.slected = !tag.slected"
                >{{ tag.name }}</li>
            </ul>
        </div>

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
