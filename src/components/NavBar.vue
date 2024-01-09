<script setup>
import axios from "axios";
import {onMounted, ref} from "vue";


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

function get_span_text_class(navbar_item){
  if (navbar_item.hide_text_on_mobile && navbar_item.hide_text_on_pc){
    return ' d-none '
  } else if (navbar_item.hide_text_on_mobile) {
    return ' d-none d-md-block '
  } else if (navbar_item.hide_text_on_pc){
    return ' d-block d-md-none '
  } else {
    return ' d-block '
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
            <a v-if="navbar_item.url_type === 'hashtag'" class="nav-link fw-bold text-light d-flex " :aria-current="navbar_item.text" :href="'/'+navbar_item.internal_url" >
              <i v-if="navbar_item.icon_position === 'start'" :class="navbar_item.icon + ' my-auto'"></i>
              <span :class="get_span_text_class(navbar_item) + 'mx-1'"> {{ navbar_item.text }}</span>
              <i v-if="navbar_item.icon_position === 'end'" :class="navbar_item.icon + ' my-auto'"></i>
            </a>

            <router-link v-else-if="navbar_item.url_type === 'internal'" class="nav-link fw-bold text-light label-span" :to="navbar_item.internal_url" >
              <i v-if="navbar_item.icon_position === 'start'" :class="navbar_item.icon + ' my-auto'"></i>
              <span :class="get_span_text_class(navbar_item) + 'mx-1'"> {{ navbar_item.text }}</span>
              <i v-if="navbar_item.icon_position === 'end'" :class="navbar_item.icon + ' my-auto'"></i>
            </router-link>

            <a v-else-if="navbar_item.url_type === 'external'" class="nav-link fw-bold text-light" :aria-current="navbar_item.text" :href="navbar_item.external_url" target="_blank">
              <i v-if="navbar_item.icon_position === 'start'" :class="navbar_item.icon + ' my-auto'"></i>
              <span :class="get_span_text_class(navbar_item) + 'mx-1'"> {{ navbar_item.text }}</span>
              <i v-if="navbar_item.icon_position === 'end'" :class="navbar_item.icon + ' my-auto'"></i>
            </a>

            <span v-if="navbar_item.display_text_on_hover_pc" class="ms-1 my-auto p-1 fw-semibold bg-primary-subtle rounded label-span">{{ navbar_item.text }}</span>

          </li>
        </ul>
        <ul class="navbar-nav justify-content-center w-100 ">
          <li class="mx-2 d-flex position-relative">
            <i class="fa-solid fa-user my-auto"></i>
            <span class="ms-1 my-auto p-1 fw-semibold bg-primary-subtle rounded label-span">Freelance</span>
          </li>
          <li class="mx-2 d-flex position-relative">
            <i class="fa-brands fa-instagram my-auto"></i>
            <span class="ms-1 my-auto p-1 fw-semibold bg-primary-subtle rounded label-span">Instagram</span>
          </li>
        </ul>
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link
                class="nav-link fw-bold text-light" aria-current="projects"
                :to="{
                   name:'projects'
                }"
            >Projects</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link fw-bold text-light" aria-current="Game" href="#Game">Game</a>
          </li>
          <li class="nav-item">
            <a class="nav-link fw-bold text-light" aria-current="Blog" href="#blog">Blog</a>
          </li>
          <li class="nav-item">
            <router-link class="nav-link fw-bold text-light" aria-current="Login" :to="{'name':'login'}" >Login</router-link>
          </li>
        </ul>
      </div>

    </div>
    <div v-else class="container">On Load</div>
  </nav>
</template>

<style scoped>
.label-span{
  display: none;
}
@media (min-width: 768px) {
  li:hover .label-span{
    position: absolute;
    top: 2rem;
    display: block!important;
    margin:auto;
  }
  li .label-span{
    border-top-left-radius: 0!important;
  }
}
</style>
