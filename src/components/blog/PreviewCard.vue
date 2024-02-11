<script>
import { RouterLink } from 'vue-router';
import {ref} from 'vue'

export default {
    name: 'PreviewCard',
    props: ['content_preview'],
    components: { RouterLink },
    setup(){
        const user_is_TURK = ref(window.navigator.language === 'tr-TR')
        return {user_is_TURK}
    }
}

</script>
<template>
<div class="col-12 col-md-6 col-lg-4 p-2 fw-bold ">
    <router-link 
    class="border rounded p-2 content-preview-card d-flex justify-content-between overflow-hidden text-decoration-none"
    :to="{name:'blog-content', params:{slug:content_preview.slug}}"
    >
        <span class="content-title">{{ content_preview.title }}</span>
        <span class="content-title slide-in-text">
            <i class="fa-solid fa-angles-left"></i>
            {{ (content_preview.word_count / 300).toFixed(2) }} 
            {{  user_is_TURK ? 'Okuma Süresi' : 'read time'  }}</span>
    </router-link>
</div>
</template>

<style scoped>

.content-preview-card:hover{
    color: var(--bs-primary);
}

.content-preview-card span:last-child{
    opacity: 0;
}
.content-preview-card:hover span:last-child {
  white-space: nowrap;
  overflow: hidden;
  opacity: 1;
  animation: slide-in 350ms ease-out;
}

@keyframes slide-in {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

</style>
