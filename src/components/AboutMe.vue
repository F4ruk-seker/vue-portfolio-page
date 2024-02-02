<script>

export default {
  name:'AboutMe',
  props: ['context'],

}

</script>

<template>
  <section id="about" class="d-flex position-relative" :style="'background: url('+ context.about_me_background + ') no-repeat bottom; object-fit: fill; height: 100vh'">
    <article class="container d-flex overflow-y-auto m-auto " style="height: 80vh; max-height: min-content;">
     <div class="justify-content-center m-auto" v-html="context?.abaout_me_text"></div>
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

</style>
