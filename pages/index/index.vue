<template>
	<view class="bigBox">
		<view class="policeLogo">
			<img src="../../static/img/policeLogo.png" alt="">
		</view>
		<view class="bgClass">
			<img src="../../static/img/bg.png" alt="">
		</view>
		<view class="cu-modal show" v-if="isPassWord=='1'?true:false">
		  <view class="cu-dialog">
			<view class="cu-bar bg-gradual-blue justify-end">
			  <view class="content bg-gradual-blue" style="line-height:20px;">身份验证</view>
			  <view class="action" @click="hideM">
				<text class="cuIcon-close text-red">X</text>
			  </view>
			</view>
			<view class="padding-xl">
			  <input type="password" adjust-position class="passWord" v-model="password"  placeholder="请输入密码" />
			</view>
			<view class="cu-bar bg-white justify-end">
			  <view class="action">
				<button class="cu-btn line-green text-green" @click="hideModal">重置</button>
				<button class="cu-btn bg-green margin-left" @click="loginClick">确定</button>

			  </view>
			</view>
		  </view>
		</view>
		<view class="flexBox">
			
				<view class="iconBox" style="top:70upx;left:75upx;" @click="number(1)">
					<img src="../../static/img/1.png" alt="">
				</view>
				<view class="iconBox" style="top:70upx;left:475upx;" @click="number(2)">
					<img src="../../static/img/2.png" alt="">
				</view>
		
				<view class="iconBox" style="top:325upx;left:275upx;" @click="number(3)">
					<img src="../../static/img/3.png" alt="">
				</view>
				<view class="iconBox" style="top:325upx;left:675upx;" @click="number(4)">
					<img src="../../static/img/4.png" alt="">
				</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgSrc:'',
				meet_title:'',
				bleCloseNum:1,
				isPassWord:0,
				password:'',
				deviceId:'',
				timer:null,
				countNum:0
			}
		},
		onLoad() {
			var self = this;
			
			try {
				var value = uni.getStorageSync('ble_key');
				if (value) {
					self.deviceId = value;
					console.log(value)
				}
			} catch (e) {
				// error
			}
			setTimeout(function(){
				self.bleInit();
			},2500);
			
		},
		onShow(){
			var self = this;
			self.countNum = 0;
			self.getIpconfig();
			self.timer = setInterval(function(){
				self.countNum++
				if(self.countNum>300){
					uni.navigateTo({
						url: '/pages/show/show'
					});
				}
				
			},1000)
		},
		onHide(){
			var self = this;
			clearInterval(self.timer)
		},
		methods: {
			
			getIpconfig(){
				var self = this;
				try {
					const value = uni.getStorageSync('ip');
					if (value) {
						self.$store.state.requestUrl =  'http://'+value+'/exhibit';
						self.$store.state.sourceUrl =  'http://'+value+'/static/';
						self.$store.state.wsUrl =  'ws://'+value+':8002/';
					}else{
						uni.showModal({
							title: '提示',
							content: 'ip未设置请联系管理员',
							success: function (res) {
								if (res.confirm) {
									console.log('用户点击确定');
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						});
					}
				} catch (e) {
					// error
					uni.showModal({
						title: '提示',
						content: 'ip未设置请联系管理员',
						success: function (res) {
							if (res.confirm) {
								console.log('用户点击确定');
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}
			},
			loginClick(){
				var self = this;
				var pwdCount = '';
				try {
					const value = uni.getStorageSync('ipad_pwd');
					if (value) {
						console.log(454)
						pwdCount = value
					}else{
						console.log(666)
						pwdCount = self.$store.state.ipadPass
					}
				} catch (e) {
					// error
				}
				console.log(self.password);
				if(self.password==pwdCount){
					uni.navigateTo({
						url: '/pages/setting/setting'
					});
					this.isPassWord = 0;
					self.password = "";
				}else{
					uni.showToast({
						title: '密码错误',
						icon:'loading',
						duration: 2000
					});
				}
				
				
			},
			hideM(){
				this.isPassWord = 0;
			},
			hideModal(){
				var self = this;
				uni.removeStorage({
					key: 'ipad_pwd',
					success: function (res) {
						uni.showToast({
							title: '重置成功',
							icon:'success',
							duration: 2000
						});
						self.password = '';
						self.isPassWord = 0;
					},
					fail() {
						uni.showToast({
							title: '重置失败',
							icon:'loading',
							duration: 2000
						});
						self.password = '';
						self.isPassWord = 0;
					}
				});
			},
			number(n){
				var self= this;
				switch(n)
						{
						case 1:
							uni.navigateTo({
								url: '/pages/login/login'
							});
						  break;
						case 2:
							uni.navigateTo({
								url: '/pages/inOutStore/inOutStore'
							});
						  break;
						case 3:
							uni.navigateTo({
								url: '/pages/login/login'
							});
						  break;
						case 4:
							console.log('11')
						    self.isPassWord = 1;
							// uni.navigateTo({
							// 	url: '/pages/login/login'
							// });
						  break;
						case 5:
							uni.request({
								url: self.$store.state.requestUrl+'/vote/help', //仅为示例，并非真实接口地址。
								data: {
									mac_machine_code:plus.device.uuid
								},
								method:'POST',
								header: {
									'Content-Type': 'application/x-www-form-urlencoded' //自定义请求头信息
								},
								success: (res) => {
									console.log(JSON.stringify(res))
									if(res.data.code==0){
										uni.showToast({
											title: '请求已发送',
											duration: 2000
										});
									}else{
										
									}
								}
							});
							
						  break;
						case 6:
							console.log(this.$store.state.isLogin)
							if(this.$store.state.isLogin){
								uni.reLaunch({
									url: '/pages/number/number'
								});
							}else{
								uni.navigateTo({
									url: '/pages/login/login'
								});
							}
						  
						  break;
						default:
						  
						}
				
			},
			//初始化蓝牙
			bleInit(){
				var self = this;
				uni.openBluetoothAdapter({
					success() {
						self.bleSearch();
					},
					fail(res){
						console.log('初始化蓝牙失败')
						uni.showModal({
							title: '提示',
							content: '初始化蓝牙失败,请确定蓝牙是否打开',
							success: function (res) {
								if (res.confirm) {
									console.log('用户点击确定');
									self.bleInit();
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						});
					  },
					  complete(res){
						  console.log(res)
					  }
				});
			},
			//开始搜索蓝牙适配器
			bleSearch(){
				var self = this;
				uni.startBluetoothDevicesDiscovery({
				  services: [],
				  success(res) {
					console.log('开始搜索蓝牙适配器');
					self.bleFind();
				  },
				  fail(res){
					uni.showModal({
						title: '提示',
						content: '搜索蓝牙失败,请重试',
						success: function (res) {
							if (res.confirm) {
								console.log('用户点击确定');
								self.bleSearch();
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				  }
				});
			},
			//找到适配的蓝牙设备
			bleFind(){
				var self = this;
				uni.onBluetoothDeviceFound(function (devices) {
				  console.log('新设备被找到');
				  for(var i = 0; i < devices.devices.length; i++ ){
					 if(self.deviceId==devices.devices[i].deviceId){
						
					 	console.log('找到需要的设备');
						
						setTimeout(function(){
							self.bleConnet();	
						},1000)
						
					 }
				  }
				  
				  
				});
			},
			//停止搜索设备
			bleFindStop(){
				uni.stopBluetoothDevicesDiscovery({
				  success(res) {
					console.log('找到需要的蓝牙设备，停止搜索');
					console.log(res);
					//链接蓝牙适配器
					setTimeout(function(){
						
					},5000)
						
				  },
				  fail(){
					uni.showModal({
						title: '提示',
						content: '停止搜索蓝牙失败,请重试',
						success: function (res) {
							if (res.confirm) {
								console.log('用户点击确定');
								self.bleFindStop();
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				  }
				})
			},
			//链接需要设备
			bleConnet(){
				var self = this;
				uni.createBLEConnection({
				  // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
				  deviceId:""+self.deviceId,
				  success(res) {
					console.log('链接成功',res);
					self.bleFindStop();
				  },
				  fail() {
					uni.showModal({
						title: '提示',
						content: '链接蓝牙失败,请重试',
						success: function (res) {
							if (res.confirm) {
								console.log('用户点击确定');
								self.bleConnet();
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				  }
				});
			},
			//蓝牙断开处理
			bleClose(){
				var self = this;
				uni.onBLEConnectionStateChange(function (res) {
				  // 该方法回调中可以用于处理连接意外断开等异常情况
				  self.bleCloseNum++;
				  if(self.bleCloseNum>4){
					uni.showModal({
						title: '提示',
						content: '蓝牙重连失败，请联系管理员',
						success: function (res) {
							if (res.confirm) {
								console.log('用户点击确定');
								self.bleConnet();
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				  }else{
					  self.bleInit();
				  }
				})
			},
			//蓝牙设备写入特征值
			bleSendMsg(){
				var buffer = new ArrayBuffer(5)
				var dataView = new DataView(buffer)
				dataView.setUint8(0, 82);
				dataView.setUint8(1, 76);
				dataView.setUint8(2, 50);
				dataView.setUint8(3, 50);
				dataView.setUint8(4, 50)
				console.log(ab2hex(dataView))
				// console.log(arrId)
				uni.writeBLECharacteristicValue({
				  // 这里的 deviceId 需要在 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取
				  deviceId:'18:93:D7:45:1E:69',
				  // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
				  serviceId:'0000ffe0-0000-1000-8000-00805f9b34fb',
				  // 这里的 characteristicId 需要在 getBLEDeviceCharacteristics 接口中获取
				  characteristicId:'0000ffe1-0000-1000-8000-00805f9b34fb',
				  // 这里的value是ArrayBuffer类型
				  value: buffer,
				  success(res) {
					console.log('写入成功', res.errMsg)
				  },
				  fail(res){
					console.log('写入失败', res) 
				  },
				  complete(res){
					console.log('写入完成', res) 
				  }
				});
			},
			
		}
	}
</script>

<style>
	page{
		width:100%;
		height: 100%;
	}
	body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,code,form,fieldset,legend,input,textarea,p,blockquote,th,td,hr,button,article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{
		padding: 0;
		margin: 0
	}
	.passWord{
		width: 100%;
		height: 30upx;
		line-height: 30upx;
	}
	.policeLogo{
		width:60upx;
		height: 60upx;
		position: absolute;
		top: 10upx;
		left: 20upx;
	}
	.policeLogo img{
		width:60upx;
		height: 60upx;
	}
	.bgClass{
		width:100%;
		height:100%;
		position: absolute;
		top: 0upx;
		left:0upx;
		z-index: -999;
	}
	.bgClass img{
		width:100%;
		height:100%;
		
	}
	.bigBox{
		width:100%;
		height:100%;
		overflow: hidden;
	}
	
	.firstBox{
		width: 80%;
		height: 50%;
		float: left;
		
		
	}
	.iconBox{
		width:200upx;
		height: 200upx;
		text-align: center;
		
		border-radius: 50%;
		position: absolute;
		overflow: hidden;
	}
	.iconBox img{
		width:100%;
		height: 100%;
	}
	.flexBox{
		width:100%;
		height:100%;
		margin:0 auto;
		overflow-y: scroll;
	}
	.line{
		width:960px;
		height: 3px;
	}
	.line img{
		width:960px;
		height: 3px;
	}
	.topTitle{
		width:960px;
		height: 80px;
		line-height: 120px;
		color: #fff;
		font-size: 30px;
		text-align: center;
		z-index: 999;
	}
</style>
