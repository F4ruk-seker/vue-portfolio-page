<template>
<section>
  <article>
    <AboutMe :show_load_anim="on_load" />
    <WhatIdo :show_load_anim="on_load"/>
    <div class="container"><hr></div>
    <FeaturedProjects />
    <div class="container"><hr></div>
    <LatestBlogPosts />
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
  components: { AboutMe,WhatIdo, FeaturedProjects, LatestBlogPosts },
  emits: ['toggle_progress_bar'],
  data: ()=>{return{
    page: {
      context: {}
    },
    on_load: true,
    progress: 30
  }},
  mounted() {
    this.get_page_context()
  },methods:{
    async get_page_context(){

      this.$store.dispatch('showProgress')
      this.$store.dispatch('updateProgressStatus', 50)

      const page_name = this.$route.name
      const fullPath = this.$route.fullPath

      await PageManager.get_page_context(page_name, fullPath).then(()=>{
        this.$store.dispatch('updateProgressStatus', 80)

        PageManager.load_page_context()
        this.page = PageManager.get_context()
      })
      await new Promise(resolve => setTimeout(resolve, 1000));
      this.$store.dispatch('updateProgressStatus', 100)
      await new Promise(resolve => setTimeout(resolve, 100));
      this.on_load = false
      this.$store.dispatch('hideProgress')

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
