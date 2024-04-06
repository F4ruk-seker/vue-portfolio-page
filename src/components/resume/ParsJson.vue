<template>
{{ localContext[0] }} | {{ localContext[1] }} - {{ typeof(localContext[1]) }} q({{ typeof(localContext[1]) === 'string' }})
{{ localContext[0] }} | {{ localContext[1] }} - {{ typeof(localContext[1]) }} q({{ typeof(localContext[1]) === 'string' }})
<input type="text" v-model="localContext[1]" @input="updateValue">

</template>

<script setup>
import { defineProps, ref } from "vue";

const props = defineProps({
    context: Array
})

const emit = defineEmits(['updateValue'])

const localContext = ref(props.context);

function updateValue(event) {
  emit('updateValue', localContext.value[0], event.target.value);
}
</script>