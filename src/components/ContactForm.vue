<template>
    <section class="contact-section px-3 py-5 p-md-5">
		    <div class="container">
			    <form id="contact-form" class="contact-form col-lg-8 mx-lg-auto" @submit.prevent="send">
			        <h3 class="text-center mb-3">Get In Touch</h3>
			        <div class="row g-3">                                                           
		                <div class="col-12 col-md-6">
		                    <label class="sr-only" for="cname">Name</label>
		                    <input type="text" class="form-control" id="cname" name="name" placeholder="Name" minlength="2" required="" aria-required="true" v-model="context.name">
		                </div>                    
		                <div class="col-12 col-md-6">
		                    <label class="sr-only" for="cemail">Email</label>
		                    <input type="email" class="form-control" id="cemail" name="email" placeholder="Email" required="" aria-required="true" v-model="context.email">
		                </div>
		                <div class="col-12">
		                    <label class="sr-only" for="cmessage">Your message</label>
		                    <textarea class="form-control" id="cmessage" name="message" placeholder="Enter your message" rows="10" required="" aria-required="true" v-model="context.message"></textarea>
		                </div>
		                 <div class="form-group col-12">
		                    <button type="submit" class="btn btn-block btn-primary py-2" :disabled="on_send">
								<div v-if="on_send" class="spinner-grow spinner-grow-sm" role="status">
									<span class="sr-only">Loading...</span>
								</div>
								<span v-else>Send Now</span>
							</button>
		                </div>                           
		            </div><!--//form-row-->
		        </form>
				<div v-if="send_mesage" class="alert alert-primary mt-2">{{ send_mesage }}</div>
		    </div><!--//container-->
	    </section>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue'



const context = ref({
	name:'',
	email:'',
	message: ''
})

const on_send = ref(false)
const send_mesage = ref('') 

async function send(){
	on_send.value = true
	await axios.post('message/create/', context.value)
	send_mesage.value = 'Your message has been received. We will get back to you via email as soon as possible.'
	clean_form()
	on_send.value = false
}

function clean_form() {
	context.value.email = ''
	context.value.message = ''
	context.value.name = ''
}

</script>