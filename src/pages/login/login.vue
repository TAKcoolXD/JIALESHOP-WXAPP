<template>
	<view class="login" style="width: 750rpx;height: 1200rpx;">
		<view
			style="margin: 40rpx auto;width: 700rpx;height: 320rpx;border-bottom: 2px solid #ededed;display: flex;justify-content: center;align-items: center;">
			<image src="../../static/default-logo.png" mode="scaleToFill" style="width: 200rpx;height: 200rpx;" />
		</view>
		<view style="margin-left: 50rpx;">
			<view style="margin: 40rpx 0;">申请获取以下权限</view>
			<view style="font-size: 30rpx;color: #aaaaaa;">获得你得公开信息</view>
		</view>
		<view style="width: 600rpx;margin: 80rpx auto;">
			<view
				style="margin: 30rpx 0;padding: 20rpx 50rpx;text-align: center;border-radius: 50rpx;background-color: #ff547b;color: #ededed;"
				@click="goLogin">一键登录</view>
			<view
				style="margin: 30rpx 0;padding: 20rpx 50rpx;text-align: center;border-radius: 50rpx;background-color: #dfdfdf;">
				暂不登录</view>
		</view>
		<view>
			<u-loading-page :loading="show"></u-loading-page>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
export default {
	data() {
		return {
			userInfo: {
				nickName: '',
				avatarUrl: '',
				gender: '',
			},
			code: '',
			show: false,
		}
	},
	methods: {
		goLogin() {
			console.log('登录');
			this.show = true
			uni.login({
				provider: 'weixin', //使用微信登录
				success: (loginRes) => {
					console.log('登录code', loginRes);
					// console.log(loginRes.authResult);
					this.code = loginRes.code;
					uni.getUserInfo({
						provider: 'weixin',
						success: (infoRes) => {
							console.log('获取用户信息', infoRes);
							console.log('用户昵称为：' + infoRes.userInfo.nickName);
							console.log('用户昵称为：' + infoRes.userInfo.avatarUrl);
							console.log('用户昵称为：' + infoRes.userInfo.gender);
							this.userInfo.nickName = infoRes.userInfo.nickName
							this.userInfo.avatarUrl = infoRes.userInfo.avatarUrl
							this.userInfo.gender = infoRes.userInfo.gender

							uni.setStorageSync('UserInfo', this.userInfo);
							let data = {
								form: {
									partyData: {
										oauth: 'MP-WEIXIN',
										userInfo: this.userInfo,
										code: this.code
									}
								}
							}
							console.log(data, '123');

							uni.$u.http.post('passport/loginMpWx', data).then(res => {
								console.log(res, '打印结果');
								if (res.status == 200) {
									this.show = false
									this.$refs.uToast.show({
										message: '登录成功',
										position: 'top',
										type: 'default',
										duration: 1000,
										complete() {
											let pages = getCurrentPages();
											let page = pages[pages.length - 1];
											let page1 = pages[pages.length - pages.length];
											console.log('获取所有页面', pages);
											console.log('获取当前页面', page.$page.fullPath);
											console.log('从哪个页面过来', page1.$page.fullPath);
											if (page1.$page.fullPath == '/pages/User/User' ) {
												console.log('1');
												uni.navigateBack({
													delta: 1
												});
											} else if (page1.$page.fullPath == '/pages/index/index') {
												if(pages.length==4){
													uni.navigateBack({
													delta: 2
												});
												}
												if(pages.length==3){
													uni.navigateBack({
													delta: 1
												});
												}
												
											}
										}
									})

									uni.setStorageSync('token', res.data.token);

								}
							})
						}
					});
				}
			});


		}
	},
}
</script>
<!-- https://yoshop-test.azhuquq.com/index.php?s=/api/passport/loginMpWx -->
<style></style>
