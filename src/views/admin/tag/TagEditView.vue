<script setup>
import { ref, onMounted } from 'vue'
import axios from "axios"

const tags = ref([])

async function get_tags(){
    tags.value = await (await axios.get('tag/')).data
}

onMounted(()=>{
    get_tags()
})
</script>

<template>
<section>
    <article>
        <div v-for="(items, category) in tags" :key="category">
            <h2>{{ category }}</h2>
            <!-- Öğeler üzerinde döngü -->
            <ul>
            <li v-for="item in items" :key="item.id">
                ID: {{ item.id }}, Name: {{ item.name }}
                <!-- Diğer öğeleri de aynı şekilde işleyebilirsiniz -->
            </li>
            </ul>
        </div>
    </article>
</section>
</template>

<style scoped>
</style>