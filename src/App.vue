<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import vHead from './components/header.vue'

  export default {
    data() {
      return {}
    },
    components: {
      vHead
    }
  }
</script>

<style type="text/less" lang="less">
@import "./assets/css/main.less";
</style>
