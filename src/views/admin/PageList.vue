<script setup>
import { ref } from 'vue'
import axios from "axios";
import {onMounted} from 'vue'
import PageCard from "@/components/admin/page/PageCard.vue";

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
<section class="d-flex h-100">
  <article class="justify-content-center w-100 m-auto">
    <ul class="list-unstyled d-flex">
      <li class="col-3 m-0 p-1" v-for="page in page_list" v-bind:key="page.name">
        <page-card :page="page" />
      </li>
    </ul>
  </article>
</section>
</template>

<style scoped>

</style>
