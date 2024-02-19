<script setup>
import { onMounted, ref, watch } from 'vue'
import axios from "axios";
import { useRouter } from 'vue-router';
import PireviewCard from '@/components/blog/PreviewCard'
import { useStore } from 'vuex';

const store = useStore()

const router = useRouter()

const tags = ref(null)

onMounted(()=>{fetch_blog_tags();fetch_projects()})


async function fetch_blog_tags() {
    let tag_list = []
    await axios.get('content/type/blog').then((response) => {  
        response.data.sub_tags.forEach(element => {
            element.tags.forEach(tag=>{tag.selected = false;tag_list.push(tag)})
        });
        tags.value = tag_list
    })
}

const projects = ref([])

const selected_tags = ref([])



const search_text = ref('')

watch(search_text, async (new_search_text)=>{
  await fetch_projects(new_search_text)
})


async function set_filters(id){
  selected_tags.value = []
  let tag_names = []
  tags.value.forEach((tag)=>{
        if (tag.id === id){tag.selected = !tag.selected} else {/**/}

        if (tag.selected){
            selected_tags.value.push(tag.id);
            tag_names.push(tag.name)
        }
        else {
          const indexToRemove = selected_tags.value.indexOf(tag.id);
          if (indexToRemove !== -1) {
          selected_tags.value.splice(indexToRemove, 1);
          }
        }
      })
    
    router.push({ query: { tags: tag_names.join(',') } });
    await fetch_projects()
}

// auto language filter > f

// ?search=test
async function fetch_projects(search=''){
  store.dispatch('showProgress')
  store.dispatch('updateProgressStatus', 60)
  
  await axios.get(`content/all/?tags=${selected_tags.value.join(',')}&content_type=blog&search=${search}`).then(async(response)=>{
    store.dispatch('updateProgressStatus', 80)
    // response.data.forEach((project)=>{project.created = new Date(project.created)});projects.value=response.data
      response.data.forEach((project) => {
      project.created = new Date(project.created);
      // Separate date properties and write as name
      const day = project.created.getDate();
      const month = project.created.getMonth() + 1; // Adding 1 because month value is between 0 and 11
      const year = project.created.getFullYear();
      // Find the name of the month
      const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec',];
      const monthName = monthNames[month - 1]; // Subtracting 1 because the month names array starts from 0
      // Update the results
      project.day = day;
      project.month = month;
      project.year = year;
      project.monthName = monthName;
    });
    projects.value = response.data;
    await new Promise(resolve => setTimeout(resolve, 100));

    store.dispatch('updateProgressStatus', 100)
    await new Promise(resolve => setTimeout(resolve, 100));
    store.dispatch('hideProgress')
  })
}


</script>
<template>
  <section class="cta-section theme-bg-light py-5">
<div class="container text-center">
<h2 class="heading">A Blog About Software Development And Life</h2>
<div class="intro">Welcome to my blog. Subscribe and get my latest blog post in your inbox.</div>
<div class="single-form-max-width pt-3 mx-auto">
<div class="signup-form row g-2 g-lg-2 align-items-center">
  <div class="w-100 position-relative">
      <input class="form-control rounded-5" style="padding-right: 48px;" type="text" v-model="search_text">
      <div class="d-flex position-absolute btn-search">
        <button class="btn btn-danger rounded-circle h-100 w-100 ps-2 pt-1">
          <i class="fa-solid fa-magnifying-glass justify-content-center m-auto"></i>
        </button>
      </div>
    </div>
</div><!--//signup-form-->
</div><!--//single-form-max-width-->
</div>
</section >
<nav class="theme-bg-light">
<article class="container py-3">
    <ul v-if="tags" class="d-flex list-unstyled my-auto">
        <li class="pe-1" v-for="(tag, index) in tags" v-bind:key="index">
            <button :class="'btn border rounded-5 fw-semibold ' + ( tag.selected ? 'btn-primary' : 'btn-white')" @click="set_filters(tag.id)">{{ tag.name }}</button>
        </li>
    </ul>
    <hr>
</article>
</nav>
<section class="container">
    <article class="mt-5 container">
      <div class="row">
        <PireviewCard v-for="project in projects" v-bind:key="project.id" :content_preview="project" />
      </div>
    </article>
</section>
</template>

<style scoped>
.btn-search{
  top: 5px;
  right: 8px;
  width: 30px;
  height: 30px;
}
</style>