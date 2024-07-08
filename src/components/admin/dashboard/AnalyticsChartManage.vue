<script setup>
/* eslint-disable */ 
import axios from 'axios';
import { ref, watch } from 'vue';

import AllYears from '@/components/admin/dashboard/plots/AllYears.vue'
import YearlyPlot from '@/components/admin/dashboard/plots/YearlyPlot.vue'

const selectedYear = ref(null)
const selectedMonth = ref(null)

const props = defineProps({
    page_name:String
})
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

const pageName = ref(props.page_name)

watch(props, new_props => {
    pageName.value = new_props.page_name
    get_yearly_visit_list()
    selectedYear.value = null
    // pageName
})

const yearly_visit_list = ref()
const get_yearly_visit_list = async () => {
    const response = await axios.get(`analytical/matrix/${pageName.value}/years`)
    yearly_visit_list.value = response.data
    // selectedYear.value = yearly_visit_list.value[0].year
    // get_monthly_visit_list()
} 
const monthly_visit_list = ref([0,0,0,0,0,0,0,0,0,0,0,0])
const get_monthly_visit_list = async () => {
    const response = await axios.get(`analytical/matrix/${pageName.value}/${selectedYear.value}/months`)
    monthly_visit_list.value = response.data
}

const plot_tab = ref('allyear')

watch(selectedYear, newSelectedYear => {
    if (newSelectedYear !== null){
        plot_tab.value = 'yearly' 
        get_monthly_visit_list()
    } else {
        plot_tab.value = 'allyear'
    }
    

})

watch(selectedMonth, newSelectedMonth => {
    plot_tab.value = newSelectedMonth !== null ? 'month': ''
})

/*
non year - bar
year - heat
year month - line
year month day - pie
*/

</script>
<template>
<article>
    <div class="w-100 h-100 p-2 rounded shadow-sm" style="backdrop-filter: blur(10px); background-color: rgba(255, 255, 255, 0.527);">
        <div class="d-flex col-12 col-md-4">
          <div class="input-group">
            <select class="form-select bg-transparent fw-semibold text-white rounded" placeholder="Year" v-model="selectedYear">
                <option class="bg-transparent text-dark" v-for="yr, index in yearly_visit_list" v-bind:key="index" :value="yr.year">{{ yr.year }} ({{ yr.count }})</option>
            </select>
          </div>
          <div class="input-group">
            <select class="form-select bg-transparent fw-semibold text-white rounded" placeholder="Year" v-model="selectedMonth">
                <option class="bg-transparent text-dark" value="-1" selected disabled>Mounth</option>
                <option class="bg-transparent text-dark" v-for="month, index in months" :value="index">{{ month }} {{ monthly_visit_list[index]==0 ? '':`(${monthly_visit_list[index].reduce((a, b) => a + b, 0)})` }}</option>
            </select>
          </div>
          <div class="input-group">
            <input class="form-control bg-transparent" style="min-width: max-content;" type="number" :max="31" :min="0">
          </div>
          <button class="btn btn-danger" @click="chart='line';series=line_series;chartOptions=line_chartOptions">line</button>
        </div>
        <hr>
        <div class="overflow-hidden">
            <Transition
            name="custom-classes"
            enter-active-class="animate__animated animate__fadeIn"
            leave-active-class="animate__animated animate__bounceOutRight"
            >
                <AllYears v-if="plot_tab == 'allyear'" :years="yearly_visit_list" />
                <YearlyPlot v-else-if="plot_tab == 'yearly'" :month_list="monthly_visit_list" />
            </Transition>
        </div>


    </div>
</article>
</template>


<style>
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css";
</style>