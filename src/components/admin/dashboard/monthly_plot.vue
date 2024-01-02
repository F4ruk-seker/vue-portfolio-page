<script setup>
import {ref} from "vue";
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

function get_region_color(region){
  console.log(region)
  console.log(regionLength)
  if (region === 0){
    return 'non-color'
  } else if (regionLength > region ){
    return 'first-color'
  } else if (regionLength * 2 > region){
    return 'second-color'
  } else if (regionLength * 3 > region){
    return 'third-color'
  } else {
    return 'fourth-color'
  }

}

</script>

<template>
  <strong>Color plate</strong>
  <div class="container d-flex border">
    <div class="w-100 d-flex">
      <strong class="justify-content-center m-auto" style="font-size: 46px">Ocak 2023</strong>
    </div>
    <div class="w-100">
      <div class="justify-content-center m-auto">
        <ul class="list-unstyled d-flex m-0">
          <li class="item border-bottom border-dark m-1 text-center fw-semibold text-dark bg-light-subtle">Monday</li>
          <li class="item border-bottom border-dark m-1 text-center fw-semibold text-dark bg-light-subtle">Tuesday</li>
          <li class="item border-bottom border-dark m-1 text-center fw-semibold text-dark bg-light-subtle">Wednesday</li>
          <li class="item border-bottom border-dark m-1 text-center fw-semibold text-dark bg-light-subtle">Thursday</li>
          <li class="item border-bottom border-dark m-1 text-center fw-semibold text-dark bg-light-subtle">Friday</li>
          <li class="item border-bottom border-dark m-1 text-center fw-semibold text-dark bg-light-subtle">Saturday</li>
          <li class="item border-bottom border-dark m-1 text-center fw-semibold text-dark bg-light-subtle">Sunday</li>
        </ul>
        <ul class="list-unstyled d-flex flex-wrap justify-content-start m-auto">
          <li v-for="(v, index) in vd" v-bind:key="index" :class="'text-center item rounded m-1 ' + get_region_color(v)">
            <span class="fw-bold text-light ">{{ index + 1 }}:{{ v }}</span>
          </li>
        </ul>
        <hr class="m-1" style="">
        <ul class="list-unstyled d-flex m-0">
          <li class="item rounded border border-dark bg-secondary m-1 text-center fw-bold text-light">Less</li>
          <li class="item rounded border border-dark non-color m-1 " ></li>
          <li class="item rounded border border-dark first-color m-1" ></li>
          <li class="item rounded border border-dark second-color m-1" ></li>
          <li class="item rounded border border-dark third-color m-1" ></li>
          <li class="item rounded border border-dark fourth-color m-1" ></li>
          <li class="item rounded border border-dark bg-info m-1 text-center fw-bold text-light" >More</li>
        </ul>
      </div>
      </div>
    </div>
</template>

<style scoped>
li{
  width: 46px;
  height: 26px;
  background-color: cyan;
}

.flex-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
}

.item {
  width: calc(14.2857% - 10px); /* Her satırda 7 öğe için */
  min-width: 26px;
  //width: calc(14.2857%); /* Her satırda 7 öğe için */
  height: 26px;
  //width: 46px;
  box-sizing: border-box;
}
.non-color{
  background: rgb(66, 61, 61);
}
span{
  visibility: hidden;
  top: 0;
}
.item:hover span{
  visibility: visible;
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
