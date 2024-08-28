<template>
	<view class="settlement" style="background-color: #fafafa;position: relative;">
		<view style="display: flex;justify-content: space-around;height: 150rpx;color: #b1b1b2;">
			<view style="display: flex;align-items: center;" @click="goAddress">
				<view style="margin-right: 60rpx;"><u-icon name="map" color="#b1b1b2" size="20"></u-icon></view>
				<view>
					<view>{{ address.name }} {{ address.phone }}</view>
					<view>{{ address.region.province }}{{ address.region.city }}{{ address.region.region }}{{
						address.detail }}
					</view>
				</view>
			</view>
			<view style="display: flex;align-items: center;">
				<u-icon name="arrow-right" color="#b1b1b2" size="20"></u-icon>
			</view>
		</view>
		<view style="margin-top: 30rpx;">
			<view v-for="item in goodsList" :key="item.goods_id"
				style="display: flex;justify-content: space-between;align-items: center;margin: 20rpx 0;">
				<view style="display: flex;align-items: center;margin-left: 30rpx;">
					<image :src="item.goods_image" mode="scaleToFill"
						style="width: 200rpx;height: 200rpx;margin-right: 20rpx;" />
					<view>
						<view>{{ item.goods_name }}</view>
						<view style="color: #ff91ab;">X {{ orderTotalNum }}</view>
					</view>
				</view>
				<view style="margin-right: 10rpx;color: #ff91ab;">￥{{ item.goods_price }}</view>
			</view>
		</view>
		<view>
			<view style="display: flex; justify-content: space-between;margin: 20rpx 0">
				<view>订单总金额</view>
				<view style="color: #ff91ab;">￥{{ orderTotalPrice }}</view>
			</view>
			<view style="display: flex;justify-content: space-between;margin: 20rpx 0">
				<view>优惠卷</view>
				<view>无优惠卷可以用</view>
			</view>
			<view style="display: flex;justify-content: space-between;margin: 20rpx 0">
				<view>配送费用</view>
				<view style="color: #ff91ab;">￥{{ expressPrice }}</view>
			</view>
		</view>
		<view>
			<u--input placeholder="选填 买家留言 (50字以内)" border="surround" v-model="value" @change="change"></u--input>
		</view>
		<view
			style="width: 750rpx;display: flex;justify-content: space-between;align-items: center;background: white;position: sticky;bottom: 0;height: 100rpx;position: fixed;bottom: 25rpx;">
			<view style="margin-left: 30rpx;">
				<view>
					实付款： <span style="color: #ff91ab;">￥{{ orderPayPrice }}</span>
				</view>
			</view>
			<view style="display: flex;align-items: center;margin-right: 20rpx;">

				<view @click="goCashier"
					style="padding: 10rpx 40rpx;background-color: #ff91ab;border-radius: 35rpx;color: white;">
					提交订单
				</view>
			</view>

		</view>
		<view style="z-index: 100;">
			<u-loading-page :loading="loading">
			</u-loading-page>
		</view>
		<view>
			<u-modal :show="show" @confirm="confirm" @cancel="cancel" :title="title" :content='content1'
				confirmText="去登陆" cancelText="在逛会" showCancelButton="true"></u-modal>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			orderId: '',
			show: false,
			title: '温馨提示',
			content1: '此时此刻需要您登录哦',
			value: '',
			goodsId: '',
			cartId: '',
			CountValue: '',
			goodsList: [],
			orderTotalNum: '',
			orderTotalPrice: '',
			expressPrice: '',
			orderPayPrice: '',
			address: {},
			loading: true,
			cartIds: '',
			encodedCartID: '',
		}
	},
	methods: {
		change() {
			console.log('change');

		},
		goCashier() {
			let pages = getCurrentPages();
			let page = pages[pages.length - 1];
			let page1 = pages[pages.length - pages.length];
			console.log('获取所有页面', pages);
			console.log('获取当前页面', page.$page.fullPath);
			if (page.$page.fullPath == `/pages/settlement/settlement?cartIds=${this.cartIds}`) {
				console.log('购物车结算');
				let data = {
					cartIds: this.cartIds,
					couponId: 0,
					delivery: 10,
					isUsePoints: 0,
					mode: "cart",
					remark: ""
				}
				uni.$u.http.post(`checkout/submit`, data).then(res => {
					console.log(res, '打印结果');
					if (res.status == 200) {
						this.orderId = res.data.orderId
						uni.redirectTo({
							url: `/pages/settlement/cashier?goodsId=${this.goodsId}&CountValue=${this.CountValue}&orderId=${this.orderId}`
						})
					}
				})
			}
			if (page.$page.fullPath == `/pages/settlement/settlement?goodsid=${this.goodsId}&CountValue=${this.CountValue}` ||page.$page.fullPath==`/pages/settlement/settlement?goodsid=${this.goodsId}&CountValue=${this.CountValue}&cartId=${this.cartId}`) {
				console.log('立即购买');
				let data = {
					couponId: 0,
					delivery: 10,
					goodsId: this.goodsId,
					goodsNum: this.CountValue,
					goodsSkuId: "0",
					isUsePoints: 0,
					mode: "buyNow",
					remark: ""
				}
				uni.$u.http.post(`checkout/submit`, data).then(res => {
					console.log(res, '打印结果');
					if (res.status == 200) {
						this.orderId = res.data.orderId
						uni.redirectTo({
							url: `/pages/settlement/cashier?goodsId=${this.goodsId}&CountValue=${this.CountValue}&orderId=${this.orderId}`
						})
					}
				})
			}


		},
		confirm() {
			console.log('11');
			uni.navigateTo({
				url: '/pages/login/login'
			})
		},
		cancel() {
			console.log('22');
			uni.navigateBack()
		},
		goAddress(){
			console.log('编辑地址');
			uni.navigateTo({
				url: '/pages/address/address'
			})
		}
	},
	onLoad(option) {
		//https://yoshop-test.azhuquq.com/index.php?s=/api/checkout/order&mode=buyNow&delivery=0&couponId=0&isUsePoints=0&goodsId=10002&goodsNum=2&goodsSkuId=0
		this.loading = true
		console.log('页面参数', option);
		this.cartId = option.cartId
		this.goodsId = option.goodsid
		this.CountValue = option.CountValue
		if (uni.getStorageSync('token')) {
			let pages = getCurrentPages();
			let page = pages[pages.length - 1];
			let page1 = pages[pages.length - pages.length];
			console.log('获取所有页面', pages);
			console.log('获取当前页面', page.$page.fullPath);
			console.log('从哪个页面过来', page1.$page.fullPath);
			if (page1.$page.fullPath == '/pages/index/index' || page1.$page.fullPath == '/pages/Categories/categories') {
				// console.log(option, '页面参数');
				console.log('传过来的商品个数', option.CountValue);
				console.log('传过来的ID', option.goodsid);
				// this.goodsId = option.goodsid
				// this.CountValue = option.CountValue
				uni.$u.http.get(`checkout/order&mode=buyNow&delivery=0&couponId=0&isUsePoints=0&goodsId=${option.goodsid}&goodsNum=${option.CountValue}&goodsSkuId=0`,).then(res => {
					console.log(res, '打印结果');
					if (res.status == 200) {
						this.loading = false
						this.goodsList = res.data.order.goodsList
						this.orderTotalNum = res.data.order.orderTotalNum
						this.orderTotalPrice = res.data.order.orderTotalPrice
						this.orderPayPrice = res.data.order.orderPayPrice
						this.expressPrice = res.data.order.expressPrice
						this.address = res.data.order.address
					}
				})
			}
			if (page1.$page.fullPath == '/pages/shopCar/shopCar') {
				if (page.$page.fullPath == `/pages/settlement/settlement?goodsid=${this.goodsId}&CountValue=${this.CountValue}&cartId=${this.cartId}`) {
					console.log('2');
					uni.$u.http.get(`checkout/order&mode=buyNow&delivery=0&couponId=0&isUsePoints=0&goodsId=${option.goodsid}&goodsNum=${option.CountValue}&goodsSkuId=0`,).then(res => {
					console.log(res, '打印结果');
					if (res.status == 200) {
						this.loading = false
						this.goodsList = res.data.order.goodsList
						this.orderTotalNum = res.data.order.orderTotalNum
						this.orderTotalPrice = res.data.order.orderTotalPrice
						this.orderPayPrice = res.data.order.orderPayPrice
						this.expressPrice = res.data.order.expressPrice
						this.address = res.data.order.address
					}
				})
				} else {
					console.log('1');
					console.log(option.cartIds, '页面参数传递过来的购物车ID');
					this.cartIds = option.cartIds
					let encodedCartID = encodeURIComponent(this.cartIds);
					this.encodedCartID = encodedCartID
					console.log(encodedCartID, '编码转换');

					uni.$u.http.get(`checkout/order&mode=cart&delivery=0&couponId=0&isUsePoints=0&cartIds=${encodedCartID}`,).then(res => {
						console.log(res, '打印结果');
						if (res.status == 200) {
							this.loading = false
							this.goodsList = res.data.order.goodsList
							this.orderTotalNum = res.data.order.orderTotalNum
							this.orderTotalPrice = res.data.order.orderTotalPrice
							this.orderPayPrice = res.data.order.orderPayPrice
							this.expressPrice = res.data.order.expressPrice
							this.address = res.data.order.address
						}
					})
				}

			}
		} else {
			this.show = true
		}

	}
}
</script>

<style>
.u-modal__content.data-v-713d0fd3 {
	text-align: center;
}
</style>
