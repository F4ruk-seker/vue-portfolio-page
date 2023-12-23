<script setup>

import AdminNavbar from "@/components/admin/AdminNavbar.vue";
import AdminASide from "@/components/admin/AdminASide.vue";

</script>

<template>
<admin-navbar />
<section class="d-flex" style="height: 95vh">
  <article class="col-2">
    <admin-a-side />
  </article>
  <article class="col-10 overflow-y-scroll position-relative">
    <router-view />
  </article>
</section>
</template>

<style scoped>

</style>
