<template>
  <router-view />
  <Notifications />
</template>

<script>
import { ref } from 'vue';


export default {
  setup() {
    const show = ref(false);

    function toggleHeatmap() {
      show.value = !show.value;
    }
    return {
      show,
      toggleHeatmap
    };
  },
};
</script>

<style>
* {
  scroll-behavior: smooth;
  font-family: 'Hedvig Letters Sans', sans-serif;
}

/* Add your other CSS styles here */
</style>
