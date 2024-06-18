<template>
<div class="shadow m-3 p-3 rounded mt-5" v-if="td" id="SelectedTodo">
    <cite contenteditable="true" @input="taskEdit">
        <h2 class="fw-bold" ref="taskRef">{{ td.task }}</h2>
    </cite>
    <div v-if="td.is_to_do" @click="toggleTodo" class="alert alert-success p-1 text-center fw-bold d-flex ms-0 m-2" style="max-width: min-content; cursor: pointer;">
        <i class="fa-solid fa-check m-auto pe-2"></i>
        Done
    </div>
    <div v-else @click="toggleTodo" class="alert alert-danger p-1 text-center fw-bold d-flex ms-0 m-2" style="max-width: min-content; cursor: pointer;">
        <i class="fa-solid fa-xmark m-auto pe-2"></i>
        Ongoing
    </div>
    <div class="d-flex">
        <p class="m-auto p-0 fw-semibold">Detail</p>
        <hr class="w-100 mx-2 my-auto bg-secondary">
    </div>
    <textarea v-if="edit_detail" class="form-control my-1 p-1" @input="echo_todo_sync" v-model="$props.td.detail" style="height: 250px;"></textarea>
    <div  v-else class="border p-1 my-1 rounded" @click="edit_detail=true" v-html="getHtmlFromMark(td.detail)" style="height: 250px;"></div>
    <div class="d-flex">
        <p class="m-0 me-2 p-0 fw-semibold" style="min-width: max-content;">Time Flow</p>
        <hr class="w-100 my-auto bg-secondary">
    </div>
    <div class="form-group mb-3">
        <label for="cteatedTime">Created;</label>
        <div class="input-group">
            <div class="input-group-text bg-secondary-subtle text-light fw-bold bprder-0">
                <i class="fa-regular fa-clock"></i>
            </div>
            <input type="date" class="form-control" id="cteatedTime" placeholder="Created" v-model="$props.td.created.split('T')[0]" disabled>
        </div>
    </div>
    <div class="form-group mb-3">
        <label class="" for="death_of_line">{{$props.td.death_of_line===null ? 'No has ':'' }}Death line;</label>
        <div class="input-group">
            <div class="input-group-text bg-secondary-subtle text-light fw-bold bprder-0">
                <i class="fa-regular fa-clock"></i>
            </div>
            <input type="date"  class="form-control" id="death_of_line" placeholder="death_of_line" v-model="$props.td.death_of_line" @input="sync_todo">
        </div>
    </div>
    <div class="form-group mb-3">
        <label for="end_date">End Date;</label>
        <div class="input-group">
            <div class="input-group-text bg-secondary-subtle text-light fw-bold bprder-0">
                <i class="fa-regular fa-clock"></i>
            </div>
            <input type="date" class="form-control" id="end_date" placeholder="end_date" v-model="$props.td.end_date.split('T')[0]" @input="sync_todo">
        </div>
    </div>
    <div class="d-flex">
        <button class="btn btn-danger fw-bold" @click="TodoService.todoDelete($props.td); $emit('syncTodo', null)">Delete</button>
        <div class="w-100"></div>
        <button class="btn btn-success fw-bold" disabled>{{ onsync ? 'saveing': 'saved'}}</button>
    
    </div>
</div>
</template>

<script setup>
import { marked } from 'marked'
import { onMounted, onBeforeUpdate, ref, watch } from 'vue';
import TodoService from '@/composable/TodoService';
import { useNotification } from "@kyvg/vue3-notification";

const { notify }  = useNotification()

let timerId;
const edit_detail = ref(false)
const props = defineProps({td:{type:Object,required: true}})
const emit = defineEmits(['syncTodo'])
const previous_todo = ref()
const taskRef = ref(null)
const onsync = ref(false)

onBeforeUpdate(()=>{
    previous_todo.value=props.td
})

const getHtmlFromMark = (mark) => {
  return marked.parse(mark);
}

function echo_todo_sync() {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
    if (props.td.value !== previous_todo.value) {
        sync_todo()
    }
    previous_todo.value = props.td.value
    }, 2000);
}

const taskEdit = () => {
    // eslint-disable-next-line
    props.td.task = taskRef.value.innerText
    echo_todo_sync()
}

const toggleTodo = () => {
    // eslint-disable-next-line
    props.td.is_to_do = !props.td.is_to_do
    sync_todo()
}

async function sync_todo () {
    onsync.value = true
    await TodoService.todoUpdate(props.td)
    onsync.value = false
    edit_detail.value = false
    notify({
            title: "Sync",
            text: "Todo synced!",
        });
    emit('syncTodo', props.td)
}

/*
 watch: {
    td: {
      handler(newVal) {
        this.localTask = newVal.task;
      },
      deep: true
    }
     */
</script>

<style scoped>
.dark-mode #SelectedTodo{
    box-shadow: 1px 2px 4px 4px rgba(211, 209, 209, 0.1)!important;
    color: var(--bs-white);
    input {
        background-color: transparent;
        color: var(--bs-white);
        font-weight: 600;
    }
    input:disabled {
        background-color: var(--bs-secondary);
        color: var(--bs-white);
        font-weight: 600;
    }
    textarea {
        background-color: transparent;
        color: var(--bs-white);
        font-weight: 600;
    }
}
</style>