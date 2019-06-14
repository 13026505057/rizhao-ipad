<template>
	<view class="bigBox">
		<!-- <img class="bigBoxImg" :src="imgSrc" alt=""> -->
		<!-- <view class="topTitle">
			{{meet_title}}
		</view>
		<view class="line">
			<img src="../../static/img/line.png" alt="">
		</view> -->
		<view class="policeLogo">
			<img src="../../static/img/policeLogo.png" alt="">
		</view>
		<view class="bgClass">
			<img src="../../static/img/bg.png" alt="">
		</view>
		<view class="flexBox">
			<view class="number1">
				<img style="width:350px;height:200px;float:left;" :src="userInfo.face_url" alt="">
			</view>
			<view class="number">
				<p style="margin-top:60px;;">姓名：{{userInfo.user_true_name}}</p>
				<p style="">电话：{{userInfo.user_tel}}</p>
				
			</view>
			<view class="back" @click="openDoorClick">
				<!-- <img src="../../static/img/openDoor.png" alt=""> -->
				删 除
			</view>
			<view class="back1" @click="returnBackClick">
				返 回
				<!-- <img src="../../static/img/returnBack.png" alt=""> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
				user_true_name:'',
				mac_id:'',
				headUrl:'',
				user_id:'',
				userInfo:{
					user_true_name:'',
					user_tel:'',
					face_url:""
					
				},
				
				
			}
		},
		onLoad(option) {
			console.log(option)
			
			this.user_id = option.user_id;
			this.getUserInfo();
		},
		methods: {
			openDoorClick(){
				var self = this;
				uni.showModal({
					title: '提示',
					content: '确认删除人脸？',
					success: function (res) {
						if (res.confirm) {
							
							uni.request({
								url: self.$store.state.requestUrl+'/public/index.php/pad/login/del', //仅为示例，并非真实接口地址。
								data: {
									user_id:self.user_id,
									pad_code:plus.device.uuid
								},
								method:'POST',
								header: {
									'Content-Type': 'application/json' //自定义请求头信息
								},
								success: (res) => {
									
									if(res.data.code==0){
										uni.showToast({
											icon:'success',
											title: '删除成功',
											duration: 2000
										});
										uni.navigateBack({
											delta: 1
										});
									}else{
										uni.showToast({
											icon:'loading',
											title: res.data.msg,
											duration: 2000
										});
									}
								}
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			bleSendMsg(){
				var buffer = new ArrayBuffer(5)
				var dataView = new DataView(buffer)
				dataView.setUint8(0, 82);
				dataView.setUint8(1, 76);
				dataView.setUint8(2, 50);
				dataView.setUint8(3, 50);
				dataView.setUint8(4, 50)
				// console.log(ab2hex(dataView))
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
			returnBackClick(){
				uni.navigateBack({
					delta: 1
				});
			},
			getUserInfo(){
				var self = this;
				uni.request({
					url: self.$store.state.requestUrl+'/public/index.php/pad/login/getUserInfoById', //仅为示例，并非真实接口地址。
					data: {
						user_id:self.user_id
					},
					method:'POST',
					header: {
						'Content-Type': 'application/json' //自定义请求头信息
					},
					success: (res) => {
						console.log(JSON.stringify(res))
						if(res.data.code==0){
							// console.log(1)
							self.userInfo.user_true_name = res.data.userInfo.user_true_name;
							self.userInfo.user_tel = res.data.userInfo.user_tel;
							self.userInfo.face_url = res.data.face[0].face_url;
						}else{
							uni.showToast({
								icon:'loading',
								title: res.data.msg,
								duration: 2000
							});
						}
					}
				});
			}
		}
	}
</script>

<style>
	page{
		width:100%;
	}
	body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,code,form,fieldset,legend,input,textarea,p,blockquote,th,td,hr,button,article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{
		padding: 0;
		margin: 0
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
	.back{
		width:150upx;
		height: 60upx;
		float: right;
		position: fixed;
		bottom: 10upx;
		right: 200upx;
		background-color: red;
		color: #fff;
		line-height: 60upx;
		text-align: center;
		border:1px solid red;
		border-radius: 10upx;
	}
	.back1{
		width:150upx;
		height: 60upx;
		float: right;
		position: fixed;
		bottom: 10upx;
		right: 20upx;
		background-color: #ccc;
		color: #000;
		line-height: 60upx;
		text-align: center;
		border:1px solid #ccc;
		border-radius: 10upx;
	}
	.back img{
		width:200px;
		height: 50px;
		
	}
	.back1 img{
		width:150px;
		height: 50px;
		
	}
	.bigBoxImg{
		width: 960px;
		height: 565px;
		position: absolute;
		top:0px;
		left:0px;
		z-index: -999;
	}
	.number{
		width:300px;
		height: 300px;
		line-height: 80px;
		margin:0 auto;
		margin-top: 80px;
		margin-right: 200px;
		/* text-align: center; */
		font-size: 30px;
		color: #fff;
	}
	.number p{
		width:300px;
		height: 70px;
		float:left;
		margin-left: 50px;
		border:1 px solid #fff;
	}
	.number1{
		width:250px;
		height: 200px;
		line-height: 300px;
		margin:0 auto;
		margin-top: 120px;
		margin-left: 150px;
		float: left;
		text-align: center;
		font-size: 80px;
		color: #fff;
		overflow: hidden;
		border:1px solid #fff;
	}
	.flexBox{
		width:960px;
		height:485px;
		overflow: hidden;
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
