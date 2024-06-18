<template>
    <div class="row m-0 p-0 h-100">
        <div class="col-2 m-0 p-0">
            <form @submit.prevent class="p-2 pe-0 pt-3">
                <input class="form-control shadow-sm" type="text" placeholder="New Category">
            </form>
            <ul class="list-unstyled">
                <li 
                    class="p-2 pe-0"
                    v-for="category, index in categories"  v-bind:key="index" >
                    <div 
                        :class="'rounded ' + (hoveredCategoryId===category.id ? 'border border-primary':'')"
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
        <div class="col m-0 p-0 h-100 overflow-x-auto">
            <form @submit.prevent="new_todo" class="sticky-top bg-white px-2 pt-3 pb-2">
                <div class="form-group mb-2">
                    <input 
                        :class="'form-control shdow-sm ' + ( new_todo_is_invaild ? 'border-2 border-danger shake': '')"
                        type="text" placeholder="New Todo" :disabled="!selected_category" v-model="new_todo_text"
                        >
                </div>
            </form>
            <ul class="list-unstyled px-2">
                <li v-for="todo, index in todos" v-bind:key="index">
                    <div 
                        @click="selected_todo=todo" 
                        :draggable="true"
                        @dragstart="startDrag($event, todo)"
                        :class="'rounded mb-2 shdow-sm user-select-none drag-el ' + (selected_todo === todo ? 'border border-primary':'')"
                        style="cursor: pointer;">
                        <TodoCard :td="todo" />
                    </div>
                </li>
            </ul>
        </div>
        <div class="col-3 m-0 p-0 border-0 border-start h-100 overflow-x-auto">
            <SelectedTodoCard v-if="selected_todo" :td="selected_todo" @syncTodo="sync_selected_todo"/>
        </div>
    </div>
</template>

<script setup>
import TodoService from '@/composable/TodoService';
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
const dragedTodo = ref()
const new_todo_text = ref('')
const new_todo_is_invaild = ref(false)

const sync_selected_todo = (todo) => {
    if (todo === null){
        for (var category of categories.value){
            const index = category.todos.findIndex(todo => todo.id === selected_todo.value.id);
            if (index !== -1) {
                category.todos.splice(index, 1);
            }
        }
    }
    selected_todo.value = todo
}

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
        dragedTodo.value = item
      //  event.dataTransfer.setData('itemID', item.id)

    }


const handleDrop = (event, category_id) => {
    for (var category of categories.value){
        //if (dragedTodo.value.category === category.id){}
        
        if (category_id === category.id) {
            if (!category.todos.some(todo => todo.id === dragedTodo.value.id)) {
                    category.todos.push(dragedTodo.value);
                }
        } 
        
        if (category_id !== category.id){
            const index = category.todos.findIndex(todo => todo.id === dragedTodo.value.id);
            if (index !== -1) {
                category.todos.splice(index, 1);
            }
        }
    }
    const updateTodo = dragedTodo.value
    updateTodo.category = category_id
    TodoService.todoUpdate(updateTodo)
} 
 
const new_todo = async () => {
    if (new_todo_text.value.length >= 3){
        const new_todo = await TodoService.addTodo(new_todo_text.value, selected_category.value.id)
        if (new_todo) {
            selected_category.value.todos.push(new_todo)
            new_todo_text.value = ''
        } else {
            alert('bilinmeyen hata')
        }
    } else {
        new_todo_is_invaild.value = true
        setTimeout(() => {
            new_todo_is_invaild.value = false
        }, 1500)
    }
}

onMounted(fetch_categories)



/*
async function add_todo(){
    if (new_task.value.length > 0){
        on_add.value = true
        await axios.post('todo/add/',{
            task:new_task.value
        })
        new_task.value = ''
        get_todo_list() // update todo list
        on_add.value = false
    } else {
        new_task_is_empty.value = true
        setTimeout(() => {
            new_task_is_empty.value = false
        }, 1500)
    }
}
*/

</script>

<style scoped>

.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>