<script setup>
import { ref } from 'vue';

const show_label = ref(false)

function toggle_label() {
  show_label.value = !show_label.value
}

function to_admin_router(patternd){return {'name':patternd}}


const admin_aside_routers = ref([
  {
    route_name: 'admin-page',
    label: 'Page',
    icon: 'fa-regular fa-file',
  },
  {
    route_name: 'admin-dashboard',
    label: 'Dashboard',
    icon: 'fa-solid fa-gauge',
  },
  {
    route_name: 'admin-projects',
    label: 'Content',
    icon: 'fa-solid fa-tarp',
  },
  {
    route_name: 'admin-tag-manage',
    label: "tag's",
    icon: 'fa-solid fa-tag',
  },
  {
    route_name: 'resume-edit',
    label: 'Resume',
    icon: 'fa-solid fa-file-invoice'
  },
  {
    route_name: 'todos',
    label: "todo's",
    icon: 'fa-solid fa-clipboard-check',
  },
  {
    route_name: 'user-flow',
    label: 'User Flow',
    icon: 'fa-solid fa-eye-low-vision',
  }
])
</script>

<template>
<aside class="border-end h-100">
 <nav class="h-100">
  <ul class="list-unstyled text-light h-100 position-sticky" style="min-width: max-content;">
    <li>
      <div class="p-2 mb-2 rounded-0 border-0 border-white border-bottom w-100 d-flex text-center" @click="toggle_label">
        <hr v-if="show_label" class="w-100 me-2 my-auto">
        <span v-if="show_label" class="mx-auto"><i class="fa-solid fa-arrow-left"></i></span>
        <span v-else class="mx-auto"><i class="fa-solid fa-arrow-right"></i></span>
      </div>
    </li>
    <li 
    v-for="(admin_router, index) in admin_aside_routers"
    v-bind:key="index"
    class="d-flex w-100"
    >
    <router-link
        :active-class="show_label ? '': ''"
        class="p-2 text-decoration-none rounded-2 text-center justify-content-center rounded-0 w-100 text-start"
        :to="to_admin_router(admin_router.route_name)"
    >
      <span class="m-auto d-flex">
        <span class="text-center" :style="show_label ? 'width: 25px;': 'width:100%; margin-right:.25rem; margin-left:.25rem'">
          <i :class="admin_router.icon"></i>
        </span>
        <p :class="'d-none d-md-block my-auto ' + (show_label ? 'ms-1':'')">
          <span v-if="show_label">
            {{admin_router.label}}
          </span>
        </p>
      </span>
    </router-link>
    </li>
    <li class="
        d-flex position-absolute bottom-0 p-2 fw-semibold rounded-2 text-center justify-content-center rounded-0 w-100 text-start">
      <div
        :class="'rounded-circle shadow-sm ' + (show_label ? 'my-auto':'m-auto')"
        style="
          min-width: 42px; 
          max-width: 42px; 
          min-height: 42px; 
          max-height: 42px;
          background-image: url('https://i.pinimg.com/564x/05/dd/09/05dd09abaf805d22d2adb83691ab5d9b.jpg');
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
        "
      >
        <p class="p-0 justify-content-center text-center m-auto" 
        style="          min-width: 42px; 
          max-width: 42px; 
          min-height: 42px; 
          max-height: 42px;">x</p>
      </div>
      <span v-if="show_label" class="d-none d-md-block my-auto text-danger w-100" style="text-shadow: 2px red; font-size: 20px;">Quit</span>
    </li>
  </ul>
</nav>
</aside>
</template>

<style scoped>

.active{
  outline: 1px solid var(--bs-light)!important;
  background-color: #292929a1 !important;
  color: var(--bs-light)!important;
}

</style>
