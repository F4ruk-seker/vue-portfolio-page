<template>
<section class="overview-section p-3 p-lg-5">
			<div class="container">
				<h2 class="section-title font-weight-bold mb-3">What I do</h2>
				<div class="section-intro mb-5">
					I continuously strive to improve myself in order to provide you with a quality web service.
					I want to share with you the web frameworks, software tools,
					and languages I have learned in order to offer valuable services.
					You can explore. My portfolio and resume for more information.
				</div>
				<div class="row">

					<div class="item col-6 col-lg-3" v-for="(skill, index) in Skills" v-bind:key="index">
						<div class="item-inner">
							<div class="item-icon">
								<i :class="icon" v-for="(icon, index) in skill.icons" v-bind:key="index"></i>
							</div>
							<h3 class="item-title">{{skill.title}}</h3>
							<div class="item-desc">{{ skill.explanation }}</div>
						</div><!--//item-inner-->
					</div><!--//item-->

				</div><!--//row-->
				<!--div class="text-center py-3">
					<a href="services.html" class="btn btn-primary">
						<i class="fas fa-arrow-alt-circle-right me-2"></i> Services &amp; Pricing
					</a>
				</div-->
				
			</div><!--//container-->
		</section>
</template>

<script setup>
import { ref } from 'vue';

const Skills = ref([
	{
		title: 'Python & Django',
		icons: [
			'fa-brands fa-python'
		],
		explanation: 'I am using JavaScript to develop my projects.'
	},
	{
		title: 'Java Script',
		icons: [
			'fa-brands fa-square-js'
		],
		explanation: 'I am using JavaScript to develop my projects.'
	}
])

</script>