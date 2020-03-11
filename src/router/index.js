import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

URL.createObjectURL = window.createObjectURL
                       || window.URL.createObjectURL
                       || window.webkitURL.createObjectURL;

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: ()=>import('@/App')
    // },
    {
      path: '/',
      redirect: "/adventure"
    },
    {
      path: '/adventure',
      name: 'adventure',
      components: {
        app: () => import('@/components/hk-adventure/hk-adventure')
      },
      children: [
        {
          path: '/adventure/mainTask',
          name: 'mainTask',
          components: {
            adventure: () => import('@/components/hk-adventure/hk-adventure-maintask')
          }
        }
      ]
    }
  ]
})
