<template>
	<div data-page="my-message-list">
		<div class="page-content">
			<ul class="mui-table-view mui-table-view-chevron">
				<li class="mui-table-view-cell mui-media" @tap.stop.prevent="gotoDetails">
					<a class="mui-navigate-right">
						<div class="mui-media-object mui-pull-left item-date">02.14</div>
						<div class="mui-media-body">
							消息一
							<p class="mui-ellipsis">烤炉模式的城，到黄昏，如同打翻的调色盘一般.</p>
						</div>
						<span class="mui-badge mui-badge-danger">新</span>
					</a>
				</li>
				<li class="mui-table-view-cell mui-media">
					<a class="mui-navigate-right" href="javascript:;">
						<div class="mui-media-object mui-pull-left item-date">01.14</div>
						<div class="mui-media-body">
							消息二
							<p class="mui-ellipsis">静静的看这个世界，最后终于疯了</p>
						</div>
					</a>
				</li>
				<li class="mui-table-view-cell mui-media">
					<a class="mui-navigate-right">
						<div class="mui-media-object mui-pull-left item-date">01.04</div>
						<div class="mui-media-body">
							消息三
							<p class="mui-ellipsis">能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？</p>
						</div>
					</a>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {};
	},
	methods: {
		gotoDetails(){
			this.$router.push({name: "messageDetails"});
		}
	}
}
</script>
<style lang="less" scoped>
	[data-page='my-message-list'] {
		.item-date {
			font-size: 10px;
			color: gray;
		}
	}
</style>