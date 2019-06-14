<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			// setInterval(function(){
			// 	// uni.request({
			// 	// 	url: 'http://love.appsd.cn:7780/index.php/guest/order/qr_code', //仅为示例，并非真实接口地址。
			// 	// 	data: {
			// 	// 		qr_code:'12e6623e89b4c2281e5d207a92253aff',
			// 	// 		channel_id:1,
			// 	// 		create_time:1558696749,
			// 	// 		channel_type:1
			// 	// 	},
			// 	// 	method:'POST',
			// 	// 	header: {
			// 	// 		'Content-Type': 'application/x-www-form-urlencoded' //自定义请求头信息
			// 	// 	},
			// 	// 	success: (res) => {
			// 	// 		console.log(JSON.stringify(res))
			// 	// 	}
			// 	// });
			// },60000)
			uni.request({
				url: 'http://love.appsd.cn:7780/index.php/guest/order/qr_code', //仅为示例，并非真实接口地址。
				data: {
					qr_code:'4301272a6854f2ae957a48eec04a99af',
					channel_id:1,
					create_time:1558696749,
					channel_type:1
				},
				method:'POST',
				header: {
					'Content-Type': 'application/x-www-form-urlencoded' //自定义请求头信息
				},
				success: (res) => {
					console.log(JSON.stringify(res))
				}
			});
			
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
