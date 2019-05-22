import Vue from 'vue';
import App from '@/App';
import router from '@/router';
import iView from 'iview';
import '@/my-theme/index.less';
import store from '@/store/store';
import  '@/common/js/common';
import 'vue-croppa/dist/vue-croppa.css';
import Croppa from 'vue-croppa';


Vue.use(iView);
Vue.use(Croppa);


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});


/**
 *
 * 强制修改密码
 *  路由判断
 *
 */
const isFirst = sessionStorage.getItem('isFirst');
router.beforeEach((to, from, next) => {
  if (isFirst == 'true') {
    store.commit("CHANGE_PASSWORD","true");
    store.commit('NO_CHANGED','true');
    router.push('/personal/info');
    iView.Notice.error({
      title: '首次登录',
      desc: '请及时修改密码，确保账号安全！'
    });
  } else {
    next();
  };
});


