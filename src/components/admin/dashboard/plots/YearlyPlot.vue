<script setup>
import { ref, watch } from 'vue';
import VueApexCharts from 'vue3-apexcharts'

const chartOptions = ref({
    chart: {
        height: 350,
        type: 'heatmap',
        background: 'rgba(255, 255, 255, 0.8)'
    },
    grid: {
        show: true,
        borderColor: '#e0e0e0', // Light grey grid lines
        strokeDashArray: 0, // Solid grid lines
        position: 'back', // To keep grid lines behind the chart
        xaxis: {
          lines: {
            show: true
          }
        },
        yaxis: {
          lines: {
            show: true
          }
        }
      },
      background: 'transparent',
      fill:'transparent',
    dataLabels: {
        style: {
    colors: ['#F44336', '#E91E63', '#9C27B0']
  },
        enabled: false
    },
    colors: ["#008FFB"],
    title: {
        text: 'HeatMap Chart (Single color)'
    },
})
const props = defineProps({
    month_list:{
        type:Array,
      
    }
})
const MONTHS = ref(props.month_list) 
const month_names = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const series = ref([])

watch(props, new_props => {
    if (new_props.months !== null) {
    MONTHS.value = new_props.month_list
    series.value = []
    let counter = 0
    MONTHS.value.forEach(element => {
        series.value.push({
            name: month_names[counter],
            data: element
        })
        counter ++;
    })}
})

</script>
<template>
<section>
    <article class="text-dark">
        <VueApexCharts type="heatmap" height="350" :options="chartOptions" :series="series"></VueApexCharts>
    </article>
</section>
</template>

