import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        /**
         * 是否需要强制登录
         */
		requestUrl:'http://www.kofanchina.com/exhibit',
		sourceUrl:'http://www.kofanchina.com/static/',
		htmlUrl:'http://192.168.2.25/images/file/html/openFile.html?fileUrl=',
		// wsUrl:'ws://118.24.220.77:8080/park',
		wsUrl:'ws://180.76.156.199:8002/',
		indexBg:'../../static/img/indexBg.png',
		zhuopai:'../../static/img/indexBg.png',
		caidan:'../../static/img/indexBg.png',
		qiandao:'../../static/img/indexBg.png',
		yian:'../../static/img/indexBg.png',
		jieguo:'../../static/img/indexBg.png',
		isLogin:false,
        forcedLogin: false,
		meet_title: '单县人大无线会议表决系统',
		meet_id: null,
        hasLogin: false,
        userName: "",
		vote_id:'',
		vote_type:'',
		vote_option:'0',
		user_id:0,
		fileUrl:'',
		deviceId:'',
		ipadPass:'12345678'
    },
    mutations: {
        login(state, userName) {
            state.userName = userName || '新用户';
            state.hasLogin = true;
        },
        logout(state) {
            state.userName = "";
            state.hasLogin = false;
        }
    }
})

export default store
