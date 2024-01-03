<script setup>
import { ref } from 'vue'
import axios from "axios";
import {onMounted} from 'vue'

const page_list = ref(null)


onMounted(() => {
  fetch_page_list()
})

function fetch_page_list(){
  axios.get('admin/page/').then((response)=>{
    page_list.value = response.data
  })
}
</script>

<template>
  <div v-for="page in page_list" v-bind:key="page.name" class="container d-flex row mx-auto my-3 p-0">
    <div class="col-2">
      <img v-if="page.image" class="ratio ratio-1x1 rounded" :src="page.image" alt="page">
      <div v-else class="bg-secondary ratio ratio-1x1 rounded"></div>
    </div>
    <div class="col d-flex my-auto">
      <ul class="fw-bold list-unstyled justify-content-start">
        <li style="font-size: 36px">{{page.name}}</li>
        <li style="font-size: 24px">{{page.title}}</li>
        <li style="font-size: 18px">{{page.view}}</li>
        <li>
          <router-link
              class="btn btn-outline-primary fw-bold mt-1"
            :to="{name:'admin-dashboard-page', page_name:page.name}"
          >Görüntülenme datası</router-link>
        </li>
      </ul>
    </div>
  </div>
<!--  <hr class="m-1" style="">-->
<!--  <ul class="list-unstyled justify-content-start p-0 d-flex my-1 w-100">-->
<!--    <li class="rounded-start non-color" style="height: 26px; width: 36px"></li>-->
<!--    <li class="first-color" style="height: 26px; width: 36px"></li>-->
<!--    <li class="second-color " style="height: 26px; width: 36px"></li>-->
<!--    <li class="third-color " style="height: 26px; width: 36px"></li>-->
<!--    <li class="rounded-end fourth-color " style="height: 26px; width: 36px"></li>-->
<!--  </ul>-->
</template>

<style scoped>

</style>
