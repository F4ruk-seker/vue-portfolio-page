<script setup>
import { ref, watch } from 'vue'
import axios from "axios";
import {onMounted} from 'vue'
import AnalyticsChartManage from '@/components/admin/dashboard/AnalyticsChartManage.vue'
const page_list = ref(null)
const selected_page = ref(null)
const pagedetail = ref(null)
const selected_tab = ref('analytics')

const tab_chart = ref('day')
/*
günlük (sat dilimi)
haftalık
aylık
yıllık
*/

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

const show = ref(true)
//matrix/<name>/years
// api/analytical/matrix/Page/2024/4/26
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
    <div class="d-flex wrapper border-bottom">
      <div class="p-2 w-100 text-center btn-transparent rounded-top rounded-end-0" @click="selected_tab='settings'">Settings</div>
      <div class="p-2 w-100 text-center btn-transparent" @click="selected_tab='analytics'">Analytics</div>
      <div class="p-2 w-100 text-center btn-transparent rounded-top rounded-start-0" @click="selected_tab='visits'">Visits</div>
    </div>
    <section v-if="selected_tab==='settings'">
      settings
    </section>
    <section v-else-if="selected_tab=='analytics'" class="my-auto p-2">
      <AnalyticsChartManage :page_name="selected_page" />
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
