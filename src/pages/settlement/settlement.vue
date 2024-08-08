<template>
	<view class="settlement" style="background-color: #fafafa;position: relative;">
		<view
			style="display: flex;justify-content: space-around;height: 150rpx;color: #b1b1b2;">
			<view style="display: flex;align-items: center;">
				<view style="margin-right: 30rpx;"><u-icon name="map" color="#b1b1b2" size="20"></u-icon></view>
				<view>
					<view>张三 18924716147</view>
					<view>广东省广州市海珠区信箱中路4156号</view>
				</view>
			</view>
			<view style="display: flex;align-items: center;">
				<u-icon name="arrow-right" color="#b1b1b2" size="20"></u-icon>
			</view>
		</view>
		<view style="margin-top: 30rpx;">
			<view v-for="item in 4" :key="item"
				style="display: flex;justify-content: space-between;align-items: center;margin: 20rpx 0;">
				<view style="display: flex;align-items: center;margin-left: 30rpx;">
					<image src="../../static/logo.png" mode="scaleToFill"
						style="width: 200rpx;height: 200rpx;margin-right: 20rpx;" />
					<view>
						<view>苹果14pro</view>
						<view>X 3</view>
					</view>
				</view>
				<view style="margin-right: 10rpx;">$0.01</view>
			</view>
		</view>
		<view>
			<view style="display: flex; justify-content: space-between;margin: 20rpx 0">
				<view>订单总金额</view>
				<view>￥5.03</view>
			</view>
			<view style="display: flex;justify-content: space-between;margin: 20rpx 0">
				<view>优惠卷</view>
				<view>无优惠卷可以用</view>
			</view>
			<view style="display: flex;justify-content: space-between;margin: 20rpx 0">
				<view>配送费用</view>
				<view>$ 0.00</view>
			</view>
		</view>
		<view>
			<u--input placeholder="选填 买家留言 (50字以内)" border="surround" v-model="value" @change="change"></u--input>
		</view>
		<view style="width: 750rpx;display: flex;justify-content: space-between;align-items: center;background: white;position: sticky;bottom: 0;left: 0;z-index: 999;height: 100rpx;">
			<view style="margin-left: 30rpx;">
				<view>
					实付款： <span>$88</span>
				</view>
			</view>
			<view style="display: flex;align-items: center;margin-right: 20rpx;">
				
				<view @click="goCashier" style="padding: 10rpx 40rpx;background-color: #ff91ab;border-radius: 35rpx;color: white;">
					提交订单
				</view>
			</view>

		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			value:'',
		}
	},
	methods: {
		change(){
			console.log('change');
			
		},
		goCashier(){
			
			uni.navigateTo({
				url:'/pages/settlement/cashier'
			})
		}
	}
}
</script>

<style></style>
