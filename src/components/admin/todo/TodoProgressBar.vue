<script>
export default {
    name: 'TodoProgress',
    props: ['percentage'],
    data: ()=>{return{
      color: 'secondary'
    }},
    watch: {
      percentage(new_percentage){
        if (!(new_percentage > 25)){this.color = 'danger'}
        else if (!(new_percentage > 50)){this.color = 'warning'}
        else if (!(new_percentage > 75)){this.color = 'info'}
        else {this.color = 'success'}
      }
    }
}
</script>

<template>
<div class="progress">
  <div :class="'progress-bar bg-'+ color" role="progressbar" :style="'width: ' + percentage + '%'" :aria-valuenow="percentage" aria-valuemin="0" aria-valuemax="100"></div>
</div>
</template>