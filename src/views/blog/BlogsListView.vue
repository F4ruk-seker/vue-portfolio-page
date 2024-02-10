<script setup>
import { onMounted, ref } from 'vue'
import axios from "axios";
import { useRouter } from 'vue-router';

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

/*

const search_text = ref('')

watch(search_text, async (new_search_text)=>{
  await fetch_projects(new_search_text)
})
*/

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
  await axios.get(`content/all/?tags=${selected_tags.value.join(',')}&content_type=project&search=${search}`).then((response)=>{
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
<nav class="container">
<article class="py-3">
    <ul v-if="tags" class="d-flex list-unstyled my-auto">
        <li class="pe-1" v-for="(tag, index) in tags" v-bind:key="index">
            <button :class="'btn border rounded-5 fw-semibold ' + ( tag.selected ? 'btn-primary' : 'btn-light')" @click="set_filters(tag.id)">{{ tag.name }}</button>
        </li>
    </ul>
    <hr>
</article>
</nav>
<section class="container">
    <article>
        content
    </article>
</section>
</template>