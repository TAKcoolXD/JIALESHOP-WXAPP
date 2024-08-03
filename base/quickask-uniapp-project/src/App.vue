<script>
	export default {
		onLaunch()
		{
			console.log('当uni-app 初始化完成时触发（全局只触发一次）')
		},
		onShow()
		{
			console.log('当 uni-app 启动，或从后台进入前台显示')
		},
		onHide()
		{
			console.log('当 uni-app 从前台进入后台')
		},
		onError()
		{
			console.log('当 uni-app 报错时触发')
		},
		onPageNotFound()
		{
			console.log('页面不存在监听函数')
		},
		onThemeChange()
		{
			console.log('监听系统主题变化')
		}
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
</style>