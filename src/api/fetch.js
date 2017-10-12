import instance from './index'




export const topicList=(params)=>{
  return instance({
    url: '/topics',
    method: 'get',
    params
  });
}

export const getUserInfo = (loginname) => {
  return instance({
    url: `/user/${loginname}`
  })
}
