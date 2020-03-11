import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const user = {};
user.gold = 10000;
user.crystal = 10000;
user.power = 60;
user.maxPower = 160;

const mainTask = {
  title: '主线--新章节开放',
  list: [
    {
      to: '/adeventure/mainTask/section/1',
      src: require('@/assets/1.png'),
      name: '嘻嘻哈哈哈',
      belong: 'MAIN STORY',
      section: '第一章',
      fontSize: 20,
      progress: {
        normal: 10,
        hard: 20,
        super: 30
      }
    },
    {
      to: '/adeventure/mainTask/section/1',
      src: require('@/assets/1.png'),
      name: '嘻嘻哈哈哈',
      belong: 'MAIN STORY',
      section: '第一章',
      fontSize: 20,
      progress: {
        normal: 10,
        hard: 20,
        super: 30
      }
    },
    {
      to: '/adeventure/mainTask/section/1',
      src: require('@/assets/1.png'),
      name: '嘻嘻哈哈哈',
      belong: 'MAIN STORY',
      section: '第一章',
      fontSize: 20,
      progress: {
        normal: 10,
        hard: 20,
        super: 30
      }
    },
    {
      to: '/adeventure/mainTask/section/1',
      src: require('@/assets/1.png'),
      name: '嘻嘻哈哈哈',
      belong: 'MAIN STORY',
      section: '第一章',
      fontSize: 20,
      progress: {
        normal: 10,
        hard: 20,
        super: 30
      }
    },
    {
      to: '/adeventure/mainTask/section/1',
      src: require('@/assets/1.png'),
      name: '嘻嘻哈哈哈',
      belong: 'MAIN STORY',
      section: '第一章',
      fontSize: 20,
      progress: {
        normal: 10,
        hard: 20,
        super: 30
      }
    },
    {
      to: '/adeventure/mainTask/section/1',
      src: require('@/assets/1.png'),
      name: '嘻嘻哈哈哈',
      belong: 'MAIN STORY',
      section: '第一章',
      fontSize: 20,
      progress: {
        normal: 10,
        hard: 20,
        super: 30
      }
    },
    {
      to: '/adeventure/mainTask/section/1',
      src: require('@/assets/1.png'),
      name: '嘻嘻哈哈哈',
      belong: 'MAIN STORY',
      section: '第一章',
      fontSize: 20,
      progress: {
        normal: 10,
        hard: 20,
        super: 30
      }
    },
    {
      to: '/adeventure/mainTask/section/1',
      src: require('@/assets/1.png'),
      name: '嘻嘻哈哈哈',
      belong: 'MAIN STORY',
      section: '第一章',
      fontSize: 20,
      progress: {
        normal: 10,
        hard: 20,
        super: 30
      }
    },
    {
      to: '/adeventure/mainTask/section/1',
      src: require('@/assets/1.png'),
      name: '嘻嘻哈哈哈',
      belong: 'MAIN STORY',
      section: '第一章',
      fontSize: 20,
      progress: {
        normal: 10,
        hard: 20,
        super: 30
      }
    },
    {
      to: '/adeventure/mainTask/section/1',
      src: require('@/assets/1.png'),
      name: '嘻嘻哈哈哈',
      belong: 'MAIN STORY',
      section: '第一章',
      fontSize: 20,
      progress: {
        normal: 10,
        hard: 20,
        super: 30
      }
    }
  ]
}
user.adventure = {
  mainTask
};

const state = {
  user
};

const getters = {
  getUser() {
    return state.user;
  }
};

const mutations = {};

const actions = {
  // getNewNum(context,num){   //同上注释，num为要变化的形参
  //   context.commit('newNum',num)
  // }
};

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});

export default store;
