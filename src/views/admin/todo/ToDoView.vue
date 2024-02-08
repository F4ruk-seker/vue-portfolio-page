<template>
<section class="d-flex h-100">
    <article class="container justify-content-center m-auto">
        <form class="d-flex" @submit.prevent="add_todo">
            <input
                type="text"
                :class="'form-control ' + ( new_task_is_empty ? 'border-2 border-danger shake': '')"
                name="todo"
                id="todo"
                aria-describedby="todoHelp"
                placeholder="todo"
                v-model="new_task"
            />
            <button class="btn btn-sm btn-outline-primary fw-bold ms-2" :disabled="on_add">
                <div v-if="on_add" class="spinner-grow spinner-grow-sm" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
                <span v-else>add</span>
            </button>
        </form>
        
        <TodoProgress :percentage="completion_rate"/>

        <div class="position-relative" name="todolist">
            <div class="position-sticky top-0 bg-light  p-1 d-flex border-bottom">
                <i class="fa-solid fa-hashtag" style="width: 75px;"></i>
                <i class="fa-regular fa-rectangle-list ms-3 w-100"></i>
                <i class="fa-solid fa-check mx-3"></i>
                <i class="fa-solid fa-trash me-4"></i>
            </div>
            <div class="border border-top-0 mt-2 overflow-y-auto" style="height: 40vh;">
                <div :class="'d-flex task ' + (index %2==0 ? 'bg-light-subtle':'bg-dark-subtle')" v-for="(todo, index) in todo_list" v-bind:key="todo.id" :id="'task_' + todo.id">
                    <div class="ms-1 fw-semibold" style="width: 75px;">{{ index + 1 }}</div>
                    <div class="w-100 fw-bolder">{{ todo.task }}</div>
                    <div class="mx-2 pe-1" @click="toggle_task(index)">
                        <span v-if="todo.is_to_do"><i class="fa-regular fa-square-check"></i></span>
                        <span v-else><i class="fa-regular fa-square"></i></span>
                    </div>
                    <div class="text-danger me-3" @click="reomove_todo(index)">
                        <i class="fa-solid fa-x"></i>
                    </div>
                </div>
            </div>
        </div>
    </article>
</section>
</template>

<script setup>
import TodoProgress from '@/components/admin/todo/TodoProgressBar.vue'
import axios from 'axios'
import { onMounted, ref } from 'vue';

const todo_list = ref([])
const new_task = ref('')
const on_add = ref(false)
const new_task_is_empty = ref(false)
const completion_rate = ref(0)

function get_todo_list() {
    axios.get('todo/').then(((response)=>{
        todo_list.value = response.data
        // completion rate calculation
        let docount = 0 
        todo_list.value.forEach((todo)=>{
            if (todo.is_to_do === true){docount ++}
        })
        completion_rate.value = 100 - ((todo_list.value.length - docount ) / todo_list.value.length * 100)      
    }))
}

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

async function toggle_task(index){
    const todo = todo_list.value[index]
    await axios.put('todo/' + todo.id, {
        task: todo.task,
        is_to_do: !todo.is_to_do
    })
    get_todo_list()
}

async function reomove_todo(index){
    await axios.delete('todo/' + todo_list.value[index].id)
    get_todo_list()
}


onMounted(get_todo_list)
</script>

<style scoped>
.task:target{
    background: red!important;;
}

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