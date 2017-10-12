import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)



const TopicList = resolve => {
  require.ensure(['../views/topicList.vue'], () => {
    resolve(require('../views/topicList.vue'));
  });
};

const NewTopic = resolve => {
  require.ensure(['../views/newTopic.vue'], () => {
    resolve(require('../views/newTopic.vue'));
  });
};




export default new Router({
  routes: [
    {
      path: '/',
      redirect: {name: 'list'}
    },
    {
      path: '/create',
      name: 'create',
      component: NewTopic,
      meta: { requiresAuth: true }
    },
    {
      path: '/list',
      name: 'list',
      component: TopicList
    },
  ]
})
