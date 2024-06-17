<template>
    <div class="border-white rounded shadow">
        <div class="d-flex p-3 pb-2 border-bottom">
            <strong class="w-100 pe-1 fw-bold">{{cate.title}}</strong>
            <span :class="'rounded-circle ' + (cate.is_done ? 'bg-success': 'bg-danger')" style="min-width: 24px; height: 24px;"></span>
        </div>
        <div class="d-flex py-2 px-3">
            <p class="w-100 p-0 pe-1 m-0 fw-semibold">{{ cate.todos.length }} - {{cate.death_of_line}}</p>
            <span class="bg-white shadow rounded-circle d-flex" style="min-width: 24px; height: 24px;">
                <i class="fa-solid fa-angle-right m-auto text-center"></i>
            </span>
        </div>
    </div>
</template>

<script setup>
defineProps({cate:Object})
</script>