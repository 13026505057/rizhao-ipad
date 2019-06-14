<template>
	<view class="content">
	    <view class="input-group">
	        <view class="input-row border">
	            <text class="title">姓名：</text>
	            <input class="m-input" type="text" clearable focus v-model="username" placeholder="请输入账号" />
	        </view>
	        <view class="input-row">
	            <text class="title">编号：</text>
	            <input type="password" displayable v-model="password" placeholder="请输入密码" />
	        </view>
	    </view>
	    <view class="btn-row">
	        <button type="primary" class="primary" @click="bindLogin">登录</button>
	    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username:'',
				password:''
			}
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
						url: self.$store.state.requestUrl+'/maclogin', //仅为示例，并非真实接口地址。
						data: {
							username:this.password,
							mac_machine_code:plus.device.uuid
						},
						method:'POST',
						header: {
							'Content-Type': 'application/x-www-form-urlencoded' //自定义请求头信息
						},
						success: (res) => {
							console.log(JSON.stringify(res))
							if(res.data.code==0){
								self.$store.state.isLogin = true;
								uni.reLaunch({
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
			}
		}
	}
</script>

<style>

</style>
