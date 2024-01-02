<script setup>
import {onMounted, ref} from "vue";

const vd = ref([32, 23, 0, 48, 28, 2, 50, 46, 17, 2, 43, 35, 3, 47, 1, 18, 32, 1, 20, 32, 0, 29, 0, 19, 38, 38, 10, 25, 6, 7, 13])
let filteredVd = vd.value.filter(val => val !== 0);

// Find the least and most visited values
let leastVisited = Math.min(...filteredVd);
let mostVisited = Math.max(...filteredVd);

// Determine the scale
let scale = mostVisited - leastVisited;

// Divide the scale into 4 regions
let regionCount = 4;
let regionLength = scale / regionCount;

function get_region_color(region) {
  console.log(region)
  console.log(regionLength)
  if (region === 0) {
    return 'non-color'
  } else if (regionLength > region) {
    return 'first-color'
  } else if (regionLength * 2 > region) {
    return 'second-color'
  } else if (regionLength * 3 > region) {
    return 'third-color'
  } else {
    return 'fourth-color'
  }

}

const daysInMonth = vd.value.length // Ayın toplam gün sayısını buraya ayarlayın
// const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const weeks = ref([])
onMounted(() => {
  generateCalendar();
})

function generateCalendar() {
  let days = Array.from({length: daysInMonth}, (_, i) => i + 1);
  weeks.value = chunkArray(days, 7);
}

function chunkArray(arr, size) {
  return Array.from({length: Math.ceil(arr.length / size)}, (_, i) => arr.slice(i * size, i * size + size));
}


</script>

<template>
  <strong class="w-100">Color plate</strong>
  <div class="justify-content-center m-auto">
    <ul class="list-unstyled calendar justify-content-start p-0 d-flex m-0 mb-2" style="font-size: 12px">
      <li class="day rounded border border-dark bg-light text-center fw-bold text-dark">PZT</li>
      <li class="day rounded border border-dark bg-light text-center fw-bold text-dark">SLI</li>
      <li class="day rounded border border-dark bg-light text-center fw-bold text-dark">ÇAR</li>
      <li class="day rounded border border-dark bg-light text-center fw-bold text-dark">PER</li>
      <li class="day rounded border border-dark bg-light text-center fw-bold text-dark">CUM</li>
      <li class="day rounded border border-dark bg-light text-center fw-bold text-dark">CUM</li>
      <li class="day rounded border border-dark bg-light text-center fw-bold text-dark">PZT</li>
    </ul>

    <div class="calendar fw-semibold text-light">
      <div v-for="(day, index) in daysInMonth" :key="index"
           :class="'day rounded border ' + get_region_color(vd[index])">
        <span>{{ day }}</span>
        <span>{{ vd[index] }}</span>
      </div>
    </div>

    <hr class="m-1" style="">
    <ul class="list-unstyled justify-content-start p-0 d-flex my-1 w-100">
      <li class="rounded-start non-color" style="height: 26px; width: 36px"></li>
      <li class="first-color" style="height: 26px; width: 36px"></li>
      <li class="second-color " style="height: 26px; width: 36px"></li>
      <li class="third-color " style="height: 26px; width: 36px"></li>
      <li class="rounded-end fourth-color " style="height: 26px; width: 36px"></li>
    </ul>
  </div>

</template>

<style scoped>
.calendar {
  display: grid;
  grid-template-columns: repeat(7, 36px);
  gap: 5px;
}

.day {
  width: 36px;
  height: 26px;
//border: 1px solid #ccc; box-sizing: border-box;
  text-align: center;
//line-height: 50px;
}

.day span:first-child{
  display: block;
  visibility: visible;
}
.day span:last-child{
  display: none;
  visibility: hidden;
}

.day:hover span:first-child{
  display: none;
  visibility: hidden;
}
.day:hover span:last-child{
  display: block;
  visibility: visible;
}

.non-color {
  background: var(--bs-secondary);
}

.first-color {
  background: #93e4c1;

}

.second-color {
  background: #3baea0;
}

.third-color {
  background: #118a7e;
}

.fourth-color {
  background: #1f6f78;

}
</style>
