<template>
	<view class="shopCar" style="background-color: #f5f5f5;position: relative;">
		<!-- 购物车商品个数  编辑按钮-->
		<view style="width: 100%;height: 70rpx;display: flex;justify-content: space-between;align-items: center">
			<view>共 <span style="color: #ff91ab;">4</span> 件商品</view>
			<view v-if="showhandle" style="display: flex;align-items: center;margin-right: 15rpx;" @click="change">
				<view style="margin-right: 10rpx;"><u-icon name="edit-pen" color="#707071" size="20"></u-icon></view>
				<view>编辑</view>
			</view>
			<view v-else style="display: flex;align-items: center;margin-right: 15rpx;" @click="change">
				<view>完成</view>
			</view>
		</view>
		<!-- 商品列表 计步器 -->
		<view v-for="item in 10" :key="item"
			style="width: 700rpx;height: 270rpx;margin: 20rpx auto;border-radius: 15rpx;background-color: white;">
			<view style="display: flex;justify-content: space-around;align-items: center;height: 100%;">
				<view>
					<u-checkbox-group>
						<u-checkbox v-model="checked" shape="circle" activeColor="#ff547b"></u-checkbox>
					</u-checkbox-group>
				</view>
				<image src="../../static/logo.png" style="width: 200rpx;height: 200rpx;" mode="scaleToFill" />
				<view>
					<u-number-box v-model="CountValue" @change="valChange"></u-number-box>
				</view>
			</view>
		</view>
		<!-- 全选 商品合计 点击结算按钮 -->
		<view style="width: 750rpx;display: flex;justify-content: space-between;align-items: center;background: white;position: sticky;bottom: 0;left: 0;z-index: 999;height: 100rpx;">
			<view style="margin-left: 30rpx;">
				<view>
					<u-checkbox-group>
						<u-checkbox v-model="checked" shape="circle" label="全选" activeColor="#ff547b"></u-checkbox>
					</u-checkbox-group>
				</view>
			</view>
			<view style="display: flex;align-items: center;margin-right: 20rpx;">
				<view style="margin-right: 20rpx;">
					合计：<span style="font-size: 20rpx;color: #ff91ab;">￥</span><span style="color: #ff91ab;">0.00</span>
				</view>
				<view @click="goSettleMent" style="padding: 10rpx 40rpx;background-color: #ff91ab;border-radius: 35rpx;color: white;">
					去结算
				</view>
			</view>

		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			checked: '',
			CountValue: '',
			showhandle: true,
		}
	},
	methods: {
		valChange(e) {
			console.log(e);

		},
		change() {
			console.log('sad ');
			this.showhandle = !this.showhandle;
		},
		goSettleMent(){
			console.log('去结算');
			uni.navigateTo({
				url: '/pages/settlement/settlement'
			})
		}
	}
}
</script>

<style></style>
