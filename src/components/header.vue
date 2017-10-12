<template>
  <div>
    <span class="page-cover" @click="toggleMenu" v-if="show"></span>
    <header class="header-bar">
      <span class="menu-btn" @click="toggleMenu"></span>
      <span class="info">
        <span class="vue-logo"></span>
        <span>{{title}}</span>
      </span>
      <router-link :to="{name: 'create'}" class="publish-btn">
        <i class="iconfont icon-publish"></i>
      </router-link>
    </header>
    <v-menu :show="show"></v-menu>
  </div>
</template>
<script>
  import "./../assets/css/header.less";
  import vMenu from './menu.vue'

  export default {
    data() {
      return {
        show: false
      }
    },
    props: {
      title: {
        type: String,
        default: ''
      }
    },
    components:{
      vMenu
    },
    methods:{
      toggleMenu() {
        this.show = !this.show;
      }
    }
  }
</script>

