<script>
import axios from "axios";
import NavbarUrl from "@/components/NavbarUrl.vue";

export default{
  name: 'NavbarStable',
  props: ['text_color'],
  components: {NavbarUrl},
  data:()=>{return{
    navbar: null,
  }},
  methods:{
    async fetch_navbar(){
      try {
        const response = await axios.get('page/navbar/mainnav/')
        this.navbar = response.data
      } catch (e) {
        Promise.reject(e)
      }
    }
  },
  async mounted() {
    await this.fetch_navbar()
  }

}
</script>

<template>
  <nav
      :class="'navbar navbar-expand-lg w-100 position-sticky z-2 shadow text-' + text_color "
  >
    <div v-if="navbar" class="container">
      <a :class="'navbar-brand logo fw-bold d-block d-lg-none text-' + text_color" href="#">Faruk Şeker</a>
      <button data-bs-toggle="collapse" class="navbar-toggler btn btn-dark" data-bs-target="#navbarNav">
        <span class="visually-hidden">Toggle navigation</span>
        <i :class="'fa-solid fa-bars text-' + text_color"></i>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0" >
          <li class="nav-item position-relative" v-for="navbar_item in navbar.items.start" v-bind:key="navbar_item.id">
            <navbar-url :navbar_item="navbar_item" :text_color="text_color" />
          </li>
        </ul>
        <ul class="navbar-nav justify-content-center w-100 ">
          <li class="nav-item position-relative" v-for="navbar_item in navbar.items.center" v-bind:key="navbar_item.id">
            <navbar-url :navbar_item="navbar_item" :text_color="text_color" />
          </li>
        </ul>
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item position-relative" v-for="navbar_item in navbar.items.end" v-bind:key="navbar_item.id">
            <navbar-url :navbar_item="navbar_item" :text_color="text_color" />
          </li>
        </ul>
      </div>

    </div>
    <div v-else class="container">On Load</div>
  </nav>
</template>

<style scoped>

</style>
