<template>
  <div>
    <v-head ref="head" :title="pageTitle"></v-head>
    <section class="topic">
      <ul class="topic-list">
        <li v-for="item of topics">
          <router-link key="item.id" :to="{name: 'detail', params:{id:item.id}}">
            <div class="top">
              <span class="normal"
                    :class="{color: item.good || item.top}"
                    v-text="getTabInfo(item)">
              </span>
              <h3 v-text="item.title"
                  :title="item.title">
              </h3>
            </div>
            <div class="bottom">
             <span class="author" :style="{ backgroundImage: `url(${item.author.avatar_url})`}"></span>
              <div class="info">
                <p>
                  <span v-text="item.author.loginname"></span>
                  <span>{{item.reply_count}}/{{item.visit_count}}</span>
                </p>
                <p>
                  <span>{{item.create_at|getTimeInfo }}</span>
                  <span>{{item.last_reply_at|getTimeInfo }}</span>
                </p>
              </div>
            </div>
          </router-link>
        </li>
      </ul>
    </section>
    <!--去顶部-->
    <v-top></v-top>
    <!--加载更多loading-->
      <div class="loading" v-show="showListLoad">
        <i class="iconfont icon-loading"></i>
      </div>
    <!--页面loading-->
    <v-loading :show="showLoad"></v-loading>

  </div>
</template>
<script>
  import './../assets/css/topic.less'

  import {mapState} from 'vuex'
  import {GET_TOPIC_LIST,UPDATE_TOPIC_LIST} from './../store/types'
  import {topicTab} from '../utils/index';
  import vHead from '../components/header';
  import vLoading from '../components/loading';
  import vTop from '../components/backtop';

  export default {
    data() {
      return {
        queryParams: { //请求参数
          page: 1,
          limit: 20,
          tab: 'all',
          mdrender: false
        },
        scrollDelay: false
      }
    },
    components: {
      vHead,
      vLoading,
      vTop
    },
    mounted() {

      //点击左侧导航进来，修改参数的tab
      if (this.$route.query && this.$route.query.tab) {
        this.queryParams.tab = this.$route.query.tab;
      }
      //从详情页进来，修改参数queryParams
      if (sessionStorage.getItem('tab') && sessionStorage.getItem('tab') === (this.$route.query.tab || 'all')) {
        this.queryParams = JSON.parse(sessionStorage.getItem('queryParams'));
      } else {

      }
      this.getTopics();
      document.addEventListener('scroll', this.getScrollData, false);
    },
    //页面销毁之前去除监听
    beforeDestroy() {
      document.removeEventListener('scroll', this.getScrollData,false);
    },
    //非详情页进入页面清空保存的数据
    beforeRouterEnter(to,from,next){
      if(from.name!=='topic'||(to.query.tab||'all')!==sessionStorage.getItem('tab')){
        this.queryParams.tab=1;
        sessionStorage.removeItem('scrollTop');
        sessionStorage.removeItem('queryParams');
        sessionStorage.removeItem('tab');
      }
      next();
    },
    //离开当前组件，去详情页
    beforeRouteLeave(to, from, next) {
      // 方便从详情页面返回到该页面的时候继续加载之前位置的数据
      if (to.name === 'topic') {
        // 当前滚动条位置
        sessionStorage.setItem('scrollTop', document.body.scrollTop || document.documentElement.scrollTop);
        // 查询参数
        sessionStorage.setItem('queryParams', JSON.stringify(this.queryParams));
        sessionStorage.setItem('tab', this.queryParams.tab);
      }
      next();
    },

    computed: {
      ...mapState(['topics', 'showLoad', 'showListLoad']),
      //头部文字状态
      pageTitle() {
        const tab = (this.$route.query && this.$route.query.tab) || 'all';
        return topicTab[tab];
      }
    },
    watch: {
      '$route'(to) {
        if (to.query && to.query.tab) {
          this.queryParams.tab = to.query.tab;
        }
        this.queryParams.page = 1;
        this.getTopics();
        // 隐藏导航栏
        this.$refs.head.show = false;
      }
    },
    methods: {
      //派发数据，获取列表
      getTopics() {
        this.$store.dispatch(GET_TOPIC_LIST, this.queryParams);
      },
      //标签
      getTabInfo(item) {
        let tab = item.tab;
        if (item.good) {
          tab = 'good';
        } else if (item.top) {
          tab = 'top';
        }
        return topicTab[tab]
      },
      //列表加载更多
      getScrollData() {
        const y = document.body.scrollTop || document.documentElement.scrollTop;
        const documentH = document.documentElement.clientHeight;
        const dom = document.querySelectorAll('.topic-list li');
        if (dom.length && (dom[dom.length - 1].offsetTop + dom[dom.length - 1].offsetHeight <= y + documentH) && !this.scrollDelay) {
          this.queryParams.page = this.queryParams.page + 1;
          this.scrollDelay = true;
          this.$store.dispatch(UPDATE_TOPIC_LIST, this.queryParams).then(() => {
            this.scrollDelay = false;
          });
        }
      }
    }
  }
</script>
<style lang="less" type="text/less">
  .loading {
    width: 120px;
    /*height: 120px;*/
    margin: 5px auto;
    text-align: center;
    .icon-loading {
      color: #ccc;
      display: inline-block;
      font-size: 5rem;
      -webkit-animation: gif 1s infinite linear;
      animation: gif 1s infinite linear;
    }

    @keyframes gif {
      0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
      }
      100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
      }
    }
    @-webkit-keyframes gif {
      0% {
        -webkit-transform: rotate(0deg);
      }
      100% {
        -webkit-transform: rotate(360deg);
      }
    }
  }
</style>
