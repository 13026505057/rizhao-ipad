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
		<view class="topTitle1">
			{{vote_name}}
		</view>
		<view class="flexBox">
			<!-- 评议 -->
			<view class="firstBox"  v-if="vote_type=='pingyi'?true:false">
				<view class="agendaList-item"><span style="margin-left:100px;">批量选择</span><radio-group @change="radioChange"><label v-for="(item,index) in radioList" :key="item.index" class="radio"><radio :value="item.value" :checked="item.checked" />{{item.name}}</label></radio-group>
                <span class="resultBtn" @click="pingyiResult()">提交</span></view>
				<view class="agendaList-item-item" v-for="(item,index) in meetingAgendaList" :key="index" @click="itemclick(index)">
					<view class="item-top">
						<span>{{item.option_order}}.{{item.option_name}}</span>
					</view>
					<view class="item-bottom">
						<radio-group style="width:400px;margin:0 auto;" @change="radioChange1">
							<label class="lable_item" v-for="(item1, index1) in ItemList" :key="item1.index1">
								<view style="display: inline-block;">
									<radio :value="item1.value" :checked="item1.checked" />{{item1.name}}
								</view>
							</label>
						</radio-group>
					</view>
				</view>
			</view>
			<!-- 表决 -->
			<view :class="vote_type=='biaojue'?'firstBoxLittle':'firstBox'"  v-if="vote_type=='biaojue'?true:false">
				<view class="biaojueItem" @click="biaojueClick('赞成')">
					<img src="../../static/img/yes.png" alt="" style="width:120px;height:120px;">
				</view>
				<view class="biaojueItem" @click="biaojueClick('反对')">
					<img src="../../static/img/no.png" alt="" style="width:120px;height:120px;">
				</view>
				<view class="biaojueItem" v-if="vote_option==3?true:false" @click="biaojueClick('弃权')">
					<img src="../../static/img/none.png" alt="" style="width:120px;height:120px;">
				</view>
			</view>
			<!-- 多项表决 -->
			<view class="firstBox"  v-if="vote_type=='biaojues'?true:false">
				<view class="agendaList-item"><span style="margin-left:270px;">请选择结束后点击提交按钮</span>
			    <span class="resultBtn" @click="pingyiResult()">提交</span></view>
				<view class="agendaList-item-item" v-for="(item,index) in meetingAgendaList" :key="index" @click="itemclick(index)">
					<view class="item-top">
						<span>{{item.option_order}}.{{item.option_name}}</span>
					</view>
					<view class="item-bottom">
						<radio-group style="width:400px;margin:0 auto;" @change="radioChange1">
							<label class="lable_item" v-for="(item1, index) in ItemList" :key="item1.index">
								<view style="display: inline-block;">
									<radio :value="item1.value" :checked="item1.checked" />{{item1.name}}
								</view>
							</label>
						</radio-group>
					</view>
				</view>
			</view>
			<!-- 自由选项 -->
			<view class="firstBox"  v-if="vote_type=='freedom'?true:false">
				<view class="agendaList-item"><span style="margin-left:270px;">请选择结束后点击提交按钮</span>
			    <span class="resultBtn" @click="pingyiResult2()">提交</span></view>
				<view class="agendaList-item-item" v-for="(item,index) in meetingAgendaList[0].chooses" :key="index" @click="itemclick2(index)">
					
					<view class="item-bottom">
						<radio-group style="width:400px;margin:0 auto;" @change="radioChange2">
							<label class="lable_item"  :key="item.choose_id">
								<view style="display: inline-block;">
									<radio :value="item.choose_value" :checked="item.checked" />{{item.choose_name}}
								</view>
							</label>
						</radio-group>
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
			this.imgSrc = this.$store.state.caidan;
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
							uni.showLoading({
								title: '加载中'
							});
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
										uni.hideLoading();
										uni.showToast({
											title: '表决成功',
											duration: 1300
										});
										uni.reLaunch({
											url: '/pages/vote/vote'
										});
									}else{
										uni.hideLoading();
										uni.showToast({
											icon:'loading',
											title: res.data.msg,
											duration: 1300
										});
									}
									
								}
							});
						} else if (res.cancel) {
							uni.hideLoading();
							console.log('用户点击取消');
						}
					}
				});
			},
			pingyiResult(){
				uni.showLoading({
					title: '加载中'
				});
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
							uni.showLoading({
								title: '加载中'
							});
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
										uni.hideLoading();
										uni.showToast({
											title: '表决成功',
											duration: 1300
										});
										uni.reLaunch({
											url: '/pages/vote/vote'
										});
									}else{
										uni.hideLoading();
										uni.showToast({
											icon:'loading',
											title: res.data.msg,
											duration: 1300
										});
									}
									
								}
							});
						} else if (res.cancel) {
							uni.hideLoading();
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
							uni.showLoading({
								title: '加载中'
							});
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
										uni.hideLoading();
										uni.showToast({
											title: '表决成功',
											duration: 1300
										});
										uni.reLaunch({
											url: '/pages/vote/vote'
										});
									}else{
										uni.hideLoading();
										uni.showToast({
											icon:'loading',
											title: res.data.msg,
											duration: 1300
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
					url: self.$store.state.requestUrl+'/vote/option/getByPage', //仅为示例，并非真实接口地址。
					data: {
						pageNum:1,
						pageSize:1000,
						vote_id:self.$store.state.vote_id
					},
					method:'POST',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded' //自定义请求头信息
					},
					success: (res) => {
						console.log(JSON.stringify(res))
						if(res.data.code==0){
							self.meetingAgendaList = res.data.data.list;
							var arr = [];
							for(var i = 0 ; i < self.meetingAgendaList.length; i++){
								arr.push(' ')
							}
							this.pingyiArr = arr;
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
		
		height: 400px;
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
	.agendaList-item-item{
		width:800px;
		height: 120px;
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
	}
	.item-bottom{
		width:800px;
		height: 60px;
		margin:0 auto;
		line-height: 60px;;
		color:#000;
		
		text-align: center;
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
