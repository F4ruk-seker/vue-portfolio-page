<script setup>
import { ref, onMounted } from 'vue'
import axios from "axios"

const categorys = ref([])
const category_tags = ref([])

async function get_tags(){
    const response =  await (await axios.get('tag/'))
    response.data.forEach(element => {
        element.seleted = false
        element.tags.forEach(tag=>{tag.seleted=false})
    });
    
    response.data[0].seleted = true
    category_tags.value = response.data[0].tags
    categorys.value = response.data

}

function set_tags(tags, category_id){
    category_tags.value = tags
    categorys.value.forEach(element => {
        element.seleted = element.id === category_id
        element.tags.forEach(tag=>{tag.seleted=false})
    })
}

onMounted(()=>{
    get_tags()
})
</script>

<template>
<section class="d-flex h-100">
    <article class="container row m-0 p-0 justify-content-center m-auto">
        <div class="col-4" >
            <strong>Category</strong>
            <hr>
            <div class="d-flex mb-2">
                <input class=" form-control rounded-end-0" type="text">
                <button class="btn btn-success btn-sm fw-bold">ADD</button>
            </div>
            <ul class="list-unstyled overflow-y-auto text-end " style="height: 60vh;">
                <li 
                v-for="(tag_category, index) in categorys"
                v-bind:key="index" 
                :class="'btn w-100 text-start ps-5 fw-bold ' + (tag_category.seleted ? 'btn-outline-primary' : 'btn-light') "
                @click="set_tags(tag_category.tags, tag_category.id)"
                >
                    {{ tag_category.name }}
                </li>
            </ul>
        </div>
        <div class="col-4">
            <strong>Tags</strong>
            <hr>
            <button class="btn btn-success fw-bold w-100 mb-2">ADD</button>
            <ul class=" list-unstyled">
                <li 
                v-for="tag in category_tags" 
                v-bind:key="tag.id"
                class="btn btn-light w-100 text-start ps-5 fw-bold"
                
                >{{ tag.name }}</li>
            </ul>
        </div>
        <div class="col-4">
            <strong>Tag</strong>
            <hr>
                <input type="text" class=" form-control">
                icon
                
            <button class="btn btn-primary fw-bold w-100 mb-2">Create/Update</button>

        </div>
    </article>
</section>
</template>

<style scoped>
</style>