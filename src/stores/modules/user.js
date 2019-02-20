import { isAlipayOrWechat } from '@/libs/utils'
import router from '../../router'

export default {
  state: {
    token: localStorage.getItem('token'),
    userAgent: 'wx',
    // userAgent: isAlipayOrWechat(),
    userInfo: localStorage.getItem('userInfo')
  },
  mutations: {
    // 设置token
    SET_TOKEN(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    // 清空token
    REMOVE_TOKEN(state) {
      state.token = '';
      localStorage.removeItem('token');
    },
    // 设置用户信息
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo;
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    },
    // 清空用户信息
    REMOVE_USER_INFO(state) {
      state.userInfo = {};
      localStorage.removeItem('userInfo');
    }
  },
  actions: {
    logoutAct({ commit }) {
      commit('REMOVE_TOKEN');
      commit('REMOVE_USER_INFO');
      router.push("/login/password");
    }
  }
}