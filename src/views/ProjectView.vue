<script>
import axios from "axios";
import { VMarkdownView } from 'vue3-markdown'
import 'vue3-markdown/dist/style.css'
import { useCookies } from "vue3-cookies";
import NewCommentForm from "@/components/blog/NewCommentForm.vue";


const cookies = useCookies()


export default {
  name: 'ProjectView',
  components: {VMarkdownView, NewCommentForm},
  props: ['slug'],
  data:()=>{return{
    md_theme: 'dark',
    project: null,
    read_with_light: false,
    read_size: 20,
    navbarHeight: 0,
    sectionHeight: 'calc(100vh - 0px)',
    on_send_comment: ''
  }},
  methods: {
    add_comment(comment){
      this.project.comments.push(comment)
    },
    get_date(date){
      if (date){
      date = new Date(date);
      // Separate date properties and write as name
      const day = date.getDate();
      const month = date.getMonth() + 1; // Adding 1 because month value is between 0 and 11
      const year = date.getFullYear();

      // Find the name of the month
      const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec',];
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
      const safeURL = 'content/' + safeSlug + '/';
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
    },
    go_to_projects_page(){
      this.$router.push({
        name:'projects'
      })
    },
    to_dark(){

    },
    to_light(){

    }

  },
  async mounted() {
    this.md_theme = cookies.cookies.get('THEME-MODE') === 'dark' ? 'dark' :'light'

    await this.get_project()
    //this.resize_images()
    this.calculate_section_height()
    window.scrollTo(0,0);
  },

}


</script>

<template>
<section class="bg-light my-1  position-sticky top-0 z-2">
  <article class="d-flex">
    <div></div>
    <div class=" container d-flex justify-content-between">
      <div>
        <button class="btn btn-light rounded-0 border d-flex me-1" @click="go_to_projects_page">
          <span class="justify-content-center m-auto">
            <i class="fa-solid fa-arrow-left"></i>
          </span>
        </button>
      </div>
      <div class="d-flex">
        <button class="btn btn-light rounded-0 border d-flex me-1" @click="go_to_projects_page">
          <span class="justify-content-center m-auto">
            <i class="fa-regular fa-heart"></i>
            <!--i class="fa-solid fa-heart"></i-->
            <!--i class="fa-solid fa-heart-crack"></i -->
          </span>
        </button>
        <a class="btn btn-light rounded-0 border d-flex me-1" href="#comment">
          <span class="justify-content-center m-auto">
            <i class="fa-regular fa-comment"></i>
          </span>
        </a>
        <button class="btn btn-light rounded-0 border d-flex me-1" @click="go_to_projects_page">
          <span class="justify-content-center m-auto">
            <i class="fa-regular fa-bookmark"></i>
            <!--i class="fa-solid fa-bookmark"></i-->
          </span>
        </button>
        <button class="btn btn-light rounded-0 border d-flex me-1" @click="go_to_projects_page">
          <span class="justify-content-center m-auto">
            <i class="fa-solid fa-share"></i>
          </span>
        </button>
      </div>
      <div class="d-flex">
        <button class="btn btn-light rounded-0 border d-flex me-1">
          <span class="justify-content-center m-auto ">
            <i class="fa-solid fa-moon"></i>
          </span>
        </button>
        <button class="btn btn-light rounded-0 border d-flex me-1" @click="go_to_projects_page">
          <span class="justify-content-center m-auto">
            <i class="fa-solid fa-pen-to-square"></i>
          </span>
        </button>
      </div>
    </div>
    <div></div>
  </article>
</section>
<section  v-if="!project"  class="w-100 d-flex overflow-hidden" style="height: 100vh">
  <div class="justify-content-center m-auto">
      <div class="spinner-grow" style="width: 3rem; height: 3rem;" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
</section>
<section v-else class="my-0 mx-auto p-0 overflow-y-auto w-100">
 
  <article class="container h-100 mx-auto">
    <div  class="container justify-content-center m-auto">
      <div class="row">
        <div class="col-12 col-md-4 ms-0 ps-0">
          <img v-if="project.seo_image_url" :src="project.seo_image_url" class="rounded ratio ratio-1x1" alt="...">
          <div v-else class="bg-dark-subtle d-flex rounded" style="height: 200px;">
            <p class="p-0 m-auto justify-content-center text-info-emphasis">
              <i class="fa-solid fa-image"></i>
            </p>
          </div>
          <div class="d-flex justify-content-center fw-bold text-center mt-0 mt-md-1">
            <div 
              class="d-flex px-1"
            >
            <i class="fa-regular fa-heart text-danger my-auto"></i> 
            <span class="ms-1 my-auto">0</span>
          </div>
          <a href="#comment" class=" d-inline-block text-decoration-none">
              <div class="d-flex mx-1">
                <i class="fa-regular fa-comment text-primary my-auto"></i> 
                <span class="ms-1 my-auto">
                  {{ project.comments.length }}
                </span>
              </div>
            </a>            
          <div class="d-flex mx-1"></div>
            <i class="fa-regular fa-eye my-auto"></i> 
            <span class="ms-1 my-auto">{{ project.view }}</span>
          </div>
        </div>
        <div class="col-12 col-md-8 my-auto">
          <h1>{{ project.title }}</h1>
          <hr>
          <p>{{ project.seo_description }}</p>
          <hr>
          <div class="d-flex">
            <i class="fa-solid fa-tags my-auto me-2"></i>
            <ul class="d-flex list-unstyled my-auto">
              <li class="pe-1" v-for="tag in project.tags" v-bind:key="tag.id">
                <a href="#" class="badge bg-primary-subtle text-decoration-none">{{ tag.name }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    
    </div>
  </article>
  <article class="d-flex bg-light px-3 mb-1">
    <strong class="justify-content-center m-auto py-1">
      Grab a coffee now because we're getting started <span style="color: brown;"><i class="fa-solid fa-mug-hot my-auto"></i></span>
    </strong>    
  </article>
  <article class=" container mx-auto">
    <VMarkdownView :content="project.text" class="w-100" :mode="md_theme" :allow-html="true"  />
  </article>
  <article class="d-flex bg-light px-3 mb-1">
    <strong class="justify-content-center m-auto py-1">
      Comments <span style="color: brown;"><i class="fa-solid fa-mug-hot my-auto"></i></span>
    </strong>    
  </article>
  <article class="container" id="comment">
    <NewCommentForm :slug="slug" @add_comment="add_comment"/>
    <hr >
    <div v-if="!project.comments" class="alert alert-info">no comment yet</div>
    <ul v-else class=" list-unstyled">
      <li 
        class="d-flex border my-2 py-2 px-1 rounded-2" 
        v-for="comment_obj in project.comments" 
        v-bind:key="comment_obj.id"
        >
        <div class=" rounded-circle bg-black" style="min-width: 36px; min-height: 36px; max-width: 36px; max-height: 36px;"></div>
        <p class="p-0 my-auto ms-2 w-100">
         <span class=" fw-bold text-primary">@{{ comment_obj.name }}:</span> {{ comment_obj.comment }}
        </p>      
        <button class="btn btn-light btn-sm border rounded-circle d-flex" style="min-width: 36px; min-height: 36px; max-width: 36px; max-height: 36px;" disabled>
          <i class="fa-regular fa-heart justify-content-center m-auto"></i>
        </button>
      </li>
    </ul>
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
