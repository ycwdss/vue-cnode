import {GET_TOPIC_LIST} from './types'
import {topicList} from './../api/fetch'

const actions={
  [GET_TOPIC_LIST]({commit}, payload) {
   /* commit(TOOGLE_LOAD, true);*/
    return topicList(payload).then((res) => {
      console.log(res.data)
      if (res.data.success) {
       // commit(TOOGLE_LOAD, false);
        commit(GET_TOPIC_LIST, res.data.data);
      }
    })
  },
}
export default actions
