<script setup>
import ScrolTop from "@/components/ScrolTop.vue";
import axios from "axios";
import {onMounted, ref} from "vue";
// import router from "@/router";
// import TagHeadSearch from "@/components/TagHeadSearch.vue";

/*
          @click="router.push({name:'project', params:{slug:project.slug}})"

*/

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
<section class="row m-0 p-0" style="height: 100vh;">
  <article class="col-12 col-md-4 col-xl-3 border">
    <h2 class="pt-3">Filter</h2>
    <hr>
    <strong style="font-size: 24px;">Languages</strong>
    <ul class="list-unstyled tree-list">
      <li class="d-flex">
        <hr class="my-auto fw-bold" style="width: 10px; height:2px">
        <label class="my-auto">
          <input class="mx-1" type="checkbox">
          Python
        </label>
      </li>
    </ul>

    <strong style="">Tool & Framework</strong>
    <ul class="list-unstyled tree-list">
      <li class="d-flex">
        <hr style="width: 10px; height:">
        <label class="my-auto">
          <input class="mx-1" type="checkbox">
          Django
        </label>
      </li>
    </ul>

  </article>
  <article class="col pt-3">
    <div class="d-flex justify-content-between mt-1 position-relative">
        <div class="d-flex">
          <button class="btn btn-light rounded d-block d-md-none">
            <i class="fa-solid fa-filter"></i>
          </button>
          <span class="my-auto" style="width: max-content;">10 Result</span>
        </div>
        <div class="w-100 mx-2 position-relative">
          <input class="form-control rounded-5" style="padding-right: 48px;">
          <div class="d-flex position-absolute btn-search">
            <button class="btn btn-danger rounded-circle h-100 w-100 ps-2 pt-1">
              <i class="fa-solid fa-magnifying-glass justify-content-center m-auto"></i>
            </button>
          </div>
        </div>
        <div class="d-flex">
          <button class="btn btn-light rounded">
            <i class="fa-solid fa-grip"></i>
          </button>
          <button class="btn btn-light rounded">
            <i class="fa-solid fa-list"></i>
          </button>
        </div>
    </div>
    <hr>
    <div class="row">
      .
    </div>
  </article>
</section>
<scrol-top />

</template>

<style scoped>
section{
  font-size: 22px;
}
#project-list{
  height: 100vh;
  flex-direction: column;
  background: no-repeat center;
  background-size: cover;
  object-fit: contain;
}
.tree-list{
  margin-left: 5px;
  border-left: 2px solid var(--bs-success);
}
.tree-list hr{
  border-width: 4px;
  color: var(--bs-success);
}
.btn-search{
  top: 4px;
  right: 4px;
  width: 30px;
  height: 30px;
}
</style>
