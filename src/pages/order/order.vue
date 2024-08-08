<template>
	<view class="order" style="background-color:rgb(244 244 244);">
		<view
			style="width: 100%; display: flex;justify-content: center;width: 730rpx;margin: 0 auto">
			<u-tabs :list="list1" @click="click" itemStyle="width: 100rpx;height:80rpx" lineWidth="20" lineColor="#ff5a7f"></u-tabs>
		</view>
		<view v-show="showIndex==0" v-for="(item,index) in 3" :key="index" style=" border: 1px solid #ffffff;border-radius: 20rpx;width: 700rpx;margin: 15rpx auto;background-color: #ffffff;">
			<view style="width: 100%;height: 70rpx;display: flex;align-items: center;justify-content: space-between;">
				<view style="margin-left: 15rpx;color: #b0b0b0;">2024-08-08 14:22:59</view>
				<view style="margin-right: 15rpx;color: #ff8ea8;">待发货</view>
			</view>
			<view style="width: 100%;height: 240rpx;margin-top: 20rpx;display: flex;justify-content: space-between;align-items: center">
				<image
					src="../../static/logo.png"
					mode="scaleToFill" style="height: 200rpx;width: 200rpx;margin-left: 20rpx"
				/>
				<view style="margin-right: 20rpx;">
					<view>$1.00</view>
					<view>x 1</view>
				</view>
			</view>
			<view style="width: 400rpx;height: 130rpx;margin-top: 20rpx;margin-left: 300rpx;display: flex;flex-direction: column;align-items: center;justify-content: center;">
				<view> 共一件商品 ，总金额 $1.00 </view>
				<view style="border-radius: 20rpx;border: 1px solid #dedede;padding: 8rpx 20rpx;font-size: 30rpx ;margin-left: 200rpx;margin-top: 30rpx;margin-bottom: 20rpx;"> 申请取消 </view>
			</view>
			<view v-show="true" style="margin-left: 20rpx;margin-bottom: 20rpx ;" >
				取消申请中
			</view>
		</view>
		<view v-show="showIndex==1" v-for="(item,index) in 3" :key="index" style=" border: 1px solid #ffffff;border-radius: 20rpx;width: 700rpx;margin: 15rpx auto;background-color: #ffffff;">
			<view style="width: 100%;height: 70rpx;display: flex;align-items: center;justify-content: space-between;">
				<view style="margin-left: 15rpx;color: #b0b0b0;">2024-08-08 14:22:59</view>
				<view style="margin-right: 15rpx;color: #ff8ea8;">待发货</view>
			</view>
			<view style="width: 100%;height: 240rpx;margin-top: 20rpx;display: flex;justify-content: space-between;align-items: center">
				<image
					src="../../static/logo.png"
					mode="scaleToFill" style="height: 200rpx;width: 200rpx;margin-left: 20rpx"
				/>
				<view style="margin-right: 20rpx;">
					<view>$w.00</view>
					<view>x w</view>
				</view>
			</view>
			<view style="width: 400rpx;height: 130rpx;margin-top: 20rpx;margin-left: 300rpx;display: flex;flex-direction: column;align-items: center;justify-content: center;">
				<view> 共二件商品 ，总金额 $2.00 </view>
				<view style="border-radius: 20rpx;border: 1px solid #dedede;padding: 8rpx 20rpx;font-size: 30rpx ;margin-left: 200rpx;margin-top: 30rpx;margin-bottom: 20rpx;"> 申请取消 </view>
			</view>
			<view v-show="true" style="margin-left: 20rpx;margin-bottom: 20rpx ;" >
				取消申请中
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list1: [{
				name: '全部',
			}, {
				name: '待支付',
			}, {
				name: '待发货'
			}, {
				name: '待收货'
			}, {
				name: '待评价'
			},],
			showIndex:0
		}
	},
	methods: {
		click(item) {
			console.log('item', item);
			this.showIndex=item.index
		}
	}
}
</script>

<style>
.u-tabs__wrapper__nav__item[data-v-0de61367] {
	padding: 0 17px !important;
}
</style>
