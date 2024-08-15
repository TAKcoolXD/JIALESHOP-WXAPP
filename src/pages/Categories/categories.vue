<template>
	<view>
		<!-- 搜索框 -->
		<view style="margin-top: 10rpx;">
			<u-search placeholder="请输入您搜索的商品" v-model="keyword" @search="search(keyword)"
				@custom="Search(keyword)"></u-search>
		</view>

		<view style=" width: 750rpx;height: 1355rpx;display: flex;">
			<!-- 菜单分类 -->
			<view style="width: 200rpx;height: 1330rpx;background-color: #f8f8f8;">
				<!-- 全部商品 -->
				<view style="width: 200rpx;height: 100rpx;text-align: center;line-height: 100rpx;" @click="showAll"
					:class="{ active: index == 0 }">全部</view>
				<view v-for="categoriesitem in categoriesList" :key="categoriesitem.category_id"
					@click="goShow(categoriesitem.category_id)">
					<view style="width: 200rpx;height: 100rpx;text-align: center;line-height: 100rpx;"
						:class="{ active: index == categoriesitem.category_id }">{{ categoriesitem.name }}</view>
				</view>
			</view>
			<!-- 商品展示 -->
			<view style="width: 520rpx;height: 1330rpx;margin-left: 20rpx;overflow: scroll;">
				<!-- 全部商品数据展示 -->
				<view v-if="index == 0" style="width: 490rpx;height: 1330rpx;margin:10rpx 15rpx;overflow: scroll;">
					<view @click="goGoodDetails(goodsitem)" v-for="goodsitem in goodsList" :key="goodsitem.goods_id" style="display: flex;padding: 20rpx;">
						<image :src="goodsitem.goods_image" mode="scaleToFill" style="width: 150rpx;height: 150rpx;" />
						<view style="width: 350rpx;">
							<view style="margin-left: 10rpx;">{{ goodsitem.goods_name }}</view>
							<view style="display: flex;margin-top: 50rpx ;justify-content: space-between;">
								<view style="color: #ff547b;">￥{{ goodsitem.goods_price_min }}</view>
								<view style="margin-top: 8rpx;"><u-icon name="plus-circle" color="#ff547b" size="20"></u-icon></view>
							</view>
						</view>
					</view>
				</view>
				<!-- 通过右侧菜单动态控制 商品的展示 -->
				<view v-if="categoitem.category_id == index" v-for="categoitem in categoriesList"
					:key="categoitem.category_id"
					style="width: 490rpx;height: 1330rpx;margin:10rpx 15rpx;overflow: scroll;">
					<view @click="goGoodDetails(item1)" v-for="item1 in goodsListDetail" :key="item1.goods_id" style="display: flex;padding: 20rpx;">
						<image :src="item1.goods_image" mode="scaleToFill" style="width: 150rpx;height: 150rpx;" />
						<view style="width: 350rpx;">
							<view style="margin-left: 10rpx;">{{ item1.goods_name }}</view>
							<view style="display: flex;margin-top: 50rpx ;justify-content: space-between;">
								<view style="color: #ff547b;">￥{{ item1.goods_price_max }}</view>
								<view  style="margin-top: 8rpx;"><u-icon name="plus-circle" color="#ff547b" size="20"></u-icon></view>
							</view>
						</view>
					</view>
				</view>
				<view style="z-index: 100;">
					<u-loading-page :loading="loading">
					</u-loading-page>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
export default {
	onLoad() {
		uni.$u.http.get('category/list',).then(res => {
			console.log(res, '打印结果');
			if (res.status == 200) {
				this.categoriesList = res.data.list
				console.log("🚀 分类菜单", this.categoriesList)
			}
		})
		uni.$u.http.get(`goods/list&categoryId=0&page=1`,).then(res => {
			console.log(res, '打印结果');
			if (res.status == 200) {
				this.goodsList = res.data.list.data
				console.log("🚀 商品数据", this.goodsList)
			}
		})
	},
	onReady() {

	},
	data() {
		return {
			categoriesList: [],//分类菜单
			keyword: '',//搜索关键字
			index: 0,//展示的标志
			goodsList: [],
			goodsListDetail: [],
			loading: false,

		}
	},
	methods: {
		search(a) {
			console.log(a);

		},
		Search(a) {
			console.log('搜索', a);
		},
		goShow(ID) {

			this.index = ID
			this.loading = true
			uni.$u.http.get(`goods/list&categoryId=${ID}&page=1`,).then(res => {
				console.log(res, '打印结果');
				if (res.status == 200) {
					this.loading = false
					this.goodsListDetail = res.data.list.data
					console.log("🚀 某一个分类的商品数据", this.goodsListDetail)
				}
			})



		},
		showAll() {
			this.index = 0
		},
		goGoodDetails(goodsitem){
			console.log('111',goodsitem);
			uni.navigateTo({
				url: `/pages/goods/detail?goodsid=${goodsitem.goods_id}`
			})
		}
	}
}
</script>

<style>
.active {
	color: #ff547b;
	background-color: white;
}
</style>