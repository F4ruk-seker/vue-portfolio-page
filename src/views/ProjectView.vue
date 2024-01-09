<script>

import axios from "axios";
import NavBar from "@/components/NavBar.vue";

export default {
  name: 'ProjectView',
  components: {NavBar},
  props: ['slug'],
  data:()=>{return{
    project: null,
  }},
  methods: {
    async get_project(){
      const safeSlug = this.slug.replace(/[^a-zA-Z0-9_-]/g, ''); // Sadece harf, rakam, alt tire (_) ve kısa çizgi (-) karakterlerine izin ver
      const safeURL = 'project/' + safeSlug + '/';
      await axios.get(safeURL).then((response)=>{
        this.project = response.data
      }).catch((error)=>{
        if (error.code === 'ERR_BAD_REQUEST'){
          this.$router.push({
            name: 'NotFound'
          })
        }
      })
    }
  },
  mounted() {
    this.get_project()
  }
}


</script>

<template>
<nav-bar />
<section class="bg-dark d-flex pt-5" id="project" >
  <article class="justify-content-center container m-auto my-3 rounded border border-light p-0  fw-bold text-light overflow-y-auto mh-100" style="background-color: rgba(var(--bs-dark-rgb), .5); max-height: 90%">
    <div class="terminal">
      <div class="terminal-header border-light border-bottom p-1 d-flex">
        <div style="min-width: max-content">TERMINAL@SSH > PROJECT</div>
        <div class="w-100 text-center">{{project ? project.title:'project title'}}</div>
        <div class="me-2" style="min-width: max-content">
          <i class="fa-solid fa-window-minimize"></i>
          <i class="fa-regular fa-window-restore mx-3"></i>
          <i class="fa-regular fa-rectangle-xmark"></i>
        </div>
      </div>
      <div class="terminal-body mh-100"></div>
      <div class="terminal-footer">
        footer
      </div>
    </div>
  </article>
</section>
</template>

<style scoped>
#project{
  margin: 0;
  padding:0;
  width: 100%;
  background: url("https://res.cloudinary.com/dlusw5ukg/image/upload/v1704822805/portfolyo/anim/eb50875a68b04b0480fa929af2c7547c_q577h8.gif") no-repeat center;
  background-size: cover;
  object-fit: contain;
  height: 100vh;
}
.terminal{
  display: flex;
  flex-direction: column;
  height: 100%; /* Ekran yüksekliği kadar yer kaplar */
}

.terminal-head, .terminal-footer{
  display: flex;
  align-items: center;
  justify-content: center;
}

.terminal-body {
  flex-grow: 1; /* Orta div, boş alanı kaplar */
  display: flex;
  width: 100%; /* Genişlik olarak ekranı kaplar */
  height: 100%; /* Yükseklik olarak ekranı kaplar */
}
</style>
