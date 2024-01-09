<script setup>
import { onMounted, ref } from "vue"
import { LottieAnimation } from "lottie-web-vue"
import WatermelonJSON from "../assets/anim/error_anim.json"

let anim = ref()

onMounted(() => {
  setTimeout(() => {
    anim.value.goToAndPlay(150, true)
    anim.value
  }, 500)
})
</script>

<template>
  <div class="container h-50 w-50">
    <LottieAnimation
        ref="anim"
        :animation-data="WatermelonJSON"
        :loop="true"
        :auto-play="true"
        :speed="1"
    />
  </div>
</template>

<style scoped>

</style>
