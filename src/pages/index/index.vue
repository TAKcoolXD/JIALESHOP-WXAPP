<template>
	<view class="content">
		<!-- 头部 -->
		<view class='header'>
			<!-- 搜索框 -->
			<view class='search' @click="goSearch">
				<u-search style="height: 45rpx;background-color: white;" :showAction="false" placeholder="请输入您搜索的商品"
					v-model="keywords" @search="search"></u-search>
			</view>
		</view>
		<!-- 店鋪通告 -->
		<view>
			<u-notice-bar :text="noticeText" bgColor="#f2f2f2" color="#4e81bb"></u-notice-bar>
		</view>
		<!-- 轮播图 -->
		<view class="uni-margin-wrap">
			<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
				:duration="duration">
				<swiper-item v-for="(item, index) in SwiperList" :key="index">
					<image :src="item.imgUrl" style="width: 100%;height: 100%;" @click="preview(index)"/>
				</swiper-item>
			</swiper>
		</view>
		<!-- 商品内容展示 -->
		<view class="goods"
			style="margin-top: 10rpx;display: flex;flex-wrap: wrap;align-items: center;justify-content: center;">

			<view v-for="item in goods" :key="item" style="" @click="goGoodsDeail(item)">
				<image :src="item.goods_image" style="width: 355rpx;height: 400rpx;margin: 8rpx;" mode="scaleToFill" />
				<view>{{ item.goods_name }}</view>
				<view style="color: palevioletred;">￥{{ item.goods_price_max }}</view>
			</view>
		</view>

		<!-- <view class="list" v-if="post.length > 0">
			<view class="item" v-for="(item, index) in post" :key="index">
				<view class="business">
					<view class="avatar">
						<image mode="aspectFit" :src="item.business.avatar_text"></image>
					</view>
					<view class="author">{{item.business.nickname}}</view>
				</view>
				
				<view class="info">
					<navigator :url="`/pages/post/info?postid=${item.id}`" class="title">{{item.title}}</navigator>
					<view class="createtime">发布时间：{{item.createtime_text}}</view>
					<view class="category">分类：{{item.category.name}}</view>
					
					<view class="join">
						<view class="status">{{item.status == '1' && item.accept ? '已解决' : '未解决'}}</view>
						<view class="point">￥{{item.point}}</view>
						<view class="count">{{item.comment_count}}人参与回复</view>
					</view>
				</view>
			</view>
		</view> -->

		<!-- 提醒组件 -->
		<!-- <u-toast ref="notice"></u-toast> -->
	</view>
</template>

<script>
export default {
	onLoad() {
		this.CateData()
		this.PostData()
		uni.$u.http.get('page/detail',).then(res => {
			console.log(res, '打印结果');
			if (res.status == 200) {
				this.SwiperList = res.data.pageData.items[2].data
				this.goods = res.data.pageData.items[3].data
				this.noticeText = res.data.pageData.items[1].params.text
				console.log("🚀 店鋪公告", this.noticeText)
				console.log("🚀 商品列表", this.goods)
				console.log("🚀 轮播图列表", this.SwiperList)
			}
		})
	},
	data() {
		return {
			post: [],
			cate: [
				{ name: '全部', id: 0 }
			],
			cateid: 0,
			keywords: '',
			background: ['color1', 'color2', 'color3'],
			indicatorDots: true,
			autoplay: true,
			interval: 2000,
			duration: 500,
			SwiperList: [],
			goods: [],
			noticeText: ''
		}
	},
	methods: {
		async CateData() {
			//组装数据
			var data = {}

			var result = await uni.$u.http.post('/post/cate', data)

			if (result.code == 0) {
				this.$refs.notice.show({
					type: "error",
					message: result.msg
				})
				return false
			}

			this.cate.push(...result.data)
		},
		async PostData() {
			//组装数据
			var data = {
				cateid: this.cateid,
				keywords: this.keywords
			}

			var result = await uni.$u.http.post('/post/index', data)

			if (result.code == 0) {
				this.$refs.notice.show({
					type: "error",
					message: result.msg
				})
				return false
			}

			//覆盖值
			this.post = result.data
		},
		CateToggle(item) {
			this.cateid = item.id
			//清空数据
			this.post = []
			this.PostData()
		},
		search() {
			// this.post = []
			// this.PostData()
			console.log(111);

		},
		goSearch() {
			console.log(222);
			this.keywords = ''
			uni.navigateTo({
				url: '/pages/search/search'
			})
		},
		goGoodsDeail(item) {
			console.log('商品详细信息页', item);
			uni.navigateTo({
				url: `/pages/goods/detail?goodsid=${item.goods_id}`
			})
		},
		preview(index) {
			console.log(index);
			uni.previewImage({
				current: index,
				// 返回所有图片的url地址数组
				urls: this.SwiperList.map((item) => item.imgUrl)
			});

		}
	},


}
</script>


<style lang="scss">
.content {
	width: 100%;
	overflow-x: hidden;
}

.search {
	height: 100rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	/* background-color: #0e0ea5; */
	/* padding: 0 28rpx; */
}

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
	// height: 600rpx;
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
