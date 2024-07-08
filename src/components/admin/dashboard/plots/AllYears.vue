<script setup>
import { ref, watch } from 'vue';
import VueApexCharts from 'vue3-apexcharts'

const chartOptions = ref({
    chart: {type: 'bar', height: 430},
    plotOptions: {bar: {horizontal: true, dataLabels: {position: 'top'}}},
    dataLabels: {enabled: true, offsetX: -6, style: {fontSize: '12px', colors: ['#fff']}},
    stroke: {show: true, width: 1, colors: ['#fff']},
    tooltip: {shared: true, intersect: false},
    xaxis: {
        categories: [],
    },
})
const series = ref([{
    data: []
}])

// chartOptions.value.xaxis.categories = [2024]
const props = defineProps({
    years:Array
})

const YEARS = ref(props.years)

watch(props, new_props=>{
    YEARS.value = new_props.years
    
    series.value[0].data = []
    chartOptions.value.xaxis.categories = []

    YEARS.value.forEach(element => {
        series.value[0].data.push(element.count)
        chartOptions.value.xaxis.categories.push(element.year)
    });
})



</script>

<template>
<section>
    <article v-if="YEARS">
        <VueApexCharts type="bar" height="250" :options="chartOptions" :series="series"></VueApexCharts>
    </article>
    <article v-else class="alert alert-info">
        No Thing Else
    </article>
</section>
</template>