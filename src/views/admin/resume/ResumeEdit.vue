<template>
<section class="row m-0 h-100">
    <article class="col-6 p-0 h-100 position-relative">
        <button class="btn btn-secondary position-absolute top-0 end-0" @click="show_raw=!show_raw">{{ show_raw ? 'COM': 'RAW' }}</button>
        <textarea v-if="!show_raw" class="form-control ubuntu-medium bg-transparent  border-secondary border-0 border-end ps-2 rounded-0" @input="echo_context_sync" v-model="context"></textarea>
        <p v-else class="m-0 p-2 pt-5">{{ marked }}</p>
    </article>
    <article class="col-6 p-0 overflow-auto h-100">
        <ResumeComponent :context="marked" :EditMode="true"/>
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

const show_raw = ref(false)

const marked = ref('')

async function get_context() {
    const response = await axios.get(`resume/edit/${process.env.VUE_APP_ALPHA_USER}`)
    context.value = response.data.context
    marked.value = response.data.marked
}

async function sync_context(){
    const response = await axios.put(`resume/edit/${process.env.VUE_APP_ALPHA_USER}`, {context: context.value})
    context.value = response.data.context
    marked.value = response.data.marked
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