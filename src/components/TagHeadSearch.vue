<script>

export default {
  data:()=>{return {
    tags: [],
    tag: ''
  }},
  methods:{
    add_tag(){
      if (!this.tags.includes(this.tag)){
        this.tags.push(this.tag)
        this.tag = ''
      }
    },
    remove_tag(index){
      this.tags.splice(index, 1)
    }
  }
}

</script>

<template>
<div class="d-flex">
  <ul class="list-unstyled d-flex my-auto" style="min-width: max-content">
    <li class="w-100 m-auto" v-for="(tag, index) in tags" v-bind:key="index" @click="remove_tag(index)">
      <span class="bg-primary-subtle p-2 rounded me-2 position-relative d-flex">
        <i class="fa-solid fa-check my-auto me-1"></i>
        {{ tag }}
      </span>
    </li>
  </ul>
  <form @submit.prevent="add_tag" class="w-100">
    <input class="form-control fw-semibold" type="text" ref="tag_input" v-model="tag">
  </form>
</div>
</template>

<style scoped>

</style>
