<template>
	<view class="shopCar" style="background-color: #f5f5f5;position: relative;">
		<view v-if="token">
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
		<view v-for="item in shopCarList" :key="item"
			style="width: 700rpx;height: 270rpx;margin: 20rpx auto;border-radius: 15rpx;background-color: white;">
			<view style="display: flex;justify-content: space-around;align-items: center;height: 100%;">
				<view>
					<checkbox-group @change="checkClick(item)">
						<checkbox :checked="item.checked" />
					</checkbox-group>
				</view>
				<image :src="item.goods.goods_image" style="width: 200rpx;height: 200rpx;" mode="scaleToFill" />
				<view>
					<u-number-box v-model="item.goods_num" @change="valChange"></u-number-box>
				</view>
			</view>
		</view>
		<!-- 全选 商品合计 点击结算按钮 -->
		<view
			style="width: 750rpx;display: flex;justify-content: space-between;align-items: center;background: white;position: sticky;bottom: 0;left: 0;z-index: 999;height: 100rpx;">
			<view style="margin-left: 30rpx;">
				<view>
					<checkbox-group @change="checkClickAll()">
						<checkbox :checked="checkedAll" />
					</checkbox-group>
				</view>
			</view>
			<view style="display: flex;align-items: center;margin-right: 20rpx;">
				<view style="margin-right: 20rpx;">
					合计：<span style="font-size: 20rpx;color: #ff91ab;">￥</span><span style="color: #ff91ab;">0.00</span>
				</view>
				<view @click="goSettleMent"
					style="padding: 10rpx 40rpx;background-color: #ff91ab;border-radius: 35rpx;color: white;">
					去结算
				</view>
			</view>

		</view>
		</view>
		<view v-else  style="height: 1500rpx;">
			<view><u-empty mode="car" icon-size="200"></u-empty></view>
			<view @click="goIndex"
				style="width: 300rpx;height: 70rpx;background-color:#ff547b ;margin: 30rpx auto;text-align: center;text-align: center;line-height: 70rpx;color: white;border-radius: 40rpx;">
				去逛逛</view>
		</view>
	</view>
</template>
<script>
import { em } from '@dcloudio/vue-cli-plugin-uni/packages/postcss/tags';
import value from '../../uni_modules/uv-text/components/uv-text/value';
import { email } from '../../uni_modules/uv-ui-tools/libs/function/test';
export default {
	data() {
		return {
			checked: false,
			CountValue: '',
			showhandle: true,
			cartTotal: '',
			shopCarList: [],
			token: '',
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
		goSettleMent() {
			console.log('去结算');
			uni.navigateTo({
				url: '/pages/settlement/settlement'
			})
		},
		checkClick(item) {
			console.log(item);
			item.checked = !item.checked
		},
		checkClickAll() {
			console.log('点击全选');
			let a
			if (this.checkedAll == true) {
				a = this.shopCarList.map((item) => {
					item.checked = false
					return item
				})
				this.shopCarList = a
			} else {
				a = this.shopCarList.map((item) => {
					item.checked = true
					return item
				})
				this.shopCarList = a
			}
		},
		goIndex() {
			console.log('去首页');
			uni.switchTab({
				url: '/pages/index/index'
			});

		},
	},
	computed: {
		checkedAll() {
			return this.shopCarList.every(item => item.checked)
		}
	},
	onShow() {
		this.loading = true
		this.token=uni.getStorageSync('token');
		if (this.token) {
			uni.$u.http.get(`cart/list`,).then(res => {
			console.log(res, '打印结果');
			if (res.status == 200) {
				this.loading =false
				this.cartTotal = res.data.cartTotal
				let list = res.data.list
				this.shopCarList = list.map(item => {
					item.checked = false
					return item
				})
				console.log(this.shopCarList);

			}else {
				this.show = true
			}
		})
		}
		
	},
}
</script>

<style></style>
