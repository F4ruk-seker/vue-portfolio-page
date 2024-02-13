<script>

export default {
    name: 'ProjectPreview',
    props: ['project', 'row'],
}
</script>

<template>
    <router-link class="text-decoration-none" :to="{name:'admin-project', params:{slug:project.slug}}">
        <div class="btn btn-light p-1 w-100 my-1 d-flex">
            <div class="d-flex" style="min-width: 50px;">
                <strong class="justify-content-center m-auto">
                    {{ row + 1 }} / {{ project.id }}
                </strong>
            </div>
            <div class="bg-secondary rounded h-100" style="min-width: 100px; min-height: 75px;">
                ...
            </div>
            <div class="ms-2 my-auto">
                <strong class="p-1">{{ project.title }}</strong>
                <p class="m-0 p-0">/{{ project.slug }}</p>
            </div>
        </div>
    </router-link>
</template>

<style>
</style>
