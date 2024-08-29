<template>
	<view style="background-color: #f7f8fa;height: 1500rpx;border: 1px solid  #f7f8fa">
		<view style="padding: 20rpx;margin: 15rpx 10rpx;color: #ff547b;">个人信息</view>
		<view style="width: 700rpx;height: 350rpx;margin: 0 auto;background-color: white;display: flex;flex-direction: column;justify-content: center;">
			<view style="margin-left: 30rpx; width: 100%;display: flex; align-items: center;border-bottom: 3px solid #f7f8fa;height: 150rpx;justify-content: flex-start;">
				<view style="margin-right: 20rpx;">头像</view>
				<button style="width: 110rpx;height: 110rpx;background-color: none;" open-type="chooseAvatar" @chooseavatar="chooseavatar">
					<view>
						<image
					src="../../static/logo.png"
					mode="scaleToFill"
					style="width: 110rpx;height: 110rpx;border-radius: 50%;margin-left: 100rpx;z-index: 100;"
				/>
					</view>
				</button>
				
			</view>
			<!-- <button style="background-color: white; margin-left: 30rpx; width: 100%;display: flex; align-items: center;border-bottom: 3px solid #f7f8fa;height: 150rpx;justify-content: flex-start;" open-type="chooseAvatar" @chooseavatar="chooseavatar">
				<view style="margin-right: 20rpx;">头像</view>
				<image
					src="../../static/logo.png"
					mode="scaleToFill"
					style="width: 110rpx;height: 110rpx;border-radius: 50%;margin-left: 100rpx;"
				/>
			</button> -->
			<view style="margin-left: 30rpx; width: 500rpx;display: flex; align-items: center;height: 150rpx;justify-content:  flex-start;">
				<view>昵称</view>
				<view style="margin-left: 100rpx;">微信用户——10001</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">

</style>
