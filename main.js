import Vue from 'vue'
import App from './App'

import store from './store'
import MD5 from './static/setMD5'
Vue.config.productionTip = false

Vue.prototype.$store = store
Vue.prototype.$md5 = MD5
Vue.prototype.$webSoketFunction = function(){
	
	
}
App.mpType = 'app'

const app = new Vue({
    store,
    ...App
})
app.$mount()
