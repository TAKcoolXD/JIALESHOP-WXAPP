<template>
	<view class="my-coupon">
		<view
			style="width: 100%; display: flex;justify-content: center;width: 730rpx;margin: 0 auto">
			<u-tabs :list="list1" @click="click" itemStyle="width: 100rpx;height:80rpx" lineWidth="20" lineColor="#ff5a7f"></u-tabs>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				list1: [{
				name: '未使用',
			}, {
				name: '已使用',
			}, {
				name: '已过期'
			}],
			showIndex:'',
			}
		},
		methods: {
			click(item) {
			console.log('item', item);
			this.showIndex=item.index
		}
		}
	}
</script>

<style>

</style>
