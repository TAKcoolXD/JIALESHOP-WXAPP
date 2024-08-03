<template>
	<view class="comlist">
		<!-- 评论列表 -->
		<view class="list" v-if="comlist.length > 0">
			<view class="item" v-for="(item, index) in comlist" :key="index">
				<!-- 基本信息 -->
				<view class="business">
					<!-- 头像 -->
					<view class="avatar">
						<image mode="aspectFit" :src="item.business.avatar_text"></image>
					</view>
					<!-- 用户 -->
					<view class="base">
						<view class="name">
							<view class="nickname">{{item.business.nickname}}</view>
							<view class="createtime">{{item.createtime_text}}</view>
						</view>
						<view class="desc">这家伙很懒，什么都没写！</view>
					</view>
				</view>

				<!-- 详细内容 -->
				<view class="content">@{{item.parent_text}}：{{item.content}}</view>

				<!-- 操作 -->
				<view class="action">
					<view class="left">
						<view class="tag">
							<u-tag :text="`赞同 ${item.likes_count > 0 ? item.likes_count : ''}`" type="success" plain icon="thumb-up"></u-tag>
						</view>
						<view class="comment" @click="CommentToggle(index)">
							<u-icon name="chat" size="25"></u-icon>
							{{item.comment_count > 0 ? `${item.comment_count} 条评论` : `暂无评论`}}
						</view>
					</view>
					<view class="right">
						<view class="operation">
							<u-icon name="more-dot-fill" size="20" @click="MenuShow = true"></u-icon>
						</view>
					</view>
				</view>

				<!-- 子评论组件 -->
				<comment v-if="item.comment_count > 0 && item.show" :postid="item.postid" :pid="item.id"></comment>
			</view>
		</view>

		<!-- 弹出层 -->
		<u-popup :show="MenuShow" @close="MenuShow = false">
            <view class="menu">
				<view class="grid">
					<u-grid :border="true">
						<u-grid-item>
							<u-icon name="edit-pen-fill" size="35"></u-icon>
							<u--text type="warning" text="补充回答" align="center"></u--text>
						</u-grid-item>
						<u-grid-item>
							<u-icon name="checkmark" size="35"></u-icon>
							<u--text type="success" text="采纳此答案" align="center"></u--text>
						</u-grid-item>
						<u-grid-item>
							<u-icon name="trash-fill" size="35"></u-icon>
							<u--text type="error" text="删除" align="center"></u--text>
						</u-grid-item>
					</u-grid>
				</view>
				<u-button class="btn" type="error" text="取消" @click="MenuShow = false"></u-button>
			</view>
		</u-popup>

		<!-- 回答弹出层 -->
		<u-popup :show="AnswerShow" @close="AnswerShow = false">
            <view class="answer">
				<u--form labelPosition="top" labelWidth="150" :model="answer" :rules="rules" ref="answer">
					<!-- 描述 -->
					<u-form-item
						label="回答描述："
						prop="content"
						ref="content"
					>
						<u--textarea v-model="answer.content" placeholder="请输入回答描述"></u--textarea>
					</u-form-item>
	
					<view class="btn">
						<u-button type="primary" text="提交答案" formType="submit" @click="submit"></u-button>
					</view>
				</u--form>
			</view>
		</u-popup>

		<!-- 提醒组件 -->
		<u-toast ref="notice"></u-toast>
	</view>
</template>

<script>
	// 引入自定义组件
	import comment from '@/components/comment/comment.vue'
	import Vue from 'vue'

	export default {
		// components:{
		// 	comment
		// },
		components: {
			comment: () => import('@/components/comment/comment.vue')
		},
		props: {
			show: {
				type: Boolean,
				default: false
			},
			postid: {
				type: Number,
				require: true,
				default: 0,
			},
			pid: {
				type: Number,
				require: true,
				default: 0,
			}
		},
		created()
		{
			this.CommentData()
		},
		data()
		{
			return {
				MenuShow:false,
				AnswerShow: false,
				answer:{
					content: '',
				},
				comlist: [],
				rules:{
					content: {
						type: 'string',
						required: true,
						message: '请填写回答内容',
						trigger: ['blur', 'change']
					},
				}
			}
		},
		methods:{
			// 展示子评论显示
			CommentToggle(index)
			{
				this.comlist[index].show = !this.comlist[index].show
			},
			async CommentData()
			{
				//组装数据
				var data = {
					postid: this.postid,
					pid: this.pid
				}

				var result = await uni.$u.http.post('/comment/index', data)

				this.comlist = result.data.length > 0 ? result.data : []

				this.comlist.map((item) => {
					//item == js 对象 show js对象下属性 修改js对象
					//设置响应式数据 到 对象中
					Vue.set(item, 'show', false)
				})
			},
			submit()
			{
				//判断是否有通过表单验证
				this.$refs.answer.validate()
				.then(async res => {
					this.AnswerShow = false
					this.$refs.notice.show({
						type: 'success',
						message: '通过表单验证'
					})
					console.log(this.answer)
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
	.comlist{
		margin-top:15px;
		background:#f4ef8d;
	}

	/* 评论列表 */
	.list{
		width: 100%;
		margin:0 auto;
	}

	.list .item{
		width:100%;
		margin:0 auto;
		margin-bottom:5px;
		padding:0px;
		background:#f4ef8d;
		box-shadow: 0 0 3px 0 rgba(0,78,255,.1);
	}

	.list .item .business{
		width:100%;
		display: flex;
		justify-content: center;
		align-items: center;
		align-content: center;
	}

	.business .avatar{
		width:2em;
		height:2em;
		border-radius: 100%;
		overflow: hidden;
		margin-right:10px;
		flex-shrink: 0;
	}

	.business .avatar image{
		width: 100%;
		height: 100%;
	}

	.business .base{
		width:90%;
		padding:5px 10px;
		font-size:.8em;
	}

	.business .base .name{
		width:100%;
		display: flex;
		justify-content: space-between;
	}

	.business .base .name .nickname{
		font-weight: bold;
		color:#000;
	}

	.business .base .name .createtime{
		color:#999;
	}

	.business .base .desc{
		color:#999;
	}

	.item .content{
		font-size:.9em;
		color:#303133;
		margin-bottom:30px;
	}

	.item .action{
		display: flex;
		align-items: center;
		align-content: center;
		justify-content: space-between;
	}

	.item .action .left{
		display: flex;
	}

	.item .action .right{
		display: flex;
		align-items: flex-end;
		align-content: flex-end;
		margin-top:4px;
	}

	.item .action .tag{
		margin-right:10px;
	}

	.item .action .comment{
		display: flex;
		align-content: center;
		align-items: center;
	}

	/* 弹出菜单 */
	.menu .grid{
		margin:20px 0px;
	}

	.btn{
		border-radius: 0px;
	}

	/* 回答内容 */
	.answer{
		padding:20px;
	}
</style>