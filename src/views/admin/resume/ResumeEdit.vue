<template>
<section class="row m-0 h-100">
    <article class="col-6 overflow-x-hidden overflow-y-auto h-100 pt-2">
    <div v-if="!context" class="h-100 d-flex">
            <div class="spinner-border m-auto justify-content-center" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
    <div v-else>
        {{ context }}
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
        
        <div class="d-flex"><strong class="text-primary">HEAD</strong><hr class="w-100 bg-secondary ms-2 my-auto"></div>
        <div class="d-flex"><strong class="text-primary">HEAD</strong><hr class="w-100 bg-secondary ms-2 my-auto"></div>

    </div>
    </article>
    <article class="col-6 overflow-y-auto h-100">
        <ResumeComponent :context="context" :EditMode="true"/>
    </article>
</section>
</template>

<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue';
import ResumeComponent from '@/components/ResumeComponent.vue'
import { useNotification } from "@kyvg/vue3-notification";
const { notify }  = useNotification()

let timerId;

const context = ref('')
const previous_context = ref('')

async function get_context() {
    const response = await axios.get('resume/edit/')
    context.value = response.data
    // marked.value = response.data.context
}

async function sync_context(){
    const response = await axios.put('resume/edit/', context.value)
    context.value = response.data
    // marked.value = response.data.context
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