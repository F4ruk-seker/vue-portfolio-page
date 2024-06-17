<template>
<div class="shadow m-3 p-3 rounded shadow mt-5" v-if="td">
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
        <p class="m-0 me-2 p-0 fw-semibold">Detail</p>
        <hr class="w-100 my-auto bg-secondary">
    </div>
    <div class="border p-1 my-1 rounded" v-html="getHtmlFromMark(td.detail)"></div>
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
            <input type="text" class="form-control" id="cteatedTime" placeholder="Created" v-model="$props.td.created">
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
</div>
</template>

<script setup>

import { marked } from 'marked'

const getHtmlFromMark = (mark) => {
  return marked.parse(mark);
}

defineProps({td:Object})
</script>