import {
  GET_TOPIC_LIST,
  UPDATE_TOPIC_LIST,
  TOOGLE_LOAD,
  LOAD_MORE,
  GET_TOPIC_DETAIL,
  LOGIN,
  LOGIN_OUT,
  REPLY
} from './types'

const mutations={
  //获取列表
  [GET_TOPIC_LIST](state, data) {
    state.topics = data;
  },
  //列表加载更多
  [UPDATE_TOPIC_LIST](state, data) {
    state.topics = [...state.topics, ...data];
  },
  //列表详情
  [GET_TOPIC_DETAIL](state, data) {
    state.topicDetail = data;
  },
  //登录
  [LOGIN](state, data) {
    state.userInfo = data;
  },
  //退出登录
  [LOGIN_OUT](state) {
    state.userInfo = {};
    localStorage.removeItem('userInfo');
  },
  //页面loading
  [TOOGLE_LOAD](state, data) {
    if (data) {
      state.showLoad = data;
    } else {
      state.showLoad = !state.showLoad;
    }
  },
//loading加载更多
  [LOAD_MORE](state, data) {
    if (data) {
      state.showListLoad = data;
    } else {
      state.showListLoad = !state.showListLoad;
    }
  },
}
export default mutations
