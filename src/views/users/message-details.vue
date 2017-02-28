<template>
	<div data-page="message-details">
		<div class="page-content">
			<div class="contents">
				小时候，总以为感情会是一场执子之手，白头偕老的约定。长大了，才知道每一段旅行的同路人，都只能走一小段，也只有多年之后回头，相视一笑，点点头
			</div>
			<div class="ending">
				2017-02-23 16:20
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {};
	},
	mounted(){
		this.$store.dispatch("updateNavbarTitle", "消息标题");
	},
	methods: {
		
	}
}
</script>
<style lang="less" scoped>
	[data-page='message-details'] {
		.contents {
			padding: 20px;
		}
		
		.ending {
			font-size: 10px;
			color: gray;
		    text-align: right;
		    padding: 20px;
		}
	}
</style>