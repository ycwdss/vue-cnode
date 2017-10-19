import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)


const Login = resolve => {
  require.ensure(['../views/login.vue'], () => {
    resolve(require('../views/login.vue'));
  });
};
const TopicList = resolve => {
  require.ensure(['../views/topicList.vue'], () => {
    resolve(require('../views/topicList.vue'));
  });
};
const TopicDetail = resolve => {
  require.ensure(['../views/topicDetail.vue'], () => {
    resolve(require('../views/topicDetail.vue'));
  });
};
const NewTopic = resolve => {
  require.ensure(['../views/newTopic.vue'], () => {
    resolve(require('../views/newTopic.vue'));
  });
};




export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: {name: 'list'}
    },
    {
      path: '/list',
      name: 'list',
      component: TopicList
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: TopicDetail,
      meta: { requiresAuth: true }
    },
    {
      path: '/create',
      name: 'create',
      component: NewTopic,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
