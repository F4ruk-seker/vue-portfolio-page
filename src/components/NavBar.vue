<script setup>
import axios from "axios";
import {onMounted, ref} from "vue";
import NavbarUrl from "@/components/NavbarUrl.vue";


const navbar = ref(null)



onMounted(async ()=>{
  await fetch_navbar()
})
async function fetch_navbar(){
  try {
    const response = await axios.get('page/navbar/mainnav/')
    navbar.value = response.data
  } catch (e) {
    Promise.reject(e)
  }
}

</script>

<template>
  <nav
      class="navbar navbar-expand-lg w-100 position-fixed text-light z-2 shadow"
      style="background: linear-gradient(90deg, rgba(2,0,36,.01) 0%, rgba(2,171,228,.1) 50%, rgba(0,212,255,.01) 100%);backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px);"
  >
    <div v-if="navbar" class="container">
      <a class="navbar-brand logo text-light fw-bold d-block d-lg-none" href="#">Faruk Şeker</a>
      <button data-bs-toggle="collapse" class="navbar-toggler btn btn-light" data-bs-target="#navbarNav">
        <span class="visually-hidden">Toggle navigation</span>
        <i class="fa-solid fa-bars text-light"></i>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0" >
          <li class="nav-item position-relative" v-for="navbar_item in navbar.items.start" v-bind:key="navbar_item.id">
            <navbar-url :navbar_item="navbar_item"/>
          </li>
        </ul>
        <ul class="navbar-nav justify-content-center w-100 ">
          <li class="nav-item position-relative" v-for="navbar_item in navbar.items.center" v-bind:key="navbar_item.id">
            <navbar-url :navbar_item="navbar_item"/>
          </li>
        </ul>
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item position-relative" v-for="navbar_item in navbar.items.end" v-bind:key="navbar_item.id">
            <navbar-url :navbar_item="navbar_item"/>
          </li>
        </ul>
      </div>

    </div>
    <div v-else class="container">On Load</div>
  </nav>
</template>

<style scoped>

</style>
