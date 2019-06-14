<template>
	<view class="bigBox">
		<view class="policeLogo">
			<img src="../../static/img/policeLogo.png" alt="">
		</view>
		<view class="bgClass">
			<img src="../../static/img/bg.png" alt="">
		</view>
		<view class="item" style="margin-top: 150upx;" @click="faceMange">
			<image src="../../static/img/face.png" mode=""></image><span>人脸管理</span>
		</view>
		<view class="item"  @click="bleMange">
			<image src="../../static/img/bleIcon.png" mode=""></image><span>门锁管理</span>
		</view>
		<view class="item" @click="pwdClick">
			<image src="../../static/img/about.png" mode=""></image><span>密码设置</span>
		</view>
		<view @click.stop="seeClick" class="cu-modal show" v-if="isPassWord=='1'?true:false">
		  <view class="cu-dialog">
			<view class="cu-bar bg-gradual-blue justify-end">
			  <view class="content bg-gradual-blue" style="line-height:20px;">修改密码</view>
			  <view class="action" @click.stop="hideModal">
				<text class="cuIcon-close text-red">X</text>
			  </view>
			</view>
			<view class="padding-xl">
			  <input type="password" adjust-position class="passWord" v-model="password"  placeholder="请输入新密码" />
			</view>
			<view class="cu-bar bg-white justify-end">
			  <view class="action">
				<button class="cu-btn line-green text-green" @click.stop="hideModal">取消</button>
				<button class="cu-btn bg-green margin-left" @click.stop="changePwdClick">确定</button>
		
			  </view>
			</view>
		  </view>
		</view>
		<view  class="cu-modal show" v-if="isIp">
		  <view class="cu-dialog">
			<view class="cu-bar bg-gradual-blue justify-end">
			  <view class="content bg-gradual-blue" style="line-height:20px;">修改Ip</view>
			  <view class="action" @click.stop="hideModalIp">
				<text class="cuIcon-close text-red">X</text>
			  </view>
			</view>
			<view class="padding-xl">
			  <input type="text" adjust-position class="passWord" v-model="ipconfig"  placeholder="请输入ip" />
			</view>
			<view class="cu-bar bg-white justify-end">
			  <view class="action">
				<button class="cu-btn line-green text-green" @click.stop="hideModalIp">取消</button>
				<button class="cu-btn bg-green margin-left" @click.stop="changeIpClick">确定</button>
		
			  </view>
			</view>
		  </view>
		</view>
		<!-- <view class="flexBox">
			
			
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				TabCur:0,
				isPassWord:0,
				password:'',
				isIp:false,
				ipconfig:'',
				countNum:0
				
			}
		},
		onLoad() {
			
		},
		methods: {
			changeIpClick(){
					var self = this;
					uni.showModal({
						title: '提示',
						content: '确定设置Ip？',
						success: function (res) {
							if (res.confirm) {
								try {
									uni.setStorageSync('ip',self.ipconfig);
									uni.showToast({
										title: '设置成功',
										duration: 2000
									});
									self.$store.state.requestUrl = 'http://'+self.ipconfig+'/exhibit';
									self.$store.state.sourceUrl =  'http://'+self.ipconfig+'/static/';
									self.$store.state.wsUrl =  'ws://'+self.ipconfig+':8002/';
									setTimeout(function(){
										self.isIp = false;
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
								self.isIp = false;
							}
						}
					});
			},
			hideModalIp(){
				this.isIp = false;
			},
			seeClick(){
				this.countNum++;
				if(this.countNum>10){
					this.isPassWord = 0;
					this.isIp = true;
					this.countNum = 0;
				}else{
					
				}
			},
			faceMange(){
				uni.navigateTo({
					url: '/pages/faceList/faceList'
				});
			},
			bleMange(){
				uni.navigateTo({
					url: '/pages/bleList/bleList'
				});
			},
			pwdClick(){
				this.isPassWord = 1;
			},
			hideModal(){
				this.isPassWord = 0;
			},
			changePwdClick(){
				var self  = this;
				uni.setStorage({
					key: 'ipad_pwd',
					data: self.password,
					success: function () {
						uni.showToast({
							title: '设置成功',
							icon:'success',
							duration: 2000
						});
						self.isPassWord = 0;
					},
					fail() {
						uni.showToast({
							title: '设置失败请重试',
							icon:'loading',
							duration: 2000
						});
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
		width: 300upx;
		height: 80upx;
		line-height: 80upx;
		margin:0 auto;
		color: #fff;
		text-align: center;
		letter-spacing: 10upx;
		border-bottom: 1px solid #fff;
		position: relative;
	}
	.item image{
		width: 50upx;
		height: 50upx;
		position: absolute;
		top: 13upx;
		left:6upx;
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
		width:85%;
		height:85%;
		margin:0 auto;
		
		overflow: hidden;
		border:2px solid #fff;
		border-top: none;
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
