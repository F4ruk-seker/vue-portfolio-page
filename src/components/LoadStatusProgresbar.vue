

<template>
<div v-if="$store.getters.getProgressShow" class="progress rounded-0 position-sticky top-0 start-0 z-3">
        <div class="progress-bar progress-bar-striped progress-bar-animated bg-success"
        role="progressbar"
        :style="'width: ' + $store.getters.getProgressStatus +'%'"
        :aria-valuenow="$store.getters.getProgressStatus"
        aria-valuemin="0"
        aria-valuemax="100">
    </div>
</div>
</template>

<script setup>
</script>