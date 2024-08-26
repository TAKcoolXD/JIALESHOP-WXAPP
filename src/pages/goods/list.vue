<template>
	<view class="list">
		<!-- 輸入框 商品展示不同模式 -->
		<view style="margin-top: 10rpx;display: flex;" @click="goSearch">
			<u-search inputAlign="center" :showAction="false" :placeholder="placeholder" v-model="keyword"
				@search="search(keyword)" @custom="Search(keyword)"></u-search>
		</view>
		<view
			style=" position: relative;width: 680rpx; margin: 0 auto;height: 100rpx;display: flex;justify-content: center;align-items: center;">
			<view style=" width: 200rpx;text-align: center;" @click="showTatal()" :class="{ active: index == 1 }">綜合
			</view>
			<view style=" width: 200rpx;text-align: center;" @click="showSell()" :class="{ active: index == 2, }">销量
			</view>
			<view style=" width: 200rpx;text-align: center;" @click="showPrice()" :class="{ active: index == 3, }">
				价格
			</view>
			<view style="position: absolute;right: 70rpx;">
				<!-- 上箭头 -->
				<view @click="toggleArrow('up')">
					<u-icon :name="'arrow-up'" :color="isUpActive ? '#e7a1b8' : 'black'"></u-icon>
				</view>
				<!-- 下箭头 -->
				<view @click="toggleArrow('down')">
					<u-icon :name="'arrow-down'" :color="isDownActive ? '#e7a1b8' : 'black'"></u-icon>
				</view>
				<!-- <view @click="gochange" >
					<u-icon :name="up ? 'arrow-up' : 'arrow-down'" :color="up ? '#e7a1b8' : 'black'"></u-icon>
				</view> -->
				<!-- <view>
					<u-icon name="arrow-up"></u-icon>
				</view>
				<view >
					<u-icon name="arrow-down" color="#e7a1b8"></u-icon>
				</view>
				<view @click="gochange">
					<u-icon name="arrow-down"></u-icon>
				</view> -->
			</view>
		</view>
		<view v-show="index == 1">
			<view class="goods" style="margin-top: 10rpx;display: flex;flex-wrap: wrap;align-items: center;">

				<view v-for="item in goods" :key="item" style="" @click="goDetail(item.goods_id)">
					<image :src="item.goods_image" style="width: 355rpx;height: 400rpx;margin: 8rpx;"
						mode="scaleToFill" />
					<view style="margin-left: 10rpx;text-align: center;">{{ item.goods_name }}</view>
					<view style="color: palevioletred;text-align: center;">￥{{ item.goods_price_max }}</view>
				</view>
			</view>
		</view>
		<view v-show="index == 2">
			<view class="goods" style="margin-top: 10rpx;display: flex;flex-wrap: wrap;align-items: center;">

				<view v-for="item in goods" :key="item" style="" @click="goDetail(item.goods_id)">
					<image :src="item.goods_image" style="width: 355rpx;height: 400rpx;margin: 8rpx;"
						mode="scaleToFill" />
					<view style="margin-left: 10rpx;text-align: center;">{{ item.goods_name }}</view>
					<view style="color: palevioletred;text-align: center;">￥{{ item.goods_price_max }}</view>
				</view>
			</view>
		</view>
		<view v-show="index == 3">
			<view class="goods" style="margin-top: 10rpx;display: flex;flex-wrap: wrap;align-items: center;">

				<view v-for="item in goods" :key="item" style="" @click="goDetail(item.goods_id)">
					<image :src="item.goods_image" style="width: 355rpx;height: 400rpx;margin: 8rpx;"
						mode="scaleToFill" />
					<view style="margin-left: 10rpx;text-align: center;">{{ item.goods_name }}</view>
					<view style="color: palevioletred;text-align: center;">￥{{ item.goods_price_max }}</view>
				</view>
			</view>
		</view>
		<view v-show="goods.length == 0">
			<u-empty mode="list" icon="http://cdn.uviewui.com/uview/empty/car.png">
			</u-empty>
		</view>
		<view>
			<u-loading-page :loading="showLoad"></u-loading-page>
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
			goodsName: '',
			showLoad: false,
			up: true,
			isUpActive: false,  // 上箭头初始为激活状态
			isDownActive: false // 下箭头初始为未激活状态
		}
	},
	methods: {
		// goShow(a) {
		// 	console.log(a);
		// 	this.show = !a

		// },
		showTatal() {
			this.index = 1
			this.isUpActive=false
			this.isDownActive=false
			let goodsName = encodeURIComponent(this.goodsName)
			this.showLoad = true
			uni.$u.http.get(`goods/list&sortType=all&sortPrice=0&categoryId=0&goodsName=${goodsName}&page=1`,).then(res => {
				console.log(res, '打印结果');
				if (res.status == 200) {
					this.showLoad = false
					this.goods = res.data.list.data
					console.log('goods', this.goods);
				} else {

				}
			})
		},
		showSell() {
			this.index = 2
			this.isUpActive=false
			this.isDownActive=false
			let goodsName = encodeURIComponent(this.goodsName)
			this.showLoad = true
			uni.$u.http.get(`goods/list&sortType=sales&sortPrice=0&categoryId=0&goodsName=${goodsName}&page=1`,).then(res => {
				console.log(res, '打印结果');
				if (res.status == 200) {
					this.showLoad = false
					this.goods = res.data.list.data
					console.log('goods', this.goods);
				} else {

				}
			})
		},
		showPrice() {
			this.index = 3
			this.isUpActive=true
			let goodsName = encodeURIComponent(this.goodsName)
			this.showLoad = true
			uni.$u.http.get(`goods/list&sortType=price&sortPrice=0&categoryId=0&goodsName=${goodsName}&page=1`,).then(res => {
				console.log(res, '打印结果');
				if (res.status == 200) {
					this.showLoad = false
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

		},
		gochange() {
			console.log('改变');
			this.up = !this.up
		},
		toggleArrow(direction) {
			if (direction === 'up') {
				this.index=3
				this.isUpActive = true;
				this.isDownActive = false;
				let goodsName = encodeURIComponent(this.goodsName)
				this.showLoad = true
				uni.$u.http.get(`goods/list&sortType=price&sortPrice=0&categoryId=0&goodsName=${goodsName}&page=1`,).then(res => {
					console.log(res, '打印结果');
					if (res.status == 200) {
						this.showLoad = false
						this.goods = res.data.list.data
						console.log('goods', this.goods);
					} else {

					}
				})
			} else if (direction === 'down') {
				this.index=3
				this.isUpActive = false;
				this.isDownActive = true;
				let goodsName = encodeURIComponent(this.goodsName)
				this.showLoad = true
				uni.$u.http.get(`goods/list&sortType=price&sortPrice=1&categoryId=0&goodsName=${goodsName}&page=1`,).then(res => {
					console.log(res, '打印结果');
					if (res.status == 200) {
						this.showLoad = false
						this.goods = res.data.list.data
						console.log('goods', this.goods);
					} else {

					}
				})
			}
		},

	},
	onLoad(option) {
		console.log('option', option);
		this.placeholder = option.goodsName
		this.goodsName = option.goodsName
		let goodsName = encodeURIComponent(option.goodsName)
		console.log('encodegoodsName', goodsName);
		this.showLoad = true
		uni.$u.http.get(`goods/list&sortType=all&sortPrice=0&categoryId=0&goodsName=${goodsName}&page=1`,).then(res => {
			console.log(res, '打印结果');
			if (res.status == 200) {
				this.showLoad = false
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
