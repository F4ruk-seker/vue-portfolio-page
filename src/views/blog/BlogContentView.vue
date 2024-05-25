<script>
import axios from 'axios';
import { VMarkdownView } from 'vue3-markdown'
import 'vue3-markdown/dist/style.css'
import { useCookies } from "vue3-cookies";
import NewCommentForm from '@/components/blog/NewCommentForm.vue';

const cookies = useCookies()

export default {
    name: 'BlogContentView',
    props: ['slug'],
    components:{VMarkdownView, NewCommentForm},
    data: ()=>{return{
    project: null,
    md_theme: 'dark',

    }},
    methods: {
      add_comment(comment){
      this.project.comments.push(comment)
    },
      blog_ticker(){
        if (this.project.ticket){
          axios.post(`analytical/content/${this.project.ticket}`)
        } else {
          console.log('object not has a ticket')
        }
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
    setInterval(() => {
        this.blog_ticker()
      }, 5000);

  },
}


</script>
<template>
<section class="">
    <article class="container">
        <h1 class="fw-bold">{{ project?.title }}</h1>
    </article>
    <hr>
    <article class="container">
        <VMarkdownView :content="project?.text" class="w-100" :mode="md_theme" />
        <hr>
        <NewCommentForm :slug="slug" @add_comment="add_comment" />
        <div v-if="!project?.comments" class="alert alert-info">no comment yet</div>
    <ul v-else class=" list-unstyled">
      <li 
        class="d-flex border my-2 py-2 px-1 rounded-2" 
        v-for="comment_obj in project?.comments" 
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
</template>


