<template>
	<view style="background-color: #f7f8fa;height: 1500rpx;border: 1px solid  #f7f8fa">
		<view style="padding: 20rpx;margin: 15rpx 10rpx;color: #ff547b;">个人信息</view>
		<view style="width: 700rpx;height: 333rpx;border: 1px solid #b6b6b6;margin: 20rpx auto;border-radius: 30rpx;">
			<view
				style="width: 569rpx; padding: 33rpx;margin-left: 40rpx; display: flex;justify-content: flex-start;align-items: center;border-bottom: 1px solid #b6b6b6;height: 120rpx;">
				<view style="margin-right: 50rpx;">头像</view>
				<button open-type="chooseAvatar" @chooseavatar="chooseavatar" 
					style="border-radius: 50%;display: flex;align-items: center;background: none; border: none; padding: 0; margin: 0;box-shadow: none; ">
					<image :src="wxImgUrl" mode="scaleToFill"
						style="width: 120rpx;height: 120rpx;border-radius: 50%;" />
				</button>
			</view>
			<view
				style="padding: 15rpx;margin-top: 30rpx; margin-left: 55rpx;display: flex;justify-content: flex-start;align-items: center;">
				<view style="margin-right: 50rpx;">昵称</view>
				<view>
					<input type="nickname" v-model="nickName" @focus="changeNickName">
					<!-- 昵称填写 需要将 input 组件type的值设置为nickname，当用户在input进行输入时，键盘上方会展示微信昵称。 
						html部分——
					<input type="nickname" class="weui-input" placeholder="请输入昵称"/> -->
				</view>
			</view>
		</view>
		<view @click="savePersonal"
			style="width: 700rpx;height: 90rpx;background-color: #ff547b;margin: 50rpx auto;border-radius: 30rpx;color: white;line-height: 90rpx;text-align: center;">
			保存
		</view>
		<u-toast ref="uToast"></u-toast>
		<view>
			<u-loading-page :loading="show"></u-loading-page>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			wxImgUrl: '',
			nickName: '',
			avatar_id: '',
			show:false,
		};
	},
	methods: {
		chooseavatar(e) {
			console.log('chooseavatar', e);
			this.wxImgUrl = e.detail.avatarUrl;
			
		},
		savePersonal() {
			this.show = true
			console.log('保存');
			const {
				avatar_id,
				nickName
			} = this
			let data = {
				form: {
					avatarId: avatar_id,
					nickName: nickName
				}
			}
			console.log('传递得对象', data);
			uni.$u.http.post('user/personal', data).then(res => {
				console.log(res, '打印结果');
				if (res.status == 200) {
					this.show = false
					this.$refs.uToast.show({
						message: res.message,
						type: 'success',
						position: 'center',
						duration: 2000
					});
					uni.switchTab({
						url: '/pages/User/User'
					})
				}

			})
		},
		changeNickName(e) {
			console.log('changeNickName', e);
			this.nickName = e.detail.value
		}
	},
	onLoad() {
		this.show = true
		uni.$u.http.get('user/info',).then(res => {
			console.log(res, '打印结果');
			if (res.status == 200) {
				this.show = false
				this.wxImgUrl = res.data.userInfo.avatar_url
				this.nickName = res.data.userInfo.nick_name
				this.avatar_id = res.data.userInfo.avatar_id
			}

		})
	},
	onShow() {
		this.show = true
		uni.$u.http.get('user/info',).then(res => {
			console.log(res, '打印结果');
			if (res.status == 200) {
				this.show = false
				this.wxImgUrl = res.data.userInfo.avatar_url
				this.nickName = res.data.userInfo.nick_name
				this.avatar_id = res.data.userInfo.avatar_id
			}

		})
	}
}
</script>

<style lang="scss">
.u-border {
	border-style: none;
}
</style>
