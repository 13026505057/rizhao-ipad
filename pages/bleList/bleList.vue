<template>
	<view class="bigBox">
		<view class="policeLogo">
			<img src="../../static/img/policeLogo.png" alt="">
		</view>
		<view class="bgClass">
			<img src="../../static/img/bg.png" alt="">
		</view>
		
		<view class="flexBox">
			<view class="item"  v-for="(item,index) in bleList" :key='index' @click="bleConfig(item.deviceId)">
				<image src="../../static/img/ble.png" mode=""></image>
				<span>{{item.deviceId}}</span>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				TabCur:0,
				bleList:[]
				
			}
		},
		onLoad() {
			this.bleSearch();
		},
		
		methods: {
			//停止搜索设备
			bleFindStop(){
				var self = this;
				uni.stopBluetoothDevicesDiscovery({
				  success(res) {
					  
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
			bleConfig(resp){
				var self = this;
				uni.showModal({
					title: '提示',
					content: '确定配置门锁？',
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定');
							uni.setStorage({
								key: 'ble_key',
								data: resp,
								success: function () {
									self.bleFindStop();
									uni.closeBluetoothAdapter({
									  success(res) {
										console.log(res)
									  }
									})
									uni.showToast({
										title: '设置成功,请稍后',
										duration: 5000
									});
									setTimeout(function(){
										
										uni.reLaunch({
											url: '/pages/index/index'	
										});
									},5000)
									
								}
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			//断开蓝牙链接
			bleClose(res){
				var self = this;
				uni.closeBLEConnection({
				  deviceId:""+res,
				  success(res) {
					console.log(res);
					
				  }
				})
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
								
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				  }
				});
			},
			bleFind(){
				var self = this;
				uni.onBluetoothDeviceFound(function (devices) {
				  console.log('新设备被找到');
				  console.log(devices)
				  if(self.bleList.length==0){
				  	self.bleList.push(devices.devices[0])				  
				  }else{
				  	for(var i = 0; i < self.bleList.length; i++){
				  						  
				  		if(self.bleList[i].deviceId == devices.devices[0].deviceId){
				  			return;
				  		}else{
							self.bleList.push(devices.devices[0])
				  		}
				  	}		
					
				  }
				  
				 
				  // for(var i = 0; i < devices.devices.length; i++ ){
					 // if(self.$store.state.deviceId==devices.devices[i].deviceId){
						// 
					 // 	console.log('找到需要的设备');
						// self.bleFindStop();
						// self.bleConnet();
					 // }
				  // }
				  
				  
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
	.navScroll{
		width: 100%;
		height: 100%;
		overflow-x:scroll;
	}
	.scrollItem{
		width: 30%;
		height: 100%;
		line-height: 60upx;
		text-align: center;
		border-bottom: 2px solid #fff;
	}
	.navItem{
		width: 49.8%;
		height: 100%;
		overflow: hidden;
		float: left;
		color: #fff;
		line-height: 60upx;
		text-align: center;
		
	}
	.topNav{
		width:85%;
		height:10%;
		margin:0 auto;
		margin-top: 5%;
		overflow: hidden;
		border:2px solid #fff;
		border-bottom: none;
	}
	.item{
		width: 240upx;
		height: 270upx;
		float: left;
		text-align: center;
		color: #fff;
		border-bottom: 1px solid #fff;
		border-right: 1px solid #fff;
	}
	.item image{
		width: 220upx;
		height: 200upx;
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
		width:81%;
		height:85%;
		margin:0 auto;
		margin-top: 5%;
		overflow: scroll;
		border:2px solid #fff;
		
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
