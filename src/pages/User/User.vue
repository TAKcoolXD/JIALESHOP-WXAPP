<template>
	<view class="User" style="background: #e9e9e9;height: 1200rpx;">
		<view style="background-color: #faf6eb;height: 150rpx;">
			<view style="display:flex;margin-left: 40rpx;align-items: center;">
				<image v-if="!UserInfo" src="../../static/logo.png" mode="scaleToFill"
					style="width: 100rpx;height: 100rpx;border-radius: 50%;" />
				<image @click="goPersonal" v-else :src="wxImgUrl" mode="scaleToFill"
					style="width: 100rpx;height: 100rpx;border-radius: 50%;" />
				<view v-if="!UserInfo" @click="goLogin" style="margin-left: 30rpx;color: #d0af6b;">未登录请点击登录</view>
				<view v-else @click="goLogin" style="margin-left: 30rpx;color: #d0af6b;">{{ nickName }}</view>
			</view>
		</view>
		<view
			style="background-color: #fcebd1;height: 70rpx;display: flex;justify-content: space-around;align-items: center;">
			<view style="color: #eab766;">点击绑定手机号 确保账户的安全</view>
			<view style="background-color: #eab766;border-radius: 30rpx;padding: 5rpx 10rpx;color: white;">去绑定</view>
		</view>
		<view style=" height: 170rpx;display: flex;align-items: center;justify-content: center;">
			<view style="width: 500rpx;height: 130rpx;display: flex;align-items: center;justify-content: center;">
				<view @click="goWallet"
					style="margin: 0 35rpx;font-size: 30rpx;display: flex;flex-direction: column;align-items: center;">
					<view style="margin-top: 10rpx;">{{ balance }}</view>
					<view>账户余额</view>
				</view>
				<view @click="goPoints"
					style="margin: 0 35rpx;font-size: 30rpx;display: flex;flex-direction: column;align-items: center;">
					<view style="margin-top: 10rpx;">0</view>
					<view>积分</view>
				</view>
				<view @click="goCoupon1"
					style="margin: 0 35rpx;font-size: 30rpx;display: flex;flex-direction: column;align-items: center;">
					<view style="margin-top: 10rpx;">0</view>
					<view>优惠卷</view>
				</view>
			</view>
			<view @click="goWallet"
				style="width: 200rpx;height: 130rpx;display: flex;align-items: center;justify-content: center;flex-direction: column;">
				<view style="margin-top: 10rpx;"><u-icon name="red-packet-fill" color="#7d7d7d" size="25"></u-icon>
				</view>
				<view style="margin-top: 10rpx;">我的钱包</view>
			</view>

		</view>
		<view
			style="background-color: white; width: 700rpx;height: 170rpx;margin: 10rpx auto; display: flex;align-items: center;justify-content: center;">
			<view @click="goAllOrder"
				style="height: 100rpx;margin: 10rpx 35rpx;display: flex;flex-direction: column;align-items: center;justify-content: center;">
				<view><u-icon name="file-text" color="#7d7d7d" size="25"></u-icon></view>
				<view>全部订单</view>
			</view>
			<view @click="goPaymentOrder"
				style="height: 100rpx;margin: 10rpx 35rpx;display: flex;flex-direction: column;align-items: center;justify-content: center;">
				<view>
					<image src="../../static/支付 钱包 待支付.png" style="width: 45rpx;height: 45rpx;" mode="scaleToFill" />
				</view>
				<view>待支付</view>
			</view>
			<view @click="goDeliveryOrder"
				style="height: 100rpx;margin: 10rpx 35rpx;display: flex;flex-direction: column;align-items: center;justify-content: center;">
				<view>
					<image src="../../static/待发货.png" style="width: 45rpx;height: 45rpx;" mode="scaleToFill" />
				</view>
				<view>待发货</view>
			</view>
			<view @click="goReceivedOrder"
				style="height: 100rpx;margin: 10rpx 35rpx;display: flex;flex-direction: column;align-items: center;justify-content: center;">
				<view>
					<image src="../../static/待收货.png" style="width: 45rpx;height: 45rpx;" mode="scaleToFill" />
				</view>
				<view>待收货</view>
			</view>
		</view>
		<view
			style="background-color: white; width: 700rpx;height: 300rpx;margin: 20rpx auto; display: flex;align-items: center;justify-content: center;flex-wrap: wrap;">
			<view @click="goAddress"
				style="padding: 10rpx 10rpx;display: flex;flex-direction: column;align-items: center;justify-content: center;margin: 0 10rpx;">
				<view>
					<image src="../../static/收获地址.png" style="width: 60rpx;height: 60rpx;" mode="scaleToFill" />
				</view>
				<view>收货地址</view>
			</view>
			<view @click="goCoupon"
				style="padding: 10rpx 10rpx;display: flex;flex-direction: column;align-items: center;justify-content: center;margin: 0 10rpx;">
				<view>
					<image src="../../static/领卷活动.png" style="width: 45rpx;height: 45rpx;" mode="scaleToFill" />
				</view>
				<view>领卷中心</view>
			</view>
			<view @click="goCoupon1"
				style="padding: 10rpx 10rpx;display: flex;flex-direction: column;align-items: center;justify-content: center;margin: 0 10rpx;">
				<view>
					<image src="../../static/优惠卷.png" style="width: 45rpx;height: 45rpx;" mode="scaleToFill" />
				</view>
				<view>优惠卷</view>
			</view>
			<view @click="goRefund"
				style="padding: 10rpx 10rpx;display: flex;flex-direction: column;align-items: center;justify-content: center;margin: 0 10rpx;">
				<view>
					<image src="../../static/退换货.png" style="width: 45rpx;height: 45rpx;" mode="scaleToFill" />
				</view>
				<view>退还/售后</view>
			</view>
			<view
				style="padding: 10rpx 10rpx;display: flex;flex-direction: column;align-items: center;justify-content: center;margin: 0 10rpx;">
				<view>
					<image src="../../static/客服在线.png" style="width: 45rpx;height: 45rpx;" mode="scaleToFill" />
				</view>
				<view>在线客服</view>
			</view>
			<view @click="goPoints"
				style="padding: 10rpx 10rpx;display: flex;flex-direction: column;align-items: center;justify-content: center;margin: 0 10rpx;">
				<view>
					<image src="../../static/积分.png" style="width: 45rpx;height: 45rpx;" mode="scaleToFill" />
				</view>
				<view>我的积分</view>
			</view>
			<view @click="goOrder"
				style="padding: 10rpx 10rpx;display: flex;flex-direction: column;align-items: center;justify-content: center;margin: 0 10rpx;">
				<view>
					<image src="../../static/订单中心icon.png" style="width: 45rpx;height: 45rpx;" mode="scaleToFill" />
				</view>
				<view>订单中心</view>
			</view>
			<view @click="goHelp"
				style="padding: 10rpx 10rpx;display: flex;flex-direction: column;align-items: center;justify-content: center;margin: 0 10rpx;">
				<view>
					<image src="../../static/帮助_o.png" style="width: 45rpx;height: 45rpx;" mode="scaleToFill" />
				</view>
				<view>我的帮助</view>
			</view>
		</view>
		<view @click="loginOut" v-show="UserInfo"
			style="width: 400rpx;height: 70rpx;border: 1px solid #282828;text-align: center;line-height: 70rpx;border-radius: 30rpx;margin: 50rpx auto;">
			退出登录
		</view>
		<u-modal @cancel="cancel" :show="show" :title="title" :content='content' showCancelButton="true"
			@confirm="confirm"></u-modal>
	</view>
</template>

<script>
export default {
	data() {
		return {
			UserInfo: {},
			show: false,
			title: '友情提示',
			content: '你确定要退出登录吗？',
			balance: '',
			wxImgUrl: '',
			nickName: '',
		}
	},
	methods: {
		goWallet() {
			uni.navigateTo({
				url: '/pages/wallet/wallet'
			})
		},
		goCoupon1() {
			uni.navigateTo({
				url: '/pages/my-coupon/my-coupon'
			})
		},
		goPoints() {
			uni.navigateTo({
				url: '/pages/points/points'
			})
		},
		goAllOrder() {
			uni.navigateTo({
				url: '/pages/order/order?showIndex=0'
			})
		},
		goPaymentOrder() {
			uni.navigateTo({
				url: '/pages/order/order?showIndex=1'
			})
		},
		goDeliveryOrder() {
			uni.navigateTo({
				url: '/pages/order/order?showIndex=2'
			})
		},
		goReceivedOrder() {
			uni.navigateTo({
				url: '/pages/order/order?showIndex=3'
			})
		},

		goAddress() {
			uni.navigateTo({
				url: '/pages/address/address'
			})
		},
		goCoupon() {
			uni.navigateTo({
				url: '/pages/coupon/coupon'
			})
		},
		goRefund() {
			uni.navigateTo({
				url: '/pages/refund/refund'
			})
		},
		goHelp() {
			uni.navigateTo({
				url: '/pages/help/help'
			})
		},
		loginOut() {
			console.log('loginOut');
			this.show = true

		},
		confirm() {
			console.log('提示框确认按钮');
			uni.removeStorageSync('token')
			uni.removeStorageSync('UserInfo')
			this.UserInfo = null
			this.show = false
		},
		cancel() {
			this.show = false
		},
		goLogin() {
			uni.navigateTo({
				url: '/pages/login/login'
			})
		},
		goPersonal(){
			uni.navigateTo({
				 url: '/pages/personal/personal'
			});
		}
	},
	computed: {
		// UserInfo() {
		// 	return uni.getStorageSync('UserInfo')
		// }


	},
	onLoad() {

	},
	onShow() {
		uni.$u.http.post('user/info',).then(res => {
			console.log(res, '打印结果');
			if (res.status == 200) {
				this.balance = res.data.userInfo.balance
				this.wxImgUrl = res.data.userInfo.avatar_url
				this.nickName = res.data.userInfo.nick_name
			}
		})
		this.UserInfo = uni.getStorageSync('UserInfo')
		console.log(this.UserInfo, 'onshow2');

	}

}
</script>


<style>
.u-modal__content.data-v-713d0fd3 {
	text-align: center;
}
</style>