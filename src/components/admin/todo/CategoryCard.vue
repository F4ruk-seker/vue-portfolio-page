<template>
    <div class="border-white rounded shadow-sm p-1" id="TodoCategory" @dblclick="expend_menu=true">
        <div class="d-flex p-2">
          <span :class="'rounded-circle me-2 ' + ($props.cate.todos.length === $props.cate.todos.filter(todo => todo.is_to_do).length ? 'bg-success': 'bg-danger')" style="min-width: 24px; height: 24px;"></span>
          <strong class="w-100 d-flex pe-1 fw-bold my-auto">
            <span class="me-2" style="max-width: min-content;" v-if="$props.cate.todos.length !== $props.cate.todos.filter(todo => todo.is_to_do).length">
              (<span class="text-danger">{{ $props.cate.todos.filter(todo => !todo.is_to_do).length }}</span>)
            </span>
            <cite class="w-100" :contenteditable="expend_menu" @input="categoryEdit">
              <p class="w-100 p-0 m-0" ref="categoryTitleRef">{{cate.title}}</p>
            </cite>
          </strong>
          <p class="m-0 p-0 my-auto" style="width: 18px; height: 18px;" @click="expend_menu=!expend_menu">
              <span v-if="!expend_menu"><i class="fa-solid fa-sliders"></i></span>
              <span v-else><i class="fa-solid fa-x"></i></span>
          </p>
        </div>
        <div v-if="expend_menu">
            <div name="status" class="user-select-none p-2">
                <span 
                v-if="$props.cate.todos.length === $props.cate.todos.filter(todo => todo.is_to_do).length" 
                class="alert alert-success p-1 text-center fw-bold d-flex mb-0">
                    <i class="fa-solid fa-check my-auto ms-2"></i>
                    <p class="my-auto mx-2">All Todo's Done</p>
                </span>
                <span v-else class="alert alert-danger p-1 text-center fw-bold d-flex ms-0 m-2">
                    <i class="fa-solid fa-xmark my-auto ms-2"></i>
                    <p class="my-auto mx-2">Todo's not done</p>
                </span>
            </div>

            <div name="detail">
                <div class="d-flex" @click="expend_detail=!expend_detail">
                    <hr class="bg-transparent ms-2"> 
                    <p class="my-auto fw-semibold text-decoration-underline text-start">Detail</p>
                    <hr class="w-100 mx-2 my-auto bg-secondary">
                </div>
                <div class="px-2" v-if="expend_detail">
                  <textarea 
                  v-if="edit_detail" class="form-control my-1 p-1" v-model="$props.cate.description" style="height: 150px;" @input="echo_category_sync"></textarea>
                  <div  v-else class="border p-1 my-1 rounded overflow-auto" @click="edit_detail=true" v-html="getHtmlFromMark($props.cate.description)" style="height: 150px;"></div>
                </div>
            </div>
            <div name="time flow">
                <div class="d-flex" @click="expend_timeflow=!expend_timeflow">
                    <hr class="bg-transparent ms-2"> 
                    <p class="my-auto text-start fw-semibold text-decoration-underline" style="min-width: max-content;">Time Flow</p>
                    <hr class="w-100 mx-2 my-auto bg-secondary">
                </div>
                <div class="px-2" v-if="expend_timeflow">
                  <div class="form-group mb-3">
                    <label>Created</label>
                    <input v-if="$props.cate.created" type="date" class="form-control" id="cteatedTime" placeholder="Created" v-model="$props.cate.created.split('T')[0]" disabled>
                    <input v-else type="date" class="form-control" id="cteatedTime" placeholder="Created" v-model="$props.cate.created" disabled>
                  </div>
                  <div class="form-group mb-3">
                    <label>{{$props.cate.death_of_line===null ? 'No has ':'' }}Deadline</label>
                    <input @input="sync_category" v-if="$props.cate.death_of_line" type="date" class="form-control" id="cteatedTime" placeholder="Created" v-model="$props.cate.death_of_line.split('T')[0]">
                    <input @input="sync_category" v-else type="date" class="form-control" id="cteatedTime" placeholder="Created" v-model="$props.cate.death_of_line">
                  </div>
                </div>
            </div>
            <div name="delete">
              <div class="form-group px-2 mb-2">
                <button class="btn btn-sm btn-danger d-flex p-2" style="height: 2rem;" @click="$emit('remove_category', $props.cate.id)">
                  <span class="justify-content-center text-center m-auto">Delete</span>
                </button>
              </div>
            </div>
        </div>
</div>
</template>

<script setup>
import { ref, onBeforeUpdate, watch } from 'vue';
import { marked } from 'marked'
import TodoService from '@/composable/TodoService';

const getHtmlFromMark = (mark) => {return marked.parse(mark);}

const previous_category = ref()

const expend_menu = ref(false)
const expend_detail = ref(false)
const expend_timeflow = ref(false)

const edit_detail = ref(false)

const categoryTitleRef = ref(null)

const onsync = ref(false)

let timerId;
const sync_time = ref(3000)

const props = defineProps({cate:Object})
defineEmits(['remove_category'])

onBeforeUpdate(()=>{
  previous_category.value = props.cate
})

watch(expend_menu, (new_expend_menu_value) => {
  if (!new_expend_menu_value){
    edit_detail.value = false
    expend_detail.value = false
    expend_timeflow.value = false
  }
})

async function sync_category () {
    onsync.value = true
    await TodoService.categoryUpdate(props.cate)
    onsync.value = false
    edit_detail.value = false
  /*
    notify({
            title: "Sync",
            text: "Todo synced!",
            position: 'bottom right'
        });
    */
    //emit('syncTodo', props.td)
}
function echo_category_sync() {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      sync_category()
    previous_category.value = props.cate
    }, sync_time.value);
}
const categoryEdit = () => {
  // eslint-disable-next-line
  props.cate.title = categoryTitleRef.value.innerText
  echo_category_sync()
}
</script>

<style scoped>
.dark-mode #TodoCategory{
  box-shadow: 1px 1px 10px 5px rgba(211, 209, 209, 0.1)!important;
  color: white!important;
}
</style>