<script setup>
function scrollToTop() {
  window.scrollTo(0,0);
}
</script>

<template>
  <button
      class="btn btn-outline-primary rounded-circle m-3 text-light position-fixed d-flex bottom-0 end-0 z-1 shadow"
      style="background-color: rgba(var(--bs-primary-rgb), 0.5); backdrop-filter: blur(3px)"
      @click="scrollToTop"
      name="scrollToTop"
      type="button"
  >
      <span class="justify-content-center m-auto text-center">
        <i class="fa-solid fa-arrow-up"></i>
      </span>
  </button>
</template>

<style scoped>

</style>
