<script setup>
import NavBar from "@/components/NavBar.vue";
import ScrolTop from "@/components/ScrolTop.vue";
import axios from "axios";
import {onMounted, ref} from "vue";
import router from "@/router";
// import TagHeadSearch from "@/components/TagHeadSearch.vue";

onMounted(fetch_projects)
const projects = ref([])
async function fetch_projects(){
  await axios.get('project/all/').then((response)=>{
    // response.data.forEach((project)=>{project.created = new Date(project.created)});projects.value=response.data
    response.data.forEach((project) => {
      project.created = new Date(project.created);

      // Separate date properties and write as name
      const day = project.created.getDate();
      const month = project.created.getMonth() + 1; // Adding 1 because month value is between 0 and 11
      const year = project.created.getFullYear();

      // Find the name of the month
      const monthNames = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];
      const monthName = monthNames[month - 1]; // Subtracting 1 because the month names array starts from 0

      // Update the results
      project.day = day;
      project.month = month;
      project.year = year;
      project.monthName = monthName;
    });

    projects.value = response.data;
  })
}

</script>

<template>
<section class="bg-dark d-flex" style="height: 100vh; flex-direction: column; background: url('https://res.cloudinary.com/dlusw5ukg/image/upload/v1704822805/portfolyo/anim/eb50875a68b04b0480fa929af2c7547c_q577h8.gif') no-repeat center;background-size: cover;object-fit: contain;">
  <nav-bar />
  <section class="d-flex mt-5 pt-3 " style="flex-grow: 1;">
    <article class="h-100 justify-content-center container border border-light rounded p-2 m-auto" style="background-color: rgba(var(--bs-dark-rgb), .5)">
      <div class="text-center w-100 m-auto">
        <strong class="fw-bold text-light " style="font-size: 24px">PROJECTS</strong>
      </div>
      <ul class="list-unstyled justify-content-center mt-2">
        <li
            style="cursor: pointer"
            v-for="(project, index) in projects" v-bind:key="index"
            @click="router.push({name:'project', params:{slug:project.slug}})"
            class="border-light border-bottom fw-bold py-2"
        >
          <ul class="list-unstyled row p-0 m-0">
            <li class="rounded border me-2 col-1" style="width: 36px!important; height: 36px">

            </li>
            <li class="my-auto col-3 col-lg-2 col-xxl-1 text-info">{{project.year}}-{{project.monthName}}-{{project.day}}</li>
            <li class="my-auto col text-light" >{{project.title}}</li>
            <li class="my-auto col-2 text-light" >{{ (project.word_count/200).toFixed(2) }}</li>
          </ul>
        </li>
      </ul>
    </article>
  </section>
</section>
  <scrol-top />

</template>

<style scoped>

</style>
