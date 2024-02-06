<script>

export default {
  name:'AboutMe',
  props: ['context'],

}

</script>

<template>
  <section id="about" class="d-flex position-relative">
    <article class="container d-flex overflow-y-auto m-auto " style="height: 80vh; max-height: min-content;">
     <div class="justify-content-center m-auto">
      <p class="text-light fw-bold" style="font-family: 'Roboto', sans-serif;">
        Hello! I'm Faruk Şeker, and I'm thrilled to welcome you here. Are you ready to get to know me a little better? 
        I began my journey in technology with a focus on electronic technology and am currently continuing my education in Computer Programming at Anadolu University.
        It was my curiosity and passion that led me to specialize in professional backend development using Python Django.
        Additionally, as a hobby, I've ventured into the frontend world with Vue.js. Throughout this coding adventure,
        every project has been a learning experience for me. Striking a balance between backend and frontend has become a true art form for me.
        Therefore, I strive to bring both a professional and personal touch to each new project.
        The foundational knowledge I gained during my electronic technology education at Uludağ University forms a solid basis for my current work in computer programming.
        By translating theoretical knowledge into practical solutions, I aim to address real-world problems. In addition to my academic pursuits, 
        I make it a priority to stay updated in the rapidly changing world of technology. 
        I continuously follow new technologies and developments to better serve you and ensure the successful implementation of your projects.
        I'm eager to get to know you and your projects better on this platform. If you have any questions, projects, or collaboration proposals,
        please feel free to reach out to me. Thank you, and I'm looking forward to collaborating on fantastic projects together!
        <br><br>
        Best regards,
        <br>
        Faruk Şeker
      </p>
     </div>
    </article>
    <article class="d-flex position-absolute w-100 bottom-0 mb-5 text-light">
      <div class="justify-content-center m-auto text-center">
        <div class="d-flex m-0 p-0">
          <a class="col-6 me-1 btn btn-outline-light border-0 shadow d-inline-block" style="width: max-content;" href="#experiences">
            <i class="fa-solid fa-certificate"></i> Experiences
          </a>
          <a class="col-6 ms-1 btn btn-outline-light border-0 shadow" href="#contact">
            <i class="fa-solid fa-phone"></i> Contact
          </a>
        </div>
      </div>
    </article>
  </section>
</template>

<style scoped>
section {
  background: url('https://res.cloudinary.com/dlusw5ukg/image/upload/v1703990687/portfolio/antoine-rault-unsplash_cfjucn.jpg') no-repeat bottom;
  object-fit: fill;
  height: 100vh
}
</style>
