<template>
	<view class="detail" style="position: relative;">
		<!-- 輪播圖 -->
		<view class="uni-margin-wrap">
			<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
				:duration="duration">
				<swiper-item v-for="(item, index) in SwiperList" :key="index">
					<image :src="item.external_url" style="width: 100%;height: 100%;" @click="preview(index)" />
					<view>1</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 價格和贖買個數 -->
		<view style="width: 100%;height: 70rpx;display: flex;justify-content: space-between;align-items: center;">
			<view style="color: #ff547b;font-size: 40rpx;"><span style="font-size: 30rpx;">￥</span> {{ goods_price }}
			</view>
			<view style="color: #959595;">已售{{ goods_sales }}件</view>
		</view>
		<!-- 商品名稱和分享 -->
		<view style="display: flex;justify-content: space-between;align-items: center;">
			<view style="color: #959595;">蘋果14PRO</view>
			<view @click="showShare"><u-icon name="share-square" color="#ff547b" size="28"></u-icon></view>
		</view>
		<!-- 服務 -->
		<view style="display:  flex;margin-top: 20rpx;align-items: center;">

			<view style="display:  flex;margin: 0 30rpx;font-size: 25rpx;">
				<u-icon name="checkmark" color="#ff547b" size="15"></u-icon>
				<view>七天無理由退貨</view>
			</view>
			<view style="display:  flex;margin-left: 10rpx;font-size: 25rpx;">
				<u-icon name="checkmark" color="#ff547b" size="15"></u-icon>
				<view>48小時發貨</view>
			</view>
			<view @click="showService" style="margin-left: 285rpx;"><u-icon name="arrow-right" color="#ff547b" size="15""></u-icon></view>			
		</view>
		<!-- 商品的描述 -->
		 <view style=" margin-top: 20rpx;">
					<view>商品描述</view>
					<view v-html="content"></view>
			</view>
			<!-- 加入購物車 立即購買 -->
			<view
				style="width: 750rpx; display: flex;align-items: center;justify-content: space-around;position: sticky;left: 0rpx;bottom :0rpx;height: 130rpx;background: white;">
				<view style="display: flex;align-items: center;">
					<view style="margin:  0 10rpx;">
						<u-icon name="home" color="#5b5b5d" size="28"></u-icon>
					</view>
					<view style="margin:  0 10rpx;">
						<u-icon name="kefu-ermai" color="#5b5b5d" size="28"></u-icon>
					</view>
					<view style="margin:  0 10rpx;" @click=goShopCar>
						<u-icon name="shopping-cart" color="#5b5b5d" size="28"></u-icon>
					</view>
				</view>
				<view style="display: flex;align-items: center;">
					<view @click="showCart"
						style="background-color: #ffe6e9;padding: 10rpx;border-radius: 131rpx;width: 200rpx;text-align: center;margin: 0 8rpx;color: #ff547b">
						加入購物車</view>
					<view @click="showBuy(goodsId)"
						style="background-color: #ff557c;padding: 10rpx;border-radius:131rpx;width: 200rpx;text-align: center;margin: 0 8rpx;color: white">
						立即購買</view>
				</view>
			</view>
			<!-- 服務彈出框 -->
			<u-popup :show="ServiceShow" @close="closeService" closeable="true">
				<view style="height: 400rpx;">
					<view style="width: 500rpx;height: 70rpx;margin: 0 auto;line-height: 70rpx;text-align: center;">服務
					</view>
					<view style="display:  flex;margin: 0 30rpx;font-size: 35rpx;">
						<u-icon name="checkmark" color="#ff547b" size="15"></u-icon>
						<view style="margin-left: 20rpx;">七天無理由退貨</view>
					</view>
					<view style="margin-left: 85rpx;font-size: 25rpx;margin-top: 20rpx">滿足相應條件時，消費者可申請7天無理由退貨</view>
					<view style="display:  flex;margin: 0 30rpx;font-size: 35rpx;margin-top: 50rpx">
						<u-icon name="checkmark" color="#ff547b" size="15"></u-icon>
						<view style="margin-left: 20rpx;">48小時發貨</view>
					</view>
					<view style="margin-left: 85rpx;font-size: 25rpx;margin-top: 20rpx">下單後48小時之内發貨</view>
				</view>
			</u-popup>
			<!-- 分享彈出框 -->
			<u-popup :show="shareShow" @close="closeShare">
				<view style="height: 300rpx;">
					<!-- 圖標 -->
					<view style="display: flex;">
						<view
							style="border-radius: 50%; width: 100rpx;height: 100rpx; background-color: #44db74;display: flex;align-items: center;justify-content: center;margin: 30rpx 60rpx">
							<u-icon name="weixin-fill" color="white" size="40"></u-icon>
						</view>
						<view
							style="border-radius: 50%; width: 100rpx;height: 100rpx;background-color: #38beec; display: flex;align-items: center;justify-content: center;margin: 30rpx 60rpx"">
							<u-icon name=" attach" color="white" size="40"></u-icon>
						</view>
					</view>
					<!-- 發送給朋友 複製鏈接 -->
					<view style="display: flex;">
						<view style="margin: 0 40rpx;">發送給朋友</view>
						<view style="margin-left: 35rpx;">複製鏈接</view>
					</view>

					<view @click="closeShare" style="margin: 30rpx auto; width: 400rpx;text-align: center;">關閉</view>
				</view>
			</u-popup>
			<!-- 加入購物車彈出框 -->
			<u-popup :show="shareCart" @close="closeCart" closeable="true">
				<view style="height: 500rpx;">
					<!-- 商品图片 价格 库存 -->
					<view style="display: flex;align-items: center;margin-top: 20rpx;">
						<image :src="goods_image" mode="scaleToFill"
							style="width: 200rpx;height: 200rpx;margin-left: 30rpx;" />
						<!-- 价格 库存 -->
						<view style="margin-left: 30rpx;">
							<view style="color: #ff547b;"><span style="font-size: 20rpx;">￥</span> <span
									style="font-size: 40rpx;">{{goods_price}}</span></view>
							<view style="font-size: 25rpx;">库存：{{stock_total}}</view>
						</view>
					</view>
					<!-- 數量  计步器-->
					<view
						style="width: 700rpx;height: 70rpx;margin: 25rpx auto;;display: flex;justify-content: space-between;align-items: center;">
						<view>数量</view>
						<view><u-number-box v-model="CountValue" @change="valChange"></u-number-box></view>
					</view>
					<view @click="addCart"
						style="width: 600rpx;height: 80rpx;margin: 30rpx auto;border-radius: 50rpx;text-align: center;line-height: 80rpx;background-color: #ffe6e8;color: #ff547b;">
						加入购物车
					</view>
				</view>
			</u-popup>
			<!-- 立即購買彈出框 -->
			<u-popup :show="shareBuy" @close="closeBuy" closeable="true">
				<view style="height: 500rpx;">
					<!-- 商品图片 价格 库存 -->
					<view style="display: flex;align-items: center;margin-top: 20rpx;">
						<image :src="goods_image" mode="scaleToFill"
							style="width: 200rpx;height: 200rpx;margin-left: 30rpx;" />
						<!-- 价格 库存 -->
						<view style="margin-left: 30rpx;">
							<view style="color: #ff547b;"><span style="font-size: 20rpx;">￥</span> <span
									style="font-size: 40rpx;">{{goods_price}}</span></view>
							<view style="font-size: 25rpx;">库存：{{stock_total}}</view>
						</view>
					</view>
					<!-- 數量  计步器-->
					<view
						style="width: 700rpx;height: 70rpx;margin: 25rpx auto;;display: flex;justify-content: space-between;align-items: center;">
						<view>数量</view>
						<view><u-number-box v-model="CountValue" @change="valChange"></u-number-box></view>
					</view>
					<view @click="goBuy(goodsId)"
						style="width: 600rpx;height: 80rpx;margin: 30rpx auto;border-radius: 50rpx;text-align: center;line-height: 80rpx;background-color: #ffe6e8;color: #ff547b;">
						立即购买
					</view>
				</view>
			</u-popup>
			<view style="z-index: 100;">
				<u-loading-page :loading="loading">
				</u-loading-page>
			</view>
			<view>
				<u-modal :show="show" @confirm="confirm" @cancel="cancel" :title="title" :content='content1'
					confirmText="去登陆" cancelText="在逛会" showCancelButton="true"></u-modal>
			</view>
			<view>
				<u-loading-page :loading="show"></u-loading-page>
			</view>
		</view>

</template>
<script>
export default {
	data() {
		return {
			goods_image:'',
			stock_total:'',
			token: '',
			show: false,
			title: '温馨提示',
			content1: '此时此刻需要您登录哦',
			SwiperList: [],
			goodsId: '',
			goods_price: '',
			goods_sales: '',
			content: '',
			loading:false,
			CountValue: '1',//计步器
			ServiceShow: false,
			shareShow: false,
			shareCart: false,
			shareBuy: false,
			background: ['color1', 'color2', 'color3'],
			indicatorDots: true,
			autoplay: true,
			interval: 2000,
			duration: 500,
			desc: '<p>设计与显示</p> <ul><li>外觀設計：采用不锈钢边框和陶瓷盾面板，提供极致的耐用性和美观度。</li><li>颜色：提供多种颜色选择，包括银色、石墨色、金色和暗紫色。</li><li>显示屏：6.1 英寸的 Super Retina XDR 显示屏，支持 ProMotion 技术，带来更加流畅的视觉体验。</li></ul><p>硬件配置</p> <ul><li>外觀設計：处理器：搭载 A16 仿生芯片，提供强大的性能和效率。</li><li>存储容量：提供128GB、256GB、512GB 和 1TB 多种选择，满足不同存储需求。</li><li>摄像头系统：后置三摄系统，包括一个 48MP 主摄像头、一个 12MP 超广角摄像头和一个 12MP 长焦摄像头，支持 3 倍光学变焦。</li></ul><p>功能特色</p> <ul><li>ProMotion 技术：自适应刷新率高达 120Hz，提供流畅的滚动和响应。</li><li>摄影功能：支持 ProRAW 和 ProRes 视频录制，提供专业级别的拍摄体验。</li><li>电池续航：续航表现优秀，支持 MagSafe 无线充电和快充。</li></ul><p>其他</p><ul><li>安全功能：面容 ID（Face ID）提供高度安全的解锁和支付功能。</li><li>5G 支持：支持 5G 网络，带来更快的下载和上传速度。</li><li>耐水性能：具备 IP68 级防水防尘功能，可在一定深度和时间内防水。</li></ul>'
		}
	},
	methods: {
		// 關閉服務彈出層
		closeService() {
			this.ServiceShow = false
		},
		showService() {
			this.ServiceShow = true
		},
		closeShare() {
			this.shareShow = false
		},
		showShare() {
			this.shareShow = true

		},
		closeCart() {
			this.shareCart = false
		},
		showCart() {
			this.shareCart = true
		},
		closeBuy() {
			this.shareBuy = false
		},
		showBuy(goodsId) {
			console.log('商品ID', goodsId);
			this.shareBuy = true
		},
		goBuy(goodsId) {
			console.log('商品ID', goodsId);
			uni.navigateTo({
				url: `/pages/settlement/settlement?goodsid=${goodsId}&CountValue=${this.CountValue}`
			})
			this.shareBuy = false
		},
		valChange() {
			console.log('计步器');
		},
		preview(index) {
			console.log(index);
			uni.previewImage({
				current: index,
				// 返回所有图片的url地址数组
				urls: this.SwiperList.map((item) => item.external_url)
			});

		},
		addCart() {
			console.log('加入购物车');
			let data = {
				goodsId: this.goodsId,
				goodsNum: this.CountValue,
				goodsSkuId: 0
			}
			this.loading = true
			if (this.token) {
				uni.$u.http.post('cart/add', data).then(res => {
					console.log(res, '打印结果');

					if (res.status == 200) {
						this.loading = false
						this.shareCart = false
						uni.switchTab({
							url: `/pages/shopCar/shopCar`
						})

					}
				})
			} else {

				this.show = true
				this.shareCart = false
			}

		},
		goShopCar() {
			uni.switchTab({
				url: `/pages/shopCar/shopCar`
			})
		},
		confirm() {
			console.log('去登陆');
			uni.navigateTo({
				url: '/pages/login/login'
			})
			this.show=false
		},
		cancel() {
			console.log('在逛会');
			uni.navigateBack()
		
		}
	},
	onLoad(option) {
		this.token = uni.getStorageSync('token')
		this.loading = true
		console.log('传过来的ID', option.goodsid);
		this.goodsId = option.goodsid
		uni.$u.http.get(`goods/detail&goodsId=${option.goodsid}&verifyStatus=1`,).then(res => {
			console.log(res, '打印结果');
			if (res.status == 200) {
				this.loading = false
				this.SwiperList = res.data.detail.goods_images
				this.goods_price = res.data.detail.goods_price_max
				this.goods_sales = res.data.detail.goods_sales
				this.content = res.data.detail.content
				this.stock_total=res.data.detail.stock_total
				this.goods_image=res.data.detail.goods_image
			}
		})
	},
	onShow(){
		this.token = uni.getStorageSync('token')
		uni.$u.http.get(`goods/detail&goodsId=${this.goodsId}&verifyStatus=1`,).then(res => {
			console.log(res, '打印结果');
			if (res.status == 200) {
				this.loading = false
				this.SwiperList = res.data.detail.goods_images
				this.goods_price = res.data.detail.goods_price_max
				this.goods_sales = res.data.detail.goods_sales
				this.content = res.data.detail.content
				this.stock_total=res.data.detail.stock_total
				this.preview_url=res.data.detail.goods_images.preview_url 
			}
		})
	}
}
// https://yoshop-test.azhuquq.com/index.php?s=/api/goods/detail&goodsId=10002&verifyStatus=1

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
