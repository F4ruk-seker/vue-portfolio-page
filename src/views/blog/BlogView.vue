<script setup>
import NavbarStable from "@/components/NavbarStable.vue";
import { RouterView } from "vue-router";
</script>
<template>
<navbar-stable class="text-dark bg-light-subtle border-bottom  shadow-none" text_color="dark" />
<RouterView />
</template>