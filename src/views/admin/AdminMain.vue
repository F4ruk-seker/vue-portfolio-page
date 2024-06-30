<script setup>
import { onMounted, ref } from 'vue';

const date = () => {return new Date()}

const month_name = (num) => {
  const month_names = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
  ]
  return month_names[num]
}

const day_name = (num) => {
  const day_names = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
  ]
  return day_names[num]
}

const loaded = ref(false)
onMounted(()=>{loaded.value=true})
</script>

<template>
<section class="d-flex w-100 h-100">
  <Transition>
    <article v-if="loaded" class="justify-content-center m-auto ">
      <h1 class="text-white">Hi <span class="text-success">Faruk!</span></h1>
      <hr class="bg-light">
      <h4 class="text-white">{{ day_name(date().getDay()) }}</h4>
      <div class="d-flex">
        <p class="text-warning me-2 my-auto" style="font-size: 24px;">
          <i class="fa-solid fa-sun"></i>
        </p>
        <p class="my-auto">
          {{ date().getDate() }} - {{ month_name(date().getMonth()) }} - {{ date().getFullYear() }}
        </p>
      </div>
    </article>
  </Transition>
</section>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 1.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
