<template>
<section class="p-2">
    <article class="d-flex p-2 border-success-subtle border-bottom shadow rounded">
        <input 
            class="form-control bg-transparent fw-bold text-white" 
            placeholder="'user_agent', 'ip_address', 'ip_data', 'visit_time>2024-08-23'"
            @input="getVisitsAgents"
            v-model="search_text"
            >
        <div class="d-none d-md-block w-25"></div>
        <div class="d-flex ps-2">
            <button class="btn btn-light" :disabled="!result?.previous">
                <i class="fa-solid fa-angle-left"></i>
            </button>
            <button class="btn btn-light ms-2" :disabled="!result?.next">
                <i class="fa-solid fa-angle-right"></i>
            </button>
        </div>
    </article>
    <article class="my-2 d-flex">
        Filter Settings 
        <div>
            <button class="btn btn-sm btn-outline-light py-0" @click="hide_ip=!hide_ip">
                <span v-if="hide_ip"><i class="fa-solid fa-eye"></i></span>
                <span v-else><i class="fa-regular fa-eye-slash"></i></span>
            </button>
            <button class="btn btn-sm btn-outline-light py-0">
                <i class="fa-solid fa-filter-circle-xmark"></i>
            </button>
        </div>
    </article>
    <article>
        <table class="w-100 table table-striped table-dark rounded rounded-5 opacity-75 shadow" style="background-color: red!important;">
            <thead class="rounded" style="background-color: red!important;">
                <tr>
                    <th>#</th>
                    <th>Country</th>
                    <th>City</th>
                    <th>Type</th>
                    <th>IP</th>
                    <th>
                        Date 
                        <span v-if="order_param !='visit_time'" @click="order_param='visit_time'" >
                            <i class="fa-solid fa-chevron-up"></i>
                        </span>
                        <span v-else-if="order_param !='-visit_time'" @click="order_param='-visit_time'">
                            <i class="fa-solid fa-chevron-down"></i>
                        </span>
                    </th>
                    <th>Known</th>
                    <th>Duration</th>
                    <th>OHAC</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(visit, index) in data?.results" v-bind:key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ visit.ip_data.Country }}</td>
                    <td>{{ visit.ip_data.City }}</td>
                    <td>{{ visit.request_type }}</td>
                    <td style="max-width: min-content;">
                        <span v-if="hide_ip">
                            {{ visit.ip_address }}
                        </span>
                        <span v-else><hr class="w-100 bg-danger" style="height: 3px;"></span>
                    </td>
                    <td>{{ new TarihFormatlayici(visit.visit_time).tarihOkunabilir() }}</td>
                    <td>
                        <span v-if="visit.is_i_am"><i class="fa-solid fa-check"></i></span>
                        <span v-else><i class="fa-solid fa-xmark"></i></span>
                    </td>
                    <td>{{ visit.current_time }}</td>
                    <td>{{ visit.reload_count_in_a_clock }}</td>
                </tr>
            </tbody>
        </table>
    </article>
</section>
</template>

<script setup>
import axios from 'axios';
import { ref, watch } from 'vue'
import TarihFormatlayici from '@/composable/TarihFormatlayici'

// const query_limit = ref
// api/analytical/page/Page/2 # 2 count border

const hide_ip = ref(false)
const search_text = ref('')

// reload_count_in_a_clock
// visit_time
const order_param = ref('')

const props = defineProps({
    page_name:String
})

const pageName = ref(props.page_name)
const query_count_limit = ref(20)
watch(order_param, new_order_param =>{
    getVisitsAgents()
})
watch(props, new_props => {
    pageName.value = new_props.page_name
    getVisitsAgents()
})

const data = ref()
// http://127.0.0.1:8000/api/analytical/visitors/Page/?ordering=reload_count_in_a_clock&search=127.0.0.1
const getVisitsAgents = async () => {
    const response = await axios.get(`analytical/visitors/${pageName.value}/?search=${search_text.value}&ordering=${order_param.value}`)
    if (response.status === 200) {
        data.value = response.data
    }
}
</script>