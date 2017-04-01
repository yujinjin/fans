<template>
	<div data-page="barcode">
    	<div class="page-content">
			<div class="mui-bar">
				<a class="mui-icon mui-icon-left-nav mui-pull-left" @tap="back"></a>
			</div>
			<div id="barcode-panel">
				<div style="height:40%" v-if="!barcode"></div>
				<p class="tip" v-if="!barcode">...载入中...</p>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
	    data: function(){
	        return {
	        	barcode: null
	        }
	    },
	    mounted() {
	    	//不知道为什么非得要延时，用$nextTick都解决不了
	    	setTimeout(()=>this.startScan(), 100);
	    	//this.startScan();
	    	//this.$nextTick(()=>this.startScan());
	    },
	    methods: {
	    	//扫码核销
	        startScan(){
	        	if(!app.Config.isApp){
	        		app.mui.toast("只能在app环境中扫码!");
	        		return;
	        	}
	        	var _this = this;
        		_this.barcode = new plus.barcode.Barcode("barcode-panel");
        		_this.barcode.onmarked = function(type, result){
        			//app.mui.toast("你扫描地址不正确，请确认二维码!");
        			if(_this.$store.state.appEvent.barcodeOnmarkedEvent && _this.$store.state.appEvent.barcodeOnmarkedEvent(type, result) === false){
        				setTimeout(()=>_this.barcode.start(), 2000);
        			}
        			//_this.barcode.start();
        		}
        		_this.barcode.onerror = function(type, result){
        			app.mui.toast("出错了!");
        			//_this.barcode.start();
        		}
		        _this.barcode.start();
	        },
	        
	        closeScan(){
	        	if(this.barcode){
	        		this.barcode.close();
	        		this.barcode = null;
	        	}
	        	this.$store.dispatch("deleteBarcodeOnmarkedEvent");
	        },
	        
	        back(){
	        	this.closeScan();
	        	app.vueApp.goBack();
	        }
	   	},
	   	beforeDestroy(){
	   		this.closeScan();
	   	}
	}
</script>
<style lang="less" scoped>
	[data-page='barcode'] {
	    background-color: #000000;
	    
	    .mui-bar {
	    	background-color: #000;
	    	
	    	a.mui-icon {
	    		color: #fff;
	    	}
	    }
	    
	    #barcode-panel {
			width: 100%;
			height: 100%;
			top: 44px;
			bottom: 0px;
			text-align: center;
			
			.tip {
			    color: #FFFFFF;
			    font-weight: bold;
			    text-shadow: 0px -1px #103E5C;
			}
		}
	}
</style>
