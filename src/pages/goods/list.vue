<template>
	<view class="list">
		<!-- 輸入框 商品展示不同模式 -->
		<view style="margin-top: 10rpx;display: flex;" @click="goSearch">
			<u-search inputAlign="center" :showAction="false" :placeholder="placeholder" v-model="keyword"
				@search="search(keyword)" @custom="Search(keyword)"></u-search>
		</view>
		<view
			style="width: 680rpx; margin: 0 auto;height: 100rpx;display: flex;justify-content: center;align-items: center;">
			<view style=" width: 200rpx;text-align: center;" @click="showTatal()" :class="{ active: index == 1 }">綜合</view>
			<view style=" width: 200rpx;text-align: center;" @click="showSell()" :class="{ active: index == 2, }">销量</view>
			<view style=" width: 200rpx;text-align: center;" @click="showPrice()" :class="{ active: index == 3, }">
				价格<span></span>
			</view>
		</view>
		<view v-show="index == 1">
			<view class="goods" style="margin-top: 10rpx;display: flex;flex-wrap: wrap;align-items: center;">

				<view v-for="item in goods" :key="item" style="" @click="goDetail(item.goods_id)">
					<image :src="item.goods_image" style="width: 355rpx;height: 400rpx;margin: 8rpx;"
						mode="scaleToFill" />
					<view>{{ item.goods_name }}</view>
					<view style="color: palevioletred;">￥{{ item.goods_price_max }}</view>
				</view>
			</view>
		</view>
		<view v-show="index == 2">
			<view class="goods" style="margin-top: 10rpx;display: flex;flex-wrap: wrap;align-items: center;">

				<view v-for="item in goods" :key="item" style="" @click="goDetail(item.goods_id)">
					<image :src="item.goods_image" style="width: 355rpx;height: 400rpx;margin: 8rpx;"
						mode="scaleToFill" />
					<view>11{{ item.goods_name }}</view>
					<view style="color: palevioletred;">￥{{ item.goods_price_max }}</view>
				</view>
			</view>
		</view>
		<view v-show="index == 3">
			<view class="goods" style="margin-top: 10rpx;display: flex;flex-wrap: wrap;align-items: center;">

				<view v-for="item in goods" :key="item" style="" @click="goDetail(item.goods_id)">
					<image :src="item.goods_image" style="width: 355rpx;height: 400rpx;margin: 8rpx;"
						mode="scaleToFill" />
					<view>11{{ item.goods_name }}</view>
					<view style="color: palevioletred;">￥{{ item.goods_price_max }}</view>
				</view>
			</view>
		</view>
		<view v-show="goods.length == 0">
			<u-empty mode="list" icon="http://cdn.uviewui.com/uview/empty/car.png">
			</u-empty>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			show: true,
			index: 1,
			goods: [],
			placeholder: '',
			goodsName: ''
		}
	},
	methods: {
		// goShow(a) {
		// 	console.log(a);
		// 	this.show = !a

		// },
		showTatal() {
			this.index = 1
			let goodsName = encodeURIComponent(this.goodsName)
			uni.$u.http.get(`goods/list&sortType=all&sortPrice=0&categoryId=0&goodsName=${goodsName}&page=1`,).then(res => {
				console.log(res, '打印结果');
				if (res.status == 200) {
					this.goods = res.data.list.data
					console.log('goods', this.goods);
				} else {

				}
			})
		},
		showSell() {
			this.index = 2
			let goodsName = encodeURIComponent(this.goodsName)
			uni.$u.http.get(`goods/list&sortType=sales&sortPrice=0&categoryId=0&goodsName=${goodsName}&page=1`,).then(res => {
				console.log(res, '打印结果');
				if (res.status == 200) {
					this.goods = res.data.list.data
					console.log('goods', this.goods);
				} else {

				}
			})
		},
		showPrice() {
			this.index = 3
			let goodsName = encodeURIComponent(this.goodsName)
			uni.$u.http.get(`goods/list&sortType=prices&sortPrice=0&categoryId=0&goodsName=${goodsName}&page=1`,).then(res => {
				console.log(res, '打印结果');
				if (res.status == 200) {
					this.goods = res.data.list.data
					console.log('goods', this.goods);
				} else {

				}
			})
		},
		goDetail(id) {
			console.log('跳转详情页', id);
			uni.navigateTo({
				url: `/pages/goods/detail?goodsid=${id}`
			})
		},
		goSearch() {
			uni.navigateBack()
			// console.log('回去搜索');

		}

	},
	onLoad(option) {
		console.log('option', option);
		this.placeholder = option.goodsName
		this.goodsName = option.goodsName
		let goodsName = encodeURIComponent(option.goodsName)
		console.log('encodegoodsName', goodsName);
		uni.$u.http.get(`goods/list&sortType=all&sortPrice=0&categoryId=0&goodsName=${goodsName}&page=1`,).then(res => {
			console.log(res, '打印结果');
			if (res.status == 200) {
				this.goods = res.data.list.data
				console.log('goods', this.goods);
			} else {

			}
		})
	}
}
</script>

<style>
/* .u-search.data-v-1a326067 {
	width: 600rpx;
} */
.active {
	color: palevioletred;
}
</style>
