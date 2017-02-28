<template>
	<div data-page="user-info">
		<div class="page-content">
			<ul class="mui-table-view mui-table-view-chevron">
				<li class="mui-table-view-cell mui-media head-image-panel">
					<div class="mui-navigate-right item">
						<div class="item-label">
							头像
						</div>
						<div class="item-content">
							<span class="header-img"> 
								<input type="file" ubt="upImg" accept="image/gif,image/jpeg,image/jpg,image/png" class="img-file"> 
								<img class="preview-img" src="../../imgs/test/head-img.jpg"> 
							</span>
						</div>
					</div>
				</li>
				<li class="mui-table-view-cell mui-media">
					<div class="item">
						<div class="item-label">
							昵称
						</div>
						<div class="item-content">
							<input type="text" placeholder="请输入昵称">
						</div>
					</div>
				</li>
				<li class="mui-table-view-cell mui-media">
					<div class="item">
						<div class="item-label">
							手机
						</div>
						<div class="item-content">
							<input type="tel" placeholder="请输入手机号" maxlength="11">
						</div>
					</div>
				</li>
				<li class="mui-table-view-cell mui-media">
					<div class="item">
						<div class="item-label">
							性别
						</div>
						<div class="item-content">
							<span>
								<i class="icon-man" :class="{on: sex==='man'}" @tap.stop.prevent="sex = 'man'"></i>
								<i class="icon-woman" :class="{on: sex==='woman'}" @tap.stop.prevent="sex = 'woman'"></i>
							</span>
						</div>
					</div>
				</li>
			</ul>
			<div class="button-panel"> 
				<a class="button button-save">保存</a>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				sex: null
			}
		},
		methods: {

		}
	}
</script>
<style lang="less" scoped>
	[data-page='user-info'] {
		background-color: #fff;
		
		.mui-table-view-chevron .mui-table-view-cell {
		    padding-right: 10px;
		}
		
		.mui-table-view-chevron .mui-table-view-cell.head-image-panel {
			padding-right: 35px;
		}
		
		.item {
		    box-sizing: border-box;
		    display: -webkit-box;
		    display: -ms-flexbox;
		    display: flex;
		    -webkit-box-flex: 1;
		    -ms-flex: 1;
		    -webkit-box-pack: justify;
		    -ms-flex-pack: justify;
		    justify-content: space-between;
		    -webkit-box-align: center;
		    -ms-flex-align: center;
		    align-items: center;
		    -ms-flex-item-align: stretch;
		    -webkit-align-self: stretch;
		    align-self: stretch;
			
			.item-label {
				-webkit-flex-shrink: 1;
			    -ms-flex: 0 1 auto;
			    flex-shrink: 1;
			    white-space: nowrap;
			    position: relative;
			    overflow: hidden;
			    text-overflow: ellipsis;
			    max-width: 100%;
			}
			
			.item-content {
    			white-space: nowrap;
			    color: #8e8e93;
			    -webkit-flex-shrink: 0;
			    -ms-flex: 0 0 auto;
			    flex-shrink: 0;
			    display: -webkit-box;
			    display: -ms-flexbox;
			    display: flex;
			    
			    .header-img {
			    	border-radius: 3px;
			    	position: relative;
				    overflow: hidden;
				    display: inline-block;
				    width: 60px;
				    height: 60px;
				    line-height: 60px;
				    background-color: #fff;
				    box-sizing: border-box;
				    
				    .img-file, .preview-img {
					    position: absolute;
					    left: 0;
					    top: 0;
					    height: 58px;
					    width: 58px;
					    /*border: 1px solid #ccc;*/
					}
					
					.img-file {
						z-index: 7;
    					opacity: 0;
					}
			    }
			    
			    input {
				    border: none;
				    text-align: right;
				    color: #999;
				    resize: inherit;
				    width: 100%;
				    margin-bottom: 0px;
				}
				
				.icon-man, .icon-woman {
					font-size: 35px;
					margin-right: 10px;	
				}
				
				.icon-man.on {
					color: #0ab0fd;
				}
				
				.icon-woman.on {
					color: #f77496;
				}
			}
		}
		
		.button-save {
		    color: #fff;
		    display: block;
		    margin: 40px auto 10px;
		    width: 96%;
		    height: 44px;
		    font-size: 18px;
		    line-height: 44px;
		    background-color: #007aff;
		    border-color: #007aff;
		    border-radius: 4px;
		    text-align: center;
		}
	}
</style>