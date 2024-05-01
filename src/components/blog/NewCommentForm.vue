<template>
<form @submit.prevent="sendNewComment">
    <div class="d-block d-md-flex w-100">
      <div class="form-group mb-3 me-md-3 w-100">
        <label class="fw-semibold">Name*</label>
        <input type="text" class="form-control" placeholder="name" v-model="name" required>
      </div>      
      <div class="form-group mb-3 w-100">
        <label class="fw-semibold">Email*</label>
        <input type="email" class="form-control" placeholder="email" name="comment_mail" v-model="email" required>
      </div>      
    </div>
    <label class="fw-semibold">Comment*</label>
    <textarea class="form-control border" type="text" placeholder="something..." v-model="comment" maxlength="600" required></textarea>
    <label :class="comment.length > 500 ? 'text-danger fw-bold':''">{{comment.length}}/500</label>
    <div class="w-100 d-flex pb-3">
      <div class="w-100"></div>
      <button :class="'btn btn-primary fw-bold ' + (on_send ? 'disabled':'')" :disabled="on_send">
        <span v-if="on_send">
          <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
        </span>
        <span v-else>Send</span>
      </button>
    </div>
</form>
<div class="alert alert-danger" v-if="handle_error.length">
  <ul>
    <li v-for="er, field in handle_error" v-bind:key="field">{{ field }} {{ er }} </li>
  </ul>
</div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';

const comment = ref('')
const name = ref('')
const email = ref('')
const on_send = ref(false) 
const handle_error = ref([])

const props = defineProps({
  slug: String
})

const emit = defineEmits(['add_comment'])

async function sendNewComment() {
  on_send.value = true

    await axios.post(`content/comment/${props.slug}/`, {
      name: name.value,
      email: email.value,
      comment: comment.value
    }).then(response =>{
      if (response.status === 201){
        emit('add_comment', response.data)
      }
    }).catch(e => {
      handle_error.value = e.response.data
    })
    
    on_send.value = false


}
</script>