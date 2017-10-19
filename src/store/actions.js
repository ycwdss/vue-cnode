import {
  GET_TOPIC_LIST,
  UPDATE_TOPIC_LIST,
  TOOGLE_LOAD,
  LOAD_MORE,
  GET_TOPIC_DETAIL,
  LOGIN,
  REPLY
} from './types'
import {topicList,topicDetail,login,reply} from './../api/fetch'

const actions={
  //获取列表
  [GET_TOPIC_LIST]({commit}, payload) {
    commit(TOOGLE_LOAD, true);
    return topicList(payload).then((res) => {
      console.log(res)
      if (res.success) {
       commit(TOOGLE_LOAD, false);
        commit(GET_TOPIC_LIST, res.data);
      }
    })
  },
  //列表加载更多
  [UPDATE_TOPIC_LIST]({commit}, data) {
  commit(LOAD_MORE, true);
    return topicList(data).then((res) => {
      if (res.success) {
        commit(LOAD_MORE, false);
        commit(UPDATE_TOPIC_LIST, res.data)
      }
    })
  },
  //列表详情
  [GET_TOPIC_DETAIL]({commit}, data) {
    commit(TOOGLE_LOAD, true);
    topicDetail(data).then((res) => {
      console.log(res)
      if (res.success) {
        commit(TOOGLE_LOAD, false);
        commit(GET_TOPIC_DETAIL, res.data)
      }
    })
  },
  //回复
  [REPLY]({commit, dispatch}, data) {
    const topicId = data.topicId;
    delete data.topicId;
    reply(data, topicId).then((res) => {
      if (res.success) {
        dispatch(GET_TOPIC_DETAIL, topicId);
      }
    })
  },
  //登录
  [LOGIN]({commit}, data) {
    return login(data).then((res) => {
      if (res.success) {
        const user = {
          loginname: res.loginname,
          id: res.id,
          avatar_url: res.avatar_url,
          accesstoken: data.accesstoken
        }
        localStorage.setItem('userInfo', JSON.stringify(user));
        commit(LOGIN, user);
      }
    })
  },
}
export default actions
