<script>

export default {
    name: 'ProjectPreview',
    props: ['project'],
}
</script>

<template>
    <router-link style="cursor: pointer;" :to="{name:'admin-project', params:{slug:project.slug}}">
        <div class="card w-100 my-1">
            <h5 class="p-1">{{ project.title }}</h5>
        </div>
    </router-link>
</template>

<style>
</style>
