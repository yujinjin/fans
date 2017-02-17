<template>
	<div data-page="login">
		<div class="page-content">
			<div class="mui-input-group">
				<div class="mui-input-row">
					<label>商户编码</label>
					<input type="text" @focus="focusName=tenancyName" v-focus:tenancyName="focusName" v-model="tenancyName" class="mui-input-clear mui-input" placeholder="请输入商户编码">
				</div>
				<div class="mui-input-row">
					<label>账号</label>
					<input type="text" @focus="focusName=usernameOrEmailAddress" v-focus:usernameOrEmailAddress="focusName" v-model="usernameOrEmailAddress" class="mui-input-clear mui-input" placeholder="请输入账号">
				</div>
				<div class="mui-input-row">
					<label>密码</label>
					<input type="password" @focus="focusName=password" v-focus:password="focusName" v-model="password" class="mui-input-clear mui-input" placeholder="请输入密码">
				</div>
			</div>
			<!--<form class="mui-input-group">
				<ul class="mui-table-view mui-table-view-chevron">
					<li class="mui-table-view-cell">
						自动登录
						<div id="autoLogin" class="mui-switch">
							<div class="mui-switch-handle"></div>
						</div>
					</li>
				</ul>
			</form>-->
			<div class="mui-content-padded">
				<button class="mui-btn mui-btn-block mui-btn-primary" data-loading-icon-position="right" @click.stop.prevent="sumbit($event)">登录</button>
				<div class="link-area">
					<a>注册账号</a> 
					<span class="spliter">|</span> 
					<a>忘记密码</a>
				</div>
			</div>
			<div class="mui-content-padded oauth-area"></div>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			tenancyName: null,
			usernameOrEmailAddress: null,
			password: null,
			focusName: "tenancyName"
		}
	},
	methods: {
		sumbit(e){
			var _this = this;
			if(!_this.tenancyName){
				_this.focusName = "tenancyName";
				app.mui.toast('请输入商户编码');
				return;
			}
			if(!_this.usernameOrEmailAddress){
				_this.focusName = "usernameOrEmailAddress";
				app.mui.toast('请输入账号');
				return;
			}
			if(!_this.password){
				_this.focusName = "password";
				app.mui.toast('请输入密码');
				return;
			}
			app.mui(e.target).button('loading');
			app.ajax({
				url: "/api/Account/Authenticate",
				data: {
					tenancyName: _this.tenancyName,
					usernameOrEmailAddress: _this.usernameOrEmailAddress,
					password: _this.password
				},
				success(data){
					app.globalService.setUserInfo({
						tenancyName: _this.tenancyName, 
						token: data.authToken, 
						usernameOrEmailAddress: _this.usernameOrEmailAddress, 
						expireTime: data.expiredIn
					});
					_this.go();
				},
				complete(){
					app.mui(e.target).button('reset');
				}
			});
		},
		
		go: function(){
			const [_this, _toName, _current_query] = [this, this.$route.query.toName, this.$route.query];
			if(_toName){
				delete _current_query.toName;
				this.$router.push({name: _current_query.toName, query: _current_query});
			} else {
				this.$router.push({name: "home"});
			}
		}
	}
}
</script>
<style lang="less" scoped>
	[data-page='login'] {
		.link-area {
			text-align: center;
		}
	}
</style>