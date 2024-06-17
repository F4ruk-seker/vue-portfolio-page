<template>
    <div class="d-flex rounded shadow-sm px-2 py-1" id="TodoCard">
        <p class="p-0 pe-2 m-0">
            <span v-if="td.is_to_do">
                <i class="fa-solid fa-check text-success"></i>
            </span>
            <span v-else>
                <i class="fa-solid fa-xmark text-danger-emphasis"></i>
            </span>
        </p>
        <strong class="w-100 fw-bold">{{ td.task }}</strong>
        <strong class="fw-semibold" style="min-width: max-content;">{{ td.death_of_line }}</strong>
    </div>
</template>

<script setup>
defineProps({td:Object})
</script>

<style scoped>
.dark-mode #TodoCard{
    box-shadow: 1px 2px 4px 4px rgba(211, 209, 209, 0.1)!important;
    color: var(--bs-white);
}
</style>