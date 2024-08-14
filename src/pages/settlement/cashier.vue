<template>
	<view class="cashier" style="background-color: #f4f4f4;height: 100%;border: 1px solid #f4f4f4;">
		<view style="width: 400rpx;margin: 50rpx auto;display: flex;flex-direction: column;align-items: center;">
			<view>
				<u-count-down :time="remainingTime" format="DD:HH:mm:ss" autoStart millisecond @change="onChange">
					<view class="time">
						<view style=" color: black; font-size: 12px;margin-right: 15rpx">剩余时间</view>
						<text class="time__item">{{ timeData.days }}&nbsp;天</text>
						<text class="time__item">{{ timeData.hours > 10 ? timeData.hours : '0' + timeData.hours
							}}&nbsp;时</text>
						<text class="time__item">{{ timeData.minutes }}&nbsp;分</text>
						<text class="time__item">{{ timeData.seconds }}&nbsp;秒</text>
					</view>
				</u-count-down>
			</view>
			<view style="font-size: 40rpx;margin-top: 20rpx"><span>￥</span>{{ pay_price }}</view>
		</view>
		<view
			style=" width: 720rpx;height: 90rpx;border-radius: 15rpx;margin: 0 auto;background-color: white;display: flex;align-items: center;">
			<view style="margin-left: 60rpx;"><u-icon name="rmb-circle-fill" color="#ff9700" size="28"></u-icon></view>
			<view>余额支付 （可用￥{{ balance }}）</view>
			<view style="margin-left: 130rpx;">
				<u-checkbox-group>
					<u-checkbox shape="circle" activeColor="#ff547b"></u-checkbox>
				</u-checkbox-group>
			</view>
		</view>
		<view
			style="width: 750rpx;height: 90rpx;display: flex;align-items: center;justify-content: center;margin-top: 1000rpx">
			<view @click="goOrder"
				style="width: 700rpx;height: 70rpx;border-radius: 50rpx;text-align: center;line-height: 70rpx;background-color: #ff547b;color: white;">
				确认支付</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			balance: '',
			pay_price: '',
			goodsId: '',
			CountValue: '',
			timeData: {},
			expirationTime: '',  // 添加expirationTime变量
			remainingTime: 0,    // 剩余时间
		}
	},
	methods: {
		goOrder() {
			console.log('去我的订单');
			uni.navigateTo({ url: '/pages/order/order' })
		},
		onChange(e) {
			// console.log(e);

			this.timeData = e
		},
		calculateRemainingTime(expirationTime) {
			const now = new Date().getTime();  // 当前时间
			const expiration = new Date(expirationTime).getTime();  // 过期时间
			const remaining = expiration - now;  // 计算剩余时间
			return remaining > 0 ? remaining : 0;  // 如果剩余时间为负数，返回0
		},
	},
	onLoad(option) {
		console.log('订单结算台传过来的商品ID和商品个数', option);
		this.goodsId = option.goodsId
		this.CountValue = option.CountValue
		this.orderId = option.orderId
		uni.$u.http.get(`cashier/orderInfo&orderId=${option.orderId}&client=MP-WEIXIN`,).then(res => {
			console.log(res, '打印结果');
			if (res.status == 200) {
				// res.data.order.
				this.pay_price = res.data.order.pay_price;
				this.balance = res.data.personal.balance
				this.expirationTime = res.data.order.expirationTime;
				this.remainingTime = this.calculateRemainingTime(this.expirationTime);  // 计算剩余时间
			}
		})
	}
}
</script>

<style lang="scss">
.time {
	@include flex;
	align-items: center;

	&__item {
		color: black;
		font-size: 12px;
		text-align: center;
	}
}
</style>
