import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import ElementUI from 'element-ui'
import './plugins/element.js'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/normlize.css'
import store from './store/index'
import Video from 'video.js'
import 'video.js/dist/video-js.css'
import 'videojs-flash'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import echarts from 'echarts'

Vue.use(ElementUI)
Vue.use(VueAxios, axios)
Vue.prototype.$video = Video
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  NProgress.start()
  console.log(store.state.userInfo)
  if (store.state.userInfo == null && to.path !== '/login'){
    next('/login');
  }else{
    next()
  }
})

router.afterEach(() => {
  NProgress.done()
})

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
