<template>
	<view>
	    <web-view :src="htmlUrl"  @message="handleMessage"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgSrc:'',
				meet_title:'',
				meetingAgendaList:[],
				htmlUrl:'',
			}
		},
		onLoad() {
			uni.showToast({
				title: '渲染文件中',
				icon:'loading',
				mask:true,
				duration: 6000
			});
			this.imgSrc = this.$store.state.caidan;
			this.meet_title = this.$store.state.meet_title;
			this.htmlUrl = this.$store.state.htmlUrl+this.$store.state.fileUrl;
			this.getMeetAgenda();
		},
		methods: {
			backClick(){
				uni.reLaunch({
					url: '/pages/index/index'
				});
			},
			fileclick(res){
				console.log(res)
				uni.downloadFile({
				  url: res,
				  success: function (res) {
					var filePath = res.tempFilePath;
					uni.openDocument({
					  filePath: filePath,
					  success: function (res) {
						console.log('打开文档成功');
					  },
					  fail:function(res){
						 console.log(JSON.stringify(res));
						 uni.showToast({
						 	icon:'loading',
						 	title: res.data.msg,
						 	duration: 2000
						 });
					  }
					});
				  },
				  fail:function(res){
					  console.log(res)
					  uni.showToast({
					  	icon:'loading',
					  	title: res.data.msg,
					  	duration: 2000
					  });
				  }
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
					url: self.$store.state.requestUrl+'/meet/file/getByPage', //仅为示例，并非真实接口地址。
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
							for(var i = 0; i < self.meetingAgendaList.length;i++){
								if(self.meetingAgendaList[i].file_type=='doc'||self.meetingAgendaList[i].file_type=='docx'){
									self.meetingAgendaList[i].fileTypeUrl = '../../static/img/word.png';
								}else if(self.meetingAgendaList[i].file_type=='pdf'){
									self.meetingAgendaList[i].fileTypeUrl = '../../static/img/pdf.png'
								}else if(self.meetingAgendaList[i].file_type=='xls'||self.meetingAgendaList[i].file_type=='xlsx'){
									self.meetingAgendaList[i].fileTypeUrl = '../../static/img/excle.png'
								}else{
									
								}
							}
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
		margin: 0;
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
	.fileType1{
		 float:left;
		 margin-left:20px;
		 margin-top:10px;
		  width:40px;
		  height:40px;
	}
	.fileType2{
		  float:right;
		  margin-right:20px;
		  margin-top:10px; 
		  width:80px;
		  height:40px;
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
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
		font-size: 20px;
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
