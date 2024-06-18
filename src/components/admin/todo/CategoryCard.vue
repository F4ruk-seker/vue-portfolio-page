<template>
    <div class="border-white rounded shadow-sm p-1" id="TodoCategory">
        <div class="d-flex p-2">
            <strong class="w-100 pe-1 fw-bold my-auto">
              {{cate.title}}
              <span v-if="$props.cate.todos.length !== $props.cate.todos.filter(todo => todo.is_to_do).length">
                (<span class="text-danger">{{ $props.cate.todos.filter(todo => !todo.is_to_do).length }}</span>)
              </span>
            </strong>
            <span :class="'rounded-circle ' + ($props.cate.todos.length === $props.cate.todos.filter(todo => todo.is_to_do).length ? 'bg-success': 'bg-danger')" style="min-width: 24px; height: 24px;"></span>
        </div>
</div>
</template>

<script setup>
defineProps({cate:Object})
</script>
