<script setup>
import { ref } from 'vue'
import { VMarkdownEditor } from 'vue3-markdown'

const content = ref('')
const handleUpload = (file) => {
  console.log(file)
  return 'https://i.postimg.cc/52qCzTVw/pngwing-com.png'
}
</script>

<template>
  <VMarkdownEditor
      v-model="content"
      locale="en"
      :upload-action="handleUpload"
  />
</template>
