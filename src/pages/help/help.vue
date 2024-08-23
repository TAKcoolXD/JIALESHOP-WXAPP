<template>
	<view class="help">
		<view style="width: 100%; display: flex;justify-content: center;width: 730rpx;margin: 0 auto">
			<u-tabs :list="list1" @click="click" :current="showIndex" itemStyle="width: 100rpx;height:80rpx" lineWidth="20"
				lineColor="#ff5a7f">
			</u-tabs>
		</view>
		<view v-show="showIndex === 0">0</view>
		<view v-show="showIndex === 1">1</view>
		<view v-show="showIndex === 2">2</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list1: [{
				name: '全部',
			}, {
				name: '待支付',
			}, {
				name: '待发货'
			}, {
				name: '待收货'
			}, {
				name: '待评价'
			},],
			showIndex: 0
		}
	},
	methods: {
		click(item) {
			console.log('点击时tag触发', item);
			this.showIndex = item.index
		}
	},
	onLoad(option) {
		console.log(option);
		
		this.showIndex=Number(option.showIndex)
		console.log(this.showIndex,'22');

	},
	// watch:{
	// 	showIndex(newValue, oldValue) {
	// 		console.log('watch', newValue, oldValue);
	// 		this.click({index:newValue})
	// 	}
	// }
}
</script>

<style></style>
