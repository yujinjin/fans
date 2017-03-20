<template>
	<div data-page="my-customer-gathers">
		<div class="page-content">
			<div ref="slider" class="mui-slider">
				<div class="mui-slider-group mui-slider-loop">
					<!-- 额外增加的一个节点(循环轮播：第一个节点是最后一张轮播) -->
					<div class="mui-slider-item mui-slider-item-duplicate">
						<a href="#">
							<img src="../../imgs/test/yuantiao.jpg">
							<p class="mui-slider-title">静静看这世界</p>
						</a>
					</div>
					<div class="mui-slider-item">
						<a href="#">
							<img src="../../imgs/test/shuijiao.jpg">
							<p class="mui-slider-title">幸福就是可以一起睡觉</p>
						</a>
					</div>
					<div class="mui-slider-item">
						<a href="#">
							<img src="../../imgs/test/muwu.jpg">
							<p class="mui-slider-title">想要一间这样的木屋，静静的喝咖啡</p>
						</a>
					</div>
					<div class="mui-slider-item">
						<a href="#">
							<img src="../../imgs/test/cbd.jpg">
							<p class="mui-slider-title">Color of SIP CBD</p>
						</a>
					</div>
					<div class="mui-slider-item">
						<a href="#">
							<img src="../../imgs/test/yuantiao.jpg">
							<p class="mui-slider-title">静静看这世界</p>
						</a>
					</div>
					<!-- 额外增加的一个节点(循环轮播：最后一个节点是第一张轮播) -->
					<div class="mui-slider-item mui-slider-item-duplicate">
						<a href="#">
							<img src="../../imgs/test/shuijiao.jpg">
							<p class="mui-slider-title">幸福就是可以一起睡觉</p>
						</a>
					</div>
				</div>
				<div class="mui-slider-indicator mui-text-right">
					<div class="mui-indicator mui-active"></div>
					<div class="mui-indicator"></div>
					<div class="mui-indicator"></div>
					<div class="mui-indicator"></div>
				</div>
			</div>
			<ul class="mui-table-view mui-table-view-chevron">
				<li class="mui-table-view-cell mui-media">
					<a class="mui-navigate-right">
						<img class="mui-media-object mui-pull-left" src="../../imgs/test/cbd.jpg">
						<div class="mui-media-body">
							CBD
							<p class="mui-ellipsis">烤炉模式的城，到黄昏，如同打翻的调色盘一般.</p>
						</div>
					</a>
				</li>
				<li class="mui-table-view-cell mui-media">
					<a class="mui-navigate-right" href="javascript:;">
						<img class="mui-media-object mui-pull-left" src="../../imgs/test/yuantiao.jpg">
						<div class="mui-media-body">
							远眺
							<p class="mui-ellipsis">静静的看这个世界，最后终于疯了</p>
						</div>
					</a>
				</li>
				<li class="mui-table-view-cell mui-media">
					<a class="mui-navigate-right">
						<img class="mui-media-object mui-pull-left" src="../../imgs/test/shuijiao.jpg">
						<div class="mui-media-body">
							幸福
							<p class="mui-ellipsis">能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？</p>
						</div>
					</a>
				</li>
				<li class="mui-table-view-cell mui-media">
					<a class="mui-navigate-right">
						<img class="mui-media-object mui-pull-left" src="../../imgs/test/shuijiao.jpg">
						<div class="mui-media-body">
							幸福
							<p class="mui-ellipsis">能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？</p>
						</div>
					</a>
				</li>
				<li class="mui-table-view-cell mui-media">
					<a class="mui-navigate-right">
						<img class="mui-media-object mui-pull-left" src="../../imgs/test/shuijiao.jpg">
						<div class="mui-media-body">
							幸福
							<p class="mui-ellipsis">能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？</p>
						</div>
					</a>
				</li>
				<li class="mui-table-view-cell mui-media">
					<a class="mui-navigate-right">
						<img class="mui-media-object mui-pull-left" src="../../imgs/test/shuijiao.jpg">
						<div class="mui-media-body">
							幸福
							<p class="mui-ellipsis">能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？</p>
						</div>
					</a>
				</li>
				<li class="mui-table-view-cell mui-media">
					<a class="mui-navigate-right">
						<img class="mui-media-object mui-pull-left" src="../../imgs/test/shuijiao.jpg">
						<div class="mui-media-body">
							幸福
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
	mounted(){
		app.mui(this.$refs.slider).slider({interval:0});
	},
	methods: {
		
	}
}
</script>
<style lang="less" scoped>
	[data-page='my-customer-gathers'] {
		
	}
</style>