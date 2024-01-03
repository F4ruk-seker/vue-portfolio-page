<script>


export default {
  name:'monthly_plot',
  props: ['page_view'],
  data: ()=>{return{
    regionLength: 0,
    regionCount: 0,
    leastVisited: null,
    mostVisited: null,
    filteredVd: null,
    weeks: [],
    daysInMonth:0,
    scale: 0,
  }},
  mounted() {
    console.log('*'*50)
    this.filteredVd = this.$props.page_view.filter(val => val !== 0);
// Find the least and most visited values
    this.leastVisited = Math.min(...this.filteredVd);
    this.mostVisited = Math.max(...this.filteredVd);
// Determine the scale
    this.scale = this.mostVisited - this.leastVisited;
// Divide the scale into 4 regions
    this.regionCount = 4;
    this.regionLength = this.scale / this.regionCount;
    this.daysInMonth = this.$props.page_view.length
    // this.modifyArray();
    this.generateCalendar()

  },methods:{
    get_region_color(region) {
      if (region === 0) {
        return 'non-color'
      } else if (this.regionLength > region) {
        return 'first-color'
      } else if (this.regionLength * 2 > region) {
        return 'second-color'
      } else if (this.regionLength * 3 > region) {
        return 'third-color'
      } else {
        return 'fourth-color'
      }
    },
    generateCalendar() {
      let days = Array.from({length: this.daysInMonth}, (_, i) => i + 1);
      this.weeks = this.chunkArray(days, 7);
    },
    chunkArray(arr, size) {
      return Array.from({length: Math.ceil(arr.length / size)}, (_, i) => arr.slice(i * size, i * size + size));
    }
  }
}



</script>

<template>
  <strong class="w-100">Color plate</strong>
  <div class="justify-content-center m-auto">
    <div class="calendar fw-semibold text-light">
      <div v-for="(day, index) in daysInMonth" :key="index"
           :class="'day rounded border ' + get_region_color(page_view[index])">
        <span>{{ day }}</span>
        <span>{{ page_view[index] }}</span>
      </div>
    </div>
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
