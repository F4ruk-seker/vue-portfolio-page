<script>
import axios from "axios";
import NavBar from "@/components/NavBar.vue";


import { VMarkdownView } from 'vue3-markdown'
export default {
  name: 'ProjectView',
  components: {NavBar, VMarkdownView},
  props: ['slug'],
  data:()=>{return{
    project: null,
    read_with_light: false,
    read_size: 20
  }},
  methods: {
    get_date(date){
      if (date){

      date = new Date(date);

      // Separate date properties and write as name
      const day = date.getDate();
      const month = date.getMonth() + 1; // Adding 1 because month value is between 0 and 11
      const year = date.getFullYear();

      // Find the name of the month
      const monthNames = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];
      const monthName = monthNames[month - 1]; // Subtracting 1 because the month names array starts from 0
      // return {{project.year}}-{{project.monthName}}-{{project.day}}
      return `${year}-${monthName}-${day}`
      // Update the results
      // this.project.day = day;
      // this.project.month = month;
      // this.project.year = year;
      // this.project.monthName = monthName;
      }

    },
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
    },
    resize_images(){
      const images = document.getElementsByTagName('img')
      for (const image in images) {
        if (images[image].classList){
          images[image].classList.add('ratio')
          images[image].classList.add('ratio-16x9')
        }
      }
    }
  },
  async mounted() {
    await this.get_project()
    await this.resize_images()
  },
}


</script>

<template>
<nav-bar />
<section class="bg-dark d-flex pt-5" id="project" >
  <article class="justify-content-center container m-auto my-3 rounded border border-light p-0 fw-bold text-light mh-100" style="background-color: rgba(var(--bs-dark-rgb), .5); max-height: 90%">
    <div class="terminal">
      <div class="terminal-head border-light border-bottom p-1 d-flex">
        <div class="d-none d-md-block ms-1" style="min-width: max-content">TERMINAL@SSH > PROJECT</div>
        <div class="w-100 text-center position-absolute text-center">{{project ? project.title:'project title'}}</div>
        <div class="w-100"></div>
        <div class="z-1" style="min-width: max-content;">
          <button class="btn btn-sm btn-light bg-transparent fw-bold text-light me-1">
            <i class="fa-solid fa-window-minimize"></i>
          </button>
          <button class="btn btn-sm btn-light bg-transparent fw-bold text-light mx-2">
            <i class="fa-regular fa-window-restore"></i>
          </button>
          <router-link
              class="btn btn-sm btn-danger bg-transparent text-danger"
             :to="{
              name:'projects'
             }"
          >
            <i class="fa-regular fa-rectangle-xmark"></i>
          </router-link>
        </div>
      </div>
      <div class="terminal-body overflow-y-auto mh-100 d-flex" :style="'font-size:' + read_size + 'px'  ">
        <div v-if="!project" class="justify-content-center m-auto">
          <div class="spinner-grow" style="width: 3rem; height: 3rem;" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        <div class="justify-content-center m-auto p-4" v-else>
          <VMarkdownView :content="project.context" />
        </div>
      </div>
      <div class="terminal-footer border-light border-top">
        <ul class="list-unstyled d-flex my-0 py-1 w-100">
          <li class="ms-2 my-auto" style="min-width: max-content">{{ project ? get_date(project.created):'YYYY-MM-DD' }}</li>
          <li class="w-100"></li>
          <li class="d-flex float-end me-1">
            <button class="btn btn-sm btn-light bg-transparent fw-bold text-light me-1" @click="read_size = read_size - 10"><i class="fa-solid fa-minus"></i></button>
            <button class="btn btn-sm btn-light bg-transparent fw-bold text-light me-1" @click="read_size = 10 + read_size"><i class="fa-solid fa-plus"></i></button>
            <button class="btn btn-sm btn-light bg-transparent fw-bold text-light" @click="read_with_light=!read_with_light">
              <span v-if="read_with_light"><i class="fa-solid fa-sun"></i></span>
              <span v-else><i class="fa-solid fa-moon"></i></span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </article>
</section>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Hedvig+Letters+Sans&family=Saira+Extra+Condensed:wght@200&display=swap');
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
  font-family: 'Hedvig Letters Sans', sans-serif;
  //font-family: 'Saira Extra Condensed', sans-serif;
  flex-grow: 1; /* Orta div, boş alanı kaplar */
  display: flex;
  width: 100%; /* Genişlik olarak ekranı kaplar */
  height: 100%; /* Yükseklik olarak ekranı kaplar */
}
</style>
