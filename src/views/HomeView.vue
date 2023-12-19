<template>
<section class="">
  <article>
    <nav-bar />
    <scrol-top />
    <hi-card />
    <about-me />
    <experiences-card />
    <contact-me />
  </article>
</section>
<my-foter />
</template>

<script>

import HiCard from "@/components/HiCard.vue";
import AboutMe from "@/components/AboutMe.vue";
import ContactMe from "@/components/ContactMe.vue";
import ExperiencesCard from "@/components/ExperiencesCard.vue";
import ScrolTop from "@/components/ScrolTop.vue";
import NavBar from "@/components/NavBar.vue";
import MyFoter from "@/components/MyFoter.vue";

export default {
  name: 'HomeView',
  components: {MyFoter, NavBar, ScrolTop, ExperiencesCard, ContactMe, AboutMe, HiCard},
}
</script>
