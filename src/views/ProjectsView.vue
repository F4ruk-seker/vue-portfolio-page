<script setup>
import ScrolTop from "@/components/ScrolTop.vue";
import axios from "axios";
import {onMounted, ref, watch} from "vue";
import { useRouter } from "vue-router";

// meta test
/*
import { useHead } from '@vueuse/head';

useHead({
    title: 'mars',
    meta: [
        {
            name:'description',
            content: 'echos'
        }
    ]
})
*/

// import router from "@/router";
// import TagHeadSearch from "@/components/TagHeadSearch.vue";

/*
          @click="router.push({name:'project', params:{slug:project.slug}})"

    projects.value = [];
*/

onMounted(()=>{fetch_project_filters();fetch_projects()})

const router = useRouter()

const projects = ref([])
const filter_keys = ref({})
const toggle_card_view = ref(false)

const selected_tags = ref([])

const usersLanguage = window.navigator.language
const search_text = ref('')


watch(search_text, async (new_search_text)=>{
  await fetch_projects(new_search_text)
})


async function set_filters(id){
  selected_tags.value = []
  let tag_names = []

  filter_keys.value.forEach((tag_c)=>{
      tag_c.tags.forEach((tag)=>{
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
    })
    router.push({ query: { tags: tag_names.join(',') } });

    await fetch_projects()
}

// auto language filter > f

// ?search=test
async function fetch_projects(search=''){
  await axios.get(`content/all/?tags=${selected_tags.value.join(',')}&content_type=project&search=${search}`).then((response)=>{
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
    
  })
}

async function fetch_project_filters(){
  
  console.log(usersLanguage);
  
  await axios.get('content/type/project').then(response=> {
    filter_keys.value = response.data.sub_tags;
    filter_keys.value.forEach((tag_c)=>{
      tag_c.tags.forEach((tag)=>{
        tag.selected = false
        
      })
    })
  }) 
}


</script>

<template>
<section class="row my-0 mx-auto p-0 pt-1" style="height: 95%;">
  <article class="col-12 col-md-4 col-xl-3 border-end position-sticky top-0">
    <h2 class="pt-3">Filter</h2>
    <hr>
    <div v-for="(tags, index) in filter_keys" v-bind:key="index">
      <strong style="font-size: 24px;">{{tags.name}}</strong>
      <ul class="list-unstyled tree-list" >
        <li class="d-flex" v-for="(tag, index) in tags.tags" v-bind:key="index" >
          <hr class="my-auto fw-bold" style="width: 10px; height:2px">
          <label class="my-auto">
            <input class="mx-1" type="checkbox" @click="set_filters(tag.id)"> <!--need filter toggle -->
            {{ tag.name }}
          </label>
        </li>
      </ul>
    </div>
    <!-- strong style="">Tool & Framework</strong>
    <ul class="list-unstyled tree-list">
      <li class="d-flex">
        <hr style="width: 10px; height:">
        <label class="my-auto">
          <input class="mx-1" type="checkbox">
          Django
        </label>
      </li>
    </ul-->

  </article>
  <article class="col pt-3">
    <div class="d-flex justify-content-between mt-1 position-relative">
        <div class="d-flex">
          <button class="btn btn-light rounded d-block d-md-none">
            <i class="fa-solid fa-filter"></i>
          </button>
          <span class="my-auto" style="width: max-content;">{{projects.length}} Result</span>
        </div>
        <div class="w-100 mx-2 position-relative">
          <input class="form-control rounded-5" style="padding-right: 48px;" type="text" v-model="search_text">
          <div class="d-flex position-absolute btn-search">
            <button class="btn btn-danger rounded-circle h-100 w-100 ps-2 pt-1">
              <i class="fa-solid fa-magnifying-glass justify-content-center m-auto"></i>
            </button>
          </div>
        </div>
        <div class="d-flex">
          <button v-if="toggle_card_view" class="btn btn-light rounded" @click="toggle_card_view=false">
            <i class="fa-solid fa-grip"></i>
          </button>
          <button v-else class="btn btn-light rounded" @click="toggle_card_view=true">
            <i class="fa-solid fa-list"></i>
          </button>
        </div>
    </div>
    <hr>
    <ul class="row list-unstyled overflow-y-auto" style="max-height: 80vh;">
      <li :class="toggle_card_view ? 'w-100 card mx-0 px-0 d-flex' : 'col-6 col-md-6 col-lg-4 col-xl-3'" v-for="project in projects" v-bind:key="project.id">
        <router-link 
        :to="{name:'project', params:{slug:project.slug}}" 
        :class="toggle_card_view ? 'mx-0 px-0 row bg-light mb-1 border-0 border-bottom text-decoration-none' : 'card text-decoration-none'">
          <div :class="toggle_card_view ? 'col-4' : 'position-relative'">
            <div v-if="project.seo_image_url" class=" ratio ratio-1x1 border-bottom card-banner" :style="'background-image: url(' + project.seo_image_url + ');  background-size: cover;' "></div>
            <div v-else class="bg-dark-subtle d-flex ratio ratio-1x1">
              <p class="p-0 m-auto text-info-emphasis d-flex">
                <i class="fa-solid fa-image justify-content-center m-auto"></i>
              </p>
            </div>
          </div>
          <div :class="toggle_card_view ? 'col-8 card-body my-auto':'card-body'">
            <h5 class="card-title text-center text-primary fw-bold">{{ project.title }}</h5>
            <div v-if="toggle_card_view ">
              <hr>
              <p class="card-text ">{{ project.seo_description }}</p>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
<scrol-top />

  </article>
</section>

</template>

<style scoped>
.card-banner {
background-repeat: no-repeat;
background-size: auto;
background-position: center;
}

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
