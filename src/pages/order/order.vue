<template>
	<view class="order" style="background-color:rgb(244 244 244);">
		<view style="width: 100%; display: flex;justify-content: center;width: 730rpx;margin: 0 auto">
			<u-tabs :list="list1" @click="click" itemStyle="width: 100rpx;height:80rpx" lineWidth="20"
				lineColor="#ff5a7f"></u-tabs>
		</view>
		<view v-show="showIndex == 0" v-for="(item, index) in AllList" :key="index"
			style=" border: 1px solid #ffffff;border-radius: 20rpx;width: 700rpx;margin: 15rpx auto;background-color: #ffffff;">
			<view><u-modal :show="show" :title="title" :content='content' showCancelButton="true"
					@confirm="confirm(item.goods[0].order_id)" @cancel="cancel"></u-modal></view>
			<view style="width: 100%;height: 70rpx;display: flex;align-items: center;justify-content: space-between;">
				<view style="margin-left: 15rpx;color: #b0b0b0;">{{ item.create_time }}</view>
				<!-- 订单的状态文字 state_text	string	待支付	订单状态文字（待支付、待发货、部分发货、待收货、已完成、已取消、待取消） -->
				<view style="margin-right: 15rpx;color: #ff8ea8;">{{ item.state_text }}</view>
			</view>
			<view
				style="width: 100%;height: 240rpx;margin-top: 20rpx;display: flex;justify-content: space-between;align-items: center">
				<image :src="item.goods[0].goods_image" mode="scaleToFill"
					style="height: 200rpx;width: 200rpx;margin-left: 20rpx" />
				<span style="margin-right: 102rpx;margin-bottom: 138rpx;">{{ item.goods[0].goods_name }}</span>
				<view style="margin-right: 20rpx;">
					<view>￥{{ item.goods[0].goods_price }}</view>
					<view>x {{ item.goods[0].total_num }}</view>
				</view>
			</view>
			<view
				style="width: 500rpx;height: 130rpx;margin-top: 20rpx;margin-left: 200rpx;display: flex;flex-direction: column;align-items: center;justify-content: center;">
				<view> 共{{ item.goods[0].total_num }}件商品 ，总金额 ￥{{ item.goods[0].total_price }} </view>
			</view>
			<view style="display: flex;justify-content: flex-end;padding-bottom: 25rpx;">
				<view @click="goPayOrder" v-show="item.state_text == '待支付'"
					style="padding: 0 20rpx;margin: 0 8rpx;border: 2px solid #ff99af;border-radius: 15rpx;color: #ff8ea8;">
					去支付</view>
				<view @click="goCancleOrder" v-show="item.state_text == '待支付'"
					style="padding: 0 20rpx;margin: 0 8rpx;border: 2px solid #dbdbdb;border-radius: 15rpx;">取消</view>
				<view @click="confirmCancle" v-show="item.state_text == '待发货'"
					style="padding: 0 20rpx;margin: 0 8rpx;border: 2px solid #dbdbdb;border-radius: 15rpx;">申请取消</view>
			</view>
			<view v-show="item.state_text == '待取消'" style="margin-left: 20rpx;margin-bottom: 20rpx ;">
				取消申请中
			</view>
		</view>
		<view v-show="showIndex == 1" v-for="(item, index) in 3" :key="index"
			style=" border: 1px solid #ffffff;border-radius: 20rpx;width: 700rpx;margin: 15rpx auto;background-color: #ffffff;">
			<view style="width: 100%;height: 70rpx;display: flex;align-items: center;justify-content: space-between;">
				<view style="margin-left: 15rpx;color: #b0b0b0;">2024-08-08 14:22:59</view>
				<view style="margin-right: 15rpx;color: #ff8ea8;">待发货</view>
			</view>
			<view
				style="width: 100%;height: 240rpx;margin-top: 20rpx;display: flex;justify-content: space-between;align-items: center">
				<image src="../../static/logo.png" mode="scaleToFill"
					style="height: 200rpx;width: 200rpx;margin-left: 20rpx" />
				<view style="margin-right: 20rpx;">
					<view>$w.00</view>
					<view>x w</view>
				</view>
			</view>
			<view
				style="width: 400rpx;height: 130rpx;margin-top: 20rpx;margin-left: 300rpx;display: flex;flex-direction: column;align-items: center;justify-content: center;">
				<view> 共二件商品 ，总金额 $2.00 </view>
			</view>
			<view style="display: flex;justify-content: flex-end;">
				<view
					style="padding: 0 20rpx;margin: 0 8rpx;border: 2px solid #ff99af;border-radius: 15rpx;color: #ff8ea8;">
					去支付</view>
				<view style="padding: 0 20rpx;margin: 0 8rpx;border: 2px solid #dbdbdb;border-radius: 15rpx;">取消</view>
				<view style="padding: 0 20rpx;margin: 0 8rpx;border: 2px solid #dbdbdb;border-radius: 15rpx;">申请取消
				</view>
			</view>
			<view v-show="true" style="margin-left: 20rpx;margin-bottom: 20rpx ;">
				取消申请中
			</view>
		</view>
		<u-toast ref="uToast"></u-toast>
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
			showIndex: 0,
			orderId: '',
			AllList: [],
			paymentList: [],
			deliveryList: [],
			receivedList: [],
			commentList: [],
			show: false,
			title: '友情提示',
			content: '确认要取消该订单吗？'

		}
	},
	methods: {
		click(item) {
			console.log('item', item);
			this.showIndex = item.index
			if (this.showIndex == 0) {
				console.log('全部');
				this.getAllList()
			}
			if (this.showIndex == 1) {
				console.log('待支付');
				uni.$u.http.get(`order/list&dataType=payment&page=1`,).then(res => {
					console.log(res, '打印结果');
					if (res.status == 200) {
						console.log('paymentList', this.paymentList);
						this.paymentList = res.data.list.data


					}
				})
			}
			if (this.showIndex == 2) {
				console.log('待发货');
				uni.$u.http.get(`order/list&dataType=delivery&page=1`,).then(res => {
					console.log(res, '打印结果');
					if (res.status == 200) {
						console.log('this.deliveryList', this.deliveryList);
						this.deliveryList = res.data.list.data


					}
				})
			}
			if (this.showIndex == 3) {
				console.log('待收货');
				uni.$u.http.get(`order/list&dataType=received&page=1`,).then(res => {
					console.log(res, '打印结果');
					if (res.status == 200) {
						console.log('this.receivedList', this.receivedList);
						this.receivedList = res.data.list


					}
				})
			}
			if (this.showIndex == 4) {
				console.log('待评价');
				uni.$u.http.get(`order/list&dataType=comment&page=1`,).then(res => {
					console.log(res, '打印结果');
					if (res.status == 200) {
						console.log('this.commentList', this.commentList);
						this.commentList = res.data.list


					}
				})
			}
		},
		goPayOrder() {
			console.log('goPay');

		},
		goCancleOrder() {
			console.log('goCancleOrder');
			this.show = true
		},
		confirmCancle() {
			console.log('confirmCancle');

		},
		confirm(orderId) {
			console.log('确认', orderId);
			let data = {
				orderId
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
					this.getAllList() 
				}
			})
		},
		cancel() {
			console.log('取消');
			this.show = false
		},
		getAllList(){
			uni.$u.http.get(`order/list&dataType=all&page=1`,).then(res => {
			console.log(res, '打印结果');
			if (res.status == 200) {
				this.AllList = res.data.list.data
			}
		})
		}
	},
	onLoad(option) {
		console.log('参数', option);
		this.orderId = option.orderId
		this.getAllList()
	},
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
