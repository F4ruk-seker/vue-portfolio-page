<template>
<section class="">
  <article v-if="!on_load">
   <HomeHeader />
   <div class="main-wrapper">
      <AboutMe />
      <WhatIdo />
      <div class="container"><hr></div>
      <FeaturedProjects />
      <div class="container"><hr></div>
      <LatestBlogPosts />
   </div>
  </article>
  <article v-else>
    <load-card />
  </article>
</section>
<my-foter />
</template>

<script>

import PageManager from "@/composable/page_manager";
/*
import HiCard from "@/components/HiCard.vue";
import AboutMe from "@/components/AboutMe.vue";
import ContactMe from "@/components/ContactMe.vue";
import ExperiencesCard from "@/components/ExperiencesCard.vue";
import ScrolTop from "@/components/ScrolTop.vue";
import NavBar from "@/components/NavBar.vue";
import MyFoter from "@/components/MyFoter.vue";
*/
import LoadCard from "@/components/LoadCard.vue";
import HomeHeader from "@/components/home/HomeHeader.vue"
import AboutMe from "@/components/home/AboutMe.vue";
import WhatIdo from "@/components/home/WhatIdo.vue";
import FeaturedProjects from "@/components/home/FeaturedProjects.vue";
import LatestBlogPosts from "@/components/home/LatestBlogPosts.vue";


/*
  <meta name="description" content="Free Web tutorials">
  <meta name="keywords" content="HTML, CSS, JavaScript">
  <meta name="author" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
*/
export default {
  name: 'HomeView',
  components: { LoadCard, HomeHeader /* MyFoter, NavBar, ScrolTop, ExperiencesCard, ContactMe, AboutMe, HiCard*/, AboutMe,WhatIdo, FeaturedProjects, LatestBlogPosts },
  data: ()=>{return{
    page: {
      context: {}
    },
    on_load: true 
  }},
  mounted() {
    this.get_page_context()
  },methods:{
    get_page_context(){
      const page_name = this.$route.name
      const fullPath = this.$route.fullPath
      PageManager.get_page_context(page_name, fullPath).then(()=>{
        PageManager.load_page_context()
        this.page = PageManager.get_context()
        this.on_load = false
      })
    },
  }

}
</script>

<style scoped>
.lazy-background {
  display: flex;
  background-repeat: no-repeat;
  background-position: center;
  object-fit: contain;
  height: 100vh;
}
</style>
