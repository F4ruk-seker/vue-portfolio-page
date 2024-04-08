
<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue';
import ResumeComponent from '@/components/ResumeComponent.vue'
import WorkExperiences from '@/composable/WorkExperiencesHelper';
import { useNotification } from "@kyvg/vue3-notification";

import WorkExperiencesForm from '@/components/resume/WorkExperienceComponent.vue'


const { notify }  = useNotification()

let timerId;

const context = ref('')
const previous_context = ref('')

const instance_work_experience = ref({title:'', company:'', start_date:'', end_date:'', experience:'', show:true})
const show_work_experience_modal = ref(false)

function toggle_work_experience_modal() {
    show_work_experience_modal.value =! show_work_experience_modal.value
}

async function get_context() {
    const response = await axios.get('resume/edit/')
    context.value = response.data
}

async function sync_context(){
    const response = await axios.put('resume/edit/', context.value)
    context.value = response.data
}

function updateValue(key, newValue) {
    context.value[key] = newValue;
    echo_context_sync()
}

onMounted(()=>{get_context()})

function echo_context_sync() {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
    if (context.value !== previous_context.value) {
        sync_context()
        notify({
            title: "Sync",
            text: "Context synced!",
        });
    }
        previous_context.value = context.value
    }, 2000);
}

</script>

<style scoped>
.ubuntu-medium {
  font-family: "Ubuntu", sans-serif;
  font-weight: 500;
  font-style: normal;
}

.ubuntu-medium{
    color: teal;
}
.dark-mode .ubuntu-medium{
    color: white;
}
</style>
<template>
<section class="row m-0 h-100">
    <article class="col-6 overflow-x-hidden overflow-y-auto h-100 pt-2">
    <div v-if="!context" class="h-100 d-flex">
            <div class="spinner-border m-auto justify-content-center" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
    <div v-else>
        <div class="d-flex"><strong class="text-primary">HEAD</strong><hr class="w-100 bg-secondary ms-2 my-auto"></div>
        <label>Name</label>
        <input type="text" class="form-control" v-model="context.name" @input="echo_context_sync">
        <label>Job Title</label>
        <input type="text" class="form-control" v-model="context.job_title" @input="echo_context_sync">
        <label>Picture</label>
        <div class="d-flex">
            <input type="text" class="form-control" v-model="context.picture" @input="echo_context_sync">
            <button class="btn btn-primary ms-2 disabled" disabled>Upload</button>
        </div>
        <label>Description</label>
        <textarea class="form-control" v-model="context.description" placeholder="Description" cols="4" rows="6" @input="echo_context_sync" style="height: 20vh;"></textarea>
        
        <div class="d-flex"><strong class="text-primary">CONTACT</strong><hr class="w-100 bg-secondary ms-2 my-auto"></div>
        <label><i class="fa-regular fa-envelope" style="width: 24px;"></i> Mail</label>
        <input type="email" class="form-control" v-model="context.contact.mail" @input="echo_context_sync">
        <label><i class="fa-solid fa-globe" style="width: 24px;"></i> Website</label>
        <input type="url" class="form-control" v-model="context.contact.website" @input="echo_context_sync">
        <label><i class="fa-brands fa-linkedin-in" style="width: 24px;"></i> Linkedin</label>
        <input type="text" class="form-control" v-model="context.contact.linkedin" @input="echo_context_sync">
        <label><i class="fa-brands fa-github" style="width: 24px;"></i> Github</label>
        <input type="text" class="form-control" v-model="context.contact.github" @input="echo_context_sync">

        <div class="d-flex"><strong class="text-primary" style="min-width: max-content;">WORK EXPERIENCES</strong><hr class="w-100 bg-secondary ms-2 my-auto"></div>
        <ul class="list-unstyled">
            <li>
                <ul class="list-unstyled d-flex fw-semibold">
                    <li class="my-auto px-1">#</li>
                    <li class="w-100 my-auto"><hr class="w-100 text-secondary"></li>
                    <li class="my-auto fw-bold link-primary" @click="instance_work_experience={title:'', company:'', start_date:'', end_date:'', experience:'', show:true};show_work_experience_modal=true">Create</li>
                </ul>
            </li>
            <li v-for="(work_experience, index) in context.work_experiences" :key="index" class="border rounded p-2 mb-3">
                <ul class="list-unstyled d-flex fw-semibold">
                    <li class="border-end px-1">{{ index + 1 }}</li>
                    <li class="border-end px-1 w-100">{{ work_experience.title }}</li>
                    <li class="border-end px-2 link-primary" @click="work_experience.show =! work_experience.show; WorkExperiences.update(work_experience)">
                        <i v-if="work_experience.show" class="fa-regular fa-eye"></i>
                        <i v-else class="fa-regular fa-eye-slash"></i>
                    </li>
                    <li class="border-end px-2 link-primary" @click="instance_work_experience=work_experience;show_work_experience_modal=true"><i class="fa-regular fa-pen-to-square"></i></li>
                    <li class="border-end px-2 link-danger" @click="async ()=>{
                        await WorkExperiences.remove(work_experience.id); await get_context()
                    }"><i class="fa-solid fa-trash"></i></li>
                    <li></li>
                </ul>
            </li>
        </ul>

        <div class="d-flex"><strong class="text-primary">HEAD</strong><hr class="w-100 bg-secondary ms-2 my-auto"></div>

    </div>
    </article>
    <article class="col-6 overflow-y-auto h-100">
        <ResumeComponent :context="context" :EditMode="true"/>
    </article>
</section>
<WorkExperiencesForm 
    :show_modal="show_work_experience_modal" 
    :instance_exp="instance_work_experience" 
    @toggle_modal="toggle_work_experience_modal"
    @submit="()=>{
        show_work_experience_modal=false;
        get_context();
        notify(ref({
            title: 'Sync',
            text: 'Work Experience'
        }).value)
    }"
/>
</template>
