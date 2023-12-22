<template>
<section class="">
  <article v-if="!on_load">
    <nav-bar />
    <scrol-top />
    <hi-card :context="page.context" :view_count="page.view" />
    <about-me :context="page.context" />
    <experiences-card />
    <contact-me />
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

export default {
  name: 'HomeView',
  components: {LoadCard, MyFoter, NavBar, ScrolTop, ExperiencesCard, ContactMe, AboutMe, HiCard},
  data: ()=>{return{
    page: {
      context: {}
    },
    on_load: true
  }},
  mounted() {
    document.title = 'Faruk Şeker | Software developer'
    this.get_page_context()
  },methods:{
    get_page_context(){
      const page_name = this.$route.name
      PageManager.get_page_context(page_name).then(()=>{
        PageManager.load_page_context()
        this.page = PageManager.get_context()
        this.on_load = false
      })
    }
  }
}
</script>
