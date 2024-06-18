<template>
    <div class="row m-0 p-0 h-100">
        <div class="col-2 m-0 p-0">
            <ul class="list-unstyled">
                <li 
                    class="p-2 pe-0"
                    v-for="category, index in categories"  v-bind:key="index" >
                    <div 
                        :class="'ounded ' + (hoveredCategoryId===category.id ? 'border border-primary':'')"
                        @click="todos=category.todos;selected_category=category"
                        style="cursor: pointer;"
                        @drop="handleDrop($event, category.id);hoveredCategoryId=null"
                        :dropzone="true"
                        @dragover.prevent="hoveredCategoryId=category.id"
                        @dragleave.prevent="hoveredCategoryId=null"
                        @dragenter.prevent>
                        <CategoryCard :cate="category" />
                    </div>
                </li>
            </ul>
        </div>
        <div class="col m-0 p-0 px-2 mt-3">
            <ul class="list-unstyled ">

                <li v-for="todo, index in todos" v-bind:key="index">
                    <div 
                        @click="selected_todo=todo" 
                        :draggable="true"
                        @dragstart="startDrag($event, todo)"
                        :class="'rounded mb-2 shdow-sm user-select-none drag-el border ' + (selected_todo === todo ? 'border border-primary':'')"
                        style="cursor: pointer;">
                        <TodoCard :td="todo" />
                    </div>
                </li>
            </ul>
        </div>
        <div class="col-3 m-0 p-0 border-0 border-start h-100 overflow-x-auto">
            <SelectedTodoCard :td="selected_todo"/>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { computed, ref, onMounted } from 'vue';
import CategoryCard from '@/components/admin/todo/CategoryCard.vue'
import TodoCard from '@/components/admin/todo/TodoCard.vue'
import SelectedTodoCard from '@/components/admin/todo/SelectedTodoCard.vue'

const categories = ref()
const selected_category = ref()

const todos = ref([])
const selected_todo = ref()

const hoveredCategoryId = ref()

const fetch_categories = async () => {
    return await axios.get('todo/').then(
        response => {
            categories.value = response.data
        }
    )
} 
const startDrag = (event, item) => {
        event.dataTransfer.dropEffect = 'move'
        event.dataTransfer.effectAllowed = 'move'
        event.dataTransfer.setData('itemID', item.id)
    }


const handleDrop = (event, category_id) => {
    const dragedTodo = event.dataTransfer.getData('itemID')
    console.log(category_id)
} 

onMounted(fetch_categories)

</script>