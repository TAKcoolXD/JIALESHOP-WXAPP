<template>
	<view class="search">
		<view style="margin-top: 10rpx;"><u-search placeholder="请输入您搜索的商品" v-model="keyword" @search="search(keyword)"
				@custom="Search(keyword)"></u-search></view>
		<view style="display: flex; justify-content: space-between;align-items: center;">
			<view style="margin-top: 40rpx;color: #959595;">最近搜索</view>
			<u-icon style="margin-top: 5rpx;" name="trash-fill" top="17px" size="20px" @click="clear"></u-icon>
		</view>
		<view style="display: flex;margin-top: 15rpx;flex-wrap: wrap;">
			<view v-for="item in keywordList" :key="item"
				style="padding: 5rpx 10rpx;text-align: center;margin: 8rpx 10rpx;border-radius: 20rpx;background-color: #ff547b;">
				{{ item }}</view>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>

</template>

<script>
export default {
	data() {
		return {
			keyword: '',
			keywordList: [],
			show: false,
		}
	},
	methods: {
		Search(a) {
			console.log('搜索', a);
			let text = a.trim()
			if (text.length === 0) {
				this.$refs.uToast.show({
					message: '搜索内容不能爲空哦！！',
					type: 'error',
					position: 'top',
					duration: 1000
				})
				// console.log(text);
				
			}else{
				this.keywordList.push(text)
				uni.navigateTo({
					url: '/pages/goods/list'
				})
				this.keyword = ''
			}

			
		},
		clear() {
			console.log('清楚所有關鍵字');
			this.keywordList = []
		},
		search(a) {

			this.Search(a)
		}
	}
}

</script>

<style>
.search {
	/* margin-top: 15rpx; */
}

.u-search__action.data-v-1a326067 {
	background-color: #ff547b;
	height: 60rpx;
	line-height: 60rpx;
	margin-right: 10rpx
}
</style>
