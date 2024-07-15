<template>
    <div v-if="MONTH && MONTH.length">
      <VueApexCharts type="line" height="350" :options="chartOptions" :series="MONTH"></VueApexCharts>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  import VueApexCharts from 'vue3-apexcharts';
  
  const MONTH = ref([]);
  
  const props = defineProps({
    monthly: {
      type: Array,
      required: true
    }
  });
  
  watch(() => props.monthly, (newMonthly) => {
    console.log('Updated monthly data:', newMonthly);
    MONTH.value = newMonthly;
  }, { immediate: true });
  
  const chartOptions = {
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    title: {
      text: 'Product Trends by Month',
      align: 'left'
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      }
    },
    // xaxis: {
    //     categories: ['01', '02', '03', '04', '05', '06', '07'],
    // }
  };
  </script>
  