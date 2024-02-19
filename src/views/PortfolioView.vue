<template>
<section class="">
  <article>
   <HomeHeader />
   <div class="main-wrapper">
    <RouterView />
</div>
  </article>
</section>
</template>
<script setup>
import HomeHeader from "@/components/home/HomeHeader.vue";

</script>