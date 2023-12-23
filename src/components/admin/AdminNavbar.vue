<script setup>
import AuthService from "@/composable/AuthService";
import router from "@/router";

</script>

<template>
  <header class="bg-dark d-flex border-bottom" style="height: 5vh">
    <article class="container d-flex justify-content-center m-auto">
      <div class="m-auto">
        <router-link :to="{name:'home'}"
                     class="fw-bold text-light d-block text-decoration-none "
                     style="min-width: max-content!important;">FARUK ŞEKER</router-link>
      </div>
      <div class="w-100">x</div>
      <div class="bg-danger">
        <button
            class="btn btn-danger rounded-0 d-inline-block h-100"
            style="min-width: max-content"
            @click="AuthService.logout;router.push({name:'login'})"
        >Çıkış Yap</button>
      </div>
    </article>
  </header>
</template>

<style scoped>

</style>
