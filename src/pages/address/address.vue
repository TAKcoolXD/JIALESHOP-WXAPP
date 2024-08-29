<template>
	<view class="address" style="background-color: rgb(240 240 240);border: 1px solid rgb(240 240 240);">
		<view v-for="item in addressList" :key="item.address_id"
			style="width: 700rpx;height: 230rpx;margin: 20rpx auto;border-radius: 30rpx;background-color: white;">
			<view
				style="width: 600rpx;height: 100rpx;border-bottom: 1px solid #f0f0f0;padding: 15rpx 0;display: flex;align-items: flex-start;flex-direction: column;justify-content: center;margin-left: 20rpx;">
				<view style="margin-bottom: 15rpx;">{{ item.name }} {{ item.phone }}</view>
				<view>{{ item.region.province }} {{ item.region.city }} {{ item.region.region }}</view>
			</view>
			<view style="width: 670rpx;height: 90rpx;margin: 0 auto;display: flex;justify-content: space-between;">
				<view style="display: flex;align-items: center;">
					<view><u-icon name="checkmark-circle-fill" color="#ff547b" size="20"></u-icon></view>
					<view>默认</view>
				</view>
				<view style="display: flex;">
					<view style="display: flex;align-items: center;margin: 0 30rpx;" @click="goUpdata">
						<view><u-icon name="edit-pen" color="#ff547b" size="25"></u-icon></view>
						<view>编辑</view>
					</view>
					<view style="display: flex;align-items: center;">
						<view><u-icon name="trash" color="#ff547b" size="25"></u-icon></view>
						<view>删除</view>
					</view>
				</view>
			</view>
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
			addressList: [],
			show: false,
			title: '温馨提示',
			content1: '此时此刻需要您登录哦',
		}
	},
	methods: {
		goUpdata() {
			console.log('编辑');
			uni.navigateTo({
				url: `/pages/address/updataAddress`
			})
		},
		confirm() {
			console.log('去登陆');
			uni.navigateTo({
				url: '/pages/login/login'
			})
			this.show = false
		},
		cancel() {
			console.log('在逛会');
			uni.navigateBack()
		},
	},
	onLoad() {
	

	},
	onShow(){
		if (uni.getStorageSync('token')) {
			uni.$u.http.get('address/list',).then(res => {
				console.log(res, '打印结果');
				if (res.status == 200) {
					this.addressList = res.data.list
				}

			})
		} else {
			this.show = true
		}
	}
}
</script>

<style>
.u-modal__content__text.data-v-713d0fd3 {
	text-align: center;
}
</style>
