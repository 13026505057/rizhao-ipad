(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/main/main"],{"162f":function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=e("2f62"),a={computed:(0,o.mapState)(["forcedLogin","hasLogin","userName"]),onLoad:function(){var t=this;this.hasLogin||n.showModal({title:"未登录",content:"您未登录，需要登录后才能继续",showCancel:!this.forcedLogin,success:function(e){e.confirm&&(t.forcedLogin?n.reLaunch({url:"../login/login"}):n.navigateTo({url:"../login/login"}))}})}};t.default=a}).call(this,e("6e42")["default"])},"44ef":function(n,t,e){},"5f29":function(n,t,e){"use strict";var o=function(){var n=this,t=n.$createElement;n._self._c},a=[];e.d(t,"a",function(){return o}),e.d(t,"b",function(){return a})},"989c":function(n,t,e){"use strict";e.r(t);var o=e("5f29"),a=e("b74a");for(var u in a)"default"!==u&&function(n){e.d(t,n,function(){return a[n]})}(u);e("e7d5");var i=e("2877"),c=Object(i["a"])(a["default"],o["a"],o["b"],!1,null,null,null);t["default"]=c.exports},b74a:function(n,t,e){"use strict";e.r(t);var o=e("162f"),a=e.n(o);for(var u in o)"default"!==u&&function(n){e.d(t,n,function(){return o[n]})}(u);t["default"]=a.a},e7d5:function(n,t,e){"use strict";var o=e("44ef"),a=e.n(o);a.a}},[["5c7c","common/runtime","common/vendor"]]]);