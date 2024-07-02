<script setup>
import { ref, watch } from 'vue'
import axios from "axios";
import {onMounted} from 'vue'
import VueApexCharts from 'vue3-apexcharts'

const page_list = ref(null)
const selected_page = ref(null)
const pagedetail = ref(null)
const selected_tab = ref('settings')


watch(selected_page, async (new_page) => {
  pagedetail.value = await get_page_detail(new_page)
})

onMounted(() => {
  fetch_page_list()
})

function fetch_page_list(){
  axios.get('admin/page/').then((response)=>{page_list.value = response.data})
}

const get_page_detail = async(name) => {
      try {
        const response = await axios.get('admin/page/' + name + '/analytics/' )
        const page = response.data
        page.view.reverse();
        return page
      } catch (e) {
        Promise.reject(e)
      }
    }

function generateData(count, options) {
  const { min, max } = options;
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return data;
}

const series = [{
              name: "Desktops",
              data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
          }]


const chartOptions = {
            chart: {
              height: 350,
              type: 'line',
              background: '#fffff',
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
              },
            },
            xaxis: {
              categories: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10','11','12','13','14','15','16','17','18','19','20','21','22','23'],
            }
          }
   
</script>

<template>
<section class="d-flex p-2 h-100">
  <article name="page list" class="col-2 h-100 pe-2">
    <ul class="list-unstyled">
      <li 
        :class="'d-flex w-100 p-2 shadow-sm border border-light rounded mb-2 ' + (selected_page===page.name ? 'active':'')"
        v-for="page in page_list" v-bind:key="page.name"
        @click="selected_page=page.name"
      >
        <div class="d-flex my-auto me-2">
          <img v-if="page.image" class="h-100 w-100 rounded" :src="page.image" alt="page" style="min-width: 36px; max-width: 36px; min-height: 36px; max-height: 36px;">
          <div v-else class="d-flex justify-content-center h-100 w-100 bg-secondary rounded" style="min-width: 36px; max-width: 36px; min-height: 36px; max-height: 36px;">
            <i class="fa-regular fa-image m-auto"></i>
          </div>
        </div>
        <strong class="my-auto">Page</strong>
      </li>
    </ul>
  </article>
  <article name="page detail" class="w-100 h-100 rounded shadow">
    <div class="d-flex wrapper">
      <div class="p-2 w-100 text-center btn-transparent rounded-top rounded-end-0" @click="selected_tab='settings'">Settings</div>
      <div class="p-2 w-100 text-center btn-transparent" @click="selected_tab='analytics'">Analytics</div>
      <div class="p-2 w-100 text-center btn-transparent rounded-top rounded-start-0" @click="selected_tab='visits'">Visits</div>
    </div>
    <section v-if="selected_tab==='settings'">
      settings
    </section>
    <section v-else-if="selected_tab=='analytics'" class="my-auto p-2">
      <h1>Page</h1>
      <hr>hourly_plot
      <div class="bg-white p-2 rounded text-info">
        <VueApexCharts type="line" height="350" :options="chartOptions" :series="series"></VueApexCharts>
      </div>
    </section>
    <section v-else-if="selected_tab==='visits'">
      vh
    </section>
  </article>
</section>
</template>

<style scoped>
.btn-transparent:hover {
  background-color: rgba(255, 255, 255, 0.527);
  cursor: pointer;
}
</style>
