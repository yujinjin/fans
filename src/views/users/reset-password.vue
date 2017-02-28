<template>
	<div data-page="reset-password">
		<div class="page-content">
			<div class="mui-content-padded">
				<div class="mui-input-row mui-password">
					<label>原 密 码：</label>
					<input type="password" placeholder="请输入原来的密码" class="mui-input-password" data-input-password="3"><span class="mui-icon mui-icon-eye" @tap.stop.prevent="changeEye($event)"></span>
				</div>
				<div class="mui-input-row mui-password">
					<label>新 密 码：</label>
					<input type="password" placeholder="请输入新设置的密码" class="mui-input-password" data-input-password="3"><span class="mui-icon mui-icon-eye" @tap.stop.prevent="changeEye($event)"></span>
				</div>
				<div class="mui-input-row mui-password">
					<label>确认密码：</label>
					<input type="password" placeholder="请再次输入新设置的密码" class="mui-input-password" data-input-password="3"><span class="mui-icon mui-icon-eye" @tap.stop.prevent="changeEye($event)"></span>
				</div>
			</div>
			<div class="button-panel"> 
				<a class="button button-save">保存</a>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {};
	},
	methods: {
		changeEye(e){
			if(e.target.classList.length > 0 && e.target.classList.contains('mui-active')){
				e.target.classList.remove("mui-active");
				e.target.previousElementSibling.type = "password";
			} else {
				e.target.classList.add("mui-active");
				e.target.previousElementSibling.type = "text";
			}
			
		}
	}
}
</script>
<style lang="less" scoped>
	[data-page='reset-password'] {
		.mui-content-padded {
		    border: 1px solid #d2d2d2;
		    border-radius: 10px;
		    margin: 20px 10px;
		    background-color: #fff;
			
			.mui-password {
				padding: 10px 0px;
				
				.mui-icon-eye {
					top: 20px;
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