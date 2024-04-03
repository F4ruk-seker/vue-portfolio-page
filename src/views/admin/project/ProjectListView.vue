<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import ProjectPreview from '../../../components/admin/project/ProjectPreview.vue';
import CreateNewContentModal from '../../../components/admin/project/CreateNewContentModal.vue';
/*
import ContentTypeCreateEdit from '@/components/admin/project/ContentTypeCreateEdit.vue';
<ContentTypeCreateEdit />
*/
import axios from 'axios';

const router = useRouter()
const route = useRoute()
const projcets = ref(null)
const content_types = ref(null)
const content_create_modal = ref(false)

async function get_project_list(){
    const response = await axios.get('/content/edit/')
    projcets.value = await response.data
}

async function get_content_types(){
    await axios.get('/content/type/').then((response) => {
        content_types.value  = response.data
    })
}

function content_create_modal_toggle(value=null){
    if (value !== null){
        content_create_modal.value = value
    } else {
        content_create_modal.value = !content_create_modal.value
    }
}



async function create_new_content(content, gotocontent=false) {
    const new_content = await axios.post('/content/create/', content)
    if (gotocontent){
        router.push({
            name:'admin-project',
            params:{slug:new_content.data.slug}
        })
    } else {
        content_create_modal_toggle()
        await get_project_list()
        //router.push({ hash: '#content_' + new_content.data.id });
    }
}

onMounted(async ()=>{
    await get_project_list()
    await get_content_types()
})

</script>

<template>
<section class="d-flex h-100">
    <article class="container justify-content-center my-auto">
        <div class="row border p-3 shadow rounded overflow-y-auto mh-100">
            <div class="col-2 col-md-4 pt-3 rounded-1 border">
                <div class="w-100 d-flex justify-content-between">
                    <strong class="my-auto">Content Type</strong>
                    <button class="btn btn-success btn-sm fw-bold disabled" disabled>ADD</button>
                </div>
                <hr>
                <ul class="list-unstyled overflow-y-auto" style="height: 65vh;">
                    <li class="">
                        <button class="text-start border-bottom d-flex rounded mb-2 w-100 fw-semibold btn btn-light active">
                            <span class="ms-0 ms-md-5">All</span>
                        </button>
                    </li>
                    <li 
                        v-for="content_type in content_types" v-bind:key="content_type.id"
                    >
                        <button class="btn btn-light text-start d-flex rounded mb-2 w-100 fw-semibold">
                            <span class="ms-0 ms-md-5">{{ content_type.name }}</span>
                        </button>
                    </li>
                </ul>
            </div>
            <div class="col overflow-y-auto " style="max-height: 80vh;">
                <div class="d-flex bg-light px-1 py-2 rounded mb-2 border-bottom">
                    <strong class="my-auto text-primary" style="min-width: 50px; max-width:50px;"> row/id</strong>
                    <div class="my-auto d-flex" style="min-width: 100px; max-width: 100px;">
                        <hr class="w-100 my-auto">
                        <p class="my-auto mx-2 p-0 fw-bold text-secondary">img</p>
                        <hr class="w-100 my-auto">
                    </div>
                    <div class="w-100 px-1 my-auto d-flex justify-content-between">
                        <strong class="my-auto text-success">Title</strong>
                        <button class="btn btn-success btn-sm my-auto fw-bold" @click="content_create_modal=true">ADD</button>
                    </div>
                </div>
                <ProjectPreview v-for="(project, index) in projcets" v-bind:key="project.id" :project="project" :row="index" />
            </div>
        </div>
    </article>
</section>
<CreateNewContentModal :show_modal="content_create_modal" :content_types="content_types" @toggle_modal="content_create_modal_toggle"  @submit="create_new_content"/>
</template>

<style>

</style>
