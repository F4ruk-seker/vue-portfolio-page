<template>
<section class="">
  <article>
   <HomeHeader />
   <div class="main-wrapper">
    <LoadStatusProgresbar />
    <RouterView />
</div>
  </article>
</section>
</template>
<script setup>
import LoadStatusProgresbar from "@/components/LoadStatusProgresbar.vue";
import HomeHeader from "@/components/home/HomeHeader.vue";
</script>