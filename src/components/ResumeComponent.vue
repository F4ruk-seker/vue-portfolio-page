<script setup>

const props = defineProps({
    context: Object,
    EditMode: Boolean
})


import { marked } from 'marked'

const getHtmlFromMark = (mark) => {
  return marked.parse(mark);
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
						    <img class="resume-profile-image mb-3 mb-md-0 me-md-5 rounded-circle  ms-md-0 rounded mx-auto" :src="context.picture" alt="image">
						</div>
						
						<div class="col text-start" v-html="getHtmlFromMark(context.description)">
						</div><!--//col-->
					</div>
				</div><!--//resume-intro-->
				<hr>
				<div class="resume-body">
					<div class="row">
						<div class="resume-main col-12 col-lg-8 col-xl-9   pe-0   pe-lg-5">
							<section class="work-section py-3">
								<h3 class="text-uppercase resume-section-heading mb-4">Work Experiences {{ htmlText }}</h3>
								<div class="item mb-3">
									<div class="item-heading row align-items-center mb-2">
										<h4 class="item-title col-12 col-md-6 col-lg-8 mb-2 mb-md-0">Senior Software Engineer</h4>
										<div class="item-meta col-12 col-md-6 col-lg-4 text-muted text-start text-md-end">Google | 2019 - Present</div>
										
									</div>
									<div class="item-content">
										<p>Role description goes here ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Donec pede justo, fringilla vel. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis.</p>
										<ul class="resume-list">
											<li>Lorem ipsum dolor sit amet, consectetuer.</li>
											<li>Aenean commodo ligula eget dolor.</li>
											<li>Etiam ultricies nisi vel augue.</li>
										</ul>
									</div>
								</div><!--//item-->
								<div class="item mb-3">
									<div class="item-heading row align-items-center mb-2">
										<h4 class="item-title col-12 col-md-6 col-lg-8 mb-2 mb-md-0">Lead Software Developer</h4>
										<div class="item-meta col-12 col-md-6 col-lg-4 text-muted text-start text-md-end">Apple | 2016 - 2019</div>
										
									</div>
									<div class="item-content">
										<p>Role description goes here ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Donec pede justo, fringilla vel.</p>
										<ul class="resume-list">
											<li>Lorem ipsum dolor sit amet, consectetuer.</li>
											<li>Aenean commodo ligula eget dolor.</li>
										</ul>
									</div>
								</div><!--//item-->
								<div class="item mb-3">
									<div class="item-heading row align-items-center mb-2">
										<h4 class="item-title col-12 col-md-6 col-lg-8 mb-2 mb-md-0">Senior Software Developer</h4>
										<div class="item-meta col-12 col-md-6 col-lg-4 text-muted text-start text-md-end">Dropbox | 2014 - 2016</div>
										
									</div>
									<div class="item-content">
										<p>Role description goes here ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
									</div>
								</div><!--//item-->
								<div class="item">
									<div class="item-heading row align-items-center mb-2">
										<h4 class="item-title col-12 col-md-6 col-lg-8 mb-2 mb-md-0">Senior Developer</h4>
										<div class="item-meta col-12 col-md-6 col-lg-4 text-muted text-start text-md-end">Uber | 2013 - 2014</div>
										
									</div>
									<div class="item-content">
										<p>Role description goes here ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus. </p>
									</div>
								</div><!--//item-->
								<div class="item">
									<div class="item-heading row align-items-center mb-2">
										<h4 class="item-title col-12 col-md-6 col-lg-8 mb-2 mb-md-0">Backend Developer</h4>
										<div class="item-meta col-12 col-md-6 col-lg-4 text-muted text-start text-md-end">Amazon | 2014 - 2016</div>
										
									</div>
									<div class="item-content">
										<p>Role description goes here ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
									</div>
								</div><!--//item-->
								<div class="item">
									<div class="item-heading row align-items-center mb-2">
										<h4 class="item-title col-12 col-md-6 col-lg-8 mb-2 mb-md-0">Frontend Developer</h4>
										<div class="item-meta col-12 col-md-6 col-lg-4 text-muted text-start text-md-end">Startup | 2013 - 2014</div>
										
									</div>
									<div class="item-content">
										<p>Role description goes here ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus. </p>
									</div>
								</div><!--//item-->
								
							</section><!--//work-section-->

							
							<section class="project-section py-3">
								<h3 class="text-uppercase resume-section-heading mb-4">Projects</h3>
								<div class="item mb-3">
									<div class="item-heading row align-items-center mb-2">
										<h4 class="item-title col-12 col-md-6 col-lg-8 mb-2 mb-md-0">Project Lorem Ipsum</h4>
										<div class="item-meta col-12 col-md-6 col-lg-4 text-muted text-start text-md-end">Open Source</div>
										
									</div>
									<div class="item-content">
										<p>You can use this section for your side projects. You can <a href="#" class="theme-link">provide a project link here</a> as well. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
										
										
									</div>
								</div><!--//item-->
								<div class="item">
									<div class="item-heading row align-items-center mb-2">
										<h4 class="item-title col-12 col-md-6 col-lg-8 mb-2 mb-md-0">Project Sed Fringilla</h4>
										<div class="item-meta col-12 col-md-6 col-lg-4 text-muted text-start text-md-end">Open Source</div>
										
									</div>
									<div class="item-content">
										<p>You can use this section for your side projects. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.</p>
										
									</div>
								</div><!--//item-->
								<div class="item">
									<div class="item-heading row align-items-center mb-2">
										<h4 class="item-title col-12 col-md-6 col-lg-8 mb-2 mb-md-0">Project Praesent </h4>
										<div class="item-meta col-12 col-md-6 col-lg-4 text-muted text-start text-md-end">Open Source</div>
										
									</div>
									<div class="item-content">
										<p>You can use this section for your side projects. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.</p>
										
									</div>
								</div><!--//item-->
							</section><!--//project-section-->	
						</div><!--//resume-main-->
						<aside class="resume-aside col-12 col-lg-4 col-xl-3 px-lg-4 pb-lg-4">
							<section class="skills-section py-3">
								<h3 class="text-uppercase resume-section-heading mb-4">Skills</h3>
								<div class="item">
									<h4 class="item-title">Technical</h4>
									<ul class="list-unstyled resume-skills-list">
										<li class="mb-2">JavaScript/Angular/React/Vue</li>
										<li class="mb-2">Python/Ruby/PHP</li><li>
											</li><li class="mb-2">Node.js/ASP.NET</li>
											<li class="mb-2">PostgreSQL/MySQL</li>
											<li class="mb-2">Object-oriented design</li>
											<li class="mb-2">Design and implement database structures</li>
											<li>Lead and deliver complex software systems</li>
										</ul>
									</div><!--//item-->
									<div class="item">
										<h4 class="item-title">Professional</h4>
										<ul class="list-unstyled resume-skills-list">
											<li class="mb-2">Effective communication</li>
											<li class="mb-2">Team player</li><li>
												</li><li class="mb-2">Strong problem solver</li>
												<li>Good time management</li>
											</ul>
										</div><!--//item-->
									</section><!--//skills-section-->
									<section class="education-section py-3">
										<h3 class="text-uppercase resume-section-heading mb-4">Education</h3>
										<ul class="list-unstyled resume-education-list">
											<li class="mb-3">
												<div class="resume-degree font-weight-bold">MSc in Computer Science</div>
												<div class="resume-degree-org text-muted">University College London</div>
												<div class="resume-degree-time text-muted">2010 - 2011</div>
											</li>
											<li>
												<div class="resume-degree font-weight-bold">BSc Maths and Physics</div>
												<div class="resume-degree-org text-muted">Imperial College London</div>
												<div class="resume-degree-time text-muted">2007 - 2010</div>
											</li>
										</ul>
									</section><!--//education-section-->
									<section class="education-section py-3">
										<h3 class="text-uppercase resume-section-heading mb-4">Awards</h3>
										<ul class="list-unstyled resume-awards-list">
											<li class="mb-3">
												<div class="font-weight-bold">Award Lorem Ipsum</div>
												<div class="text-muted">Microsoft lorem ipsum (2019)</div>
											</li>
											<li>
												<div class="font-weight-bold">Award Donec Sodales</div>
												<div class="text-muted">Oracle Aenean (2017)</div>
											</li>
										</ul>
									</section><!--//education-section-->
									<section class="skills-section py-3">
										<h3 class="text-uppercase resume-section-heading mb-4">Languages</h3>
										<ul class="list-unstyled resume-lang-list">
											<li class="mb-2">English <span class="text-muted">(Native)</span></li>
											<li>Spanish <span class="text-muted">(Professional)</span></li>
										</ul>
									</section><!--//certificates-section-->
									<section class="skills-section py-3">
										<h3 class="text-uppercase resume-section-heading mb-4">Interests</h3>
										<ul class="list-unstyled resume-interests-list mb-0">
											<li class="mb-2">Climbing</li>
											<li class="mb-2">Snowboarding</li>
											<li class="mb-2">Photography</li>
											<li>Travelling</li>
										</ul>
									</section><!--//certificates-section-->
									
								</aside><!--//resume-aside-->
							</div><!--//row-->
						</div><!--//resume-body-->
						<hr>
						<div class="resume-footer text-center">
							<ul class="resume-social-list list-inline mx-auto mb-0 d-inline-block text-muted">
								<li class="list-inline-item mb-lg-0 me-3"><a class="resume-link" href="#"><svg class="svg-inline--fa fa-square-github fa-2x me-2" data-fa-transform="down-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="square-github" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg="" style="transform-origin: 0.4375em 0.75em;"><g transform="translate(224 256)"><g transform="translate(0, 128)  scale(1, 1)  rotate(0 0 0)"><path fill="currentColor" d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM277.3 415.7c-8.4 1.5-11.5-3.7-11.5-8 0-5.4.2-33 .2-55.3 0-15.6-5.2-25.5-11.3-30.7 37-4.1 76-9.2 76-73.1 0-18.2-6.5-27.3-17.1-39 1.7-4.3 7.4-22-1.7-45-13.9-4.3-45.7 17.9-45.7 17.9-13.2-3.7-27.5-5.6-41.6-5.6-14.1 0-28.4 1.9-41.6 5.6 0 0-31.8-22.2-45.7-17.9-9.1 22.9-3.5 40.6-1.7 45-10.6 11.7-15.6 20.8-15.6 39 0 63.6 37.3 69 74.3 73.1-4.8 4.3-9.1 11.7-10.6 22.3-9.5 4.3-33.8 11.7-48.3-13.9-9.1-15.8-25.5-17.1-25.5-17.1-16.2-.2-1.1 10.2-1.1 10.2 10.8 5 18.4 24.2 18.4 24.2 9.7 29.7 56.1 19.7 56.1 19.7 0 13.9.2 36.5.2 40.6 0 4.3-3 9.5-11.5 8-66-22.1-112.2-84.9-112.2-158.3 0-91.8 70.2-161.5 162-161.5S388 165.6 388 257.4c.1 73.4-44.7 136.3-110.7 158.3zm-98.1-61.1c-1.9.4-3.7-.4-3.9-1.7-.2-1.5 1.1-2.8 3-3.2 1.9-.2 3.7.6 3.9 1.9.3 1.3-1 2.6-3 3zm-9.5-.9c0 1.3-1.5 2.4-3.5 2.4-2.2.2-3.7-.9-3.7-2.4 0-1.3 1.5-2.4 3.5-2.4 1.9-.2 3.7.9 3.7 2.4zm-13.7-1.1c-.4 1.3-2.4 1.9-4.1 1.3-1.9-.4-3.2-1.9-2.8-3.2.4-1.3 2.4-1.9 4.1-1.5 2 .6 3.3 2.1 2.8 3.4zm-12.3-5.4c-.9 1.1-2.8.9-4.3-.6-1.5-1.3-1.9-3.2-.9-4.1.9-1.1 2.8-.9 4.3.6 1.3 1.3 1.8 3.3.9 4.1zm-9.1-9.1c-.9.6-2.6 0-3.7-1.5s-1.1-3.2 0-3.9c1.1-.9 2.8-.2 3.7 1.3 1.1 1.5 1.1 3.3 0 4.1zm-6.5-9.7c-.9.9-2.4.4-3.5-.6-1.1-1.3-1.3-2.8-.4-3.5.9-.9 2.4-.4 3.5.6 1.1 1.3 1.3 2.8.4 3.5zm-6.7-7.4c-.4.9-1.7 1.1-2.8.4-1.3-.6-1.9-1.7-1.5-2.6.4-.6 1.5-.9 2.8-.4 1.3.7 1.9 1.8 1.5 2.6z" transform="translate(-224 -256)"></path></g></g></svg><!-- <i class="fab fa-github-square fa-2x me-2" data-fa-transform="down-4"></i> Font Awesome fontawesome.com --><span class="d-none d-lg-inline-block text-muted">github.com/username</span></a></li>
								<li class="list-inline-item mb-lg-0 me-3"><a class="resume-link" href="#"><svg class="svg-inline--fa fa-linkedin fa-2x me-2" data-fa-transform="down-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="linkedin" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg="" style="transform-origin: 0.4375em 0.75em;"><g transform="translate(224 256)"><g transform="translate(0, 128)  scale(1, 1)  rotate(0 0 0)"><path fill="currentColor" d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" transform="translate(-224 -256)"></path></g></g></svg><!-- <i class="fab fa-linkedin fa-2x me-2" data-fa-transform="down-4"></i> Font Awesome fontawesome.com --><span class="d-none d-lg-inline-block text-muted">linkedin.com/in/username</span></a></li>
								<li class="list-inline-item mb-lg-0 me-lg-3"><a class="resume-link" href="#"><svg class="svg-inline--fa fa-square-twitter fa-2x me-2" data-fa-transform="down-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="square-twitter" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg="" style="transform-origin: 0.4375em 0.75em;"><g transform="translate(224 256)"><g transform="translate(0, 128)  scale(1, 1)  rotate(0 0 0)"><path fill="currentColor" d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM351.3 199.3v0c0 86.7-66 186.6-186.6 186.6c-37.2 0-71.7-10.8-100.7-29.4c5.3 .6 10.4 .8 15.8 .8c30.7 0 58.9-10.4 81.4-28c-28.8-.6-53-19.5-61.3-45.5c10.1 1.5 19.2 1.5 29.6-1.2c-30-6.1-52.5-32.5-52.5-64.4v-.8c8.7 4.9 18.9 7.9 29.6 8.3c-9-6-16.4-14.1-21.5-23.6s-7.8-20.2-7.7-31c0-12.2 3.2-23.4 8.9-33.1c32.3 39.8 80.8 65.8 135.2 68.6c-9.3-44.5 24-80.6 64-80.6c18.9 0 35.9 7.9 47.9 20.7c14.8-2.8 29-8.3 41.6-15.8c-4.9 15.2-15.2 28-28.8 36.1c13.2-1.4 26-5.1 37.8-10.2c-8.9 13.1-20.1 24.7-32.9 34c.2 2.8 .2 5.7 .2 8.5z" transform="translate(-224 -256)"></path></g></g></svg><!-- <i class="fab fa-twitter-square fa-2x me-2" data-fa-transform="down-4"></i> Font Awesome fontawesome.com --><span class="d-none d-lg-inline-block text-muted">@twittername</span></a></li>
							</ul>
						</div><!--//resume-footer-->
					</article>
					
	</div>
</template>