<template>
<VueApexCharts type="heatmap" height="350" :options="chartOptions" :series="chart_data"></VueApexCharts>

</template>

<script setup>
/* eslint-disable */ 
import { ref } from 'vue';
import VueApexCharts from 'vue3-apexcharts'

const chart_data = ref(
    [
    {
        "name": "week 1",
        "data": [
            1,
            3,
            3,
            15,
            6,
            8,
            15
        ]
    },
    {
        "name": "week 2",
        "data": [
            9,
            2,
            0,
            1,
            4,
            0,
            0
        ]
    },
    {
        "name": "week 3",
        "data": [
            2,
            2,
            6,
            7,
            10,
            4,
            1
        ]
    },
    {
        "name": "week 4",
        "data": [
            0,
            1,
            1,
            5,
            4,
            3,
            0
        ]
    },
    {
        "name": "week 5",
        "data": [
            2,
            4,
            0,
            0,
            0,
            0,
            0
        ]
    }
]
)

const chartOptions =  ref({
            chart: {
              type: 'heatmap',
              background: 'transparent',
              colors: ["#008FFB05"],
              opacity: 0,
            },
            dataLabels: {
              enabled: false
            },
            colors: ["#2efabd"],
            background: 'transparent',
            fill:'transparent',
            title: {
              text: 'We'
            },
            xaxis: {
                type: 'category',
                categories: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
                labels: {
                    style: {
                        colors: ["white","white","white","white","white","white","white"],
                        fontWeight:  'bold',
                    }
                }
            },
            yaxis: {
                labels: {
                    style: {
                        colors: ["white","white","white","white","white","white","white"],
                        fontWeight:  'bold',

                    }
                }
            }
          })
/*
 fill: {
                type: "gradient",
                gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 90, 100]
                }
            }
*/
</script>

<style>
.pr {
    color: #2efabd;
    
}
</style>