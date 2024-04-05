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
 <nav>
  <ul class="list-unstyled" style="min-width: max-content;">
    <li>
      <div class="btn btn-secondary rounded-0 border-0 border-white border-bottom w-100 d-flex text-center" @click="toggle_label">
        <hr v-if="show_label" class="w-100 me-2 my-auto">
        <span v-if="show_label" class="mx-auto"><i class="fa-solid fa-arrow-left"></i></span>
        <span v-else class="mx-auto"><i class="fa-solid fa-arrow-right"></i></span>
      </div>
    </li>
    <li 
    v-for="(admin_router, index) in admin_aside_routers"
    v-bind:key="index"
    >
    <router-link
        class="btn btn-secondary rounded-0 w-100 text-start"
        :to="to_admin_router(admin_router.route_name)"
    >
      <span class="m-auto d-flex">
        <span class="text-center" style="width: 25px;">
          <i :class="admin_router.icon"></i>
        </span>
        <p class="d-none d-md-block my-auto ms-1">
          <span v-if="show_label">
            {{admin_router.label}}
          </span>
        </p>
      </span>
    </router-link>
    </li>
  </ul>
 </nav>
</aside>
</template>

<style scoped>
.active{
  background-color: var(--bs-dark);
  color: var(--bs-light)
}
</style>
