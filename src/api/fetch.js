import instance from './index'



//获取列表
export const topicList=(params)=>{
  return instance({
    url: '/topics',
    method: 'get',
    params
  });
}

//列表详情
export const topicDetail=(id)=>{
  return instance({
    url: '/topic/'+ id,
    method: 'get',
  });
}
//点赞功能
export const upReply=(params,id)=>{
  return instance({
    url: `/reply/${id}/ups`,
    method: 'post',
    params
  });
}
//回复接口
export const reply=(params,id)=>{
  return instance({
    url: `/topic/${id}/replies`,
    method: 'post',
    params
  });
}
//登录
export const login=(params)=>{
  return instance({
    url: '/accesstoken',
    method: 'post',
    params
  });
}
//用户消息
export const messageCount=(params)=>{
  return instance({
    url: '/message/count',
    method: 'get',
    params
  });
}
export const getUserInfo = (loginname) => {
  return instance({
    url: `/user/${loginname}`
  })
}
