<template>
<div :class="'modal fade bg-secondary bg-opacity-50 ' + (show_modal ? 'show':'')" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" :style="show_modal ? 'display: block; padding-right: 17px;': 'display: none;'">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
    <form class="form-check m-0 p-0" @submit.prevent="create_new_content">

    <div class="modal-header">
        <h4 class="modal-title" id="ProjectExperiences">Project Experiences</h4>
        <button type="button" class="btn btn-sm btn-danger close" data-dismiss="modal" aria-label="Close"  @click="emit('toggle_modal', false)">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body" v-if="local_instance">
        <div class="form-group mb-3">
          <label>Title</label>
          <input type="text" placeholder="Title" v-model="local_instance.title" class="form-control">
        </div>
        <div class="form-group mb-3">
          <label>Link</label>
          <input type="text" placeholder="https://github.com/F4ruk-sekerr" v-model="local_instance.link" class="form-control">
        </div>
        <div class="form-group mb-3">
            <select class="form-select text-capitalize" v-model="local_instance.project_type" required>
                <option selected value="">Select a type</option>
                <option class="text-capitalize" value="HB">Hobby</option>
                <option class="text-capitalize" value="OS">open source</option>
                <option class="text-capitalize" value="DP">Development</option>
                <option class="text-capitalize" value="CB">Contribution</option>
            </select>
        </div>
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
                ProjectExperiences.update(local_instance)
            } else {
                ProjectExperiences.create(local_instance)
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
import { defineProps, defineEmits, ref, watch } from 'vue';
import ProjectExperiences from '@/composable/ProjectExperiencesHelper';

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
