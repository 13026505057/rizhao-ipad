<template>
	<view class="bigBox">
		<view class="policeLogo">
			<img src="../../static/img/policeLogo.png" alt="">
		</view>
		<view class="bgClass">
			<img src="../../static/img/bg.png" alt="">
		</view>
		<view class="flexBox">
			<view class="content">
			    <view class="input-group">
			        <view class="input-row border">
			            <view class="title">账号：</view>
			            <input class="m-input" type="text" clearable  v-model="username" placeholder="请输入账号" />
			        </view>
			        <view class="input-row">
			            <view class="title">密码：</view>
			            <input type="text" displayable v-model="password" placeholder="请输入密码" />
			        </view>
			    </view>
			    <view class="btn-row">
			        <button type="primary" class="primary" @click="bindLogin">登 录</button>
			    </view>
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
				username:'',
				password:''
			}
		},
		onLoad() {
			this.imgSrc = this.$store.state.zhuopai;
			this.meet_title = this.$store.state.meet_title;
			// uni.showModal({
			// 	title: '提示',
			// 	content: '人脸对比失败，请选择操作',
			// 	confirmText:"注册人脸",
			// 	cancelText:'账号登录',
			// 	success: function (res) {
			// 		if (res.confirm) {
			// 			// uni.reLaunch({
			// 			// 	url: '/pages/registFace/registFace'
			// 			// });
			// 			console.log('用户点击确定');
			// 		} else if (res.cancel) {
			// 			console.log('用户点击取消');
			// 			uni.reLaunch({
			// 				url: '/pages/logins/logins'
			// 			});
			// 		}
			// 	}
			// });
		},
		methods: {
			bindLogin(){
				var self = this;
				if(this.username==""||this.password==""){
					uni.showModal({
						title: '提示',
						content: '存在未填写项目',
						confirmText:"确定",
						cancelText:'关闭',
						success: function (res) {
							if (res.confirm) {
					
							} else if (res.cancel) {
								
							}
						}
					});
				}else{
					this.$store.state.username = this.username;
					this.$store.state.password = this.password;
					uni.request({
						url: self.$store.state.requestUrl+'/public/index.php/pad/login/loginNormal', //仅为示例，并非真实接口地址。
						data: {
							user_name:self.username,
							pass_word:self.$md5.hex_md5(self.password),
							pad_code:plus.device.uuid
						},
						method:'POST',
						header: {
							'Content-Type': 'application/json' //自定义请求头信息
						},
						success: (res) => {
							console.log(JSON.stringify(res))
							if(res.data.code==0){
								uni.navigateTo({
									url: '/pages/number/number'
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
				}
				
			},
			backClick(){
				uni.reLaunch({
					url: '/pages/index/index'
				});
			},
			
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
	.title{
		width:150upx!important;
		height:80upx!important;
		display: inline-block;
		/* background-color: #eee; */
		line-height: 80upx;
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
	.content{
		width:500px;
		height: 300px;
		margin:0 auto;
		margin-top:80px;
	}
	.back{
		width:200px;
		height: 50px;
		float: right;
		position: fixed;
		bottom: 0px;
		right: 20px;
	}
	.back img{
		width:200px;
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
		line-height: 300px;
		
		margin:0 auto;
		margin-top: 80px;
		text-align: center;
		font-size: 80px;
		color: #fff;
	}
	.flexBox{
		width:960px;
		height:485px;
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
	.backBtn{
		width:60px;
		height: 60px;
		position: absolute;
		top:25px;
		right: 20px;
		background-image: url('../../static/img/backBtn.png');
		background-size: 60px 60px;
	}
</style>
