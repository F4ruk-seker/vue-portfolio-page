<template>
<section class="">
  <article v-if="!on_load">
    <nav-bar />
    <scrol-top />
    <hi-card :context="page.context" :view_count="page.view" />
    <about-me :context="page.context" />
    <experiences-card :context="page.context"/>
    <contact-me :contact_me_background="page.context.contact_me_background" />
  </article>
  <article v-else>
    <load-card />
  </article>
</section>
<my-foter />
</template>

<script>
import PageManager from "@/composable/page_manager";

import HiCard from "@/components/HiCard.vue";
import AboutMe from "@/components/AboutMe.vue";
import ContactMe from "@/components/ContactMe.vue";
import ExperiencesCard from "@/components/ExperiencesCard.vue";
import ScrolTop from "@/components/ScrolTop.vue";
import NavBar from "@/components/NavBar.vue";
import MyFoter from "@/components/MyFoter.vue";
import LoadCard from "@/components/LoadCard.vue";

/*
  <meta name="description" content="Free Web tutorials">
  <meta name="keywords" content="HTML, CSS, JavaScript">
  <meta name="author" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
*/
export default {
  name: 'HomeView',
  components: {LoadCard, MyFoter, NavBar, ScrolTop, ExperiencesCard, ContactMe, AboutMe, HiCard},
  data: ()=>{return{
    title: 'Başlık',
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
        console.log('alowd')
        PageManager.load_page_context()
        
        this.$route.meta = {
          title: 'mars'
        }
        this.$router.beforeEach((to)=>{
          const { meta } = to
          console.log('meta')
          console.log(meta)
        })
        this.page = PageManager.get_context()
        this.on_load = false
      })
    },
  },created: ()=>{
    document.title = "paraws"
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
