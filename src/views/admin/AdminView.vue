<script setup>

//import AdminNavbar from "@/components/admin/AdminNavbar.vue";
import AdminASide from "@/components/admin/AdminASide.vue";

</script>

<template>
<!--admin-navbar /-->
<section 
  class="d-flex justify-content-center p-5 panel-main text-white fw-semibold"
  style="background-color: #413f3f4b!important;"
  >
  <main class="d-flex m-md-5 rounded border p-2 w-100 shadow" style="backdrop-filter:blur(4px);">
    <article class="" style="min-width: max-content;">
      <admin-a-side class="pe-2" />
    </article>
    <article class=" w-100 overflow-y-auto position-relative">
      <router-view class="rounded" />
    </article>
  </main>
</section>
</template>

<style>
.panel-main {
  height: 100vh;
  background-image: url('@/assets/img/pexels-veeterzy-39811.jpg');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

.active{
  background-color: var(--bs-primary) !important;
  border: 1px solid rgba(var(--bs-primary-rgb), 0,4);
  color: rgba(228, 228, 228, 0.753); 

}

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f123;
  /*border-radius: 5px;*/
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #88888881;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #5353536e;
}
</style>
