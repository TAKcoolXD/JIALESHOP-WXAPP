<template>
	<view class="list">
		<!-- 輸入框 商品展示不同模式 -->
		<view style="margin-top: 10rpx;display: flex;">
			<u-search :showAction="false" placeholder="请输入您搜索的商品" v-model="keyword" @search="search(keyword)"@custom="Search(keyword)"></u-search>
		</view>
		<view
			style="width: 680rpx; margin: 0 auto;height: 100rpx;display: flex;justify-content: center;align-items: center;">
			<view style=" width: 200rpx;text-align: center;" @click="showTatal()" :class="{active:index==1}">綜合</view>
			<view style=" width: 200rpx;text-align: center;" @click="showSell()" :class="{active:index==2,}">销量</view>
			<view style=" width: 200rpx;text-align: center;" @click="showPrice()" :class="{active:index==3,}">价格<span></span>
			</view>
		</view>
		<view v-show="index == 1">
			综合的内容
			<view class="goods"
				style="margin-top: 10rpx;display: flex;flex-wrap: wrap;align-items: center;">

				<view v-for="item in 5" :key="item" style="" @click="goDetail">
					<image src="../../static/logo.png" style="width: 355rpx;height: 400rpx;margin: 8rpx;"
						mode="scaleToFill" />
					<view>11{{ item.goods_name }}</view>
					<view style="color: palevioletred;">￥{{ item.goods_price_max }}</view>
				</view>
			</view>
		</view>
		<view v-show="index == 2">
			销量的内容
			<view class="goods"
				style="margin-top: 10rpx;display: flex;flex-wrap: wrap;align-items: center;">

				<view v-for="item in 5" :key="item" style="">
					<image src="../../static/logo.png" style="width: 355rpx;height: 400rpx;margin: 8rpx;"
						mode="scaleToFill" />
					<view>11{{ item.goods_name }}</view>
					<view style="color: palevioletred;">￥{{ item.goods_price_max }}</view>
				</view>
			</view>
		</view>
		<view v-show="index == 3">
			价格的内容
			<view class="goods"
				style="margin-top: 10rpx;display: flex;flex-wrap: wrap;align-items: center;">

				<view v-for="item in 5" :key="item" style="">
					<image src="../../static/logo.png" style="width: 355rpx;height: 400rpx;margin: 8rpx;"
						mode="scaleToFill" />
					<view>11{{ item.goods_name }}</view>
					<view style="color: palevioletred;">￥{{ item.goods_price_max }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			show: true,
			index: 1,
		}
	},
	methods: {
		// goShow(a) {
		// 	console.log(a);
		// 	this.show = !a

		// },
		showTatal() {
			this.index = 1
		},
		showSell() {
			this.index = 2
		},
		showPrice() {
			this.index = 3
		},
		goDetail(){
			console.log('跳转详情页');
			uni.navigateTo({
				url: '/pages/goods/detail'
			})
		}

	}
}
</script>

<style>
/* .u-search.data-v-1a326067 {
	width: 600rpx;
} */
 .active{
	color: palevioletred;
 }
</style>
