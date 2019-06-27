(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/main"],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib/index.js?!G:\\日照公安\\日照公安平板\\rizhao-ipad\\App.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!G:/日照公安/日照公安平板/rizhao-ipad/App.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default =
{
  onLaunch: function onLaunch() {
    var self = this;
    var timerWs = null;
    var timerWs2 = null;
    var timerWs3 = null;
    var isfirst = 1;
    var err = 0;


    var self = this;
    var countNum = 0;
    var countNum2 = 0;
    var countSuccess = 0;
    this.version = plus.runtime.version;
    // console.log(plus.device.uuid);
    // console.log(self.$store.state.wsUrl+'/websocket/'+plus.device.uuid);

    //监听蓝牙适配器状态变化事件
    // uni.onBluetoothAdapterStateChange(function (res) {
    //   console.log('蓝牙适配器状态变化', res)
    // })
    // uni.connectSocket({
    //   url: self.$store.state.wsUrl,
    //   success: (res) => {
    // 		console.log(JSON.stringify(res));
    //   },
    //   fail:(res)=>{
    // 	  console.log('链接失败')
    //   }
    // });
    try {
      var value = uni.getStorageSync('ip');
      if (value) {
        self.$store.state.requestUrl = 'http://' + value + '/exhibit';
        self.$store.state.sourceUrl = 'http://' + value + '/static/';
        self.$store.state.wsUrl = 'ws://' + value + ':8002/';
        uni.connectSocket({
          url: self.$store.state.wsUrl,
          success: function success(res) {
            console.log(JSON.stringify(res), " at App.vue:42");

          } });

        console.log(self.$store.state.requestUrl, " at App.vue:46");

      } else {

      }
    } catch (e) {
      // error

    }

    uni.onSocketMessage(function (resp) {

      console.log('收到新消息', " at App.vue:58");
      // console.log(resp);


      // return;
      // var res = JSON.stringify(resp)
      // res = ​JSON.parse(res.data)
      // var res = JSON.parse(resp.data);
      // console.log(res.code);
      // 
      // resp.data = res;


      var res = JSON.parse(resp.data);
      if (res.code == 'exhibit_out_exception') {
        var innerAudioContext = uni.createInnerAudioContext();
        innerAudioContext.autoplay = true;
        innerAudioContext.src = self.$store.state.sourceUrl + 'baojing.mp3';
        innerAudioContext.onPlay(function () {
          console.log('开始播放', " at App.vue:77");
        });
        setTimeout(function () {
          innerAudioContext.play();
        }, 2000);
      } else {
        return;

      }
      // console.log(JSON.stringify(res));
    });
    uni.onSocketOpen(function (res) {
      console.log('WebSocket连接已打开！', " at App.vue:89");
      countNum = 0;
      countNum2 = 0;
      console.log(countNum, " at App.vue:92");
      clearInterval(timerWs2);
      clearInterval(timerWs3);
      var msg = { "code": "init", "client_id": plus.device.uuid };
      var sendMsg = JSON.stringify(msg);
      uni.sendSocketMessage({
        data: sendMsg });

      console.log('已发送', " at App.vue:100");
      timerWs = setInterval(function () {
        console.log('已发送', " at App.vue:102");
        uni.sendSocketMessage({
          data: sendMsg });

      }, 10000);

    });
    uni.onSocketClose(function (res) {
      console.log('WebSocket 已关闭！', " at App.vue:110");
      clearInterval(timerWs);
      timerWs2 = setInterval(function () {
        countNum = countNum + 1;
        console.log(countNum, " at App.vue:114");
        if (countNum < 5) {
          uni.connectSocket({
            url: self.$store.state.wsUrl,
            success: function success(res) {

            } });

        } else {
          clearInterval(timerWs2);
          uni.showModal({
            title: '提示',
            content: '连接主机失败，重新连接？',
            success: function success(res) {
              if (res.confirm) {
                uni.connectSocket({
                  url: self.$store.state.wsUrl,
                  success: function success(res) {

                  } });

              } else if (res.cancel) {
                console.log('用户点击取消', " at App.vue:136");

              }
            } });


        }
      }, 2000);


    });
    uni.onSocketError(function (res) {
      console.log('WebSocket 错误！', " at App.vue:148");
      clearInterval(timerWs);
      err = err + 1;
      if (err != 1) {
        return;
      }
      timerWs3 = setInterval(function () {
        countNum2 = countNum2 + 1;
        console.log(countNum2, " at App.vue:156");
        if (countNum2 < 5) {
          uni.connectSocket({
            url: self.$store.state.wsUrl,
            success: function success(res) {

            } });

        } else {
          clearInterval(timerWs3);
          uni.showModal({
            title: '提示',
            content: '连接主机失败，重新连接？',
            success: function success(res) {
              if (res.confirm) {
                uni.connectSocket({
                  url: self.$store.state.wsUrl,
                  success: function success(res) {

                  } });

              } else if (res.cancel) {
                console.log('用户点击取消', " at App.vue:178");

              }
            } });


        }
      }, 2000);
    });


    console.log('App Show', " at App.vue:189");

  },
  onShow: function onShow() {


  },
  onHide: function onHide() {
    console.log('App Hide', " at App.vue:197");
  },
  webSoketFunction: function webSoketFunction(res) {

  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["default"]))

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!G:\\日照公安\\日照公安平板\\rizhao-ipad\\App.vue?vue&type=style&index=0&lang=css&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!./node_modules/css-loader??ref--6-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/vue-loader/lib??vue-loader-options!G:/日照公安/日照公安平板/rizhao-ipad/App.vue?vue&type=style&index=0&lang=css& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "G:\\日照公安\\日照公安平板\\rizhao-ipad\\App.vue":
/*!******************************************!*\
  !*** G:/日照公安/日照公安平板/rizhao-ipad/App.vue ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.vue?vue&type=script&lang=js& */ "G:\\日照公安\\日照公安平板\\rizhao-ipad\\App.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue?vue&type=style&index=0&lang=css& */ "G:\\日照公安\\日照公安平板\\rizhao-ipad\\App.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _H_Hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
var render, staticRenderFns





/* normalize component */

var component = Object(_H_Hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"],
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "G:/日照公安/日照公安平板/rizhao-ipad/App.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "G:\\日照公安\\日照公安平板\\rizhao-ipad\\App.vue?vue&type=script&lang=js&":
/*!*******************************************************************!*\
  !*** G:/日照公安/日照公安平板/rizhao-ipad/App.vue?vue&type=script&lang=js& ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _H_Hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_H_Hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_H_Hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_H_Hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib/index.js?!G:\\日照公安\\日照公安平板\\rizhao-ipad\\App.vue?vue&type=script&lang=js&");
/* harmony import */ var _H_Hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_H_Hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_H_Hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_H_Hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_H_Hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_H_Hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_H_Hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_H_Hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _H_Hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_H_Hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_H_Hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_H_Hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _H_Hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_H_Hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_H_Hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_H_Hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_H_Hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_H_Hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_H_Hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_H_Hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "G:\\日照公安\\日照公安平板\\rizhao-ipad\\App.vue?vue&type=style&index=0&lang=css&":
/*!***************************************************************************!*\
  !*** G:/日照公安/日照公安平板/rizhao-ipad/App.vue?vue&type=style&index=0&lang=css& ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _H_Hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_H_Hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_H_Hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_H_Hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_H_Hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_H_Hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-1!./node_modules/css-loader??ref--6-oneOf-1-2!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=style&index=0&lang=css& */ "./node_modules/mini-css-extract-plugin/dist/loader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!G:\\日照公安\\日照公安平板\\rizhao-ipad\\App.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _H_Hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_H_Hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_H_Hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_H_Hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_H_Hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_H_Hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_H_Hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_H_Hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_H_Hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_H_Hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_H_Hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_H_Hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _H_Hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_H_Hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_H_Hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_H_Hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_H_Hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_H_Hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _H_Hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_H_Hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_H_Hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_H_Hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_H_Hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_H_Hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_H_Hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_H_Hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_1_H_Hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_index_js_ref_6_oneOf_1_2_H_Hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_stylePostLoader_js_H_Hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_H_Hbuilder_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ })

},[["G:\\日照公安\\日照公安平板\\rizhao-ipad\\main.js","common/runtime","common/vendor"]]]);