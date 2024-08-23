<template>
	<view class="order" style="background-color:rgb(244 244 244);">
		<view style="width: 100%; display: flex;justify-content: center;width: 730rpx;margin: 0 auto">
			<u-tabs :current="showIndex" :list="list1" @click="click" itemStyle="width: 100rpx;height:80rpx"
				lineWidth="20" lineColor="#ff5a7f">
			</u-tabs>
		</view>
		<view v-show="showIndex === 0" v-for="(item, index) in AllList" :key="index"
			style=" border: 1px solid #ffffff;border-radius: 20rpx;width: 700rpx;margin: 15rpx auto;background-color: #ffffff;">
			<view style="width: 100%;height: 70rpx;display: flex;align-items: center;justify-content: space-between;">
				<view style="margin-left: 15rpx;color: #b0b0b0;">{{ item.create_time }}</view>
				<!-- 订单的状态文字 state_text	string	待支付	订单状态文字（待支付、待发货、部分发货、待收货、已完成、已取消、待取消） -->
				<view style="margin-right: 15rpx;color: #ff8ea8;">{{ item.state_text }}</view>
			</view>
			<view v-for="goodsitem in item.goods" :key="goodsitem.goods_id"
				style="width: 100%;height: 240rpx;margin-top: 20rpx;display: flex;justify-content: space-between;align-items: center">
				<image :src="goodsitem.goods_image" mode="scaleToFill"
					style="height: 200rpx;width: 200rpx;margin-left: 20rpx" />
				<span style="margin-right: 102rpx;margin-bottom: 138rpx;">{{ goodsitem.goods_name }}</span>
				<view style="margin-right: 20rpx;">
					<view>￥{{ goodsitem.goods_price }}</view>
					<view>x {{ goodsitem.total_num }}</view>
				</view>
			</view>
			<view
				style="width: 500rpx;height: 130rpx;margin-top: 20rpx;margin-left: 200rpx;display: flex;flex-direction: column;align-items: center;justify-content: center;">
				<view> 共{{ item.length }}件商品 ，总金额 ￥{{ item.total_price }} </view>
			</view>
			<view style="display: flex;justify-content: flex-end;padding-bottom: 25rpx;">
				<view @click="goPayOrder" v-show="item.state_text == '待支付'"
					style="padding: 0 20rpx;margin: 0 8rpx;border: 2px solid #ff99af;border-radius: 15rpx;color: #ff8ea8;">
					去支付</view>
				<view @click="goCancleOrder(item.order_id)" v-show="item.state_text == '待支付'"
					style="padding: 0 20rpx;margin: 0 8rpx;border: 2px solid #dbdbdb;border-radius: 15rpx;">取消</view>
				<view @click="applyCancle(item.order_id)" v-show="item.state_text == '待发货'"
					style="padding: 0 20rpx;margin: 0 8rpx;border: 2px solid #dbdbdb;border-radius: 15rpx;">申请取消</view>
			</view>
			<view v-show="item.state_text == '待取消'" style="margin-left: 20rpx;margin-bottom: 20rpx ;">
				取消申请中
			</view>
		</view>
		<view v-show="showIndex === 1" v-for="(item, index) in paymentList" :key="index"
			style=" border: 1px solid #ffffff;border-radius: 20rpx;width: 700rpx;margin: 15rpx auto;background-color: #ffffff;">
			<view style="width: 100%;height: 70rpx;display: flex;align-items: center;justify-content: space-between;">
				<view style="margin-left: 15rpx;color: #b0b0b0;">{{ item.create_time }}</view>
				<!-- 订单的状态文字 state_text	string	待支付	订单状态文字（待支付、待发货、部分发货、待收货、已完成、已取消、待取消） -->
				<view style="margin-right: 15rpx;color: #ff8ea8;">{{ item.state_text }}</view>
			</view>
			<view v-for="goodsitem in item.goods" :key="goodsitem.goods_id"
				style="width: 100%;height: 240rpx;margin-top: 20rpx;display: flex;justify-content: space-between;align-items: center">
				<image :src="goodsitem.goods_image" mode="scaleToFill"
					style="height: 200rpx;width: 200rpx;margin-left: 20rpx" />
				<span style="margin-right: 102rpx;margin-bottom: 138rpx;">{{ goodsitem.goods_name }}</span>
				<view style="margin-right: 20rpx;">
					<view>￥{{ goodsitem.goods_price }}</view>
					<view>x {{ goodsitem.total_num }}</view>
				</view>
			</view>
			<view
				style="width: 500rpx;height: 130rpx;margin-top: 20rpx;margin-left: 200rpx;display: flex;flex-direction: column;align-items: center;justify-content: center;">
				<view> 共{{ item.length }}件商品 ，总金额 ￥{{ item.total_price }} </view>
			</view>
			<view style="display: flex;justify-content: flex-end;padding-bottom: 25rpx;">
				<view @click="goPayOrder" v-show="item.state_text == '待支付'"
					style="padding: 0 20rpx;margin: 0 8rpx;border: 2px solid #ff99af;border-radius: 15rpx;color: #ff8ea8;">
					去支付</view>
				<view @click="goCancleOrder(item.order_id)" v-show="item.state_text == '待支付'"
					style="padding: 0 20rpx;margin: 0 8rpx;border: 2px solid #dbdbdb;border-radius: 15rpx;">取消</view>
				<view @click="applyCancle(item.order_id)" v-show="item.state_text == '待发货'"
					style="padding: 0 20rpx;margin: 0 8rpx;border: 2px solid #dbdbdb;border-radius: 15rpx;">申请取消</view>
			</view>
			<view v-show="item.state_text == '待取消'" style="margin-left: 20rpx;margin-bottom: 20rpx ;">
				取消申请中
			</view>

		</view>
		<view v-show="showIndex === 2" v-for="(item, index) in deliveryList" :key="index"
			style=" border: 1px solid #ffffff;border-radius: 20rpx;width: 700rpx;margin: 15rpx auto;background-color: #ffffff;">
			<view style="width: 100%;height: 70rpx;display: flex;align-items: center;justify-content: space-between;">
				<view style="margin-left: 15rpx;color: #b0b0b0;">{{ item.create_time }}</view>
				<!-- 订单的状态文字 state_text	string	待支付	订单状态文字（待支付、待发货、部分发货、待收货、已完成、已取消、待取消） -->
				<view style="margin-right: 15rpx;color: #ff8ea8;">{{ item.state_text }}</view>
			</view>
			<view v-for="goodsitem in item.goods" :key="goodsitem.goods_id"
				style="width: 100%;height: 240rpx;margin-top: 20rpx;display: flex;justify-content: space-between;align-items: center">
				<image :src="goodsitem.goods_image" mode="scaleToFill"
					style="height: 200rpx;width: 200rpx;margin-left: 20rpx" />
				<span style="margin-right: 102rpx;margin-bottom: 138rpx;">{{ goodsitem.goods_name }}</span>
				<view style="margin-right: 20rpx;">
					<view>￥{{ goodsitem.goods_price }}</view>
					<view>x {{ goodsitem.total_num }}</view>
				</view>
			</view>
			<view
				style="width: 500rpx;height: 130rpx;margin-top: 20rpx;margin-left: 200rpx;display: flex;flex-direction: column;align-items: center;justify-content: center;">
				<view> 共{{ item.length }}件商品 ，总金额 ￥{{ item.total_price }} </view>
			</view>
			<view style="display: flex;justify-content: flex-end;padding-bottom: 25rpx;">
				<view @click="goPayOrder" v-show="item.state_text == '待支付'"
					style="padding: 0 20rpx;margin: 0 8rpx;border: 2px solid #ff99af;border-radius: 15rpx;color: #ff8ea8;">
					去支付</view>
				<view @click="goCancleOrder(item.order_id)" v-show="item.state_text == '待支付'"
					style="padding: 0 20rpx;margin: 0 8rpx;border: 2px solid #dbdbdb;border-radius: 15rpx;">取消</view>
				<view @click="applyCancle(item.order_id)" v-show="item.state_text == '待发货'"
					style="padding: 0 20rpx;margin: 0 8rpx;border: 2px solid #dbdbdb;border-radius: 15rpx;">申请取消</view>
			</view>
			<view v-show="item.state_text == '待取消'" style="margin-left: 20rpx;margin-bottom: 20rpx ;">
				取消申请中
			</view>
		</view>
		<u-toast ref="uToast"></u-toast>
		<u-modal :show="show" :title="title" :content='content' showCancelButton="true"
			@confirm="confirm(CancleOrderId)" @cancel="cancel"></u-modal>
		<u-modal :show="showLogin" :title="Logintitle" :content='Logincontent' showCancelButton="true"
			@confirm="Loginconfirm" @cancel="Logincancel" confirmText="去登陆" cancelText="再逛逛">
		</u-modal>
		<view>
			<u-loading-page :loading="showLoad"></u-loading-page>
		</view>
	</view>
</template>

<!-- order_status	int	10	订单状态 (10进行中 20取消 21待取消 30已完成)
		order_status    int 10 取消进行中  显示待取消 取消申请中字体   显示待取消
		order_status	int 21 待取消 手动点击取消 显示申请取消按钮 不显示取消申请中文字 显示待发货
 	 -->
<script>
import { tr } from '@dcloudio/vue-cli-plugin-uni/packages/postcss/tags';

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
			showLoad: false,
			showIndex: 0,
			orderId: '',
			AllList: [],
			paymentList: [],
			deliveryList: [],
			receivedList: [],
			commentList: [],
			show: false,
			title: '友情提示',
			content: '确认要取消该订单吗？',
			CancleOrderId: '',
			showLogin: false,
			Logintitle: '友情提示',
			Logincontent: '请先登录'


		}
	},
	methods: {
		click(item) {
			console.log('点击时tag触发item', item);
			this.showIndex = item.index
			if (this.showIndex == 0) {
				console.log('全部');
				this.showLoad=true
				this.getAllList()
			}
			if (this.showIndex == 1) {
				console.log('待支付');
				this.showLoad=true
				uni.$u.http.get(`order/list&dataType=payment&page=1`,).then(res => {
					console.log(res, '打印结果');
					if (res.status == 200) {
						this.showLoad=false
						console.log('paymentList', this.paymentList);
						this.paymentList = res.data.list.data


					}
				})
			}
			if (this.showIndex == 2) {
				console.log('待发货');
				this.showLoad=true
				uni.$u.http.get(`order/list&dataType=delivery&page=1`,).then(res => {
					console.log(res, '打印结果');
					if (res.status == 200) {
						this.showLoad=false
						console.log('this.deliveryList', this.deliveryList);
						this.deliveryList = res.data.list.data


					}
				})
			}
			if (this.showIndex == 3) {
				console.log('待收货');
				this.showLoad=true
				uni.$u.http.get(`order/list&dataType=received&page=1`,).then(res => {
					console.log(res, '打印结果');
					if (res.status == 200) {
						this.showLoad=false
						console.log('this.receivedList', this.receivedList);
						this.receivedList = res.data.list


					}
				})
			}
			if (this.showIndex == 4) {
				this.showLoad=true
				console.log('待评价');
				uni.$u.http.get(`order/list&dataType=comment&page=1`,).then(res => {
					console.log(res, '打印结果');
					if (res.status == 200) {
						this.showLoad=false
						console.log('this.commentList', this.commentList);
						this.commentList = res.data.list


					}
				})
			}
		},
		goPayOrder() {
			console.log('goPay');

		},
		goCancleOrder(orderId) {
			console.log('goCancleOrder', orderId);
			this.CancleOrderId = orderId
			this.show = true
		},
		applyCancle(orderId) {
			console.log('applyCancle', orderId);
			this.CancleOrderId = orderId
			this.show = true
		},
		confirm(CancleOrderId) {
			console.log('确认', CancleOrderId);
			let data = {
				orderId: CancleOrderId
			}
			console.log('data', data);

			uni.$u.http.post(`order/cancel`, data).then(res => {
				console.log(res, '打印结果');
				if (res.status == 200) {
					this.show = false
					this.$refs.uToast.show({
						message: res.message,
						type: 'success',
						position: 'center',
						duration: 2000
					});
					if (this.showIndex == 0) {
						console.log('发送全部数据请求');
						this.getAllList()
					}
					if (this.showIndex == 1) {
						console.log('发送待支付的数据');
						uni.$u.http.get(`order/list&dataType=payment&page=1`,).then(res => {
							console.log(res, '打印结果');
							if (res.status == 200) {
								console.log('paymentList', this.paymentList);
								this.paymentList = res.data.list.data


							}
						})
					}
					if (this.showIndex == 2) {
						console.log('发送待发货数据请求');
						uni.$u.http.get(`order/list&dataType=delivery&page=1`,).then(res => {
							console.log(res, '打印结果');
							if (res.status == 200) {
								console.log('this.deliveryList', this.deliveryList);
								this.deliveryList = res.data.list.data


							}
						})
					}
				}
			})
		},
		cancel() {
			console.log('取消');
			this.show = false
		},
		getAllList() {
			uni.$u.http.get(`order/list&dataType=all&page=1`,).then(res => {
				console.log(res, '打印结果');
				if (res.status == 200) {
					this.showLoad=false
					this.AllList = res.data.list.data
					this.AllList = this.AllList.map(item => {
						// console.log(item.goods.length);
						item.length = item.goods.length
						return item
					})
				}
			})
		},
		Loginconfirm() {
			console.log('去登录');
			this.showLogin = false
			uni.navigateTo({
				url: '/pages/login/login'
			})
			// this.getAllList()
		},
		Logincancel() {
			console.log('再逛逛')
			uni.navigateBack()
		}
	},
	onLoad(option) {
		console.log('页面参数', option);
		console.log('this.showLoad', this.showLoad);

		let pages = getCurrentPages();
		let page = pages[pages.length - 1];
		let page1 = pages[pages.length - pages.length];
		console.log('获取所有页面', pages);
		console.log('获取当前页面', page.$page.fullPath);
		console.log('从哪个页面过来', page1.$page.fullPath);
		if (uni.getStorageSync('token')) {
			console.log('参数showIndex', Number(option.showIndex));
			console.log('this.showIndex', this.showIndex)
			if (Number(option.showIndex) === 0) {
				this.showIndex = Number(option.showIndex)
				console.log('触发tabs的showIdex==0');
				console.log('发全部请求');
				this.getAllList()
				this.showLoad = true
			}
			if (Number(option.showIndex) === 1) {
				this.showIndex = Number(option.showIndex)
				console.log('触发tabs的showIdex==1');
				console.log('发待支付请求');
				this.showLoad = true
				uni.$u.http.get(`order/list&dataType=payment&page=1`,).then(res => {
					console.log(res, '打印结果');
					if (res.status == 200) {
						this.showLoad = false
						console.log('paymentList', this.paymentList);
						this.paymentList = res.data.list.data
					}
				})

			}
			if (Number(option.showIndex) === 2) {
				this.showIndex = Number(option.showIndex)
				console.log('触发tabs的showIdex==2');
				console.log('发待发货请求');
				this.showLoad = true
				uni.$u.http.get(`order/list&dataType=delivery&page=1`,).then(res => {
					console.log(res, '打印结果');
					if (res.status == 200) {
						this.showLoad = false
						console.log('this.deliveryList', this.deliveryList);
						this.deliveryList = res.data.list.data
					}
				})

			}

		} else {
			this.showLogin = true
		}
	},
	onShow() {
		if (uni.getStorageSync('token')) {
			this.getAllList()
		} else {
			this.showLogin = true
		}
	}
}
</script>

<style>
.u-tabs__wrapper__nav__item[data-v-0de61367] {
	padding: 0 17px !important;
}

.u-modal__content__text.data-v-713d0fd3 {
	text-align: center;
}
</style>
