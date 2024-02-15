<template>
<section class="h-100 d-flex">
    <article class="container">
        <div class="w-25 mx-auto">
            <LottieAnimation
                ref="anim"
                :animation-data="OtpDeviceAnimation"
                :loop="true"
                :auto-play="true"
                :speed="1"
            />
        </div>
        <hr>
        <div>
          <button class="btn btn-outline-primary">ACTIVE</button>
        </div>
    </article>
</section>
</template>

<script setup>
import { onMounted, ref } from "vue"
import { LottieAnimation } from "lottie-web-vue"
import OtpDeviceAnimation from "@/assets/anim/otp-device.json"

let anim = ref()

onMounted(() => {
  setTimeout(() => {
    anim.value.goToAndPlay(150, true)
    anim.value
  }, 500)
})
</script>