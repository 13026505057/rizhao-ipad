(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/setting/setting"],{"0658":function(t,n,i){"use strict";i.r(n);var e=i("5efb"),s=i("5626");for(var o in s)"default"!==o&&function(t){i.d(n,t,function(){return s[t]})}(o);i("7b62");var a=i("2877"),c=Object(a["a"])(s["default"],e["a"],e["b"],!1,null,null,null);n["default"]=c.exports},5626:function(t,n,i){"use strict";i.r(n);var e=i("b2bb"),s=i.n(e);for(var o in e)"default"!==o&&function(t){i.d(n,t,function(){return e[t]})}(o);n["default"]=s.a},"5efb":function(t,n,i){"use strict";var e=function(){var t=this,n=t.$createElement,e=(t._self._c,i("f259")),s=i("7e11");t.$mp.data=Object.assign({},{$root:{m0:e,m1:s}})},s=[];i.d(n,"a",function(){return e}),i.d(n,"b",function(){return s})},"7b62":function(t,n,i){"use strict";var e=i("8f8a"),s=i.n(e);s.a},"8f8a":function(t,n,i){},b2bb:function(t,n,i){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i={data:function(){return{TabCur:0,isPassWord:0,password:"",isIp:!1,ipconfig:"",countNum:0}},onLoad:function(){},methods:{changeIpClick:function(){var n=this;t.showModal({title:"提示",content:"确定设置Ip？",success:function(i){if(i.confirm)try{t.setStorageSync("ip",n.ipconfig),t.showToast({title:"设置成功",duration:2e3}),n.$store.state.requestUrl="http://"+n.ipconfig+"/exhibit",n.$store.state.sourceUrl="http://"+n.ipconfig+"/static/",n.$store.state.wsUrl="ws://"+n.ipconfig+":8002/",setTimeout(function(){n.isIp=!1,t.navigateBack({delta:1})},2e3)}catch(e){t.showToast({title:"设置失败",duration:2e3})}else i.cancel&&(console.log("用户点击取消"," at pages\\setting\\setting.vue:111"),n.isIp=!1)}})},hideModalIp:function(){this.isIp=!1},seeClick:function(){this.countNum++,this.countNum>10&&(this.isPassWord=0,this.isIp=!0,this.countNum=0)},faceMange:function(){t.navigateTo({url:"/pages/faceList/faceList"})},bleMange:function(){t.navigateTo({url:"/pages/bleList/bleList"})},pwdClick:function(){this.isPassWord=1},hideModal:function(){this.isPassWord=0},changePwdClick:function(){var n=this;t.setStorage({key:"ipad_pwd",data:n.password,success:function(){t.showToast({title:"设置成功",icon:"success",duration:2e3}),n.isPassWord=0},fail:function(){t.showToast({title:"设置失败请重试",icon:"loading",duration:2e3}),n.isPassWord=0}})}}};n.default=i}).call(this,i("6e42")["default"])}},[["61e0","common/runtime","common/vendor"]]]);