<script setup>
const props = defineProps({
    context: Object,
    EditMode: Boolean
})


import { marked } from 'marked'

const getHtmlFromMark = (mark) => {
  return marked.parse(mark);
}

const getProjectType = (project_type) => {
	switch (project_type) {
		case "HB":
			return "Hobby"
		case "OS":
			return "open source"
		case "DP":
			return "Development"
		case "CB":
			return "Contribution"
		default:
			break;
	}

}
</script>

<template>
<div v-if="!context" class="h-100 d-flex">
    <div class="spinner-border m-auto justify-content-center" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>
</div>
<div v-else :class="'resume-container ' + (EditMode ? '': 'container px-3 px-lg-5')">
	<article :class="'resume-wrapper mx-auto theme-bg-light p-5 shadow-lg ' + (EditMode ? '':'mb-5 my-5')">
	<div class="resume-header">
		<div class="row align-items-center">
			<div class="resume-title col-12 col-md-6 col-lg-8 col-xl-9">
				<h2 class="resume-name mb-0 text-uppercase">{{ context.name }}</h2>
				<div class="resume-tagline mb-3 mb-md-0">{{ context.job_title }}</div>
			</div><!--//resume-title-->
			<div class="resume-contact col-12 col-md-6 col-lg-4 col-xl-3">
				<ul class="list-unstyled mb-0">
					<li class="mb-2">
						<i class="fas fa-envelope-square fa-fw fa-lg me-2"></i>
						<a class="resume-link" :href="'mailto: ' + context.contact.mail">{{ context.contact.mail }}</a>
					</li>
					<li class="mb-2">
						<i class="fas fa-globe fa-fw fa-lg me-2"></i>
						<a class="resume-link" :href="context.contact.website" target="_blank">{{ context.contact.website.replace('https://', '') }}</a>
					</li>
					<li class="mb-2">
						<i class="fa-brands fa-linkedin-in fa-fw fa-lg me-2"></i>
						<a class="resume-link" :href="context.contact.linkedin" target="_blank">{{ context.contact.linkedin.replace('https://', '') }}</a>
					</li>
					<li class="mb-2">
						<i class="fa-brands fa-github fa-fw fa-lg me-2"></i>
						<a class="resume-link" :href="context.contact.github" target="_blank">{{ context.contact.github.replace('https://', '') }}</a>
					</li>
					<li class="mb-0">
						<i class="fa-solid fa-location-dot fa-fw fa-lg me-2"></i>Global</li>
				</ul>
			</div><!--//resume-contact-->
		</div><!--//row-->
		
	</div><!--//resume-header-->
	<hr>
	<div class="resume-intro py-3">
		<div class="row align-items-center">
			<div class="col-12 col-md-3 col-xl-2 text-center">
				<img class="resume-profile-image mb-3 mb-md-0 me-md-5 rounded-circle shadow ms-md-0 rounded mx-auto" :src="context.picture" alt="image">
			</div>
			
			<div class="col text-start" v-html="getHtmlFromMark(context.description)">
			</div><!--//col-->
		</div>
	</div><!--//resume-intro-->
	<hr>
	<div class="resume-body">
		<div class="row">
			<div class="resume-main col-12 col-lg-8 col-xl-9   pe-0   pe-lg-5">
				
				<section v-if="context.work_experiences" class="work-section py-3">
					<h3 class="text-uppercase resume-section-heading mb-4">Work Experiences</h3>
					
					<ul class="list-unstyled">
						<li v-for="(work_experiences, index) in context.work_experiences" :key="index">
							<div v-if="work_experiences.show" class="item mb-3">
								<div class="item-heading row align-items-center mb-2">
									<h4 class="item-title col-12 col-md-6 col-lg-8 mb-2 mb-md-0">{{ work_experiences.title }}</h4>
									<div class="item-meta col-12 col-md-6 col-lg-4 text-muted text-start text-md-end">{{ work_experiences.company }} | {{ work_experiences.start_date }} - {{ work_experiences.end_date }}</div>
									
								</div>
								<div class="item-content" v-html="getHtmlFromMark(work_experiences.experience)"></div>
							</div><!--//item-->
						</li>
					</ul>

				</section><!--//work-section-->
				
				<section v-if="context.project_experiences" class="project-section py-3">
					<h3 class="text-uppercase resume-section-heading mb-4">Project Experiences</h3>
					<ul class="list-unstyled">
						<li v-for="(project_experience, index) in context.project_experiences" :key="index">
							<div v-if="project_experience.show" class="item mb-3">
								<div class="item-heading row align-items-center mb-2">
									<h4 v-if="project_experience.link" class="item-title col-12 col-md-6 col-lg-8 mb-2 mb-md-0">
										<a href="#" class="text-decoration-none">{{ project_experience.title }}</a>
									</h4>
									<h4 v-else class="item-title col-12 col-md-6 col-lg-8 mb-2 mb-md-0">{{ project_experience.title }}</h4>

									<div class="item-meta col-12 col-md-6 col-lg-4 text-muted text-start text-md-end">{{getProjectType(project_experience.project_type)}}</div>
									
								</div>
								<div class="item-content" v-html="getHtmlFromMark(project_experience.experience)"></div>
							</div><!--//item-->
						</li>
					</ul>
				</section><!--//project-section-->	
			</div><!--//resume-main-->
			<aside class="resume-aside col-12 col-lg-4 col-xl-3 px-lg-4 pb-lg-4" v-html="getHtmlFromMark(context.right_side)"></aside><!--//resume-aside-->
				</div><!--//row-->
			</div><!--//resume-body-->
			<hr>
			<div class="resume-footer text-center">
				<ul class="resume-social-list list-inline mx-auto mb-0 d-inline-block text-muted">
					<li class="list-inline-item mb-lg-0 me-3"><a class="resume-link" :href="context.contact.github"><svg class="svg-inline--fa fa-square-github fa-2x me-2" data-fa-transform="down-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="square-github" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg="" style="transform-origin: 0.4375em 0.75em;"><g transform="translate(224 256)"><g transform="translate(0, 128)  scale(1, 1)  rotate(0 0 0)"><path fill="currentColor" d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM277.3 415.7c-8.4 1.5-11.5-3.7-11.5-8 0-5.4.2-33 .2-55.3 0-15.6-5.2-25.5-11.3-30.7 37-4.1 76-9.2 76-73.1 0-18.2-6.5-27.3-17.1-39 1.7-4.3 7.4-22-1.7-45-13.9-4.3-45.7 17.9-45.7 17.9-13.2-3.7-27.5-5.6-41.6-5.6-14.1 0-28.4 1.9-41.6 5.6 0 0-31.8-22.2-45.7-17.9-9.1 22.9-3.5 40.6-1.7 45-10.6 11.7-15.6 20.8-15.6 39 0 63.6 37.3 69 74.3 73.1-4.8 4.3-9.1 11.7-10.6 22.3-9.5 4.3-33.8 11.7-48.3-13.9-9.1-15.8-25.5-17.1-25.5-17.1-16.2-.2-1.1 10.2-1.1 10.2 10.8 5 18.4 24.2 18.4 24.2 9.7 29.7 56.1 19.7 56.1 19.7 0 13.9.2 36.5.2 40.6 0 4.3-3 9.5-11.5 8-66-22.1-112.2-84.9-112.2-158.3 0-91.8 70.2-161.5 162-161.5S388 165.6 388 257.4c.1 73.4-44.7 136.3-110.7 158.3zm-98.1-61.1c-1.9.4-3.7-.4-3.9-1.7-.2-1.5 1.1-2.8 3-3.2 1.9-.2 3.7.6 3.9 1.9.3 1.3-1 2.6-3 3zm-9.5-.9c0 1.3-1.5 2.4-3.5 2.4-2.2.2-3.7-.9-3.7-2.4 0-1.3 1.5-2.4 3.5-2.4 1.9-.2 3.7.9 3.7 2.4zm-13.7-1.1c-.4 1.3-2.4 1.9-4.1 1.3-1.9-.4-3.2-1.9-2.8-3.2.4-1.3 2.4-1.9 4.1-1.5 2 .6 3.3 2.1 2.8 3.4zm-12.3-5.4c-.9 1.1-2.8.9-4.3-.6-1.5-1.3-1.9-3.2-.9-4.1.9-1.1 2.8-.9 4.3.6 1.3 1.3 1.8 3.3.9 4.1zm-9.1-9.1c-.9.6-2.6 0-3.7-1.5s-1.1-3.2 0-3.9c1.1-.9 2.8-.2 3.7 1.3 1.1 1.5 1.1 3.3 0 4.1zm-6.5-9.7c-.9.9-2.4.4-3.5-.6-1.1-1.3-1.3-2.8-.4-3.5.9-.9 2.4-.4 3.5.6 1.1 1.3 1.3 2.8.4 3.5zm-6.7-7.4c-.4.9-1.7 1.1-2.8.4-1.3-.6-1.9-1.7-1.5-2.6.4-.6 1.5-.9 2.8-.4 1.3.7 1.9 1.8 1.5 2.6z" transform="translate(-224 -256)"></path></g></g></svg><!-- <i class="fab fa-github-square fa-2x me-2" data-fa-transform="down-4"></i> Font Awesome fontawesome.com --><span class="d-none d-lg-inline-block text-muted">{{ context.contact.github.replace('https://', '') }}</span></a></li>
					<li class="list-inline-item mb-lg-0 me-3"><a class="resume-link" :href="context.contact.linkedin"><svg class="svg-inline--fa fa-linkedin fa-2x me-2" data-fa-transform="down-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="linkedin" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg="" style="transform-origin: 0.4375em 0.75em;"><g transform="translate(224 256)"><g transform="translate(0, 128)  scale(1, 1)  rotate(0 0 0)"><path fill="currentColor" d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" transform="translate(-224 -256)"></path></g></g></svg><!-- <i class="fab fa-linkedin fa-2x me-2" data-fa-transform="down-4"></i> Font Awesome fontawesome.com --><span class="d-none d-lg-inline-block text-muted">{{ context.contact.linkedin.replace('https://', '') }}</span></a></li>
				</ul>
			</div><!--//resume-footer-->
		</article>
	</div>
</template>

<style scoped>
.resume-profile-image{
	object-fit: cover;
	min-width: 120px;
	max-width: 120px;
	min-height: 120px;
	max-height: 120px;
}

</style>
