<template>
	<view>
		<form @submit="submit">
			用户名：<input name="nickname" />
			<button form-type="submit">提交</button>
		</form>

		<!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
		<u-form
				labelPosition="left"
				:model="business"
				:rules="rules"
				ref="login"
		>
			<u-form-item
					label="姓名"
					prop="nickname"
					borderBottom
					ref="nickname"
			>
				<u-input
						v-model="business.nickname"
						border="none"
				></u-input>
			</u-form-item>

			<u-button type="primary" text="确认绑定" formType="submit" @click="submit2"></u-button>
		</u-form>
	</view>
</template>

<script>
export default {
	data() {
		return {
			nickname: '',
			business: {
				nickname:''
			},
			rules: {
				nickname: {
					type: 'string',
					required: true,
					message: '请填写姓名',
					trigger: ['blur', 'change']
				},
			},
			
		};
	},
	methods: {
		async submit(e)
		{
			console.log(e.detail.value)
		},
		async submit2()
		{
			console.log(this.business)
			// console.log(this.nickname)
		}
	},
	onReady() {
		//如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
    	this.$refs.login.setRules(this.rules)
    },
};
</script>