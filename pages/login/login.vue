<template>
    <view>
        <web-view src="/hybrid/html/face.html"  @message="handleMessage"></web-view>
    </view>
</template>

<script>
    import service from '../../service.js';
    import {
        mapState,
        mapMutations
    } from 'vuex'
    import mInput from '../../components/m-input.vue'

    export default {
        components: {
            mInput
        },
        data() {
            return {
                webviewStyles: {
                    progress: {
                        color: '#FF3333'
                    }
                }
            }
        },
        computed: mapState(['forcedLogin']),
        methods: {
            ...mapMutations(['login']),
			handleMessage(evt) {  
                console.log('接收到的消息：' + JSON.stringify(evt.detail.data));  
            }  
            // initPosition() {
            //     // 
            //     //  使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
            //     //   反向使用 top 进行定位，可以避免此问题。
            //     // 
            //     this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
            // },
            
            
            
        },
        onReady() {
            
        },
		onLoad(){
			const currentWebview = this.$mp.page.$getAppWebview();
			
		}
    }
</script>

<style>
	page{
		width: 100%;
		height: 100%;
	}
   
</style>
