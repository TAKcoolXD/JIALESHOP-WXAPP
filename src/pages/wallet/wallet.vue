<template>
	<view class="wallet">
		<view
			style="width: 500rpx;height:370rpx;margin: 0 auto;margin-top: 150rpx;display: flex;justify-content: center;">
			<image src="../../static/wallet.png" mode="aspectFit" style="width: 400rpx;height: 400rpx;" />
		</view>
		<view style="width: 400rpx;height: 150rpx;text-align: center;margin: 0 auto;">
			<view style="font-size: 50rpx;">{{ balance }}</view>
			<view style="margin-top: 20rpx;color: #ddd5d5;">账号余额(元)</view>
		</view>
		<view
			style="padding: 20rpx;width: 400rpx;text-align: center;margin: 60rpx auto;border-radius: 40rpx;background-color: #786cff;">
			充值
		</view>
		<view
			style="width: 300rpx;height: 60rpx;display: flex;justify-content: space-between;align-items: center;margin: 0 auto">
			<view>充值记录</view>
			<view>账单详情</view>
		</view>
		<view>
			<u-modal :show="show" @confirm="confirm" @cancel="cancel" :title="title" :content='content1'
				confirmText="去登陆" cancelText="在逛会" showCancelButton="true"></u-modal>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			balance: '',
			show: false,
			title: '温馨提示',
			content1: '此时此刻需要您登录哦',
		}
	},
	methods: {
		confirm() {
			console.log('11');
			uni.navigateTo({
				url: '/pages/login/login'
			})
			this.show=false
		},
		cancel() {
			console.log('22');
			uni.navigateBack()
		},
	},
	onLoad() {
		if(uni.getStorageSync('token')){
			uni.$u.http.post('user/info',).then(res => {
			console.log(res, '打印结果');
			if (res.status == 200) {
				this.balance = res.data.userInfo.balance
			}
		})
		}else{
			this.show=true
		}
		
	},
	onShow(){
		if(uni.getStorageSync('token')){
			uni.$u.http.post('user/info',).then(res => {
			console.log(res, '打印结果');
			if (res.status == 200) {
				this.balance = res.data.userInfo.balance
			}
		})
		}else{
			this.show=true
		}
	}
}
</script>

<style></style>
