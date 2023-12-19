<template>
<section class="">
  <article>
    <nav class="position-fixed text-light z-2">
      pars
    </nav>
    <hi-card />
    <about-me />
    <experiences-card />
    <contact-me />
  </article>
</section>
</template>

<script>

import HiCard from "@/components/HiCard.vue";
import AboutMe from "@/components/AboutMe.vue";
import ContactMe from "@/components/ContactMe.vue";
import ExperiencesCard from "@/components/ExperiencesCard.vue";

export default {
  name: 'HomeView',
  components: {ExperiencesCard, ContactMe, AboutMe, HiCard},
}
</script>
