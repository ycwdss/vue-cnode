<template>
    <div>
      <v-head></v-head>
      <div class="topic" v-if="topicDetail.title">
        <h2 class="topic-title" v-text="topicDetail.title"></h2>
        <!--作者标题信息-->
        <section class="author-info">
          <router-link :to="{name:'user',params:{loginname:topicDetail.author.loginname}}">
            <img :src="topicDetail.author.avatar_url" alt="" class="avatar">
          </router-link>

          <div class="center">
            <span class="author" v-text="topicDetail.author.loginname"></span>
            <time class="info">
              发布于:{{topicDetail.create_at | getTimeInfo}}
            </time>
          </div>
          <div class="right">
                    <span class="tag" v-text="getTabInfo(topicDetail)"
                          :class="{color: topicDetail.good || topicDetail.top}"></span>
            <span class="name">{{topicDetail.visit_count}}次浏览</span>
          </div>
        </section>
        <!--内容区域-->
        <section class='markdown-body topic-content' v-html="topicDetail.content"></section>
        <!--回复区域-->
        <section class="topic-reply">
          <h3 class="topic-total">
            <strong>{{topicDetail.reply_count}}</strong> 回复
          </h3>
          <ul class="reply-list">
            <li v-for="item in topicDetail.replies">
              <section class="user">
                <router-link :to="{name:'user',params:{loginname:item.author.loginname}}" >
                  <img class="head" :src="item.author.avatar_url"/>
                </router-link>
                <div class="info">
                                <span class="left">
                                    <span class="name" v-text="item.author.loginname"></span>
                                    <span class="name">
                                        发布于:{{item.create_at | getTimeInfo}}
                                    </span>
                                </span>
                  <span class="right">
                                    <span style="margin-right: 5px"
                                          class="iconfont icon-dianzan"
                                          :class="{'uped': isUps(item.ups)}"
                                          @click="handleUpReply(item)"
                                    ></span>
                                    <span style="margin-right: 5px">{{item.ups.length}}</span>
                                    <span class="iconfont icon-hf" @click="addReply(item.id)"></span>
                                </span>
                </div>
              </section>
              <div class="reply-content markdown-body" v-html="item.content"></div>
        <!--      <nv-reply v-if="userInfo.loginname && replyId === item.id"
                        :reply-to="item.author.loginname"
                        :reply-id="item.id"
                        :topic-id="topicId"
                        :focus="true"
                        @onReply="handleReply"></nv-reply>-->
            </li>
          </ul>
        </section>
      </div>
    </div>
</template>
<script>
  import './../assets/css/topic.less'
  import {GET_TOPIC_DETAIL} from './../store/types'
  import {topicTab} from '../utils/index';
  import {upReply} from './../api/fetch'
  import vHead from '../components/header';
  import { mapState } from 'vuex';
    export default {
        data() {
            return {
              topicId: '',
            }
        },
      components:{
        vHead
      },
      mounted(){
        this.topicId = this.$route.params.id;
        this.getTopicDetail();
        console.log(this.$route)
      },
      methods:{
        getTopicDetail() {
          this.$store.dispatch(GET_TOPIC_DETAIL, this.topicId);
        },
        getTabInfo(item) {
          let tab = item.tab;
          if (item.good) {
            tab = 'good';
          } else if (item.top) {
            tab = 'top';
          }
          return topicTab[tab]
        },
        //点赞功能
        isUps(ups) {
          return ups.indexOf(this.userInfo.id) > -1 //如果用户id存在
        },
        handleUpReply(item){
          //如果没有登录跳到登录页面
          if (!this.userInfo.loginname) {
            this.$router.push({
              name: 'login',
              query: { redirect: encodeURIComponent(this.$route.path) }//跳到登录页面带上redirect
            });
            return;
          }
          //登录
          upReply({accesstoken: this.userInfo.accesstoken}, item.id).then((res) => {
            if (res.success) {
              if (res.action === 'down') {
                const index = item.ups.indexOf(this.userInfo.id);
                if (index > -1) {
                  item.ups.splice(index, 1);
                }
              } else {
                item.ups.push(this.userInfo.id);
              }
            }
          })
        }
      },
      computed: {
        ...mapState(['topicDetail', 'userInfo','showLoad'])
      },
    }
</script>
<style lang="less" type="text/less">

</style>
