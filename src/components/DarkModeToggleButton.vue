<template>
<section>
    <div class="dark-mode-toggle text-center w-100">
    <hr class="mb-4" v-if="!hide_title">
    <h4 class="toggle-name mb-3 " v-if="!hide_title">
        <i class="fas fa-adjust me-1"></i>
        Dark Mode
    </h4>
    <input class="toggle" id="darkmode" type="checkbox" v-model="dark_mode_toggle">
    <label class="toggle-btn mx-auto mb-0" for="darkmode"></label>
</div><!--//dark-mode-toggle-->
</section>
</template>

<script setup>
import { onMounted, ref, watch, defineProps } from 'vue';
import { useCookies } from "vue3-cookies";

const props = defineProps({
    hide_title: Boolean
})


const cookies = useCookies()

var date = new Date;
date.setDate(date.getDate() + 15);

const dark_mode_toggle = ref(false)

watch(dark_mode_toggle, (toggle)=>{
	if (toggle){
		document.body.className = 'dark-mode'
		cookies.cookies.set('THEME-MODE', 'dark', date)
	} else {
		document.body.className = ''
		cookies.cookies.set('THEME-MODE', 'light', date)
	}
})

onMounted(()=>{
	dark_mode_toggle.value = cookies.cookies.get('THEME-MODE') === 'dark'
})

</script>