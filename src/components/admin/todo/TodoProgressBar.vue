<script>
export default {
    name: 'TodoProgress',
    props: ['percentage']
}
</script>

<template>
<div class="progress">
  <div class="progress-bar bg-success" role="progressbar" :style="'width: ' + percentage + '%'" :aria-valuenow="percentage" aria-valuemin="0" aria-valuemax="100"></div>
</div>
</template>