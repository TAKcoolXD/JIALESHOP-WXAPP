<template>
	<view class="points">
		<view class="item u-border-bottom" v-for="(item, index) in list" :key="index">
			{{ '第' + item + '条数据' }}
		</view>
		<u-loadmore :status="status" @loadmore="loadmore" :loadmoreText="loadText.loadmore"
			:loadingText="loadText.loading" :nomoreText="loadText.nomore" />
	</view>
</template>

<script>
export default {
	data() {
		return {
			status: 'loadmore',
			list: 15,
			page: 0,
			loadText: {
				loadmore: '轻轻上拉',
				loading: '努力加载中',
				nomore: '实在没有了'
			},
		}
	},
	onReachBottom() {
		console.log('滚动下拉');
		if (this.page >= 3) return;
		this.status = 'loading';
		this.page = ++this.page;
		setTimeout(() => {
			this.list += 10;
			if (this.page >= 3) this.status = 'nomore';
			else this.status = 'loading';
		}, 2000)
	},
	methods: {
		loadmore() {
			console.log('loadmore');

		}
	}
}
</script>

<style lang="scss" scoped>
	.wrap {
		padding: 100rpx;
	}
	
	.item {
		padding: 24rpx 0;
		color: $u-content-color;
		font-size: 28rpx;
	}
	::v-deep .item.data-v-143a6866 {
		padding: 100rpx 0;
	}
</style>