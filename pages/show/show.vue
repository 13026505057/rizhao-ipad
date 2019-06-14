<template>
	<view class="bigBox" @click.stop="boxClick">
		
		<view class="bgClass">
			<img src="../../static/img/bgPolice.png" alt="">
		</view>
		<view  @click.stop="noneClick" class="cu-modal show" v-if="isPassWord=='1'?true:false">
		  <view class="cu-dialog">
			<view class="cu-bar bg-gradual-blue justify-end">
			  <view class="content bg-gradual-blue" style="line-height:20px;">修改名称</view>
			  <view class="action" bindtap="hideModal">
				<text class="cuIcon-close text-red"></text>
			  </view>
			</view>
			<view class="padding-xl">
			  <input type="text" adjust-position class="passWord" v-model="roomName"  placeholder="请输入名称" />
			</view>
			<view class="cu-bar bg-white justify-end">
			  <view class="action">
				<button class="cu-btn line-green text-green" @click="hideModal">取消</button>
				<button class="cu-btn bg-green margin-left" @click="loginClick">确定</button>
		
			  </view>
			</view>
		  </view>
		</view>
		<view  @click.stop="noneClick1" class="cu-modal show" v-if="isRoom">
		  <view class="cu-dialog">
			<view class="cu-bar bg-gradual-blue justify-end">
			  <view class="content bg-gradual-blue" style="line-height:20px;">设置房间</view>
			  <view class="action" bindtap="hideModal">
				<text class="cuIcon-close text-red"></text>
			  </view>
			</view>
			<view class="padding-xl">
			  <input type="text" adjust-position class="passWord" v-model="roomId"  placeholder="请输入房间id" />
			</view>
			<view class="cu-bar bg-white justify-end">
			  <view class="action">
				<button class="cu-btn line-green text-green" @click="hideRoomModal">取消</button>
				<button class="cu-btn bg-green margin-left" @click="roomCliclk">确定</button>
		
			  </view>
			</view>
		  </view>
		</view>
		<view class="roomClass" @click.stop="roomNameClick">
			{{roomName}}
		</view>
		<view class="wenduClass">
			{{tep}}℃
		</view>
		<view class="shiduClass">
			{{hum}}%
		</view>
		<view class="timeClass">
			{{hours}}:{{minutes}}
		</view>
		<view class="dateClass">
			{{month}}月{{day}}日,星期{{xingqi}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				roomName:'点击设置房间名',
				isPassWord:0,
				timer:null,
				isRoom:false,
				roomId:'',
				hours:'',
				minutes:'',
				month:'',
				day:'',
				xingqi:'',
				countNum:0,
				tep:'',
				hum:''
			}
		},
		onLoad() {
			
			try {
				var value = uni.getStorageSync('roomName');
				if (value) {
					this.roomName = value;
					console.log(value)
				}
			} catch (e) {
				// error
			}
			
		},
		onShow() {
			var self = this;
			self.getTime();
			self.getRoomTepHum();
			self.timer = setInterval(function(){
				self.getTime();
				self.getRoomTepHum();
			},60000)
		},
		onHide() {
			var self = this;
			clearInterval(self.timer)
		},
		methods: {
			changeRoomclick(){
				this.isPassWord = false;
				this.isRoom = true;
			},
			getTime(){
				var self = this;
				var myDate = new Date();
				this.hours = myDate.getHours();
				this.minutes = myDate.getMinutes(); 
				if(this.minutes<10){
					this.minutes = '0'+this.minutes;
				}
				this.month = myDate.getMonth()+1;
				this.day = myDate.getDate();
				this.xingqi = myDate.getDay();
				console.log(this.xingqi)
				switch(this.xingqi)
				{
					case 0:
					   self.xingqi = '日';
					  break;
					case 1:
					   self.xingqi = '一';
					  break;
					case 2:
					   self.xingqi = '二';
					  break;
					case 3:
					   self.xingqi = '三';
					  break;
					case 4:
					   self.xingqi = '四';
					  break;
					case 5:
					   self.xingqi = '五';
					  break;
					case 6:
					   self.xingqi = '六';
					  break;
					default:  
				}
			},
			roomCliclk(){
				var self = this;
				uni.showModal({
					title: '提示',
					content: '确定设置房间？',
					success: function (res) {
						if (res.confirm) {
							try {
								uni.setStorageSync('room_id',self.roomId);
								uni.showToast({
									title: '设置成功',
									duration: 2000
								});
								
								setTimeout(function(){
									self.isRoom = false;
									uni.navigateBack({
										delta: 1
									});
								},2000)
							} catch (e) {
								uni.showToast({
									title: '设置失败',
									duration: 2000
								});
							}
						} else if (res.cancel) {
							console.log('用户点击取消');
							self.isRoom = false;
						}
					}
				});
			},
			hideRoomModal(){
				this.isRoom = false;
			},
			getRoomTepHum(){
				var self = this;
				try {
					const value = uni.getStorageSync('room_id');
					if (value) {
						uni.request({
							url: self.$store.state.requestUrl+'/public/index.php/pad/Tephum/getRoomTepHum', //仅为示例，并非真实接口地址。
							data: {
								room_id:value
							},
							method:'POST',
							header: {
								'Content-Type': 'application/json' //自定义请求头信息
							},
							success: (res) => {
								console.log(JSON.stringify(res))
								if(res.data.code==0){
									self.tep = res.data.roomTepHum.tep;
									self.hum = res.data.roomTepHum.hum;
								}else{
									
								}
							}
						});
					}else{
						clearInterval(self.timer);
						uni.showModal({
							title: '提示',
							content: '未绑定房间，请设置房间',
							success: function (res) {
								if (res.confirm) {
									console.log('用户点击确定');
									self.isRoom = true;
								} else if (res.cancel) {
									console.log('用户点击取消');
									uni.navigateBack({
										delta: 1
									});
								}
							}
						});
					}
				} catch (e) {
					uni.showModal({
						title: '提示',
						content: '获取房间失败，请设置房间',
						success: function (res) {
							if (res.confirm) {
								console.log('用户点击确定');
								self.isRoom = true;
							} else if (res.cancel) {
								console.log('用户点击取消');
								uni.navigateBack({
									delta: 1
								});
								
							}
						}
					});
				}
				
			},
			noneClick(){
				this.countNum++;
				if(this.countNum>10){
					this.isPassWord = false;
					this.isRoom = true;
					this.countNum = 0;
				}
			},
			noneClick1(){
				console.log(111)
			},
			boxClick(){
				uni.navigateBack({
					delta: 1
				});
			},
			roomNameClick(){
				this.isPassWord = 1;
			},
			hideModal(){
				this.isPassWord = 0;
			},
			loginClick(){
				var self = this;
				uni.setStorage({
					key: 'roomName',
					data: self.roomName,
					success: function () {
						self.isPassWord = 0;
					}
				});
			}
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
	.roomClass{
		width:800upx;
		height: 200upx;
		line-height: 200upx;
		text-align: center;
		/* background-color: red; */
		margin-left:300upx;
		margin-top: 20upx;
		font-size: 60upx;
		font-weight: bold;
		color: #0302a5;
	}
	.dateClass{
		width:500upx;
		height: 50upx;
		line-height: 50upx;
		text-align: center;
		/* background-color: red; */
		margin-left:30upx;
		margin-top: 30upx;
		font-size: 60upx;
		font-weight: bold;
		color: #fff;
		/* background-color: blue; */
	}
	.timeClass{
		width:400upx;
		height: 50upx;
		line-height: 50upx;
		text-align: center;
		/* background-color: red; */
		margin-left:30upx;
		margin-top: 210upx;
		font-size: 60upx;
		font-weight: bold;
		color: #fff;
		/* background-color: red; */
	}
	.wenduClass{
		width:220upx;
		height: 50upx;
		line-height: 50upx;
		text-align: center;
		float: left;
		/* background-color: red; */
		margin-left:30upx;
		margin-top: 60upx;
		font-size: 60upx;
		font-weight: bold;
		color: #fff;
		/* background-color: red; */
	}
	.shiduClass{
		width:220upx;
		height: 50upx;
		line-height: 50upx;
		float: left;
		text-align: center;
		/* background-color: red; */
		margin-left:40upx;
		margin-top: 60upx;
		font-size: 60upx;
		font-weight: bold;
		color: #fff;
		/* background-color: red; */
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
	
	
</style>
