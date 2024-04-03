<script setup>

import AdminNavbar from "@/components/admin/AdminNavbar.vue";
import AdminASide from "@/components/admin/AdminASide.vue";

</script>

<template>
<admin-navbar />
<section class="d-flex" style="height: 95vh">
  <article class="" style="min-width: max-content;">
    <admin-a-side />
  </article>
  <article class="w-100 overflow-y-auto position-relative">
    <router-view />
  </article>
</section>
</template>

<style>

.active{
  background-color: var(--bs-primary) !important;
  border: 1px solid rgba(var(--bs-primary-rgb), 0,4);
  color: white!important;
}
</style>
