import Vue from 'vue'
import App from './App'

import pageHead from './components/page-head.vue'
import pageFoot from './components/page-foot.vue'
import uLink from '@/components/uLink.vue'
import store from './store'


Vue.config.productionTip = false

Vue.prototype.$store = store
Vue.prototype.$backgroundAudioData = {
    playing: false,
    playTime: 0,
    formatedPlayTime: '00:00:00'
}

import $request from "./tools/ajax.js";
Vue.prototype.$request = $request;

Vue.prototype.APPID = 'wx8064aa16d29d246f';
// Vue.prototype.APPID = 'wxe7fef63c5e431a25';
Vue.prototype.SECRET = '9230a89501ce764064c808cd0f6b301a';
Vue.prototype.WX_AUTH_URL = 'https://api.weixin.qq.com/sns/jscode2session';

Vue.component('page-head', pageHead)
Vue.component('page-foot', pageFoot)
Vue.component('uLink', uLink)

App.mpType = 'app'

const app = new Vue({
    store,
    ...App
})
app.$mount()
