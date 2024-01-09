<script>
export default {
  name: 'NavbarUrl',
  props: ['navbar_item'],
  methods:{
    get_span_text_class(navbar_item){
      if (navbar_item.hide_text_on_mobile && navbar_item.hide_text_on_pc){
        return ' d-none '
      } else if (navbar_item.hide_text_on_mobile) {
        return ' d-none d-md-block '
      } else if (navbar_item.hide_text_on_pc){
        return ' d-block d-md-none '
      } else {
        return ' d-block '
      }
    },
    get_router_url(string_url){
      return JSON.parse(string_url)
    }
  },
}

</script>

<template>
<div style="min-width: max-content">
  <a v-if="navbar_item.url_type === 'hashtag'" class="nav-link fw-bold text-light d-flex " :aria-current="navbar_item.text" :href="'/'+navbar_item.internal_url" >
    <i v-if="navbar_item.icon_position === 'start'" :class="navbar_item.icon + ' my-auto'"></i>
    <span :class="get_span_text_class(navbar_item) + 'mx-1'"> {{ navbar_item.text }}</span>
    <i v-if="navbar_item.icon_position === 'end'" :class="navbar_item.icon + ' my-auto'"></i>
  </a>
  <router-link v-else-if="navbar_item.url_type === 'internal'" class="nav-link fw-bold text-light d-flex" :to='get_router_url(navbar_item.internal_url)' >
    <i v-if="navbar_item.icon_position === 'start'" :class="navbar_item.icon + ' my-auto'"></i>
    <span :class="get_span_text_class(navbar_item) + 'mx-1'"> {{ navbar_item.text }}</span>
    <i v-if="navbar_item.icon_position === 'end'" :class="navbar_item.icon + ' my-auto'"></i>
  </router-link>
  <a v-else-if="navbar_item.url_type === 'external'" class="nav-link fw-bold text-light" :aria-current="navbar_item.text" :href="navbar_item.external_url" target="_blank">
    <i v-if="navbar_item.icon_position === 'start'" :class="navbar_item.icon + ' my-auto'"></i>
    <span :class="get_span_text_class(navbar_item) + 'mx-1'"> {{ navbar_item.text }}</span>
    <i v-if="navbar_item.icon_position === 'end'" :class="navbar_item.icon + ' my-auto'"></i>
  </a>
  <span v-if="navbar_item.display_text_on_hover_pc" class="ms-1 my-auto p-1 fw-semibold bg-primary-subtle rounded label-span">{{ navbar_item.text }}</span>

</div>
</template>

<style scoped>
.label-span{
  display: none;
}
@media (min-width: 768px) {
  li:hover .label-span{
    position: absolute;
    top: 2rem;
    display: block!important;
    margin:auto;
  }
  li .label-span{
    border-top-left-radius: 0!important;
  }
}
</style>
