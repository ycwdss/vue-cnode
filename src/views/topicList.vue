<template>
  <div>
    <v-head ref="head" :title="pageTitle"></v-head>
    <section class="topic">
      <ul class="topic-list">
        <li v-for="item of topics">
          <a>
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
             <span class="author" v-bind:style="{ backgroundImage: `url(${item.author.avatar_url})`}"></span>
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
          </a>
        </li>
      </ul>
    </section>
  </div>
</template>
<script>
  import './../assets/css/topic.less'

  import {mapState} from 'vuex'
  import {GET_TOPIC_LIST} from './../store/types'
  import {topicTab} from '../utils/index';
  import vHead from '../components/header';

  export default {
    data() {
      return {
        params: { //请求参数
          page: 1,
          limit: 20,
          tab: 'all',
          mdrender: false
        },
      }
    },
    components: {
      vHead
    },
    mounted() {
      this.getTopics();
      if (this.$route.query && this.$route.query.tab) {
        this.params.tab = this.$route.query.tab;
      }
    },
    computed: {
      ...mapState([
        'topics',
      ]),
      //头部文字状态
      pageTitle() {
        const tab = (this.$route.query && this.$route.query.tab) || 'all';
        return topicTab[tab];
      }
    },
    watch: {
      '$route'(to) {
        // 隐藏导航栏
        this.$refs.head.show = false;
      }
    },
    methods: {
      //派发数据，获取列表
      getTopics() {
        this.$store.dispatch(GET_TOPIC_LIST, this.params);
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
    }
  }
</script>
<style lang="less" type="text/less">

</style>
