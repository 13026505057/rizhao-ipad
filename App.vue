<script>
	export default {
		onLaunch: function() {
			var self = this;
			let timerWs = null;
			let timerWs2 = null;
			let timerWs3 = null;
			let isfirst = 1;
			let err = 0;
			
			// #ifdef APP-PLUS
			var self = this;
			let countNum = 0;
			let countNum2 = 0;
			let countSuccess = 0;
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
				const value = uni.getStorageSync('ip');
				if (value) {
					self.$store.state.requestUrl =  'http://'+value+'/exhibit';
					self.$store.state.sourceUrl =  'http://'+value+'/static/';
					self.$store.state.wsUrl =  'ws://'+value+':8002/';
					uni.connectSocket({
					  url: self.$store.state.wsUrl,
					  success: (res) => {
							console.log(JSON.stringify(res));
							
					  }
					});
					console.log(self.$store.state.requestUrl)
					
				}else{
					
				}
			} catch (e) {
				// error
				
			}
			
			uni.onSocketMessage(function (resp) {
				
				console.log('收到新消息');
				// console.log(resp);
				
				
				// return;
				// var res = JSON.stringify(resp)
				// res = ​JSON.parse(res.data)
				// var res = JSON.parse(resp.data);
				// console.log(res.code);
				// 
				// resp.data = res;
				
	
				var res = JSON.parse(resp.data)
				if(res.code=='exhibit_out_exception'){
					const innerAudioContext = uni.createInnerAudioContext();
					innerAudioContext.autoplay = true;
					innerAudioContext.src = self.$store.state.sourceUrl+'baojing.mp3';
					innerAudioContext.onPlay(() => {
					  console.log('开始播放');
					});
					setTimeout(function(){
						innerAudioContext.play();
					},2000)
				}else{
					return;
			
				}
				// console.log(JSON.stringify(res));
			});
			uni.onSocketOpen(function (res) {
			  console.log('WebSocket连接已打开！');
			  countNum = 0;
			  countNum2 = 0;
			  console.log(countNum)
			  clearInterval(timerWs2)
			  clearInterval(timerWs3)
			  var msg = {"code":"init","client_id":plus.device.uuid};
			  var sendMsg = JSON.stringify(msg);
			  uni.sendSocketMessage({
			    data: sendMsg
			  });
			  console.log('已发送')
			  timerWs = setInterval(function(){
				console.log('已发送')
				uni.sendSocketMessage({
				  data: sendMsg
				});
			  },10000)
			  
			});
			uni.onSocketClose(function (res) {
			  console.log('WebSocket 已关闭！');
			  clearInterval(timerWs);
			  timerWs2 = setInterval(function(){
				  countNum = countNum+1;
				  console.log(countNum)
				  if(countNum<5){
					uni.connectSocket({
					  url: self.$store.state.wsUrl,
					  success: (res) => {
						
					  }
					});
				  }else{
					  clearInterval(timerWs2)
					  uni.showModal({
					  	title: '提示',
					  	content: '连接主机失败，重新连接？',
					  	success: function (res) {
					  		if (res.confirm) {
					  			uni.connectSocket({
					  			  url: self.$store.state.wsUrl,
					  			  success: (res) => {
					  				
					  			  }
					  			});
					  		} else if (res.cancel) {
					  			console.log('用户点击取消');
					  				
					  		}
					  	}
					  });
					  
				  }
			  },2000)
			  
			  
			});
			uni.onSocketError(function (res) {
				console.log('WebSocket 错误！');
				clearInterval(timerWs);
				err = err+1;
				if(err!=1){
					return;
				}
				timerWs3 = setInterval(function(){
								  countNum2 = countNum2+1;
								  console.log(countNum2)
								  if(countNum2<5){
									uni.connectSocket({
									  url: self.$store.state.wsUrl,
									  success: (res) => {
										
									  }
									});
								  }else{
									  clearInterval(timerWs3)
									  uni.showModal({
									  	title: '提示',
									  	content: '连接主机失败，重新连接？',
									  	success: function (res) {
									  		if (res.confirm) {
									  			uni.connectSocket({
									  			  url: self.$store.state.wsUrl,
									  			  success: (res) => {
									  				
									  			  }
									  			});
									  		} else if (res.cancel) {
									  			console.log('用户点击取消');
									  				
									  		}
									  	}
									  });
									 
								  }
				},2000)
			});
			// #endif
		
			console.log('App Show');
			
		},
		onShow: function() {
			
			
		},
		onHide: function() {
			console.log('App Hide');
		},
		webSoketFunction: function(res){
			
		}
	}
</script>

<style>
	@import "colorui/main.css";
	@import "colorui/icon.css";
	/*每个页面公共css */
	/* uni-app默认全局使用flex布局。因为flex布局有利于跨更多平台，尤其是采用原生渲染的平台。如不了解flex布局，请参考http://www.w3.org/TR/css3-flexbox/。如不使用flex布局，请删除或注释掉本行。*/
	body,
	page {
		min-height: 100%;
		display: flex;
	}

	/* #ifdef MP-BAIDU */
	page {
		width: 100%;
		height: 100%;
		display: block;
	}

	swan-template {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	/* #endif */

	/* 原生组件模式下需要注意组件外部样式 */
	m-input {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	.content {
		display: flex;
		flex: 1;
		flex-direction: column;
		background-color: #efeff4;
		padding: 20upx;
	}

	.input-group {
		background-color: #ffffff;
		margin-top: 40upx;
		position: relative;
	}

	.input-group::before {
		position: absolute;
		right: 0;
		top: 0;
		left: 0;
		height: 1upx;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.input-group::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		height: 1upx;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.input-row {
		display: flex;
		flex-direction: row;
		position: relative;
	}

	.input-row .title {
		width: 20%;
		height: 50upx;
		min-height: 50upx;
		padding: 15upx 0;
		padding-left: 30upx;
		line-height: 50upx;
	}

	.input-row.border::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 15upx;
		height: 1upx;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.btn-row {
		margin-top: 50upx;
		padding: 20upx;
	}

	button.primary {
		background-color: #0faeff;
	}
</style>
