<script setup>

</script>

<template>
<aside class="w-100 bg-danger-subtle h-100">
  <ul class="list-unstyled">
    <li>
    <router-link
        class="btn btn-light rounded-0 w-100 text-start"
        :to="{
          name:'admin-page'
        }"
    >
      <span class="justify-content-center m-auto d-flex">
        <i class="fa-regular fa-file"></i>
        <span class="d-none d-md-block ms-1">
          Page
        </span>
      </span>
    </router-link>
    </li>
    <li>
    <router-link
        class="btn btn-light rounded-0 w-100"
      :to="{name:'admin-dashboard'}"
    >
      <span class="justify-content-center m-auto d-flex">
        <i class="fa-solid fa-gauge my-auto"></i>
        <span class="d-none d-md-block ms-1">
          Dashboard
        </span>
      </span>
    </router-link>
    </li>
  </ul>
</aside>
</template>

<style scoped>

</style>
