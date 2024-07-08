<script>

export default {
    name: 'ProjectPreview',
    props: ['project', 'row'],
}
</script>

<template>
    <div class="content mb-2" :id="'content_' + project.id">
        <div 
            class="shadow-sm text-light fw-semibold rounded border-secondary-subtle p-1 w-100 my-1 d-flex py-2" 
            style="height: max-content;background-color: #2f2f2f61;">
            <div class="d-flex" style="min-width: 50px;">
                <strong class="justify-content-center m-auto">
                    {{ row }}
                </strong>
            </div>
            <div class="d-flex" style="min-width: 50px;">
                <strong class="justify-content-center m-auto">
                    {{ project.id }}
                </strong>
            </div>
            <div class="bg-secondary rounded-2 h-100 ratio ratio-16x9 border border-white" style="max-width: 100px; height: 75px; min-height: 75px;">
                <img :src="project.seo_image_url" alt="project banner" style="object-fit: cover;">
            </div>
            <div class="ms-2 my-auto" style="min-width: max-content;">
                <router-link class="text-decoration-none text-start h-100 " style="min-height: 75px; min-width: max-content;"  :to="{name:'admin-project', params:{slug:project.slug}}">
                    <strong class="p-1 ps-0 text-capitalize">{{ project.title }}</strong>
                    <p class="m-0 p-0">/{{ project.slug }}</p>
                </router-link>
            </div>
            <div class="w-100"></div>
            <div class="d-flex me-2">
                <button class="btn btn-light d-flex rounded-circle custom-circle-btn p-0 m-auto me-2">
                    <span class="m-auto justify-content-center">
                        <i v-if="project.show" class="fa-regular fa-eye"></i>
                        <i v-else class="fa-regular fa-eye-slash"></i>
                    </span>
                </button>
                <button class="btn btn-light d-flex rounded-circle custom-circle-btn p-0 m-auto me-2"><i class="fa-solid fa-pen-to-square m-auto justify-content-center"></i></button>
                <button class="btn btn-light d-flex rounded-circle custom-circle-btn p-0 m-auto "><i class="fa-solid fa-trash m-auto justify-content-center"></i></button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.custom-circle-btn{
    width: 35px;
    height: 35px;
}
</style>
