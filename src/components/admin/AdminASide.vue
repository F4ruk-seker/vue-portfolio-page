<script setup>
import { ref } from 'vue';

const show_label = ref(false)

function toggle_label() {
  show_label.value = !show_label.value
}

</script>

<template>
<aside class="w-100 border-end h-100">
  <ul class="list-unstyled">
    <li>
      <div class="btn btn-light w-100 text-end" @click="toggle_label">
        <i class="fa-solid fa-bars"></i>
      </div>
    </li>
    <li>
    <router-link
        class="btn btn-light rounded-0 w-100 text-start"
        :to="{
          name:'admin-page'
        }"
    >
      <span class="m-auto d-flex">
        <i class="fa-regular fa-file my-auto"></i>
        <p class="d-none d-md-block my-auto ms-1">
          <span v-if="show_label">
            Page
          </span>
        </p>
      </span>
    </router-link>
    </li>
    <li>
    <router-link
        class="btn btn-light rounded-0 w-100"
      :to="{name:'admin-dashboard'}"
    >
      <span class="m-auto d-flex">
        <i class="fa-solid fa-gauge my-auto"></i>
        <span v-if="show_label" class="d-none d-md-block ms-1">
          Dashboard
        </span>
      </span>
    </router-link>
    </li>
    <li>
    <router-link
        class="btn btn-light rounded-0 w-100"
      :to="{name:'admin-projects'}"
    >
      <span class="m-auto d-flex">
        <i class="fa-solid fa-tarp my-auto"></i>
        <span v-if="show_label" class="d-none d-md-block ms-1">
          Projects
        </span>
      </span>
    </router-link>
    </li>
    <li>
    <router-link
        class="btn btn-light rounded-0 w-100"
      :to="{name:'admin-tag-manage'}"
    >
      <span class="m-auto d-flex">
        <i class="fa-solid fa-tag my-auto"></i>
        <span v-if="show_label" class="d-none d-md-block ms-1">
          Projects
        </span>
      </span>
    </router-link>
    </li>
    <li>
    <router-link
        class="btn btn-light rounded-0 w-100"
      :to="{name:'todos'}"
    >
      <span class="m-auto d-flex">
        <i class="fa-solid fa-clipboard-check"></i>
        <span v-if="show_label" class="d-none d-md-block ms-1">
          ToDo List
        </span>
      </span>
    </router-link>
    </li>
  </ul>
</aside>
</template>

<style scoped>

</style>
