<template>
	<view class="shopCar" style="background-color: #f5f5f5;position: relative;">
		<view v-if="token && shopCarList.length > 0">
			<!-- 购物车商品个数  编辑按钮-->
			<view style="width: 100%;height: 70rpx;display: flex;justify-content: space-between;align-items: center">
				<view>共 <span style="color: #ff91ab;">4</span> 件商品</view>
				<view v-if="showhandle" style="display: flex;align-items: center;margin-right: 15rpx;" @click="change">
					<view style="margin-right: 10rpx;"><u-icon name="edit-pen" color="#707071" size="20"></u-icon>
					</view>
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
						<u-number-box v-model="item.goods_num" @change="valChange(item)"></u-number-box>
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
						合计：<span style="font-size: 20rpx;color: #ff91ab;">￥</span><span style="color: #ff91ab;">{{
							totalPrice }}</span>
					</view>
					<view v-if="!showDelete">
						<button v-if="!isCheck" @click="goSettleMent1"
							style="padding: 10rpx 40rpx;background-color: #ff91ab;border-radius: 35rpx;color: white;">去结算</button>
						<button v-else @click="goSettleMent"
							style="padding: 10rpx 40rpx;background-color: #ff547b;border-radius: 35rpx;color: white;">去结算{{
								cartTotal }}</button>
					</view>
					<view v-else>
						<button v-if="!isCheck" @click="clearShopList"
							style="padding: 10rpx 40rpx;background-color: #ff91ab;border-radius: 35rpx;color: white;">删除</button>
						<button v-else @click="clearShopList"
							style="padding: 10rpx 40rpx;background-color: #ff547b;border-radius: 35rpx;color: white;">删除</button>
					</view>

					<!-- <view @click="goSettleMent"
					style="padding: 10rpx 40rpx;background-color: #ff91ab;border-radius: 35rpx;color: white;">
					去结算
				</view> -->
				</view>

			</view>
		</view>
		<view v-else style="height: 1500rpx;">
			<view><u-empty mode="car" icon-size="200"></u-empty></view>
			<view @click="goIndex"
				style="width: 300rpx;height: 70rpx;background-color:#ff547b ;margin: 30rpx auto;text-align: center;text-align: center;line-height: 70rpx;color: white;border-radius: 40rpx;">
				去逛逛</view>
		</view>
		<u-toast ref="uToast"></u-toast>
		<u-modal :show="showModal" :title="title" :content='content' showCancelButton="true" @confirm="confirm"
			@cancel="cancel" confirmText="确定" cancelText="取消"></u-modal>
	</view>
</template>
<script>
import { em, tr } from '@dcloudio/vue-cli-plugin-uni/packages/postcss/tags';
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
			value: '',
			cartId: [],
			showDelete: false,
			showModal: false,
			title: '友情提示',
			content: '您确定要删除该商品吗?',
		}
	},
	methods: {
		goUpdata() {
			console.log('点击数量');
		},
		valChange(item) {
			console.log(item);
			let data = {
				goodsId: item.goods_id,
				goodsNum: item.goods_num,
				goodsSkuId: item.goods_sku_id
			}
			console.log("🚀 ~ valChange ~ obj:", data)
			uni.$u.http.post(`cart/update`, data).then(res => {
				console.log(res, '打印结果');
				if (res.status == 200) {
					this.$refs.uToast.show({
						message: '修改商品数量成功',
						type: 'success',
						position: 'center',
						duration: 1000
					});
					this.cartTotal = res.data.cartTotal

				}
			})
		},
		change() {
			console.log('sad');
			this.showhandle = !this.showhandle;
			this.showDelete = !this.showDelete
		},
		goSettleMent() {
			console.log('去结算');
			this.cartId = []
			this.shopCarList.forEach(item => {
				console.log(item.checked, '勾选状态');

				if (item.checked == true) {
					this.cartId.push(item.id)
				}
			})
			console.log('整理完毕的购物车ID', this.cartId);
			let cartID = this.cartId.join(',')
			console.log('数组转化字符串', cartID);

			// uni.navigateTo({
			// 	url: '/pages/settlement/settlement'
			// })
			uni.navigateTo({
				url: `/pages/settlement/settlement?cartIds=${cartID}` // 将 cartID 添加到 URL 中
			});
		},
		goSettleMent1() {
			console.log('请选择商品');
			this.$refs.uToast.show({
				message: '请选择商品',
				type: 'error',
				position: 'center',
				duration: 1000
			});
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
		clearShopList() {
			console.log('清除shopList');

			if (this.checkedAll) {
				this.shopCarList = []
			} else {
				// this.shopCarList.forEach(item => {
				// 	console.log('勾选的', item.checked);
				// 	if (item.checked == true) {
				// 		console.log('清除选择的');
				this.showModal = true
				// 	}
				// })
				// console.log(''a);

				// console.log('选错选中的');

			}

		},
		confirm() {
			console.log('确认');
			this.shopCarList.forEach(item => {
				console.log('勾选的', item.checked);
				if (item.checked == true) {
					console.log('清除选择的', item.id);
					let data = {
						cartIds: []
					}
					data.cartIds.push(item.id)
					uni.$u.http.post(`cart/clear`, data).then(res => {
						console.log(res, '打印结果');
						if (res.status == 200) {
							this.$refs.uToast.show({
								message: res.message,
								type: 'success',
								position: 'center',
								duration: 1000
							});
							uni.$u.http.get(`cart/list`,).then(res => {
								console.log(res, '打印结果');
								if (res.status == 200) {
									this.loading = false
									this.cartTotal = res.data.cartTotal
									let list = res.data.list
									this.shopCarList = list.map(item => {
										item.checked = false
										return item
									})
									console.log(this.shopCarList);
									console.log('商城数组长度', this.shopCarList.length);
									if (this.shopCarList.length > 0) {
										uni.setTabBarBadge({
											index: 2, // 确保索引与购物车tab一致
											text: String(this.shopCarList.length) // 将长度转换为字符串
										});
									} else {
										uni.removeTabBarBadge({
											index: 2
										});
									}
								} else {
									this.show = true
								}
							})

						} else {
							this.$refs.uToast.show({
								message: '删除失败',
								type: 'error',
								position: 'center',
								duration: 1000
							});
						}
					})
					this.showModal = false
				}
			})
		},
		cancel() {
			console.log('取消');
			this.showModal = false
		}
	},
	computed: {
		checkedAll() {
			return this.shopCarList.every(item => item.checked)
		},
		isCheck() {
			return this.shopCarList.some(item => item.checked)
		},
		totalPrice() {
			return this.shopCarList
				.filter(item => item.checked)
				.reduce((total, item) => {
					return total + (item.goods_num * item.goods.goods_price_max);
				}, 0).toFixed(2);
		}
	},
	onShow() {
		this.loading = true
		this.token = uni.getStorageSync('token');
		if (this.token) {
			uni.$u.http.get(`cart/list`,).then(res => {
				console.log(res, '打印结果');
				if (res.status == 200) {
					this.loading = false
					this.cartTotal = res.data.cartTotal
					let list = res.data.list
					this.shopCarList = list.map(item => {
						item.checked = false
						return item
					})
					console.log(this.shopCarList);
					console.log('商城数组长度', this.shopCarList.length);
					if (this.shopCarList.length > 0) {
						uni.setTabBarBadge({
							index: 2, // 确保索引与购物车tab一致
							text: String(this.shopCarList.length) // 将长度转换为字符串
						});
					} else {
						uni.removeTabBarBadge({
							index: 2
						});
					}
				} else {
					this.show = true 
				}
			})
		}

	},
}
</script>

<style></style>
