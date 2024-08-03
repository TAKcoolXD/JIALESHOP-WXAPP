<template>
	<view>
		<!-- 用户信息 -->
		<view class="user">
			<view class="avatar">
			  <!-- #ifdef H5 || APP-PLUS -->
			  <image v-if="!business.hasOwnProperty('id')" src="/static/logo.png"></image>
			  <image v-else :src="business.avatar_text">
			  <!-- #endif -->
  
			  <!-- #ifdef MP-WEIXIN -->
				  <image v-if="business.hasOwnProperty('avatar') && business.avatar" :src="business.avatar_text">
				  <open-data v-else type="userAvatarUrl"></open-data>
			  <!-- #endif -->
			</view>
			
			<view class="nickname">{{business.nickname}}</view>
		
			<!-- #ifdef H5 || APP-PLUS -->
				<button v-if="!business.hasOwnProperty('id')" class="login" @click="signin">登录</button>
			<!-- #endif -->
  
			<!-- #ifdef MP-WEIXIN -->
				<button v-if="!business.hasOwnProperty('id')" class="login" @click="login">授权登录</button>
			<!-- #endif -->
		</view>
	  
		<!-- 表单 -->
		<view class="profile">
			<u--form
				labelPosition="left"
				labelWidth="70"
				:model="business"
				:rules="rules"
				ref="profile"
			>
				<!-- 手机号 -->
				<u-form-item
					label="手机号"
					prop="mobile"
					borderBottom
					ref="mobile"
				>
					<u--input v-model="business.mobile" border="none" placeholder="请输入手机号码"></u--input>
				</u-form-item>

				<!-- 昵称 -->
				<u-form-item
					label="昵称"
					prop="nickname"
					borderBottom
					ref="nickname"
				>
					<u--input v-model="business.nickname" border="none" placeholder="请输入昵称"></u--input>
				</u-form-item>

				<!-- 邮箱 -->
				<u-form-item
					label="邮箱"
					prop="email"
					borderBottom
					ref="email"
				>
					<u--input v-model="business.email" border="none" placeholder="请输入邮箱"></u--input>
				</u-form-item>

				<!-- 密码 -->
				<u-form-item
					label="密码"
					prop="password"
					borderBottom
					ref="password"
				>
					<u--input type="password" v-model="business.password" border="none" placeholder="请输入密码"></u--input>
				</u-form-item>

				<!-- 性别 -->
				<u-form-item
					label="性别"
					prop="gender_text"
					borderBottom
					ref="gender_text"
					@click="ShowGender = true"
				>
					<u--input v-model="business.gender_text" readonly border="none" placeholder="请选择性别"></u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>

				<!-- 性别弹出菜单 -->
				<u-action-sheet
					:show="ShowGender"
					:actions="GenderList"
					title="请选择性别"
					@close="ShowGender = false"
					@select="GenderSelect"
				>
				</u-action-sheet>

				<!-- 地区 -->
				<pick-regions :defaultRegion="business.region_code" @getRegion="handleGetRegion">
					<u-form-item
						label="地区"
						prop="region_text"
						borderBottom
						ref="region_text"
					>
						<u--input v-model="business.region_text" readonly border="none" placeholder="请选择地区"></u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
				</pick-regions>

				<!-- 头像 -->
				<u-form-item label="头像" borderBottom>
					<u-upload :fileList="avatar" name="avatar" :maxCount="1" :previewFullImage="true" @afterRead="Read" @delete="Del"></u-upload>
				</u-form-item>

				<u-button type="primary" text="确认修改" formType="submit" @click="submit"></u-button>
			</u--form>
		</view>

		<!-- 提醒组件 -->
		<u-toast ref="notice"></u-toast>
	</view>
</template>

<script>
	//需要引入城市地区组件
	import pickRegions from '@/components/pick-regions/pick-regions.vue'

	export default {
		components:{ pickRegions },
		onReady() 
		{
			//onReady 为uni-app支持的生命周期之一
			//设置表单验证规则
			this.$refs.profile.setRules(this.rules)
		},
		onShow()
		{
			//获取本地存储
			var business = uni.getStorageSync('business') ? uni.getStorageSync('business') : {}

			//覆盖data数据
			if(Object.getOwnPropertyNames(business).length > 0)
			{
				this.business = business

				//覆盖头像预览
				this.avatar = [{
					url: this.business.avatar_text
				}]
			}
		},
		data()
		{
			return {
				region:[],
				ShowGender: false,
				GenderList: [
					{name: '保密', value: '0'},
					{name: '男', value: '1'},
					{name: '女', value: '2'},
				],
				business: {
					nickname: '临时用户',
				},
				avatar: [],
				rules:{
					mobile: [
						{
							type: 'string',
							required: true,
							message: '请填写手机号码',
							trigger: ['blur', 'change']
						},
						{
							// 自定义验证函数
							validator: (rule, value, callback) => {
								// 上面有说，返回true表示校验通过，返回false表示不通过
								// uni.$u.test.mobile()就是返回true或者false的
								return uni.$u.test.mobile(value);
							},
							message: '手机号码不正确',
							// 触发器可以同时用blur和change
							trigger: ['change','blur'],
						}
					],
					nickname: {
						type: 'string',
						required: true,
						message: '请填写昵称',
						trigger: ['blur', 'change']
					},
					email: [
						{
							type: 'string',
							required: true,
							message: '请填写邮箱',
							trigger: ['blur', 'change']
						},
						{
							// 自定义验证函数
							validator: (rule, value, callback) => {
								// 上面有说，返回true表示校验通过，返回false表示不通过
								// uni.$u.test.mobile()就是返回true或者false的
								return uni.$u.test.email(value);
							},
							message: '邮箱不正确',
							// 触发器可以同时用blur和change
							trigger: ['change','blur'],
						}
					],
				}
			}
		},
		computed:{
            regionName(){
                // 转为字符串
                return this.region.map(item=>item.name).join(' ')
            }
        },
		methods:{
			GenderSelect(e)
			{
				this.business.gender = e.value
				this.business.gender_text = e.name
			},
			// 获取选择的地区
            handleGetRegion(region)
			{
				this.business.region_text = region.map(item=>item.name).join('/')
				this.business.region_code = region[2]['code']
            },
			//删除图片
			Del()
			{
				this.avatar = []
			},
			// 读取图片
			Read(event)
			{
				this.avatar = [{
					url: event.file.thumb
				}]
			},
			// 提交表单
			submit()
			{
				//判断是否有通过表单验证
				this.$refs.profile.validate()
				.then(async res => {
					var data = {}
					var result = {}
					//判断是否有图片上传
					if(this.avatar.length > 0 && this.avatar[0].url != this.business.avatar_text){
						//组装数据发起请求
						data = {
							name: 'avatar',
							formData: {
								id: this.business.id,
								mobile: this.business.mobile,
								nickname: this.business.nickname,
								email: this.business.email,
								gender: this.business.gender,
								region: this.business.region_code,
							}
							
						}

						//如果有输入新密码在提交
						if(this.business.hasOwnProperty('password'))
						{
							data.formData.password = this.business.password
						}

						data.filePath = this.avatar[0].url

						//发起请求
						result = await uni.$u.http.upload('/business/profile', data)
					}else
					{
						data = {
							id: this.business.id,
							mobile: this.business.mobile,
							nickname: this.business.nickname,
							email: this.business.email,
							gender: this.business.gender,
							region: this.business.region_code,
						}

						//如果有输入新密码在提交
						if(this.business.hasOwnProperty('password'))
						{
							data.password = this.business.password
						}

						//发起请求
						result = await uni.$u.http.post('/business/profile', data)
					}
					
					if(result.code == 0)
					{
						this.$refs.notice.show({
							type:"error",
							message:result.msg
						})
						return false
					}

					//成功
					this.$refs.notice.show({
						type: 'success',
						message: result.msg,
						complete()
						{
							//存储用户信息(同步)
							uni.setStorageSync('business', result.data)


							//授权成功，但是没找到人
							uni.$u.route({
								type: 'navigateBack',
								delta: 1, //后退一页
							})
							return false
						}
					})
				})
				.catch(error => {
					console.log(error)
					this.$refs.notice.show({
						type: 'error',
						message: '效验失败'
					})
				})
			}
		}
	}
</script>

<style>
	/* 用户信息 */
	.user {
		width: 100%;
		padding:40rpx 0rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		background: linear-gradient(rgb(1,115,222), rgb(78,169,245));
		color:white;
	}

	.avatar {
		width: 200rpx;
		height: 200rpx;
		border-radius: 50%;
		overflow: hidden;
	}

	.avatar image{
		width:100%;
		height:100%;
	}

	/* 表单 */
	.items{
		display: flex;
		flex-direction: row;
		align-items: center;
		height: auto;
		width: 650rpx;
		padding: 20rpx 50rpx;
		border-bottom: 20rpx solid rgb(234,234,234);
		font-size: 30rpx;
		box-shadow: 0 0 10px #DDD;
	}

	.items text{
		display: block;
		width: 135rpx;
		text-align: right;
	}

	radio{
		margin-right: 20rpx;
	}

	.but{
		margin-top: 50rpx;
	}

	button{
		width:400rpx;
		background-color: #0173DE;
		color:white;
		opacity: 0.7;
		box-shadow: 0 0 10px #DDD;
		font-size:34rpx;
	}
</style>