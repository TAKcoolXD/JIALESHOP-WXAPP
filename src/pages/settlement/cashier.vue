<template>
	<view class="cashier" style="background-color: #f4f4f4;height: 100%;border: 1px solid #f4f4f4;">
		<view style="width: 400rpx;margin: 50rpx auto;display: flex;flex-direction: column;align-items: center;">
			<view>剩余时间2天23时59分56秒</view>
			<view style="font-size: 40rpx;margin-top: 20rpx"><span>$</span>0.01</view>
		</view>
		<view
			style=" width: 720rpx;height: 90rpx;border-radius: 15rpx;margin: 0 auto;background-color: white;display: flex;align-items: center;">
			<view style="margin-left: 60rpx;"><u-icon name="rmb-circle-fill" color="#ff9700" size="28"></u-icon></view>
			<view>余额支付 （可用￥0.99）</view>
			<view style="margin-left: 130rpx;">
				<u-checkbox-group>
					<u-checkbox v-model="checked" shape="circle" activeColor="#ff547b"></u-checkbox>
				</u-checkbox-group>
			</view>
		</view>
		<view
			style="width: 750rpx;height: 90rpx;display: flex;align-items: center;justify-content: center;margin-top: 1000rpx">
			<view @click="goOrder"
				style="width: 700rpx;height: 70rpx;border-radius: 50rpx;text-align: center;line-height: 70rpx;background-color: #ff547b;color: white;">
				确认支付</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			checked: '',
		}
	},
	methods: {
		goOrder(){
			console.log('去我的订单');
			uni.navigateTo({ url: '/pages/order/order' })
		}
	}
}
</script>

<style></style>
