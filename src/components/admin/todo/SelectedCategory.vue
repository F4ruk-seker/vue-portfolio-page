<template>
<div class="m-2 me-0 p-2 shadow-sm rounded">
    <h4>{{ cate.title }}</h4>
    <div name="status" class="user-select-none">
        <div class="alert alert-success p-1 text-center fw-bold d-flex ms-0 m-2">
            <i class="fa-solid fa-check my-auto ms-2"></i>
            <p class="my-auto mx-2">All Todo's Done</p>
        </div>
        <div class="alert alert-danger p-1 text-center fw-bold d-flex ms-0 m-2">
            <i class="fa-solid fa-xmark my-auto ms-2"></i>
            <p class="my-auto mx-2">Todo's not done</p>
        </div>
    </div>

    <div name="detail">
        <div class="d-flex">
            <p class="m-auto p-0 fw-semibold">Detail</p>
            <hr class="w-100 mx-2 my-auto bg-secondary">
        </div>
        <textarea v-if="edit_description" class="form-control my-1 p-1" v-model="cate.description" style="height: 150px;"></textarea>
        <div  v-else class="border p-1 my-1 rounded" @click="edit_description=true" v-html="getHtmlFromMark(cate.description)" style="height: 150px;"></div>
    </div>
    <div name="time flow">
        <div class="d-flex">
            <p class="m-0 me-2 p-0 fw-semibold" style="min-width: max-content;">Time Flow</p>
            <hr class="w-100 my-auto bg-secondary">
        </div>
    </div>
</div>
</template>

<script setup>
import { ref } from 'vue';
import { marked } from 'marked'

const getHtmlFromMark = (mark) => {return marked.parse(mark);}
const edit_description = ref(false)
//defineProps({cate:{type:Object, required: true}})
const cate = ref(
    { "id": 12, "todos": [ { "id": 47, "task": "new", "detail": "", "is_to_do": true, "created": "2024-06-18T13:42:50.000679", "end_date": "2024-06-18T13:55:52.894377", "death_of_line": null, "category": 12 }, { "id": 48, "task": "yeni", "detail": "", "is_to_do": true, "created": "2024-06-18T13:53:36.456652", "end_date": "2024-06-18T13:54:30.505595", "death_of_line": null, "category": 12 } ], "is_done": true, "title": "hello", "description": "", "created": "2024-06-18T13:42:44.615728", "death_of_line": null }
)
</script>