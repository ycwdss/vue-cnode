<template>
  <div>首页</div>
</template>
<script>
  import {topicList} from './../api/fetch'

  export default {
    data() {
      return {}
    },
    mounted() {
      topicList({
        page: 5,
        tab: 'ask',
        limit: 5,
      }).then((res) => {
        console.log(res)
      })
    }
  }
</script>
<style lang="less" type="text/less">

</style>
