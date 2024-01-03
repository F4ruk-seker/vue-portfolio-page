<script setup>
// page/<str:name>/analytics/
import {useRoute} from "vue-router";
import axios from "axios";
import {onMounted, ref} from "vue";
import Monthly_plot from "@/components/admin/dashboard/monthly_plot.vue";

const route = useRoute()
const page_name = route.params.page_name
const show_views = ref(true)

const month = ref({
  '1':'Janauary',
  '2':'February',
  '3':'March',
  '4':'April',
  '5':'May',
  '6':'June',
  '7':'July',
  '8':'August',
  '9':'September',
  '10':'October',
  '11':'November',
  '12':'December'		})
const page = ref()

onMounted(async ()=>{
  await fetch_page()
})

async function fetch_page() {
  try {
    const response = await axios.get('admin/page/' + page_name + '/analytics/' )
    page.value = response.data
  } catch (e) {
    Promise.reject(e)
  }
}
</script>

<template>
<section class="h-100 d-flex container">
  <article v-if="page" class="justify-content-center m-auto w-100 h-100">

    <div class="d-flex w-100">
      <div class="w-50 h-25 justify-content-center m-auto">
        <img class="h-100 rounded" style="width: 200px; height: 200px" alt="page" :src="page.image">
      </div>
      <div class="w-50 my-auto">
        {{ page.name}}
        {{ page.title}}
      </div>
    </div>
      <hr>
      <div class="d-flex justify-content-center">
        <button @click="show_views = true" class="btn btn-outline-primary border border-dark me-1">Grap</button>
        <button @click="show_views = false" class="btn btn-light ms-1">User Agents</button>
      </div>
      <div v-if="show_views">
        <div v-for="(mhv,mhk, index) in page.monthly_plot" v-bind:key="index">
          {{mhk}}
          <div class="row">
            <div class="col-4" v-for="(page_view_list, month_index,index) in mhv" v-bind:key="index">
              {{month_index}}
              {{ month[month_index] }}
              <monthly_plot :page_view="page_view_list" />
            </div>
          </div>
        </div>
      </div>
      <div v-else class="mb-3">
        <ul class="list-unstyled d-flex w-100 m-1 border-bottom">
          <li class="w-100 text-start">#</li>
          <li class="w-100 text-center" style="width: min-content">visit_time</li>
          <li class="w-100 text-center">method</li>
          <li class="w-100 text-center">Country</li>
          <li class="w-100 text-center">OHAC</li>
          <li><i class="fa-brands fa-nfc-directional"></i></li>
        </ul>
        <div v-for="(view, index) in page.view" v-bind:key="view.id" class="w-100">
          <ul class="list-unstyled d-flex w-100 m-1 border-bottom" style="cursor: pointer" @click="view.toggle = !view.toggle">
            <li class="w-100 text-start">{{index+1}}</li>
            <li class="w-100 text-center" style="width: min-content">{{ view.visit_time }}</li>
            <li class="w-100 text-center">{{ view.request_type ? view.request_type:'unknown' }}</li>
            <li class="w-100 text-center">{{ view.ip_data.Country ? view.ip_data.Country:'unknown' }}</li>
            <li class="w-100 text-center">{{ view.reload_count_in_a_clock ? view.reload_count_in_a_clock:'NaN' }}</li>
            <li>
              <span v-if="view.toggle"><i class="fa-solid fa-chevron-up"></i></span>
              <span v-else><i class="fa-solid fa-angle-down"></i></span>
            </li>
          </ul>
          <div v-if="view.toggle" class="border border-primary">
            <div class="d-flex border-bottom">
              <div class="w-100">
                <strong>Request</strong>
                <div class="row m-0 p-0">
                  <div class="col-3">IS User</div><div class="col-9">
                  <span v-if="view.is_i_am"><i class="fa-solid fa-check"></i></span>
                  <span v-else><i class="fa-solid fa-xmark"></i></span>
                </div>
                  <div class="col-3">Country</div><div class="col-9">{{view.ip_data.Country ? view.ip_data.Country:'unknown'}}</div>
                  <div class="col-3">City</div><div class="col-9">{{view.ip_data.City ? view.ip_data.City:'unknown'}}</div>
                  <div class="col-3">State / Region</div><div class="col-9">{{view.ip_data['State / Region'] ? view.ip_data['State / Region']:'unknown'}}</div>
                  <div class="col-3">Time Zone</div><div class="col-9">{{view.ip_data['Time Zone'] ? view.ip_data['Time Zone']:'unknown'}}</div>
                  <div class="col-3">Lat / Long</div><div class="col-9">{{view.ip_data['Lat / Long'] ? view.ip_data['Lat / Long']:'unknown'}}</div>
                  <div class="col-3">Continent</div><div class="col-9">{{view.ip_data.Continent ? view.ip_data.Continent:'unknown'}}</div>
                </div>
              </div>
              <div class="w-100 border-start">
                <strong>Request Agent</strong>
                <div class="row m-0 p-0">
                  <div class="col-3">Host</div><div class="col-9"> {{ view.ip_data.host }}</div>
                  <div class="col-3">Provider</div><div class="col-9"> {{ view.ip_data.provider }}</div>
                  <div class="col-3">Metro Code</div><div class="col-9">{{view.ip_data['Metro Code'] ? view.ip_data['Metro Code']:'unknown'}}</div>
                  <div class="col-3">Postal code</div><div class="col-9">{{view.ip_data['Postal code'] ? view.ip_data['Postal code']:'unknown'}}</div>
                  <div class="col-3">User Agent</div><div class="col-9">{{view.user_agent ? view.user_agent:'unknown'}}</div>
                </div>
              </div>
            </div>
            <div>
              <strong>Request Detail</strong>
              <div class="row m-0 p-0">
                <div class="col-3">TYPE</div><div class="col-9">{{ view.request_type ? view.request_type:'unknown' }}</div>
                <div class="col-3">query_string</div><div class="col-9">{{ view.query_string ? view.query_string:'unknown'}}</div>
                <div class="col-3">data:</div><div class="col-9">{{ view.request_data ? view.request_data:'unknown'}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="border">
      </div>
  </article>
  <article v-else class="justify-content-center m-auto">
    <div class="spinner-grow" style="width: 3rem; height: 3rem;" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </article>
</section>
</template>

<style scoped>

</style>
