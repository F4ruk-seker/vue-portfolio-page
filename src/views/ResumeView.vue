<template>
<section class="w-100 d-flex">
    <article class="justify-content-center m-auto">
        <ResumeComponent id="resume" :context="context" :EditMode="false"/>
    </article>
</section>
</template>

<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue';
import ResumeComponent from '@/components/ResumeComponent.vue'


const context = ref()


async function get_context() {
    const response = await axios.get('resume/')
    context.value = response.data
}


onMounted(get_context)
</script>