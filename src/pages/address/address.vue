<template>
	<view class="address"
		style="background-color: rgb(240 240 240);border: 1px solid rgb(240 240 240);">
		<view v-for="item in 10" :key="item" style="width: 700rpx;height: 230rpx;margin: 20rpx auto;border-radius: 30rpx;background-color: white;">
			<view style="width: 600rpx;height: 100rpx;border-bottom: 1px solid #f0f0f0;padding: 15rpx 0;display: flex;align-items: flex-start;flex-direction: column;justify-content: center;margin-left: 20rpx;">
				<view>张三 18924716147</view>
				<view>广东省 广州市 海珠区 新港中路397号</view>
			</view>
			<view style="width: 670rpx;height: 90rpx;margin: 0 auto;display: flex;justify-content: space-between;">
				<view style="display: flex;align-items: center;">
					<view><u-icon name="checkmark-circle-fill" color="#ff547b" size="20"></u-icon></view>
					<view>默认</view>
				</view>
				<view style="display: flex;">
					<view style="display: flex;align-items: center;margin: 0 30rpx;">
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
	</view>
</template>

<script>
export default {
	data() {
		return {

		}
	},
	methods: {

	}
}
</script>

<style></style>
