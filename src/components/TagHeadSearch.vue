<script>
export default {
  props: ['alow_tags'],
  data:()=>{return {
    tag: '',
    tags: [],
    alow_tags_name: [],
    helper_tags: [],
    help_bar: false
  }},
  methods:{
    add_tag(){
      if (!this.tags.includes(this.tag) && this.alow_tags_name.includes(this.tag)){
        this.tags.push(this.tag)
        this.tag = ''
      }
    },
    remove_tag(index){
      this.tags.splice(index, 1)
    },
    add_tag_w_btn(tag){
      this.tag = tag
      this.add_tag()
    }
  },
  mounted(){
    if (this.alow_tags){
      this.alow_tags.forEach(element => {
          this.alow_tags_name.push(element.name)
        });
      this.helper_tags = this.alow_tags_name
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
  <form @submit.prevent="add_tag" class="w-100 position-relative" @focusin="help_bar=true">
    <input class="form-control fw-semibold" type="text" ref="tag_input" v-model="tag" >
    <div v-if="help_bar" class=" bg-light w-100 pt-1" id="helper" style="height: 20vh;">
      <button class="btn btn-danger" @click="help_bar=false">CLose</button>
      <button class="btn btn-light rounded border mx-1" v-for="(htag, index) in helper_tags" v-bind:key="index" @click="add_tag_w_btn(htag)">{{ htag }}</button>
    </div>
  </form>
</div>
</template>

<style scoped>
</style>
