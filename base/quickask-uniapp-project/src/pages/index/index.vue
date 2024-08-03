<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view>
			<text class="title">{{title}}</text>
		</view>

		<u-button type="success" text="成功按钮"></u-button>

		<!-- 标签 -->
		<u-tag text="雪月夜" type="warning"></u-tag>

		<!-- 微标 -->
		<u-badge type="error" value="10"></u-badge>

		<view>
			<navigator url="/pages/index/index4">跳转到城市组件页面</navigator>
		</view>

		<view>
			<navigator url="/pages/index/index5">跳转到图表插件页面</navigator>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello UniApp'
			}
		},
		onLoad() 
		{
			console.log('监听页面加载，其参数为上个页面传递的数据，参数类型为 Object')
		},
		onShow()
		{
			console.log('监听页面显示。页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面')
		},
		onReady()
		{
			console.log('监听页面初次渲染完成。注意如果渲染速度快，会在页面进入动画完成前触发')
		},
		onHide()
		{
			console.log('监听页面隐藏')
		},
		onUnload()
		{
			console.log('监听页面卸载')
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin: 200rpx auto 50rpx auto;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
