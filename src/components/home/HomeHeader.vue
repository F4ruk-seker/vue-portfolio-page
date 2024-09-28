<template>
 <header class="header text-center">	    
		<div class="force-overflow">
			<h1 class="blog-name pt-lg-4 mb-0 ">
				<router-link class="no-text-decoration"  :to="{name:'home'}">
					Faruk Şeker
				</router-link>
			</h1>
			
			<nav class="navbar navbar-expand-lg navbar-dark" >
				
				<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navigation" aria-controls="navigation" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				
				<div id="navigation" class="collapse navbar-collapse flex-column" >
					<div class="profile-section pt-3 pt-lg-0">
						<img 
						class="profile-image mb-3 rounded-circle mx-auto"
						style="object-fit: cover;min-width: 160px;max-width:160px;min-height:160px;max-height:160px;"
						 src="https://res.cloudinary.com/dlusw5ukg/image/upload/v1704817666/portfolyo/user/avatar/69114794_2356702264428666_3770381596008868629_n_pnf3ya.jpg" alt="image" >			
						
						<div class="bio mb-3">
							Hello! I'm Faruk Şeker, and I'm thrilled to welcome you here. Are you ready to get to know me a little better?
						</div>
						<ul class="social-list list-inline py-2 mx-auto">
							<li class="list-inline-item" v-for="(header_link, index) in header_links" v-bind:key="index">
								<a :href="header_link.url">
									<i :class="header_link.icon"></i>
								</a>
							</li>
						</ul><!--//social-list-->
						<hr> 
					</div><!--//profile-section-->
					
					<ul class="navbar-nav flex-column text-start">
						<li class="nav-item" v-for="(route_link, index) in route_links" v-bind:key="index">
							<router-link class="nav-link" :to="route_link.link">
							<i :class="route_link.icon"></i>
							{{ route_link.title }}
							<span v-if="route_link.sr_only" class="sr-only">{{ route_link.sr_only }}</span>
							</router-link>
						</li>
						<!--li class="nav-item dropdown">
							<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
								<i class="fas fa-cogs fa-fw me-2"></i>More Pages
							</a>
							<ul class="dropdown-menu" aria-labelledby="navbarDropdown">
								<li><a class="dropdown-item" href="project.html">Project Page</a></li>
								<li><a class="dropdown-item" href="blog-home.html">Blog Home 1</a></li>
								<li><a class="dropdown-item" href="blog-home-alt.html">Blog Home 2</a></li>
								<li><a class="dropdown-item" href="blog-post.html">Blog Post</a></li>
							</ul>
						</li-->
					</ul>
					
					<div class="my-2">
						<button class="btn btn-primary" @click="go_hire_page()">
							<i class="fas fa-paper-plane me-2"></i>Hire Me
						</button>
					</div>

					<DarkModeToggleButton :hide_title="false"/>
					
				</div>
			</nav>
		</div><!--//force-overflow-->
	</header>
</template>

<script setup>
import { ref } from 'vue';

import DarkModeToggleButton from '@/components/DarkModeToggleButton.vue'
import { useRouter } from 'vue-router';

const router = useRouter()

const go_hire_page = () => {
	router.push({name:'hire'})
}

const header_links = ref([
	{
		icon: 'fab fa-linkedin-in fa-fw',
		url: 'https://www.linkedin.com/in/faruk-seker-python/'
	},{
		icon: 'fab fa-github-alt fa-fw',
		url: 'https://github.com/F4ruk-seker/'
	},{
		icon: 'fa-brands fa-instagram fa-fw',
		url: 'https://www.instagram.com/f4ruk.seker/'
	}
])

const route_links = ref([
	{
		title: 'About Me',
		sr_only: '(current)',
		icon: 'fas fa-user fa-fw me-2',
		link: {name:'home'}
	},{
		title: 'Portfolio',
		sr_only: '',
		icon: 'fas fa-laptop-code fa-fw me-2',
		link: {name:'projects'}
	},{
		title: 'Blog',
		sr_only: '',
		icon: 'fas fa-blog fa-fw me-2',
		link: {name:'blog-list'}
	},{
		title: 'Resume',
		sr_only: '',
		icon: 'fas fa-file-alt fa-fw me-2',
		link: {name:'resume'}
	},{
		title: 'Contact',
		sr_only: '',
		icon: 'fas fa-envelope-open-text fa-fw me-2',
		link: {name:'contact'}
	}
	
])

</script>