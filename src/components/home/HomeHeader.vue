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
						<img class="profile-image mb-3 rounded-circle mx-auto" src="https://res.cloudinary.com/dlusw5ukg/image/upload/v1704817666/portfolyo/user/avatar/69114794_2356702264428666_3770381596008868629_n_pnf3ya.jpg" alt="image" >			
						
						<div class="bio mb-3">Hi, my name is Simon Doe and I'm a senior software engineer. Welcome to my personal website!</div>
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
						<li class="nav-item">
							<a class="nav-link active" href="index.html"><i class="fas fa-user fa-fw me-2"></i>About Me<span class="sr-only">(current)</span></a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="portfolio.html"><i class="fas fa-laptop-code fa-fw me-2"></i>Portfolio</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="services.html"><i class="fas fa-briefcase fa-fw me-2"></i>Services &amp; Pricing</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="resume.html"><i class="fas fa-file-alt fa-fw me-2"></i>Resume</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="blog-home.html"><i class="fas fa-blog fa-fw me-2"></i>Blog</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="contact.html"><i class="fas fa-envelope-open-text fa-fw me-2"></i>Contact</a>
						</li>
						<li class="nav-item dropdown">
							<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
								<i class="fas fa-cogs fa-fw me-2"></i>More Pages
							</a>
							<ul class="dropdown-menu" aria-labelledby="navbarDropdown">
								<li><a class="dropdown-item" href="project.html">Project Page</a></li>
								<li><a class="dropdown-item" href="blog-home.html">Blog Home 1</a></li>
								<li><a class="dropdown-item" href="blog-home-alt.html">Blog Home 2</a></li>
								<li><a class="dropdown-item" href="blog-post.html">Blog Post</a></li>
							</ul>
						</li>
					</ul>
					
					<div class="my-2">
						<a class="btn btn-primary" href="contact.html" target="_blank"><i class="fas fa-paper-plane me-2"></i>Hire Me</a>
					</div>
					<div class="dark-mode-toggle text-center w-100">
						<hr class="mb-4">
            <h4 class="toggle-name mb-3 ">
              <i class="fas fa-adjust me-1"></i>
              Dark Mode
            </h4>
				<input class="toggle" id="darkmode" type="checkbox">
				<label class="toggle-btn mx-auto mb-0" for="darkmode"></label>
  
					</div><!--//dark-mode-toggle-->
					
				</div>
			</nav>
		</div><!--//force-overflow-->
	</header>
</template>

<script setup>
import { ref } from 'vue';

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

</script>