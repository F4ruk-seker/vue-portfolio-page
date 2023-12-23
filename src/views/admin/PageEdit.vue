<script setup>
import {useRoute} from "vue-router";
import axios from "axios";
import {onMounted, ref} from "vue";

const route = useRoute()
const page = ref({})
const on_save = ref(false)

onMounted(()=>{
  fetch_page_data()
})

async function fetch_page_data() {
  const response = await axios.get('admin/page/' + route.params.page_name + '/')
  if (response.status === 200){
    page.value = response.data
  }
}

async function save_page(){
  on_save.value = true
  await axios.put('admin/page/' + route.params.page_name + '/', page.value)
  on_save.value = false
}

// MD = "1", "MD"
// LIST = "2", "List"
// IMG = '3', 'img'
// TEXT = '4', 'text'

</script>

<template>
<header class="w-100 bg-dark-subtle border-bottom pb-1">
  <article class="container justify-content-end d-flex">
    <router-link
        class="btn btn-secondary d-inline-block"
        style="min-width: max-content"
        :to="{
          name: 'admin-page'
        }"
    >
      <i class="fa-solid fa-arrow-left me-1"></i>back
    </router-link>
    <div class="w-100"></div>
    <button class="btn btn-primary" @click="save_page" type="button">
      <span v-if="on_save">
        <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
        <span class="visually-hidden">Saving...</span>
      </span>
      <span v-else>
        Save
      </span>
    </button>
  </article>
</header>
<section>
  <article class="bg-dark-subtle d-flex" style="min-height: 50vh">
    <div class="justify-content-center container m-auto">
      <strong>Page Settings</strong>
      <hr>
      <label class="fw-semibold mb-1">Page Name</label>
      <input type="text" v-model="page.name" class="form-control fw-semibold text-light bg-dark">
      <label class="fw-semibold mb-1">Page Title</label>
      <input type="text" v-model="page.title" class="form-control fw-semibold text-light bg-dark">
      <strong class="fw-semibold mb-1">Avable CEO</strong>
      <br>
      <button :class="'btn btn-' + (page.disable_ceo ? 'primary' : 'danger')" @click="page.disable_ceo = !page.disable_ceo">
        <span v-if="page.disable_ceo">
          <i class="fa-solid fa-check"></i>
          <span class="ms-1">Enable</span>
        </span>
        <span v-else>
          <i class="fa-solid fa-xmark"></i>
          <span class="ms-1">Disable</span>
        </span>
      </button>
      <div v-if="!page.disable_ceo" class="fw-semibold">
        <strong >ceo content</strong>
        <br>
        <label class="mb-1">Page keywords</label>
        <input type="text" v-model="page.keywords" class="form-control text-light bg-dark">
        <div class="d-flex w-100">
          <img alt="ceo image" :src="page.image" style="min-width:100px;min-height: 100px;max-width:100px;max-height: 100px" class="border rounded p-1">
          <div class="w-100 ms-1">
            <label class="mb-1">Page image</label>
            <input type="text" v-model="page.image" class="form-control text-light bg-dark">
          </div>
        </div>
        <label class="mb-1">Page image_alt</label>
        <input type="text" v-model="page.image_alt" class="form-control text-light bg-dark">
      </div>
      <div>
        <hr>
        <strong>
          DATA
        </strong>
        <ul class="list-unstyled">
          <li>
            <i class="fa-regular fa-clock"></i><strong class="ms-1">Last Update:</strong><span class="ms-1">{{ page.updated_at }}</span>
          </li>
          <li>
            <i class="fa-regular fa-clock"></i><strong class="ms-1">Created:</strong><span class="ms-1">{{ page.created_at }}</span>
          </li>
          <li>
            <i class="fa-solid fa-eye"></i><strong class="ms-1">view:</strong><span class="ms-1">{{ page.view }}</span>
          </li>
        </ul>
      </div>
    </div>
  </article>
  <article class="bg-light">
    <div class="d-flex">
      <strong>Context</strong>
      <hr class="w-100 m-auto mx-2">
    </div>
    <ul class="list-unstyled container">
      <li v-for="content in page.context" v-bind:key="content.id">
        <strong>{{content.name}}</strong>
        <hr class="p-1 m-1">

        <div v-if="content.field_type === '5'" class="d-flex border rounded position-relative p-2">
          <textarea class="w-100 form-control" style="max-height: 30vh; min-height: 30vh" v-model="content.field_value"></textarea>
          <div :class="'w-100 overflow-y-auto ' + (content?.use_dark ? 'bg-light' : 'bg-dark') " style="border: 1px dashed var(--bs-secondary);max-height: 30vh;" v-html="content.field_value"></div>
          <div class="position-absolute bottom-0 end-0">
            <button class="btn btn-light border" @click="content.use_dark = !(content?.use_dark)">
              <span v-if="content.use_dark">
                <i class="fa-solid fa-moon"></i>
              </span>
              <span v-else>
                <i class="fa-solid fa-sun"></i>
              </span>
            </button>
          </div>
        </div>
        <div v-if="content.field_type === '4'" class="d-flex border rounded position-relative p-2">
          <textarea class="w-100 form-control" style="max-height: 30vh; min-height: 30vh" v-model="content.field_value"></textarea>
        </div>
        <div v-if="content.field_type === '3'" class="d-flex border rounded position-relative p-2">
          <div class="w-100">
            <input class="w-100 form-control" style="max-height: 30vh; min-height: 30vh" v-model="content.field_value">
          </div>
          <div class="w-100 d-flex bg-secondary-subtle">
            <img class="justify-content-center m-auto" style="height: 30vh; width: 30vh;object-fit: contain" :src="content.field_value" alt="content image">
          </div>
        </div>
      </li>
    </ul>
  </article>
</section>
<footer class="w-100 bg-dark-subtle">
  <article class="container justify-content-end d-flex">
    <button class="btn btn-primary" @click="save_page" type="button">
    <span v-if="on_save">
      <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
      <span class="visually-hidden">Saving...</span>
    </span>
      <span v-else>
      Save
    </span>
    </button>
  </article>
</footer>
</template>

<style scoped>

</style>
