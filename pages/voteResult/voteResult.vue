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
		<view class="topTitle1" style="font-size:25px;">
			{{vote_name}}
		</view>
		<view class="topTitle1" style="magin-top:10px;line-height:20px;">
			<span style="margin-right:20px;">应到人数：{{quorum}}</span><span style="margin-left:20px;">实到人数：{{attended}}</span>
		</view>
		<view class="flexBox">
			<!-- 评议 -->
			<view class="firstBox"  v-if="vote_type=='pingyi'?true:false">
				
                
				<view class="agendaList-item-item" v-for="(item,index) in meetingAgendaList" :key="index" @click="itemclick(index)">
					<view class="item-top">
						<span>{{item.option_order}}.{{item.option_name}}</span>
					</view>
					<view class="item-bottom">
						<view class="item-bottom_item" v-for="(item1,index1) in item.results" :key="index1">
							<view class="item-bottom_item_item" style="border-bottom:1px solid #fff;">
								{{item1.vote_result}}
							</view>
							<view class="item-bottom_item_item" style="color:#2F9614;">
								{{item1.quantity}}
							</view>
						</view>
						<!-- <view class="item-bottom_item" >
							<view class="item-bottom_item_item" style="border-bottom:1px solid #fff;">
								结果
							</view>
							<view class="item-bottom_item_item" style="color:#2F9614;">
								{{item.is_pass}}
							</view>
						</view> -->
					</view>
				</view>
			</view>
			<!-- 表决 -->
			<view :class="vote_type=='biaojue'?'firstBoxLittle':'firstBox'"  v-if="vote_type=='biaojue'?true:false">
				<view class="agendaList-item-item" v-for="(item,index) in meetingAgendaList" :key="index" @click="itemclick(index)">
					<view class="item-top">
						<span>{{item.option_order}}.{{item.option_name}}</span>
					</view>
					<view class="item-bottom">
						<view class="item-bottom_item" v-for="(item1,index1) in item.results" :key="index1">
							<view class="item-bottom_item_item" style="border-bottom:1px solid #fff;">
								{{item1.vote_result}}
							</view>
							<view class="item-bottom_item_item" style="color:#2F9614;">
								{{item1.quantity}}
							</view>
						</view>
						<!-- <view class="item-bottom_item" >
							<view class="item-bottom_item_item" style="border-bottom:1px solid #fff;">
								结果
							</view>
							<view class="item-bottom_item_item" style="color:#2F9614;">
								{{item.is_pass}}
							</view>
						</view> -->
					</view>
				</view>
			</view>
			<!-- 多项表决 -->
			<view class="firstBox"  v-if="vote_type=='biaojues'?true:false">
				
			    
				<view class="agendaList-item-item" v-for="(item,index) in meetingAgendaList" :key="index" @click="itemclick(index)">
					<view class="item-top">
						<span>{{item.option_order}}.{{item.option_name}}</span>
					</view>
					<view class="item-bottom">
						<view class="item-bottom_item" v-for="(item1,index1) in item.results" :key="index1">
							<view class="item-bottom_item_item" style="border-bottom:1px solid #fff;">
								{{item1.vote_result}}
							</view>
							<view class="item-bottom_item_item" style="color:#2F9614;">
								{{item1.quantity}}
							</view>
						</view>
						<!-- <view class="item-bottom_item" >
							<view class="item-bottom_item_item" style="border-bottom:1px solid #fff;">
								结果
							</view>
							<view class="item-bottom_item_item" style="color:#2F9614;">
								{{item.is_pass}}
							</view>
						</view> -->
					</view>
				</view>
			</view>
			<!-- 自由选项 -->
			<view class="firstBox"  v-if="vote_type=='freedom'?true:false">
				
				<view class="agendaList-item-item" style="min-height: 220px;height:auto;" v-for="(item,index) in meetingAgendaList" :key="index" @click="itemclick(index)">
					<view class="item-top">
						<span>{{item.option_order}}.{{item.option_name}}</span>
					</view>
					<view class="item-bottom" style="min-height: 140px; height:auto;">
						<view style="margin-top:20px;border-top:1px solid #fff;" class="item-bottom_item" v-for="(item1,index1) in item.results" :key="index1">
							<view class="item-bottom_item_item" style="border-bottom:1px solid #fff;">
								{{item1.vote_result}}
							</view>
							<view class="item-bottom_item_item" style="color:#2F9614;border-bottom:1px solid #fff;">
								{{item1.quantity}}
							</view>
						</view>

						
						<!-- <view style="margin-top:20px;border-top:1px solid #fff;"  class="item-bottom_item" >
							<view class="item-bottom_item_item" style="border-bottom:1px solid #fff;">
								结果
							</view>
							<view class="item-bottom_item_item" style="color:#2F9614;border-bottom:1px solid #fff;">
								{{item.is_pass}}
							</view>
						</view> -->
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				quorum:'',
				attended:'',
				countValue:'',
				imgSrc:'',
				resultList:[],
				meet_title:'',
				meetingAgendaList:[],
				radioList:[
						{
							value: '满意',
							name: '满意',
							checked: true
						},
						{
							value: '不满意',
							name: '不满意',
							checked: false
						},
				],
				vote_name:'',
				vote_type:'',
				ItemList:[
					{
						value: '满意',
						name: '满意',
						checked: true
					},
					{
						value: '不满意',
						name: '不满意',
						checked: false
					},
				]
			}
		},
		onLoad() {
			this.getuserNum();
			this.imgSrc = this.$store.state.jieguo;
			this.meet_title = this.$store.state.meet_title;
			this.vote_name = this.$store.state.vote_name;
			this.vote_type = this.$store.state.vote_type;
			if(this.$store.state.vote_option=='0'){
				this.ItemList = [];
			}else if(this.$store.state.vote_option=='2'){
				if(this.vote_type=='pingyi'){
					this.ItemList = [
						{
							value: '满意',
							name: '满意',
							checked: false
						},
						{
							value: '不满意',
							name: '不满意',
							checked: false
						}
					];
				}else{
					this.ItemList = [
						{
							value: '赞成',
							name: '赞成',
							checked: false
						},
						{
							value: '反对',
							name: '反对',
							checked: false
						}
					];
				}
			}else{
				if(this.vote_type=='pingyi'){
					this.ItemList = [
						{
							value: '满意',
							name: '满意',
							checked: false
						},
						{
							value: '不满意',
							name: '不满意',
							checked: false
						},
						{
							value: '弃权',
							name: '弃权',
							checked: false
						},
					];
				}else{
					this.ItemList = [
						{
							value: '赞成',
							name: '赞成',
							checked: false
						},
						{
							value: '反对',
							name: '反对',
							checked: false
						},
						{
							value: '弃权',
							name: '弃权',
							checked: false
						},
					];
				}
			}
			this.getMeetAgenda();
			console.log(this.vote_type)
		},
		methods: {
			itemclick2(res){
				for(var i = 0 ; i < this.meetingAgendaList[0].chooses.length;i++){
					this.meetingAgendaList[0].chooses[i].choose_value = false;
				}
				this.meetingAgendaList[0].chooses[res].choose_value = true;
				console.log(JSON.stringify(this.meetingAgendaList[0].chooses))
			},
			radioChange2(evt){
				console.log(JSON.stringify(evt));
				console.log(JSON.stringify(this.meetingAgendaList[0].chooses))
			},
			pingyiResult2(){
				var self = this;
				var obj = {};
				obj.mac_machine_code = plus.device.uuid;
				obj.vote_id = this.$store.state.vote_id;
				var arr = [];
				var obj1 = {};
				obj1.vote_result = '';
				obj1.option_id = this.meetingAgendaList[0].option_id;
				for(var i = 0; i < this.meetingAgendaList[0].chooses.length; i++){
					if(this.meetingAgendaList[0].chooses[i].choose_value==true){
						obj1.vote_result = this.meetingAgendaList[0].chooses[i].choose_name;
					}
				}
				arr.push(obj1);
				obj.result = arr;
				if(obj.result[0].vote_result==''){
					uni.showToast({
						title: '请做选择',
						duration: 2000
					});
					return;
				}
				var params = JSON.stringify(obj);
				console.log(params)
				
				uni.showModal({
					title: '提示',
					content: '确定提交评议结果',
					success: function (res) {
						if (res.confirm) {
							uni.request({
								url: self.$store.state.requestUrl+'/vote/userResult/add', //仅为示例，并非真实接口地址。
								data: {
									result:params
								},
								method:'POST',
								header: {
									'Content-Type': 'application/x-www-form-urlencoded' //自定义请求头信息
								},
								success: (res) => {
									console.log(JSON.stringify(res))
									if(res.data.code==0){
										uni.showToast({
											title: '表决成功',
											duration: 1300
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
			pingyiResult(){
				var self = this;
				var obj = {};
				obj.mac_machine_code = plus.device.uuid;
				obj.vote_id = this.$store.state.vote_id;
				var arr = [];
				
				for(var i = 0; i < this.meetingAgendaList.length; i++){
					var obj1 = {};
					obj1.option_id = this.meetingAgendaList[i].option_id;
					obj1.vote_result = this.pingyiArr[i];
					arr.push(obj1);
				}
				
				
				
				obj.result = arr;
				var params = JSON.stringify(obj);
				console.log(params)
				uni.showModal({
					title: '提示',
					content: '确定提交评议结果',
					success: function (res) {
						if (res.confirm) {
							uni.request({
								url: self.$store.state.requestUrl+'/vote/userResult/add', //仅为示例，并非真实接口地址。
								data: {
									result:params
								},
								method:'POST',
								header: {
									'Content-Type': 'application/x-www-form-urlencoded' //自定义请求头信息
								},
								success: (res) => {
									console.log(JSON.stringify(res))
									if(res.data.code==0){
										uni.showToast({
											title: '表决成功',
											duration: 1300
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
			radioChange: function(evt) {
				if(evt.target.value=='满意'){
					this.ItemList[0].checked = false;
					this.ItemList[1].checked = false;
					this.ItemList[0].checked = true;
					var arr = [];
					for(var i = 0 ; i < this.meetingAgendaList.length; i++){
						arr.push('满意')
					}
					this.pingyiArr = [];
					this.pingyiArr = arr;
				}else{
					this.ItemList[0].checked = false;
					this.ItemList[1].checked = false;
					this.ItemList[1].checked = true;
					var arr = [];
					for(var i = 0 ; i < this.meetingAgendaList.length; i++){
						arr.push('不满意')
					}
					this.pingyiArr = [];
					this.pingyiArr = arr;
				}
			},
			biaojueClick(res){
				var self = this;
				var obj = {};
				obj.mac_machine_code = plus.device.uuid;
				obj.vote_id = this.$store.state.vote_id;
				var arr = [];
				var obj1 = {};
				obj1.option_id = this.meetingAgendaList[0].option_id;
				obj1.vote_result = res;
				arr.push(obj1);
				obj.result = arr;
				var params = JSON.stringify(obj);
				console.log(params)
				uni.showModal({
					title: '提示',
					content: '确定提交投票结果',
					success: function (res) {
						if (res.confirm) {
							uni.request({
								url: self.$store.state.requestUrl+'/vote/userResult/add', //仅为示例，并非真实接口地址。
								data: {
									result:params
								},
								method:'POST',
								header: {
									'Content-Type': 'application/x-www-form-urlencoded' //自定义请求头信息
								},
								success: (res) => {
									console.log(JSON.stringify(res))
									if(res.data.code==0){
										uni.showToast({
											title: '表决成功',
											duration: 1300
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
			itemclick(res){
				console.log(res)
				
				this.pingyiArr[res] = this.countValue;
				console.log(this.pingyiArr)
			},
			radioChange1(evt){
				console.log(evt.detail.value)
				this.countValue = evt.detail.value;
			},
			backClick(){
				uni.reLaunch({
					url: '/pages/vote/vote'
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
					  }
					});
				  },
				  fail:function(res){
					  console.log(res)
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
					url: self.$store.state.requestUrl+'/vote/getVoteResult', //仅为示例，并非真实接口地址。
					data: {
						vote_id:self.$store.state.vote_id
					},
					method:'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						console.log(JSON.stringify(res))
						if(res.data.code==0){
							self.meetingAgendaList = res.data.data;
						}else{
							uni.showToast({
								icon:'loading',
								title: res.data.msg,
								duration: 2000
							});
						}
					}
				});
			},
			getuserNum(){
				var self = this;
				uni.request({
					url: self.$store.state.requestUrl+'/meet/getByPage', //仅为示例，并非真实接口地址。
					data: {
						pageNum:1,
						pageSize:10,
						meet_id:self.$store.state.meet_id
					},
					method:'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						console.log(JSON.stringify(res))
						if(res.data.code==0){
							self.quorum = res.data.data.list[0].quorum;
							self.attended = res.data.data.list[0].attended;
						}else{
							uni.showToast({
								icon:'loading',
								title: res.data.msg,
								duration: 2000
							});
						}
					}
				});
			},
			
		}
	}
</script>

<style>
	page{
		width:100%;
		overflow: hidden;
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
	.lable_item{
		
	}
	.item-bottom_item_item{
		width:197px;
		height: 48px;
		line-height: 48px;
		text-align: center;
		color: #fff;
		font-size: 23px;
		border-right:1px solid #fff;
	}
	.bigBoxImg{
		width: 960px;
		height: 565px;
		position: absolute;
		top:0px;
		left:0px;
		z-index: -999;
	}
	.radio{
		margin-left: 100px;
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
	.firstBoxLittle{
		width: 860px;
		display: flex;
		height: 250px;
		line-height: 250px;
		margin:0 auto;
		text-align: center;
		margin-top: 30px;
		overflow-y: scroll;
		border:2px solid #2F9614;
		border-radius: 20px;
		background-color:#DBEDC5;
	}
	.firstBox{
		width: 860px;
		
		height: 300px;
		margin:0 auto;
		text-align: center;
		margin-top: 10px;
		overflow-y: scroll;
		border:2px solid #2F9614;
		border-radius: 20px;
		background-color:#DBEDC5;
	}
	.biaojueItem{
		width:120px;
		height:120px;
		flex: 1;
		margin-top:40px;
	}
	.agendaList-item{
		width:800px;
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
	.item-bottom_item{
		width:196px;
		height: 80px;
		float: left;
	}
	.agendaList-item-item{
		width:800px;
		height: 220px;
		margin:0 auto;
		line-height: 60px;;
		
		color:#000;
		text-align: left;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.item-top{
		width:800px;
		height: 60px;
		margin:0 auto;
		line-height: 60px;;
		color:#000;
		text-align: center;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
		border:1px solid #fff;
		margin-top:5px;
	}
	.item-bottom{
		width:800px;
		height: 100px;
		margin:0 auto;
		line-height: 100px;;
		color:#000;
		border-left:1px solid #fff;
		border-right:1px solid #fff;
		border-bottom:1px solid #fff;
		text-align: center;
		
		overflow: hidden;
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
	.topTitle1{
		width:760px;
		min-height: 40px;
		height: auto;
		margin:0 auto;
		line-height: 40px;
		color: #fff;
		font-size: 20px;
		text-align: center;
		z-index: 999;
		margin-top:30px;
	}
</style>
