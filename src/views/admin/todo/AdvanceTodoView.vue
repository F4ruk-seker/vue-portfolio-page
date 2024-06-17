<template>
    <div class="row m-0 p-0">
        <div class="col-2 m-0 p-0">
            
            <ul class="list-unstyled">
                <li 
                    class="p-2"
                    v-for="category, index in categories"  v-bind:key="index" >
                    <div @click="todos=category.todos;selected_category=category" style="cursor: pointer;">
                        <CategoryCard :cate="category" />
                    </div>
                </li>
            </ul>
        </div>
        <div class="col">
            <div>
                {{ selected_category }}
            </div>
            <hr>
            <ul>
                <li v-for="todo, index in todos" v-bind:key="index">
                    {{ todo }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { computed, ref, onMounted } from 'vue';
import CategoryCard from '@/components/admin/todo/CategoryCard.vue'

const categories = ref()

const selected_category = ref()
const todos = ref([])

const fetch_categories = async () => {
    return await axios.get('todo/').then(
        response => {
            categories.value = response.data
        }
    )
} 

onMounted(fetch_categories)

</script>