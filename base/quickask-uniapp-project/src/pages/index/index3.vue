<template>
	<view class="content">
		接口调用
	</view>
</template>

<script>
	export default {
		async onLoad() 
		{
			//传送参数
			var data = {}
			
			//接口调用
			var result = await uni.$u.http.post('/index/index', data)
			
			//打印结果
			console.log(result)
		},
	}
</script>