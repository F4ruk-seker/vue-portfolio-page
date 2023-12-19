<script setup>

</script>

<template>
<section id="contact" class="d-flex" style="background: url('/img/tengyart-unsplash.jpg') center; background-size: cover; height: 100vh">
  <article class="justify-content-center m-auto container " style="background: transparent!important;backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px);">
    <div class="rounded shadow" style="border: 2px solid rgba(255,255,255,0.53)">
     <div class="row">
       <div class="col-12 col-md-6 px-5 py-4">
         <form class="w-100 card-body text-light" style="background: transparent!important;">
           <div class="mb-3">
             <label for="name_input" class="form-label">Name<span class="text-danger ms-1">*</span></label>
             <input type="text" class="form-control" id="name_input" placeholder="name" required>
           </div>
           <div class="mb-3">
             <label for="email_input" class="form-label">Email<span class="text-danger ms-1">*</span></label>
             <input type="text" class="form-control" id="email_input" placeholder="email@example.com" required>
           </div>
           <div class="mb-3">
             <label for="message" class="form-label">Email<span class="text-danger ms-1">*</span></label>
             <textarea class="form-control" id="message_input" placeholder="How Can I Help You?" required></textarea>
           </div>
           <button class="btn btn-outline-light float-end">Send</button>
         </form>
       </div>
       <div class="col-12 col-md-6 d-flex" style="border-color:rgba(255,255,255,0.53)!important;border-width: 2px!important;background: rgba(2,0,36,.5);
background: linear-gradient(90deg, rgba(2,0,36,.01) 0%, rgba(2,171,228,1) 50%, rgba(0,212,255,.01) 100%);backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px);">
         <a class="justify-content-center btn btn-outline-info px-2 border-0 m-auto text-center  text-decoration-none link-light fw-bold  d-inline-block p-1 rounded" href="mailto:info@farukseker.com.tr">
          info@farukseker.com.tr
         </a>
       </div>
     </div>
    </div>
  </article>
</section>
</template>

<style scoped>
input{
  background: transparent!important;
  border-color: rgba(255,255,255,0.53)!important;
}
input:focus{
  border-color: rgba(255,255,255,0.53)!important;
}
textarea{
  background: transparent!important;
  border-color: rgba(255,255,255,0.53)!important;}
</style>
