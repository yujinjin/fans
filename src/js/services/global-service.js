/**
 * 作者：yujinjin9@126.com
 * 时间：2015-08-04
 * 描述：APP 全局业务逻辑
 */
export default{
	//判断当前用户信息是否登录
	isLogin() {
		if(this.getLoginUserInfo().token){
			return true;
		}
        return false;
    },
    
    //获取启动项标志
    getStartFlag(){
    	//如果不是app始终返回true
    	if(!app.Config.isApp) {
    		return true;
    	}
    	const _site_local_storage = app.getSiteLocalStorage();
    	if(_site_local_storage.startInfo) {
    		return (_site_local_storage.startInfo.flag === true && _site_local_storage.startInfo.version === app.Config.startVersion);
    	}
    	return false;
    },
    
    //设置启动项标志
    setStartFlag(flag){
    	const _site_local_storage = app.getSiteLocalStorage();
		if(_site_local_storage.startInfo == null || typeof(_site_local_storage.startInfo) != "object"){
			_site_local_storage.startInfo = {};
		}
		Object.assign(_site_local_storage.startInfo, {flag: flag, version: app.Config.startVersion});
		app.utils.localStorage("siteLocalStorage", JSON.stringify(_site_local_storage));
    },
    
    //获取用户登录的Token信息
    getLoginUserInfo(){
    	const [_currentTime, _userInfo] = [(new Date()).getTime(), app.getSiteLocalStorage().userInfo || {}];
    	if(_userInfo.expiredTime && (_userInfo.expiredTime - _currentTime) > 0) {
    		return _userInfo;
    	} else {
    		app.globalService.setUserInfo({});
    		return {};
    	}
    },
    
    //退出登录
    logOut(){
    	app.globalService.setUserInfo({});
    },
    
    //设置用户信息
    setUserInfo({tenancyName, token, usernameOrEmailAddress, expiredTime = -1}) {
    	if(expiredTime > 0) {
    		const _site_local_storage = app.getSiteLocalStorage();
			if(_site_local_storage.userInfo == null || typeof(_site_local_storage.userInfo) != "object"){
				_site_local_storage.userInfo = {};
			}
			expiredTime = (new Date()).getTime() + (expiredTime - 60) * 1000;
			Object.assign(_site_local_storage.userInfo, {tenancyName, token, usernameOrEmailAddress, expiredTime, version: app.Config.innerVersion});
    		app.utils.localStorage("siteLocalStorage", JSON.stringify(_site_local_storage));
    	} else {
    		app.utils.localStorage("siteLocalStorage", "{}");
    	}
    },
    
    //app更新升级 TODO: 需要根据实际的业务数据调整 by yujinjin
    updateApp(){
    	//mui.os.plus && !mui.os.stream && mui.plusReady(update);
    	app.ajax({
    		url: "", //更新URL
    		data: {
    			"appid": plus.runtime.appid,
				"version": plus.runtime.version,
				"imei": plus.device.imei
    		},
    		success: function(data){
    			if (data.status) {
					plus.nativeUI.confirm(data.note, function(event) {
						if (0 == event.index) {
							plus.runtime.openURL(data.url);
						}
					}, data.title, ["立即更新", "取　　消"]);
				}
    		}
    	});
    }
}