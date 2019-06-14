<template>
	<view class="bigBox">
		<img class="bigBoxImg" :src="imgSrc" alt="">
		<view class="topTitle">
			{{meet_title}}
		</view>
		<view class="backBtn" @click="backClick()">
			
		</view>
		<view class="line">
			<img src="../../static/img/line.png" alt="">
		</view>
		<view class="flexBox">
			<view class="firstBox">
				<view class="agendaList-item" v-for="(item,index) in meetingAgendaList" :key="index" @click="voteClick(item)">
					<span >{{item.vote_order}}.{{item.vote_name}}</span>
					<span v-if="item.vote_begin_status=='after'?true:false" class="resultBtn" @click="voteResult(item)">显示结果</span>
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
				meetingAgendaList:[]
			}
		},
		onLoad() {
			this.imgSrc = this.$store.state.caidan;
			this.meet_title = this.$store.state.meet_title;
			this.getMeetAgenda();
		},
		methods: {
			backClick(){
				uni.reLaunch({
					url: '/pages/index/index'
				});
			},
			voteClick(res){
				console.log(res)
				this.$store.state.vote_id = res.vote_id;
				this.$store.state.vote_name = res.vote_name;
				this.$store.state.vote_type = res.vote_type;
				this.$store.state.vote_option = res.vote_option;
				uni.reLaunch({
					url: '/pages/voteDetail/voteDetail'
				});
				
			},
			voteResult(res){
				this.$store.state.vote_id = res.vote_id;
				this.$store.state.vote_name = res.vote_name;
				this.$store.state.vote_type = res.vote_type;
				this.$store.state.vote_option = res.vote_option;
				uni.reLaunch({
					url: '/pages/voteResult/voteResult'
				});
			},
			getMeetAgenda(){
				var self = this;
				// var params = new URLSearchParams();   
    //             params.append('pageNum',1);   
    //             params.append('pageSize',100);
				// params.append('meet_id',self.$store.state.meet_id);
				console.log(self.$store.state.meet_id)
				uni.request({
					url: self.$store.state.requestUrl+'/vote/getByPage', //仅为示例，并非真实接口地址。
					data: {
						pageNum:1,
						pageSize:100,
						meet_id:self.$store.state.meet_id
					},
					method:'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						console.log(JSON.stringify(res))
						if(res.data.code==0){
							self.meetingAgendaList = res.data.data.list;
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
	.bigBox{
		width: 960px;
		height: 565px;
		overflow: hidden;
	}
	.bigBoxImg{
		width: 960px;
		height: 565px;
		position: absolute;
		top:0px;
		left:0px;
		z-index: -999;
	}
	.resultBtn{
		display: inline-block;
		width:100px;
		height: 40px;
		margin-top:10px;
		line-height: 40px;
		font-size:17px;
		color: #2F9614;
		float: right;
		text-align: center;
		border:1px solid #2F9614;
		border-radius: 10px;
		
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
	.firstBox{
		width: 660px;
		
		height: 410px;
		margin:0 auto;
		text-align: center;
		margin-top: 50px;
		overflow-y: scroll;
		border:2px solid #2F9614;
		border-radius: 20px;
		background-color:#DBEDC5;
	}
	.agendaList-item{
		width:600px;
		height: 60px;
		margin:0 auto;
		line-height: 60px;;
		border-bottom: 1px solid #fff;
		color:#000;
		text-align: left;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.iconBox{
		flex: 1;
		height: 140px;
		text-align: center;
		
	}
	.iconBox img{
		width:70%;
		height: 100%;
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
</style>
