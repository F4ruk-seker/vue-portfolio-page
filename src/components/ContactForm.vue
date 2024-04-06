<template>
    <section class="contact-section px-3 py-5 p-md-5">
		    <div class="container">
			    <form id="contact-form" class="contact-form col-lg-8 mx-lg-auto" method="post" action="">
			        <h3 class="text-center mb-3">Get In Touch</h3>
			        <div class="row g-3">                                                           
		                <div class="col-12 col-md-6">
		                    <label class="sr-only" for="cname">Name</label>
		                    <input type="text" class="form-control" id="cname" name="name" placeholder="Name" minlength="2" required="" aria-required="true">
		                </div>                    
		                <div class="col-12 col-md-6">
		                    <label class="sr-only" for="cemail">Email</label>
		                    <input type="email" class="form-control" id="cemail" name="email" placeholder="Email" required="" aria-required="true">
		                </div>
		                <div class="col-12">
			                <select id="services" class="form-select" name="services">
								<option selected="">Select a service package you're interested in...</option>
								<option value="basic">Basic</option>
								<option value="standard">Standard</option>
								<option value="premium">Premium</option>
								<option value="not sure">Not sure</option>
							</select>
							<div class="mt-2">
							    <small class="form-text text-muted pt-1"><svg class="svg-inline--fa fa-circle-info me-2 text-primary" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-info" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"></path></svg><!-- <i class="fas fa-info-circle me-2 text-primary"></i> Font Awesome fontawesome.com -->Want to know what's included in each package? Check the <a class="text-link" href="services.html" target="_blank">Services &amp; Pricing</a> page.</small>
							</div>
						</div>
		                <div class="col-12">
		                    <label class="sr-only" for="cmessage">Your message</label>
		                    <textarea class="form-control" id="cmessage" name="message" placeholder="Enter your message" rows="10" required="" aria-required="true"></textarea>
		                </div>
		                 <div class="form-group col-12">
		                    <button type="submit" class="btn btn-block btn-primary py-2">Send Now</button>
		                </div>                           
		            </div><!--//form-row-->
		        </form>
		    </div><!--//container-->
	    </section>
</template>

<script setup>
</script>