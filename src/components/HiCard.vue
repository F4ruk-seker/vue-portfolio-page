<script>
export default {
  name: 'HiCard',
  props: ['context', 'view_count'],
  methods:{
    random_choose(choices) {
      console.log(choices)
      const r = choices[Math.floor(choices.length * Math.random())];
      console.log(Math.floor(choices.length * Math.random()))
      return r
    },
    get_profile_photo(photo){
      if (photo){
        if (photo.split(',').length > 1){
          return this.random_choose(photo.split(','))
        } 
        return photo
      }
    }
  }
}


</script>

<template>
<section class="d-flex bg-light z-2">
<article class="m-auto justify-content-center text-center container">
  <div class="row">
    <div class="col-12 col-md-6">
      <div class="ratio ratio-1x1">
        <img class="rounded" alt="faruk şeker" loading="lazy" :src="get_profile_photo(context.hi_card_pp)" style="object-fit: cover">
      </div>
    </div>
    <div class="col-12 col-md-6 m-auto">
      <div class="mt-2 mt-lg-0" v-html="context?.hi_card_message"></div>
    </div>
  </div>
</article>
<article class="position-absolute text-light bottom-0 m-3 fw-semibold">
  <i class="fa-solid fa-eye"></i> {{ view_count }}
</article>
<article class="position-absolute text-light bottom-0 text-center w-100 mb-5 z-1">
  <a class="btn btn-outline-light border-0 shadow" href="#about">
    <i class="fa-solid fa-arrow-down-short-wide"></i> About Me
  </a>
</article>
</section>
</template>

<style scoped>
section{
  background: url('https://res.cloudinary.com/dlusw5ukg/image/upload/v1703990685/portfolio/bishop_u438xp.jpg') no-repeat center; 
  object-fit: contain;
  height: 100vh;
}
.lazy-background {
  display: flex;
  background-repeat: no-repeat;
  background-position: center;
  object-fit: contain;
  height: 100vh;
}

ul li:after {
  margin-right: .25rem;
  content: ",";
}
ul li:last-child:after {
  content: ".";
}
</style>
