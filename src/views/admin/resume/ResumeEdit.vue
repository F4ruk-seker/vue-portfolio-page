<template>
<section class="row m-0 h-100">
    <article class="col-6 p-0 h-100">
        <textarea class="form-control ubuntu-medium bg-transparent  border-secondary border-0 border-end ps-2 rounded-0" @input="echo_context_sync" v-model="context"></textarea>
    </article>
    <article class="col-6 p-0">
        <ResumeComponent :context="marked" />
    </article>
</section>
</template>

<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue';
import ResumeComponent from '@/components/ResumeComponent.vue'

let timerId;

const context = ref('')
const previous_context = ref('')

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
        console.log('Güncellenmeye hazır:', {'context':context.value});
    }
        previous_context.value = context.value
    }, 1000);
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