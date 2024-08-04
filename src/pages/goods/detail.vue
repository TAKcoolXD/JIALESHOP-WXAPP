<template>
	<view class="detail">
		商品詳情
		<!-- 輪播圖 -->
		<view class="uni-margin-wrap">
			<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
				:duration="duration">
				<swiper-item v-for="(item, index) in 3" :key="index">
					<!-- <image
						:src="item.imgUrl" style="width: 100%;height: 100%;"/> -->
					<view>1</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 價格和贖買個數 -->
		<view style="width: 100%;height: 70rpx;display: flex;justify-content: space-between;align-items: center;">
			<view style="color: #ff547b;font-size: 40rpx;"><span style="font-size: 30rpx;">￥</span> 0.01</view>
			<view style="color: #959595;">已售0件</view>
		</view>
		<!-- 商品名稱和分享 -->
		<view style="display: flex;justify-content: space-between;align-items: center;">
			<view style="color: #959595;">蘋果14PRO</view>
			<view><u-icon name="share-square" color="#ff547b" size="28"></u-icon></view>
		</view>
		<!-- 說明 -->
		<view style="display:  flex;margin-top: 20rpx;align-items: center;">

			<view style="display:  flex;margin: 0 30rpx;font-size: 25rpx;">
				<u-icon name="checkmark" color="#ff547b" size="15"></u-icon>
				<view>七天無理由退貨</view>
			</view>
			<view style="display:  flex;margin-left: 10rpx;font-size: 25rpx;">
				<u-icon name="checkmark" color="#ff547b" size="15"></u-icon>
				<view>48小時發貨</view>
			</view>
			<view style="margin-left: 285rpx;"><u-icon name="arrow-right" color="#ff547b" size="15""></u-icon></view>
				
				
				
			
		</view>
		<!-- 商品的描述 -->
		 <view style=" margin-top: 20rpx;">
					<view>商品描述</view>
					<view v-html="desc">

					</view>
			</view>
		</view>
</template>
设计与显示
外观设计：采用不锈钢边框和陶瓷盾面板，提供极致的耐用性和美观度。

颜色：提供多种颜色选择，包括银色、石墨色、金色和暗紫色。

显示屏：6.1 英寸的 Super Retina XDR 显示屏，支持 ProMotion 技术，带来更加流畅的视觉体验。

硬件配置
处理器：搭载 A16 仿生芯片，提供强大的性能和效率。

存储容量：提供128GB、256GB、512GB 和 1TB 多种选择，满足不同存储需求。

摄像头系统：后置三摄系统，包括一个 48MP 主摄像头、一个 12MP 超广角摄像头和一个 12MP 长焦摄像头，支持 3 倍光学变焦。

前置摄像头：12MP TrueDepth 摄像头，支持面容识别和各种自拍功能。

功能特色
ProMotion 技术：自适应刷新率高达 120Hz，提供流畅的滚动和响应。

摄影功能：支持 ProRAW 和 ProRes 视频录制，提供专业级别的拍摄体验。

电池续航：续航表现优秀，支持 MagSafe 无线充电和快充。

操作系统：搭载最新的 iOS 系统，提供流畅、安全的用户体验。

其他
安全功能：面容 ID（Face ID）提供高度安全的解锁和支付功能。

5G 支持：支持 5G 网络，带来更快的下载和上传速度。

耐水性能：具备 IP68 级防水防尘功能，可在一定深度和时间内防水。
<script>
export default {
	data() {
		return {
			background: ['color1', 'color2', 'color3'],
			indicatorDots: true,
			autoplay: true,
			interval: 2000,
			duration: 500,
			desc: '<p>设计与显示</p> <ul><li>外觀設計：采用不锈钢边框和陶瓷盾面板，提供极致的耐用性和美观度。</li><li>颜色：提供多种颜色选择，包括银色、石墨色、金色和暗紫色。</li><li>显示屏：6.1 英寸的 Super Retina XDR 显示屏，支持 ProMotion 技术，带来更加流畅的视觉体验。</li></ul><p>硬件配置</p> <ul><li>外觀設計：处理器：搭载 A16 仿生芯片，提供强大的性能和效率。</li><li>存储容量：提供128GB、256GB、512GB 和 1TB 多种选择，满足不同存储需求。</li><li>摄像头系统：后置三摄系统，包括一个 48MP 主摄像头、一个 12MP 超广角摄像头和一个 12MP 长焦摄像头，支持 3 倍光学变焦。</li></ul><p>功能特色</p> <ul><li>ProMotion 技术：自适应刷新率高达 120Hz，提供流畅的滚动和响应。</li><li>摄影功能：支持 ProRAW 和 ProRes 视频录制，提供专业级别的拍摄体验。</li><li>电池续航：续航表现优秀，支持 MagSafe 无线充电和快充。</li></ul><p>其他</p><ul><li>安全功能：面容 ID（Face ID）提供高度安全的解锁和支付功能。</li><li>5G 支持：支持 5G 网络，带来更快的下载和上传速度。</li><li>耐水性能：具备 IP68 级防水防尘功能，可在一定深度和时间内防水。</li></ul>'
		}
	},
	methods: {

	}
}
</script>

<style>
.uni-margin-wrap {
	width: 690rpx;
	width: 100%;
	height: 600rpx;
}

.swiper {
	height: 600rpx;
}

.swiper-item {
	display: block;

	line-height: 300rpx;
	text-align: center;
}

.swiper-list {
	margin-top: 40rpx;
	margin-bottom: 0;
}

.uni-common-mt {
	margin-top: 60rpx;
	position: relative;
}

.info {
	position: absolute;
	right: 20rpx;
}

.uni-padding-wrap {
	width: 550rpx;
	padding: 0 100rpx;
}
</style>
安全功能：面容 ID（Face ID）提供高度安全的解锁和支付功能。
