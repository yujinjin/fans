<template>
    <div data-page="welcome">
    	<div class="page-content">
    		<div ref="slider" class="mui-slider mui-fullscreen" style="background-color: black;" @slide="slidePanel($event)">
				<div class="mui-slider-group">
					<!-- 第一张 -->
					<div class="mui-slider-item">
						<div class="item-logo" style="background-color: #D74B28">
							<a href="#">粉丝宝</a>
							<div class="animate guide-show">
								<h2 class="animated bounceInDown">线下零售</h2>
								<li class="animated bounceInLeft">连锁品牌互联网+解决方案</li>
								<li class="animated bounceInRight">O2O粉丝运营体系</li>
							</div>
						</div>
					</div>
					<!-- 第二张 -->
					<div class="mui-slider-item">
						<div class="item-logo" style="background-color: #02C1ED;">
							<a href="#">粉丝宝</a>
							<div ref="tips2" class="animate mui-hidden">
								<h2 class="animated bounceInDown">连锁云店</h2>
								<li class="animated bounceInLeft">店长创客</li>
								<li class="animated bounceInRight">粉丝社群</li>
							</div>
						</div>
					</div>
					<!-- 第三张 -->
					<div class="mui-slider-item">
						<div class="item-logo" style="background-color: #67C962;">
							<a href="#">粉丝宝</a>
							<div ref="tips3" class="animate mui-hidden">
								<h2 class="animated bounceInDown">线上线下业务打通</h2>
								<li class="animated bounceInLeft">提高店铺人效</li>
								<li class="animated bounceInRight">提升会员复购率</li>
							</div>
						</div>
					</div>
					<!-- 第四张 -->
					<div class="mui-slider-item">
						<div class="item-logo" style="background-color: #FCD208;">
							<a href="#">粉丝宝</a>
							<div class="animate">
								<button class="mui-btn mui-btn-warning mui-btn-outlined close" @tap.stop.prevent="goHome">立即体验</button>
							</div>
						</div>
					</div>
				</div>
				<div class="mui-slider-indicator">
					<div class="mui-indicator mui-active"></div>
					<div class="mui-indicator"></div>
					<div class="mui-indicator"></div>
					<div class="mui-indicator"></div>
				</div>
			</div>
    	</div>
    </div>
</template>
<script>
	module.exports = {
		data() {
			return {index: 0};
		},
		mounted(){
			app.mui(this.$refs.slider).slider({interval:0});
		},
		methods: {
			slidePanel(e){
				this.index = e.detail.slideNumber + 1;
			 	if(this.index == 2 || this.index == 3){
			 		if(this.$refs["tips"+this.index].classList.contains("mui-hidden")){
			 			this.$refs["tips"+this.index].classList.remove("mui-hidden");
			 			this.$refs["tips"+this.index].classList.add("guide-show");
			 		}
			 	}
			},
			
			goHome(){
				app.globalService.setStartFlag(true);
				this.$router.push({name: "home"});
			}
		}
	}
</script>
<style lang="less" scoped>
	[data-page='welcome'] {
		.page-content {
			.close {
				position: absolute;
				width: 160px;
				left: 50%;
				margin-left: -80px;
				bottom: 15%;
				padding: 10px;
				color: #fff;
				border-color: #fff;
			}
			.item-logo {
				width: 100%;
				height: 100%;
				position: relative;
			}
			.item-logo a {
				width: 200px;
				height: 200px;
				display: block;
				border: 1px solid #FFFFFF;
				border-color: rgba(255, 255, 255, 0.5);
				text-align: center;
				line-height: 200px;
				border-radius: 50%;
				font-size: 40px;
				color: #fff;
				position: absolute;
				top: 15%;
				left: 50%;
				margin-left: -100px;
			}
			.animate {
				position: absolute;
				left: 0;
				bottom: 15%;
				width: 100%;
				color: #fff;
				display: -moz-box;
			}
			.animate h2 {
				text-align: center;
				margin-bottom: 20px;
			}
			.animate li {
				width: 50%;
				height: 30px;
				line-height: 30px;
				list-style: none;
				font-size: 16px;
				text-align: right;
			}
			.animate li:nth-child(3) {
				text-align: left;
				float: right;
			}
			.animated {
				-webkit-animation-duration: 1s;
				-webkit-animation-play-state: paused;
				-webkit-animation-fill-mode: both;
			}
			.guide-show .bounceInDown {
				-webkit-animation-name: bounceInDown;
				-webkit-animation-play-state: running;
				-webkit-animation-delay: 1s;
				display: block;
			}
			.guide-show .bounceInLeft {
				-webkit-animation-name: bounceInLeft;
				display: block;
				-webkit-animation-play-state: running;
			}
			.guide-show .bounceInRight {
				-webkit-animation-name: bounceInRight;
				display: block;
				-webkit-animation-play-state: running;
				-webkit-animation-delay: 0.5s;
			}
			@-webkit-keyframes bounceInDown {
				0%, 60%, 75%, 90%, 100% {
					-webkit-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
					animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
				}
				0% {
					opacity: 0;
					-webkit-transform: translate3d(0, -3000px, 0);
					transform: translate3d(0, -3000px, 0);
				}
				60% {
					opacity: 1;
					-webkit-transform: translate3d(0, 25px, 0);
					transform: translate3d(0, 25px, 0);
				}
				75% {
					-webkit-transform: translate3d(0, -5px, 0);
					transform: translate3d(0, -5px, 0);
				}
				90% {
					-webkit-transform: translate3d(0, 3px, 0);
					transform: translate3d(0, 3px, 0);
				}
				100% {
					-webkit-transform: none;
					transform: none;
				}
			}
			@-webkit-keyframes bounceInLeft {
				0%, 60%, 75%, 90%, 100% {
					-webkit-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
					animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
				}
				0% {
					opacity: 0;
					-webkit-transform: translate3d(-3000px, 0, 0);
					transform: translate3d(-3000px, 0, 0);
				}
				60% {
					opacity: 1;
					-webkit-transform: translate3d(25px, 0, 0);
					transform: translate3d(25px, 0, 0);
				}
				75% {
					-webkit-transform: translate3d(-10px, 0, 0);
					transform: translate3d(-10px, 0, 0);
				}
				90% {
					-webkit-transform: translate3d(5px, 0, 0);
					transform: translate3d(5px, 0, 0);
				}
				100% {
					-webkit-transform: none;
					transform: none;
				}
			}
			@-webkit-keyframes bounceInRight {
				0%, 60%, 75%, 90%, 100% {
					-webkit-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
					animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
				}
				0% {
					opacity: 0;
					-webkit-transform: translate3d(3000px, 0, 0);
					transform: translate3d(3000px, 0, 0);
				}
				60% {
					opacity: 1;
					-webkit-transform: translate3d(-25px, 0, 0);
					transform: translate3d(-25px, 0, 0);
				}
				75% {
					-webkit-transform: translate3d(10px, 0, 0);
					transform: translate3d(10px, 0, 0);
				}
				90% {
					-webkit-transform: translate3d(-5px, 0, 0);
					transform: translate3d(-5px, 0, 0);
				}
				100% {
					-webkit-transform: none;
					transform: none;
				}
			}
		}
	}
</style>