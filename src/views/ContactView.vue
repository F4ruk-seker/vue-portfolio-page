<template>
    <section class="cta-section theme-bg-light py-5">
		    <div class="container text-center single-col-max-width">
			    <h2 class="heading">Contact</h2>
			    <div class="intro">
			    <p>Interested in hiring me for your project or just want to say hi? You can fill in the contact form below or send me an email to <a class="text-link" href="mailto:info@farukseker.com.tr">info@farukseker.com.tr</a></p>
			    <p>Want to get connected? Follow me on the social channels below.</p>
			    <ul class="list-inline mb-0">
	                <li v-for="(social_channel, index) in social_channels" :key="index" class="list-inline-item mb-3">
						<a :class="social_channel.name" :href="social_channel.url">
							<i :class="social_channel.icon  + ' fa-fw fa-lg'"></i> 
						</a>
					</li>
	            </ul><!--//social-list-->
			    
			</div><!--//container-->
	    </div>
    </section>
    <ContactForm />
</template>

<script setup>
import { ref } from 'vue'
import ContactForm from "@/components/ContactForm.vue";


const social_channels = ref([
	{
		name: 'Linkedin',
		icon: 'fab fa-linkedin-in fa-fw',
		url: 'https://www.linkedin.com/in/faruk-seker-python/'
	},{
		name: 'Github',
		icon: 'fab fa-github-alt fa-fw',
		url: 'https://github.com/F4ruk-seker/'
	},{
		name: 'Instagram',
		icon: 'fa-brands fa-instagram fa-fw',
		url: 'https://www.instagram.com/f4ruk.seker/'
	}
])
</script>