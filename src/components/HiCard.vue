<script>

export default {
  name: 'HiCard',
  props: ['context', 'view_count'],
}

</script>

<template>
<section class="d-flex bg-light z-2" style="background: url('/img/bishop.jpg') no-repeat center; object-fit: contain; height: 100vh">
<article class="m-auto justify-content-center text-center container">
  <div class="row">
    <div class="col-12 col-md-6">
      <div class="ratio ratio-1x1">
        <img class="rounded" alt="faruk şeker " :src="context?.hi_card_pp?.toString()">
      </div>
    </div>
    <div class="col-12 col-md-6 m-auto">
      <div class="mt-2 mt-lg-0" v-html="context?.hi_card_message"></div>
    </div>
  </div>
</article>
<article class="position-absolute text-light bottom-0 m-1">
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
ul li:after {
  margin-right: .25rem;
  content: ",";
}
ul li:last-child:after {
  content: ".";
}
</style>
