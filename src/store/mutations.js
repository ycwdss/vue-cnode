import {GET_TOPIC_LIST} from './types'

const mutations={
  [GET_TOPIC_LIST](state, payload) {
    state.topics = payload;
  },
}
export default mutations
