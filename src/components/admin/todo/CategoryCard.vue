<template>
    <div class="border-white rounded shadow-sm p-1" id="TodoCategory">
        <div class="d-flex p-2">
            <strong class="w-100 pe-1 fw-bold">{{cate.title}}</strong>
            <span :class="'rounded-circle ' + ($props.cate.todos.length === $props.cate.todos.filter(todo => todo.is_to_do).length ? 'bg-success': 'bg-danger')" style="min-width: 24px; height: 24px;"></span>
        </div>
        <hr class="mx-1 bg-secondary">
        <div class="d-flex p-2">
            <p class="w-100 p-0 pe-1 m-0 fw-semibold">{{ cate.todos.length }} - {{cate.death_of_line}}</p>
            <p
            @click="show_description=!show_description"
             class="bg-white shadow-sm rounded-circle d-flex m-0 p-0" style="min-width: 24px; height: 24px;">
                <span 
                :class="'justify-content-center m-auto ' + ( show_description ? 'anim-ascend':'anim-descend' )"
                >
                <i class="fa-solid fa-angle-right m-auto text-center"></i>

            </span>
        </p>
        </div>
        <div class="p-1">
            <textarea v-if="show_description" class="border rounded form-control" v-model="$props.cate.description"></textarea>
        </div>
</div>
</template>

<script setup>
import { ref } from 'vue';

const show_description = ref(false)
defineProps({cate:Object})
</script>

<style scoped>
.dark-mode #TodoCategory{
    box-shadow: 1px 2px 4px 4px rgba(211, 209, 209, 0.1)!important;
    color: var(--bs-white);
}
@keyframes rotateDownAnimation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(90deg);
  }
}

@keyframes rotateUpAnimation {
  0% {
    transform: rotate(90deg);

    }
  100% {
    transform: rotate(0deg);

  }
}


.anim-ascend {
  animation: rotateDownAnimation 250ms linear forwards;
  transform-origin: center; /* Dönüşün merkezi */
}

.anim-descend {
  animation: rotateUpAnimation 250ms linear forwards;
  transform-origin: center; /* Dönüşün merkezi */
}
</style>

