<template>
	<view class="bigBox">
		<view class="policeLogo">
			<img src="../../static/img/policeLogo.png" alt="">
		</view>
		<view class="bgClass">
			<img src="../../static/img/bg.png" alt="">
		</view>
		
		<view class="flexBox">
			<view class="item" @click="faceDetail(item.user_id)" v-for="(item,index) in faceList" :key="index">
				<image :src="item.face_url" mode=""></image>
				<span>{{item.user_true_name}}</span>
			</view>
			
		</view>
		<view class="back" @click="registFace">
			<!-- <img src="../../static/img/openDoor.png" alt=""> -->
			注 册
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				TabCur:0,
				faceList:[]
				
			}
		},
		onLoad() {
			
		},
		onShow() {
			this.getFaceList();
		},
		methods: {
			registFace(){
				uni.navigateTo({
					url: '/pages/faceFail/faceFail'
				});
			},
			faceDetail(res){
				uni.navigateTo({
					url: '/pages/faceDetail/faceDetail?user_id='+res
				});
			},
			getFaceList(){
				var self = this;
				uni.request({
					url: self.$store.state.requestUrl+'/public/index.php/pad/login/getFaceUser', //仅为示例，并非真实接口地址。
					data: {
						
					},
					method:'POST',
					header: {
						'Content-Type': 'application/json' //自定义请求头信息
					},
					success: (res) => {
						
						if(res.data.code==0){
							console.log(JSON.stringify(res));
							self.faceList = res.data.faces;
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
		height: 100%;
	}
	body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,code,form,fieldset,legend,input,textarea,p,blockquote,th,td,hr,button,article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{
		padding: 0;
		margin: 0
	}
	.back{
		width:120upx;
		height: 50upx;
		float: right;
		position: fixed;
		bottom: 10upx;
		right: 10upx;
		background-color: red;
		color: #fff;
		line-height: 50upx;
		text-align: center;
		border:1px solid red;
		border-radius: 10upx;
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
		height:80%;
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
