<template>
	<div data-component="member-qrcode" class="modal fade" v-show="show">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title">
						会员扫描二维码
					</h4>
				</div>
				<div class="modal-body" @tap.stop>
					<div class="modal-body-con">
						<div class="qrcode-panel">
							<template v-if="qrcodeImgSrc"><img :src="qrcodeImgSrc" class="qrcode-img"/></template>
							<template v-else>
								<div class="qrcode-loading-card">
									<!--正在加载,请稍后...-->
									<img src="../imgs/loading.gif" class="qrcode-loading-img"/>
									正在加载,请稍后...
								</div>
								<!--<div class="loading">正在加载...</div>-->
							</template>
						</div>
						<div class="qrcode-describe">
							让会员微信扫描一下
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<div class="modal-button button-alert" @tap.stop.prevent="cancel">
						取消
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import signalR from "../js/components/signalR"
	export default {
		props: ['show'],
	    data: function(){
	        return {
	        	qrcodeImgSrc: null
	        }
	    },
	    watch: {
	    	show (val, oldVal) {
      			//TODO: 演示代码 (删除)
      			this.qrcodeImgSrc = require("../imgs/test/1490060610.png");
      			if(val){
      				app.vueApp.$store.dispatch("on", {eventName: "signalr.register", callback: this.onRegister});
      				app.vueApp.$store.dispatch("on", {eventName: "qrScan.received", callback: this.onReceive});
      				
      				if(!this.$store.state.appData.isConnectionHub) {
		    			signalR.connectAndRegister();
		    		} else if($.signalR.abpCommonHub.connection.id){
		    			this.loadQrcode();
		    		}
      			} else {
      				app.vueApp.$store.dispatch("off", {eventName: "signalr.register", callback: this.onRegister});
      				app.vueApp.$store.dispatch("off", {eventName: "qrScan.received", callback: this.onReceive});
      				this.qrcodeImgSrc = null;
      			}
    		}
	    },
	    methods: {
	    	cancel(){
	    		this.$emit('show', false);
	    	},
	    	
	    	onRegister: function(){
	    		if(!this.$store.state.appData.isConnectionHub){
	    			//已经连接过了
	    			return;
	    		}
	    		this.loadQrcode();
	    	},
	    	
	    	onReceive: function(scannerId, properties){
	    		this.$router.push({name: "userCenter"});
	    	},
	    	
	    	loadQrcode(){
	    		var _this = this;
	    		app.api.customerGather.myTempQrCode({
	    			data: {connectionId: $.signalR.abpCommonHub.connection.id}, 
	    			success: function (data) {
                    	//"https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=" + 
                    	_this.qrcodeImgSrc = data.url;
                    }
	    		});
	    	}
	    }
	}
</script>
<style lang="less" scoped>
	[data-component='member-qrcode'] {
		position: fixed;
	    z-index: 9998;
	    top: 0;
	    left: 0;
	    width: 100%;
	    height: 100%;
	    background-color: rgba(125,125,125,.4);
	    display: table;
	    transition: opacity .3s ease;
	    
	    .modal-dialog {
	    	display: table-cell;
    		vertical-align: middle;
    		
    		.modal-content {
    			width: 80%;
    			max-width: 540px;
			    margin: 0 auto;
			    background-color: #fff;
			    border-radius: 7px;
			    transition: all .3s ease;
			    box-sizing: border-box;
			    
			    .modal-header h4 {
				    font-size: 20px;
				    font-weight: 500;
				    color: #333;
				    text-align: center;
				    padding: 30px 0 15px;
				}
				
				.modal-body {
				    position: relative;
				    overflow: hidden;
				    
				    .modal-body-con {
					    padding: 15px 15px 24px;
					    color: #333;
					    
					    .qrcode-panel {
					    	padding: 10px;
					    	text-align: center;
					    	
					    	.qrcode-img {
					    		width: 100%;
					    	}
					    	
					    	.qrcode-loading-card {
					    		padding: 60px 0 60px;
					    		
					    		.qrcode-loading-img {
						    		display: block;
								    margin: 3px auto;
								    width: 130px;
								    height: 130px;
								    overflow: hidden;
						    	}
					    	}
					    	
					    }
					    
					    .qrcode-describe {
					    	text-align: center;
					    }
					}
				}
			    
			    .modal-footer {
				    height: 42px;
				    line-height: 42px;
				    text-align: center;
				    border-top: 1px solid #e4e4e4;
				    font-size: 14px;
				    color: #d70000;
				}
    		}
	    }
	}
</style>
