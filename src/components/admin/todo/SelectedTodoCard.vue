<template>
<div class="shadow m-3 p-3 rounded shadow mt-5" v-if="td" id="SelectedTodo">
    <h2 class="fw-bold">{{ td.task }}</h2>
    <div v-if="td.is_to_do" class="alert alert-success p-1 text-center fw-bold d-flex ms-0 m-2" style="max-width: min-content; cursor: pointer;">
        <i class="fa-solid fa-check m-auto pe-2"></i>
        Done
    </div>
    <div v-else class="alert alert-danger p-1 text-center fw-bold d-flex ms-0 m-2" style="max-width: min-content; cursor: pointer;">
        <i class="fa-solid fa-xmark m-auto pe-2"></i>
        Ongoing
    </div>
    <div class="d-flex">
        <p class="m-auto p-0 fw-semibold">Detail</p>
        <hr class="w-100 mx-2 my-auto bg-secondary">

        <button class="btn btn-light shadow-sm rounded-circle d-flex p-0 m-0 " style="min-width: 36px; max-width: 36px; min-height: 36px; max-height: 36px;" @click="edit_detail=!edit_detail">
            <i class="fa-solid fa-pencil justify-content-center m-auto"></i>
        </button>
    </div>
    <textarea v-if="edit_detail" class="form-control my-1 p-1" v-model="$props.td.detail" style="height: 250px;"></textarea>
    <div  v-else class="border p-1 my-1 rounded" v-html="getHtmlFromMark(td.detail)" style="height: 250px;"></div>
    <div class="d-flex">
        <p class="m-0 me-2 p-0 fw-semibold" style="min-width: max-content;">Time Flow</p>
        <hr class="w-100 my-auto bg-secondary">
    </div>
    <div class="form-group mb-3">
        <label for="cteatedTime">Created;</label>
        <div class="input-group">
            <div class="input-group-text bg-secondary-subtle text-light fw-bold bprder-0">
                <i class="fa-regular fa-clock"></i>
            </div>
            <input type="text" class="form-control" id="cteatedTime" placeholder="Created" v-model="$props.td.created" disabled>
        </div>
    </div>
    <div class="form-group mb-3" v-show="$props.td.death_of_line">
        <label for="death_of_line">Death line;</label>
        <div class="input-group">
            <div class="input-group-text bg-secondary-subtle text-light fw-bold bprder-0">
                <i class="fa-regular fa-clock"></i>
            </div>
            <input type="text" class="form-control" id="death_of_line" placeholder="death_of_line" v-model="$props.td.death_of_line">
        </div>
    </div>
    <div class="form-group mb-3">
        <label for="end_date">End Date;</label>
        <div class="input-group">
            <div class="input-group-text bg-secondary-subtle text-light fw-bold bprder-0">
                <i class="fa-regular fa-clock"></i>
            </div>
            <input type="text" class="form-control" id="end_date" placeholder="end_date" v-model="$props.td.end_date">
        </div>
    </div>
    {{ td }}
</div>
</template>

<script setup>
import { marked } from 'marked'
import { ref } from 'vue';

const edit_detail = ref(false)

const getHtmlFromMark = (mark) => {
  return marked.parse(mark);
}

defineProps({td:Object})
</script>

<style scoped>
.dark-mode #SelectedTodo{
    box-shadow: 1px 2px 4px 4px rgba(211, 209, 209, 0.1)!important;
    color: var(--bs-white);
    input {
        background-color: transparent;
        color: var(--bs-white);
        font-weight: 600;
    }
    input:disabled {
        background-color: var(--bs-secondary);
        color: var(--bs-white);
        font-weight: 600;
    }
    textarea {
        background-color: transparent;
        color: var(--bs-white);
        font-weight: 600;
    }
}
</style>