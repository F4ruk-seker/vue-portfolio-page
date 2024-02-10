<script setup>
import { onMounted, ref } from 'vue'
import axios from "axios";

const tags = ref(null)

onMounted(fetch_blog_tags)

async function fetch_blog_tags() {
    let tag_list = []
    await axios.get('content/type/blog').then((response) => {  
        response.data.sub_tags.forEach(element => {
            element.tags.forEach(tag=>{tag.selected = false;tag_list.push(tag)})
        });
        tags.value = tag_list
    })
}

</script>
<template>
<nav class="container border-bottom">
<article class="py-3">
    <ul v-if="tags" class="d-flex list-unstyled my-auto">
        <li class="pe-1" v-for="(tag, index) in tags" v-bind:key="index">
            <button class="btn border rounded-5 fw-semibold">{{ tag.name }}</button>
        </li>
    </ul>
</article>
</nav>
<section class="container">
    <article>
        content
    </article>
</section>
</template>