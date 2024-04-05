<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router';
import ProjectPreview from '../../../components/admin/project/ProjectPreview.vue';
import CreateNewContentModal from '../../../components/admin/project/CreateNewContentModal.vue';
/*
import ContentTypeCreateEdit from '@/components/admin/project/ContentTypeCreateEdit.vue';
<ContentTypeCreateEdit />
*/
import axios from 'axios';

const router = useRouter()
const projcets = ref(null)
const projcets_list = ref(null)
const content_types = ref(null)
const content_create_modal = ref(false)

const search = ref('')
const selected_content_type = ref('')

const search_id = ref('')

async function get_project_list(){
    const response = await axios.get('/content/edit/')
    projcets.value = await response.data
    projcets_list.value = await response.data

}

async function get_content_types(){
    await axios.get('/content/type/').then((response) => {
        content_types.value = response.data
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
    }
}

onMounted(async ()=>{
    await get_project_list()
    await get_content_types()
})

function match_query(element, text){
    if (element.title.includes(text) || element.slug.includes(text) || element.content_type.includes(text)){
        return element
    }
}

watch(search, (text)=>{
    const soure_array = ref([])
    projcets_list.value = []
    if (selected_content_type.value === ''){
        soure_array.value = projcets.value 
    } else {
        projcets.value.forEach(elemnt =>{
            if (elemnt.content_type === selected_content_type.value){
                soure_array.value.push(elemnt)
            }
        })
    }
    
    soure_array.value.forEach(element => {
        var result = match_query(element, text)
        if (result === element){
            projcets_list.value.push(element)
        } 
    });
})

watch(selected_content_type, (_)=>{
    if (_ !== ''){
        projcets_list.value = []
        projcets.value.forEach(element => {
            if (element.content_type === _){
                projcets_list.value.push(element)
            }
        });
    } else {
        projcets_list.value = projcets.value
    }
})


</script>

<template>
<section class="d-flex h-100">
    <article class="container justify-content-center my-auto">
        <div class="row border p-3 shadow rounded overflow-y-auto mh-100">
            <div class="col-2 col-md-4 pt-3 rounded-1 border">
                <div class="w-100 d-flex justify-content-between">
                    <h4 class="my-auto fw-bold">Content Type</h4>
                </div>
                <hr class="bg-secondary">
                <ul class="list-unstyled overflow-y-auto" style="height: 65vh;">
                    <li class="">
                        <button :class="'text-start border-bottom d-flex rounded mb-2 w-100 fw-semibold btn btn-secondary ' + (selected_content_type == '' ? 'active': '')" @click="selected_content_type=''">
                            <span class="ms-0 ms-md-5">All</span>
                        </button>
                    </li>
                    <li 
                        v-for="content_type in content_types" v-bind:key="content_type.id"
                    >
                        <button :class="'text-start border-bottom d-flex rounded mb-2 w-100 fw-semibold btn btn-secondary ' + (selected_content_type == content_type.name ? 'active': '')" @click="selected_content_type=content_type.name">
                            <span class="ms-0 ms-md-5">{{ content_type.name }}</span>
                        </button>
                    </li>
                    <li><hr class="bg-secondary"></li>
                    <li>
                        <button class="w-100 btn btn-danger d-flex ">
                            <span class="ms-0 ms-md-5">Trash</span>
                        </button>
                    </li>
                </ul>
            </div>
            <div class="col overflow-y-auto " style="max-height: 80vh;">
                <div class="d-flex bg-secondary-subtle px-1 py-2 rounded mb-2 border-bottom position-sticky top-0 z-1">
                    <strong class="my-auto text-primary text-center" style="min-width: 50px; max-width:50px;"> row</strong>
                    <div style="min-width: 50px; max-width:50px;">
                        <input type="text" class="form-control bg-transparent border border-white" placeholder="id" v-model="search_id">
                    </div>
                    <div class="my-auto d-flex" style="min-width: 100px; max-width: 100px;">
                        <hr class="w-100 my-auto">
                        <p class="my-auto mx-2 p-0 fw-bold text-secondary">img</p>
                        <hr class="w-100 my-auto">
                    </div>
                    <div class="w-100 px-1 my-auto d-flex justify-content-between">
                        <input type="text" class="form-control me-2 bg-transparent border border-white" placeholder="Search" v-model="search">
                        <button class="btn btn-success btn-sm my-auto fw-bold" @click="content_create_modal=true">ADD</button>
                    </div>
                </div>
                <ProjectPreview v-for="(project, index) in projcets_list" v-bind:key="project.id" :project="project" :row="index + 1" />
            </div>
        </div>
    </article>
</section>
<CreateNewContentModal :show_modal="content_create_modal" :content_types="content_types" @toggle_modal="content_create_modal_toggle"  @submit="create_new_content"/>
</template>

<style>

</style>
