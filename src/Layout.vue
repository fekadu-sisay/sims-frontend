<template>
<div class="fixed">
    <my_header/>
  <sidebar></sidebar>
</div>
  <main class="pt-16 ml-1 overflow-hidden">
        <slot></slot>
  </main>
</template>

<script>
import sidebar from './components/sidebar.vue'
import my_header from './views/Header.vue'
export default {
  name: 'app',
  components: {
    sidebar,
    my_header,
  }
}
</script>
