<script>
import axios from 'axios';
import { VMarkdownView } from 'vue3-markdown'
import 'vue3-markdown/dist/style.css'


export default {
    name: 'BlogContentView',
    props: ['slug'],
    components:{VMarkdownView},
    data: ()=>{return{
    project: null,

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
    await this.get_project()
    this.resize_images()
    this.calculate_section_height()
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
        <VMarkdownView :content="project?.text" class="w-100" />
    </article>
</section>
</template>