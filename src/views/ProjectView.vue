<script>
import axios from "axios";
import NavbarStable from "@/components/NavbarStable.vue";
import { VMarkdownView } from 'vue3-markdown'
import 'vue3-markdown/dist/style.css'

export default {
  name: 'ProjectView',
  components: {VMarkdownView, NavbarStable},
  props: ['slug'],
  data:()=>{return{
    project: null,
    read_with_light: false,
    read_size: 20,
    navbarHeight: 0,
    sectionHeight: 'calc(100vh - 0px)',
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
    },
    calculate_section_height(){
      this.$nextTick(() => {
      const navbar = document.querySelector('#navbar-stable');
      if (navbar) {
        this.navbarHeight = navbar.offsetHeight;
        this.sectionHeight = `calc(100vh - ${this.navbarHeight + 10}px)`;
      }
    });
    }
  },
  async mounted() {
    await this.get_project()
    await this.resize_images()
    this.calculate_section_height()
  },
}


</script>

<template>
  <navbar-stable class="text-dark bg-light-subtle border-bottom  shadow-none" text_color="dark" id="navbar-stable" />

<section class="row my-0 mx-2 p-0 overflow-y-auto" :style="'max-height:' + sectionHeight">
  <article class="col-12 col-md-4 col-xl-3 h-100 pt-2">
    <label class="fw-semibold">Comment:</label>
    <textarea class="form-control border" type="text" placeholder="something..."></textarea>
    <div class="d-flex mt-2">
      <div class="w-100 d-flex">
        <button class=" btn btn-light rounded-circle border d-flex me-2" style="width: 46px; height: 46px;">
          <i class="fa-solid fa-user justify-content-center m-auto"></i>
        </button>
        <button class=" btn btn-light rounded-circle border d-flex" style="width: 46px; height: 46px;">
          <i class="fa-brands fa-google justify-content-center m-auto"></i>
        </button>
      </div>
      <button class="btn btn-primary fw-bold">Send</button>
    </div>
    <hr>
    no comment yet

    <div class="d-flex">
      <div style="width: 36px; height: 36px;">s</div>
      <div>s</div>
    </div>
  </article>
  <hr class="vr bg-secondary-subtle">
  <article class="col h-100 m-0 p-0">
    <div class="" >
    <div v-if="!project" class="justify-content-center m-auto">
      <div class="spinner-grow" style="width: 3rem; height: 3rem;" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div v-else class="justify-content-center m-auto">
      <div class="d-flex bg-light px-3 mb-1">
        
        <button class="btn btn-light rounded-0 border d-flex me-1">
          <span class="justify-content-center m-auto">
            <i class="fa-solid fa-arrow-left"></i>
          </span>
        </button>

        <button class="d-block d-md-none btn btn-light rounded-0 border d-flex me-1">
          <span class="justify-content-center m-auto">
          <i class="fa-solid fa-comment"></i>
          </span>
        </button>

        <button class="btn btn-light rounded-0 border d-flex me-1">
          <span class="justify-content-center m-auto">
            <i class="fa-regular fa-heart"></i>
          </span>
        </button>
      
      </div>
      <div class="px-3">
        <VMarkdownView :content="project.context" class="w-100" />
      </div>
    </div>
  </div>
  </article>
</section>
<!--section class="bg-dark d-flex pt-5 position-relative " id="project" >
  <div class="row m-0 p-0 justify-content-center mh-100">
    <article class="col-12 col-xl-8 px-1 py-2 m-0">
      <div class="terminal justify-content-center rounded border border-light p-0 fw-bold text-light "  style="background-color: rgba(var(--bs-dark-rgb), .5)">
        <div class="terminal-head border-light border-bottom p-1 d-flex">
          <div class="d-none d-md-block ms-1" style="min-width: max-content">TERMINAL@SSH > PROJECT</div>
          <div class="w-100 text-center position-absolute text-center"></div>
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
        <div class="terminal-body overflow-y-scroll mh-100 d-flex" :style="'font-size:' + read_size + 'px'  ">
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
    <article class="col-12 col-xl-4 px-1 py-2 m-0">
      <div class="terminal justify-content-center rounded border border-light p-0 fw-bold text-light mh-100"></div>
    </article>
  </div>
</section-->
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


</style>
