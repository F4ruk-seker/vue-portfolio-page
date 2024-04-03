<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue';

const props = defineProps({
    show_modal: Boolean,
    content_types: Array
})

const new_content = ref({
    title: '',
    seo_description: '',
    text: 'Hello World',
    show: false,
    content_type:'',
    tags: []
})

const content_tags = ref([])

watch(() => new_content.value.content_type, (newValue) => {
  const selectedType = props.content_types.find(type => type.name === newValue);
    if (selectedType && selectedType.sub_tags && selectedType.sub_tags.length > 0) {
        content_tags.value = selectedType.sub_tags.flatMap(tagSet => tagSet.tags);
    } else {
        content_tags.value = [];
    }
});

const emit = defineEmits(['toggle_modal']);

</script>

<template>
<!-- Modal -->
<!-- <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true"> -->
<div :class="'modal fade bg-secondary bg-opacity-50 ' + (show_modal ? 'show':'')" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" :style="show_modal ? 'display: block; padding-right: 17px;': 'display: none;'">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
    <form class="form-check m-0 p-0" >

    <div class="modal-header">
        <h4 class="modal-title" id="exampleModalLongTitle">Content Create</h4>
        <button type="button" class="btn btn-sm btn-danger close" data-dismiss="modal" aria-label="Close"  @click="emit('toggle_modal', false)">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
            <div class="form-group mb-3">
                <input class="form-control" type="text" placeholder="Title" v-model="new_content.title" required>
            </div>
            <div class="form-group mb-3">
                <input class="form-control" type="text" placeholder="Description" v-model="new_content.seo_description" required>
            </div>
            <div class="form-group mb-3">
                <textarea class="form-control" type="text" placeholder="Content" v-model="new_content.text" required></textarea>
            </div>
            <div class="form-group mb-3 d-flex">
                <button :class="'btn ' + (new_content.show ? 'btn-primary':'btn-outline-primary')" type="button" @click="new_content.show =! new_content.show">Show</button>
                <p class="ms-1 my-auto">Show your post to everyone?, - <strong>{{ new_content.show ? 'Yes':'No' }}</strong></p>
            </div>
            <div class="form-group mb-3">
                <select class="form-select text-capitalize" v-model="new_content.content_type" required>
                    <option selected value="">Select a type</option>
                    <option class="text-capitalize" v-for="(content_type, index) in content_types" v-bind:key="index">{{ content_type.name }}</option>   
                </select>
            </div>
            <div class="form-group mb-3">
                <h6>tag:</h6>
                <select class="form-select text-capitalize h-100" v-model="new_content.tags" required multiple>
                    <option class="text-capitalize" v-for="content_type in content_tags" :key="content_type.id" :value="content_type">{{ content_type.name }}</option>   
                </select>
                <p class="text-secondary">
                    hold <code class="fw-semibold">ctrl</code> for multiple selections
                </p>
            </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="emit('toggle_modal', false)">Close</button>
        <button type="submit" class="btn btn-primary" >Save changes</button>
      </div>
    </form>
    
    </div>
  </div>
</div>
</template>


<style>
</style>