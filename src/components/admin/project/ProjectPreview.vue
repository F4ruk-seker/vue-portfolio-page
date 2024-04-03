<script>

export default {
    name: 'ProjectPreview',
    props: ['project', 'row'],
}
</script>

<template>
    <div class="content" :id="'content_' + project.id">
        <router-link class="text-decoration-none h-100" style="min-height: 75px;"  :to="{name:'admin-project', params:{slug:project.slug}}">
        <div class="btn btn-light p-1 w-100 my-1 d-flex py-2" style="height: max-content;">
            <div class="d-flex" style="min-width: 50px;">
                <strong class="justify-content-center m-auto">
                    {{ row + 1 }} / {{ project.id }}
                </strong>
            </div>
            <div class="bg-secondary rounded h-100 ratio ratio-16x9" style="max-width: 100px; height: 75px; min-height: 75px;">
                <img :src="project.seo_image_url" alt="project banner" style="object-fit: cover;">
            </div>
            <div class="ms-2 my-auto">
                <strong class="p-1">{{ project.title }}</strong>
                <p class="m-0 p-0">/{{ project.slug }}</p>
            </div>
        </div>
    </router-link>
    </div>
</template>

<style>
</style>
