<template>
    <div data-page="home">
    	<div class="page-content">
    		<div class="mui-row header">
    			<div class="mui-col-xs-12 title">
    				<span>粉丝煲</span>
    				<span class="mui-icon mui-icon-email"><i class="new"></i></span>
    			</div>
		        <div class="mui-col-xs-6 handle-module">
	            	<span class="mui-icon-extra mui-icon-extra-sweep" @tap.stop.prevent="scanCode"></span>
	            	扫码核销
		        </div>
		        <div class="mui-col-xs-6 handle-module" @tap.stop.prevent="showMemberQrcode(true)">
	            	<span class="mui-icon mui-icon-camera"></span>
	            	会员识别
		        </div>
		    </div>
		    <div class="mui-table-view mui-grid-view handle-list">
		    	<div class="mui-table-view-cell mui-col-xs-4">
		    		<span class="mui-icon-extra mui-icon-extra-order"></span>
		    		<div class="mui-media-body">我的订单</div>
		    	</div>
		    	<div class="mui-table-view-cell mui-col-xs-4">
		    		<span class="mui-icon mui-icon-chat"></span>
		    		<div class="mui-media-body">在线客服</div>
		    	</div>
		    	<div class="mui-table-view-cell mui-col-xs-4">
		    		<span class="mui-icon mui-icon-map"></span>
		    		<div class="mui-media-body">员工小店</div>
		    	</div>
		    	<div class="mui-table-view-cell mui-col-xs-4">
		    		<span class="mui-icon-extra mui-icon-extra-card"></span>
		    		<div class="mui-media-body">会员服务</div>
		    	</div>
		    	<div class="mui-table-view-cell mui-col-xs-4">
		    		<span class="mui-icon-extra mui-icon-extra-trend"></span>
		    		<div class="mui-media-body">经营数据</div>
		    	</div>
		    	<div class="mui-table-view-cell mui-col-xs-4">
		    		<span class="mui-icon mui-icon-email"></span>
		    		<div class="mui-media-body">总部消息</div>
		    	</div>
		    	<div class="mui-table-view-cell mui-col-xs-4 not-border-bottom">
		    		<span class="mui-icon mui-icon-paperplane"></span>
		    		<div class="mui-media-body">分销管理</div>
		    	</div>
		    	<div class="mui-table-view-cell mui-col-xs-4 not-border-bottom">
		    		<span class="mui-icon-extra mui-icon-extra-peoples"></span>
		    		<div class="mui-media-body">员工管理</div>
		    	</div>
		    </div>
		    <div class="main-footer-pic">
	    		<img src="../imgs/main-footer-pic.jpg" width="100%" height="110"/>
	    	</div>
	    	<memberQrcode v-bind:show="memberQrcodeState" v-on:show="showMemberQrcode"></memberQrcode>
    	</div>
    </div>
</template>
<script>
import memberQrcode from '../components/member-qrcode.vue'
module.exports = {
    data: function(){
        return {
        	memberQrcodeState: false
        }
    },
    components: {memberQrcode},
    created: function(){
    },
    beforeRouteEnter: function(to, from, next) {
		// 在渲染该组件的对应路由被 confirm 前调用
		// 不！能！获取组件实例 `this`
		// 因为当钩子执行前，组件实例还没被创建
		//$e.target.src= require("../imgs/test/232.jpg")
		next();
		return true;
	},
    methods: {
        //显示二维码
        showMemberQrcode(memberQrcodeState){
        	this.memberQrcodeState = memberQrcodeState;
        },
        //是否显示扫码
        showBarcode(barcodeState){
        	this.barcodeState = barcodeState;
        },
        //扫码核销
        scanCode: function(){
        	if(!app.Config.isApp){
        		app.mui.toast("只能在app环境中扫码!");
        		return;
        	}
        	this.$store.dispatch("bindBarcodeOnmarkedEvent", this.scanResult);
        	this.$router.push({name: "barcode"});
        },
        
        scanResult(type, result){
        }
    },
    beforeRouteLeave: function(to, from, next) {
		// 导航离开该组件的对应路由时调用
		// 可以访问组件实例 `this`
		next();
	}
};
</script>
<style lang="less" scoped>
	[data-page='home'] {
		height: 100%;
		
		.page-content {
			height: 100%;
			
			.header {
				background: #48A5F3;
				background: -ms-linear-gradient(top, #1981D8,  #48A5F3);        /* IE 10 */
				background:-moz-linear-gradient(top,#1981D8,#48A5F3);/*火狐*/ 
				background:-webkit-gradient(linear, 0% 0%, 0% 100%,from(#1981D8), to(#48A5F3));/*谷歌*/ 
				background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#1981D8), to(#48A5F3));      /* Safari 4-5, Chrome 1-9*/
				background: -webkit-linear-gradient(top, #1981D8, #48A5F3);   /*Safari5.1 Chrome 10+*/
				background: -o-linear-gradient(top, #1981D8, #48A5F3);  /*Opera 11.10+*/
				height: 130px;
				color: white;
				
				.title {
					height: 30px;
					text-align: center;
					
					span {
						line-height: 30px;
					}
					
					.mui-icon-email {
						float: right;
					    margin-right: 20px;
					    position:relative;
					    
					    .new {
					    	display: block;
						    background: #f00;
						    border-radius: 50%;
						    width: 5px;
						    height: 5px;
						    top: 8px;
						    right: 2px;
						    position: absolute;
					    }
					}
				}
				
				.handle-module {
					height: 100px;
					text-align: center;
					
					span {
						display: block;
						font-size: 55px;
					    margin: 10px auto 0;
					    width: 65px;
					    height: 65px;
					    overflow: hidden;
					}
				}
			}
			
			.handle-list {
				padding: 0;
				
				div.mui-table-view-cell:not(.not-border-bottom){
					border-bottom: 1px solid #efeff4;
				}
				
				div.mui-table-view-cell:nth-child(3n+1), div.mui-table-view-cell:nth-child(3n+2){
					border-right: 1px solid #efeff4;
				}
				
				div.mui-table-view-cell{
					padding: 15px;
					cursor: pointer;
					margin-right: -2px;
					
					span {
						height: 35px;
						width: 35px;
						font-size: 28px;
						color: #48A5F3;
					}
				}
			}
			
			.main-footer-pic {
				bottom: 51px;
    			position: absolute;
    			max-height: 155px;
    			width: 100%;
			}
			
			#barcode {
			    background:#0F0;
				height:480px;
				width:360px;
			}
		}
		/*.mui-table-view-cell {
		    padding: 15px;
		    border: 1px solid #000;
		    cursor: pointer;
		}*/
	}
</style>