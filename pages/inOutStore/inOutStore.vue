<template>
	<view class="bigBox">
		<view class="policeLogo">
			<img src="../../static/img/policeLogo.png" alt="">
		</view>
		<view class="bgClass">
			<img src="../../static/img/bg.png" alt="">
		</view>
		<view class="topNav">
			<view class="navItem">
				<scroll-view scroll-x class="navScroll" scroll-with-animation scroll-left="20">
				  <view :class="navClass=='1'?'scrollItem1':'scrollItem'"  @click="navClick('1')">
					待入库
				  </view>
				  <view :class="navClass=='2'?'scrollItem2':'scrollItem'"  @click="navClick('2')">
				  	待出库
				  </view>
				  <view :class="navClass=='3'?'scrollItem3':'scrollItem'"  @click="navClick('3')">
				  	待盘点
				  </view>
				</scroll-view>
			</view>
			<view class="navItem" style="width: 0.4%;height: 100%;background-color: #fff;">
				
			</view>
			<view class="navItem" style="border-bottom:2upx solid  #fff;">
				待操作物品列表
			</view>
		</view>
		<view class="flexBox">
			<view class="item" style="">
				<view v-if="navClass==3?false:true" :class="isThis==index?'caseClass1':'caseClass'" v-for="(item,index) in dataList" :key="index" @click="caseDetailClick(item.exhibits,index)">
					<span>{{index+1}}. {{item.case_name}}</span>
				</view>
				<view v-if="navClass==3?true:false" :class="isThis==index?'caseClass1':'caseClass'" v-for="(item,index) in dataList" :key="index" @click="checkDetailClick(item.check_head_id,index)">
					
					<span>{{index+1}}. {{item.check_name}}</span>
					
				</view>
			</view>
			<view class="item" style="width:0.4%;height: 100%;">
				<image style="width:100%;height: 100%;" src="../../static/img/yLine.png" mode=""></image>
			</view>
			<view class="item" >
				<view class="caseClass" v-for="(item,index) in exhibitsList" :key="index" >
					{{index+1}}. {{item.exhibit_name}}
				</view>
			</view>
			
		</view>
		<view class="back" @click="openDoorClick">
			<!-- <img src="../../static/img/openDoor.png" alt=""> -->
			继 续
		</view>
		<view class="back1" @click="returnBackClick">
			返 回
			<!-- <img src="../../static/img/returnBack.png" alt=""> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				TabCur:0,
				navClass:'1',
				dataList:'',
				exhibitsList:'',
				isThis:0,
				
			}
		},
		onLoad() {
			this.getDataList(1)
		},
		methods: {
			checkDetailClick(resp,resp1){
				var self = this;
				uni.request({
					url: self.$store.state.requestUrl+'/public/index.php/pad/check/getCheckLines', //仅为示例，并非真实接口地址。
					data: {
						check_head_id:resp
					},
					method:'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						console.log(JSON.stringify(res))
						if(res.data.code==0){
							self.exhibitsList = res.data.checkLines;
							self.isThis = resp1;
							// if(resp==3){
							// 	self.dataList = res.data.checkHeads;
							// 	self.exhibitsList ='';
							// 	self.isThis = 0;
							// }else{
							// 	self.dataList = res.data.cases;
							// 	self.exhibitsList = res.data.cases[0].exhibits;
							// 	self.isThis = 0;
							// }
							
							// uni.hideLoading();
						}else{
							
						}
					}
				});
			},
			caseDetailClick(res,index){
				this.exhibitsList = res;
				this.isThis = index;
			},
			navClick(res){
				
				this.navClass = res;
				this.getDataList(res);
				
			},
			openDoorClick(){
				uni.redirectTo({
					url:'/pages/login/login'
				});
			},
			returnBackClick(){
				uni.navigateBack({
					delta: 1
				});
			},
			getDataList(resp){
				var self = this;
				var requestUrlLocal = '';
				if(resp==1){
					requestUrlLocal = this.$store.state.requestUrl+'/public/index.php/pad/cases/getNeedIn'
				}else if(resp==2){
					requestUrlLocal = this.$store.state.requestUrl+'/public/index.php/pad/cases/getNeedOut'
				}else{
					requestUrlLocal = this.$store.state.requestUrl+'/public/index.php/pad/check/getByPage'
				}
				uni.showLoading({
					title: '加载中'
				});
				uni.request({
					url: requestUrlLocal, //仅为示例，并非真实接口地址。
					data: {
						
					},
					method:'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						console.log(JSON.stringify(res))
						if(res.data.code==0){
							if(resp==3){
								self.dataList = res.data.checkHeads;
								self.exhibitsList ='';
								self.isThis = 0;
							}else{
								if(res.data.cases.length>0){
									self.dataList = res.data.cases;
									self.exhibitsList = res.data.cases[0].exhibits;
									self.isThis = 0;
								}else{
									self.dataList = '';
									self.exhibitsList = '';
									self.isThis = 0;
								}
								
							}
							
							uni.hideLoading();
						}else{
							
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
	.caseClass{
		width: 100%;
		height: 50upx;
		line-height: 50upx;
		text-indent: 10upx;
		color: #fff;
		border-bottom: 1px solid #fff;
		font-size: 20upx;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.caseClass1{
		width: 100%;
		height: 50upx;
		line-height: 50upx;
		text-indent: 10upx;
		color: #fff;
		border-bottom: 1px solid #fff;
		font-size: 20upx;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
		background-color: #F37B1D;
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
	.navScroll{
		width: 100%;
		height: 100%;
		overflow-x:scroll;
	}
	.scrollItem{
		width: 33.3%;
		height: 100%;
		float: left;
		line-height: 60upx;
		text-align: center;
		border-bottom: 2upx solid #fff;
	}
	.scrollItem1{
		width: 33.3%;
		height: 100%;
		float: left;
		line-height: 60upx;
		text-align: center;
		
		border-right: 1upx solid #fff;
	}
	.scrollItem2{
		width: 33.3%;
		height: 100%;
		float: left;
		line-height: 60upx;
		text-align: center;
		border-left: 1upx solid #fff;
		border-right: 1upx solid #fff;
	}
	.scrollItem3{
		width: 33.3%;
		height: 100%;
		float: left;
		line-height: 60upx;
		text-align: center;
		border-left: 1px solid #fff;
		
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
		margin-top: 7%;
		overflow: hidden;
		border:2px solid #fff;
		border-bottom: none;
	}
	.item{
		width: 49.8%;
		height: 100%;
		overflow-y: scroll;
		float: left;
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
		height:65%;
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
