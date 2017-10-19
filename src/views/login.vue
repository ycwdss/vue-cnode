<template>
  <div>
    <v-head title="登录"></v-head>
    <section class="login">
      <div class="login-token">
        <input class="txt" type="text" placeholder="Access Token" v-model="token" maxlength="36">
        <button class="btn btn-login" @click="handleLogin">登录</button>
      </div>
    </section>
  </div>
</template>
<script>
  import './../assets/css/login.less'
  import vHead from '../components/header';
  import {mapState} from 'vuex'
  import {LOGIN} from './../store/types'
    export default {
        data() {
            return {
              token:''
            }
        },
      components:{
        vHead
      },
      methods:{
        handleLogin(){
          const data = {
            accesstoken: this.token
          }
          this.$store.dispatch(LOGIN, data).then(() => {
            //获取当前的redirect登录成功后在跳到当
            const redirect = decodeURIComponent(this.$route.query.redirect || 'list');
            this.$router.push({path: redirect});
          })
        }
      }
    }
</script>
<style lang="less" type="text/less">

</style>
