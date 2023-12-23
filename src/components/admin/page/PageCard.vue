<script>
export default {
  name:'PageCard',
  props: ['page']
}
</script>

<template>
<div class="rounded border d-flex h-100 m-2 p-2 fw-bold">
  <span v-if="!page.image" class="border bg-dark rounded m-auto" style="min-width: 100px;min-height: 100px;max-width: 100px;max-height: 100px"></span>
  <img v-else class="border bg-dark rounded m-auto" style="min-width: 100px;min-height: 100px;max-width: 100px;max-height: 100px"
    :src="page.image"
    alt="page"
  >
  <div class="ms-2 justify-content-center m-auto w-100">
    {{ page.name }}
    <hr class="m-1 p-1">
    {{page.title}}
  </div>
  <router-link
      class="ms-2"
      style="width: 20px!important;"
      :to="{
        name: 'admin-page-edit',
        params: {page_name: page.name}
      }"
  >
    <i class="fa-solid fa-pen-to-square"></i>
  </router-link>
</div>
</template>

<style scoped>

</style>
