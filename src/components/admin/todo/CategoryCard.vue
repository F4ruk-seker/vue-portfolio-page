<template>
    <div class="border-white rounded shadow-sm p-1" id="TodoCategory">
        <div class="d-flex p-2">
          <span :class="'rounded-circle me-2 ' + ($props.cate.todos.length === $props.cate.todos.filter(todo => todo.is_to_do).length ? 'bg-success': 'bg-danger')" style="min-width: 24px; height: 24px;"></span>
          <strong class="w-100 pe-1 fw-bold my-auto">
            {{cate.title}}
            <span v-if="$props.cate.todos.length !== $props.cate.todos.filter(todo => todo.is_to_do).length">
              (<span class="text-danger">{{ $props.cate.todos.filter(todo => !todo.is_to_do).length }}</span>)
            </span>
          </strong>
          <p class="m-0 p-0 my-auto" style="width: 18px; height: 18px;" @click="expend_menu=!expend_menu">
              <span v-if="!expend_menu"><i class="fa-solid fa-sliders"></i></span>
              <span v-else><i class="fa-solid fa-x"></i></span>
          </p>
        </div>
        <div v-if="expend_menu">
            <div name="status" class="user-select-none">
                <div 
                v-if="$props.cate.todos.length === $props.cate.todos.filter(todo => todo.is_to_do).length" 
                class="alert alert-success p-1 text-center fw-bold d-flex ms-0 m-2">
                    <i class="fa-solid fa-check my-auto ms-2"></i>
                    <p class="my-auto mx-2">All Todo's Done</p>
                </div>
                <div v-else class="alert alert-danger p-1 text-center fw-bold d-flex ms-0 m-2">
                    <i class="fa-solid fa-xmark my-auto ms-2"></i>
                    <p class="my-auto mx-2">Todo's not done</p>
                </div>
            </div>

            <div name="detail">
                <div class="d-flex" @click="ecpend_detail=!ecpend_detail">
                    <p class="m-auto p-0 fw-semibold text-decoration-underline">Detail</p>
                    <hr class="w-100 mx-2 my-auto bg-secondary">
                </div>
                <div v-if="ecpend_detail">
                  <textarea v-if="edit_description" class="form-control my-1 p-1" v-model="$props.description" style="height: 150px;"></textarea>
                  <div  v-else class="border p-1 my-1 rounded" @click="edit_description=true" v-html="getHtmlFromMark(cate.description)" style="height: 150px;"></div>
                </div>
            </div>
            <div name="time flow">
                <div class="d-flex">
                    <p class="m-0 me-2 p-0 fw-semibold" style="min-width: max-content;">Time Flow</p>
                    <hr class="w-100 my-auto bg-secondary">
                </div>
            </div>
        </div>
</div>
</template>

<script setup>
import { ref } from 'vue';
import { marked } from 'marked'

const getHtmlFromMark = (mark) => {return marked.parse(mark);}
const expend_menu = ref(false)
const ecpend_detail = ref(false)
defineProps({cate:Object})
</script>
