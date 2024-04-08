<template>
<div :class="'modal fade bg-secondary bg-opacity-50 ' + (show_modal ? 'show':'')" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" :style="show_modal ? 'display: block; padding-right: 17px;': 'display: none;'">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
    <form class="form-check m-0 p-0" @submit.prevent="create_new_content">

    <div class="modal-header">
        <h4 class="modal-title" id="exampleModalLongTitle">Work Experience</h4>
        <button type="button" class="btn btn-sm btn-danger close" data-dismiss="modal" aria-label="Close"  @click="emit('toggle_modal', false)">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body" v-if="local_instance">
        <label>Title</label>
        <input type="text" placeholder="Title" v-model="local_instance.title" class="form-control">
        <label>Company</label>
        <input type="text" placeholder="Company Name" v-model="local_instance.company" class="form-control">
        <label>Start Date</label>
        <input type="text" placeholder="MM-YYYY" v-model="local_instance.start_date" class="form-control">
        <label>End Date</label>
        <input type="text" placeholder="MM-YYYY / Present" v-model="local_instance.end_date" class="form-control">
        <label>Experience</label>
        <textarea type="text" placeholder="Experiences" v-model="local_instance.experience" class="form-control"></textarea>
        <div class="form-group mb-3 mt-3 d-flex">
            <button :class="'btn ' + (local_instance.show ? 'btn-primary':'btn-outline-primary')" type="button" @click="local_instance.show =! local_instance.show">Show</button>
            <p class="ms-1 my-auto">Show on your online resume to everyone?, - <strong>{{ local_instance.show ? 'Yes':'No' }}</strong></p>
        </div>
    </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="emit('toggle_modal', false)">Close</button>
        <button type="submit" class="btn btn-primary" 
        @click="()=>{
            if (local_instance.id){
                WorkExperiences.update(local_instance)
            } else {
                WorkExperiences.create(local_instance)
            }
            $emit('submit')
        }"
        >{{local_instance.id ? 'Update':'Create'}}</button>
      </div>
    </form>
    
    </div>
  </div>
</div>

</template>

<script setup>
import { defineProps, defineEmits, ref, watch, onBeforeUpdate } from 'vue';
import WorkExperiences from '@/composable/WorkExperiencesHelper';

const props = defineProps({
    show_modal: Boolean,
    instance_exp: Object
})

const local_instance = ref(props.instance_exp)

watch(props, new_props => {
    local_instance.value = new_props.instance_exp
})

const emit = defineEmits(['toggle_modal', 'submit']);

</script>