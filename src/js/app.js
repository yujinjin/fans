/**
 * 作者：yujinjin9@126.com
 * 时间：2016-03-03
 * 描述：app 核心框架
 */
const site = {
	Config: {
		resourecePath: "", //资源服务路径
		serverPath: "", //服务路径
		version: "", //app版本
		releaseTime: "", //发布时间
		isDebug: true, //是否是前端调试状态
		innerVersion : "999.999.999", // 获得当前终端的版本号
		startVersion: "0.1.1", //app启动动画版本号
		isInsideApp : false, // 是否在APP应用环境内
		isWeiXin : false, //是否在微信环境内
		isApp: false, //是否是在app内
		device: {
			isAndroid : false, //是否在安卓环境内
			isIOS : false, //是否在IOS环境内
			model: null, //设备的型号
			imsi: null, //设备的国际移动用户识别码 ,//Android - 2.2+ (支持): 如果设备没有插入SIM卡，则返回空数组。|iOS - 4.5+ (不支持): iOS设备不支持获取SIM卡信息，返回空数组。
			vendor: null, // 设备的生产厂商
			uuid: null, //设备的唯一标识
			resolutionHeight: null, //设备屏幕高度分辨率
			resolutionWidth: null, //设备屏幕宽度分辨率
			scale: null, //逻辑分辨率与实际分辨率的比例
			version: null, //系统版本信息
			osName: null, //系统的名称
		}//设备信息
	},

	initApp() {
		//获取当前环境
		if(window.navigator && window.navigator.userAgent) {
			var ua = window.navigator.userAgent.toLocaleLowerCase();
			site.Config.isWeiXin = (ua.match(/MicroMessenger/i) == 'micromessenger');
		}
	},

	//重写ajax定义的方法，主要用于自己业务逻辑上的处理
	ajax: function(options) {
		let _url = null;
		if(app.Config.isApp && plus.networkinfo.getCurrentType() === plus.networkinfo.CONNECTION_NONE){
			app.mui.toast('<a href="javascript:void(0);" style="text-decoration: underline;color: #FFF;" onclick="window.location.reload();">亲~网络连接不上，请检测网络。点此刷新重试</a>', {duration:'8000', type:'div'});
			return;
		}
		if(typeof(options) === "string"){
			_url = options;
		} else if(typeof(options) !== "object" || !options.url){
			app.mui.alert("Ajax 参数错误！");
			return;
		} else {
			_url = options.url;
			delete options.url;
		}
		var _default = {
			type: "POST",
            dataType: "json",
            headers:{'Content-Type':'application/json'},
            processData: true, //是否自动处理data数据
            async: true,
            timeout: 20000,
            auth: false, //是否验证当前API接口的登录权限
            authFailCallbackFun: null, // 验证失败的回调函数
            successFunData: true, //是否验证成功回调函数的数据
            showLoading: false //是否显示加载
		};
        var _options = app.mui.extend(true, {}, _default, options);
       	if(!_options.data) {
       		_options.data = {};
       	}
       	if(_url.lastIndexOf(".json") > -1){
        	_options.type = "GET";
        }
       	if(_options.type.toUpperCase() === 'GET'){
       		_options.headers = {"Content-Type": "application/x-www-form-urlencoded"};
        	_url += '&rnd='+ (+new Date()+'');
        	_options.data = _options.data || {};
        }
        if(!_url.match(/^(?:http|ftp|https):\/\//) && _url.lastIndexOf(".json") == -1){
        	//如果传的url含有 http://说明是个绝对路径，就不用拼了
            _url = app.Config.webapiDomain + _url;
        }
        if(_default.processData && typeof(_options.data) === "object" && _options.type.toUpperCase() === 'POST'){
        	_options.data = JSON.stringify(_options.data);
        }
        if(_options.auth === true && !app.globalService.isLogin()) {
        	if(typeof(_options.authFailCallbackFun) === "function"){
        		_options.authFailCallbackFun();
        	}
        	return;
        }
        _options.success = function(data, textStatus){
        	if(_options.showLoading === true){
            	//router.app.$emit('vHideLoad')
            }
        	var _data = data;
        	if(_options.successFunData === true){
        		if(data.success){
        			_data = data.result;
    			} else if(data.error && data.error.message) {
					app.mui.alert(data.error.message, "错误提示");
					return;
				} else {
					app.mui.toast("出错了！");
					return;
				}
        	}
        	if(typeof(options.success) === "function"){
        		options.success(_data);
        	}
        }
        _options.complete = function(data, textStatus){
        	if(_options.showLoading === true){
        		_options.showLoading = false;
            	//router.app.$emit('vHideLoad');
            }
        	if(typeof(options.complete) === "function"){
        		options.complete(data, textStatus);
        	}        	
        }
        _options.error = function(xhr, error){
            app.log.debug(xhr, error);
        	if(typeof(options.error) === "function"){
        		options.error(xhr, error);
        	} else if (xhr.response) {
        		var responseJSON = null;
        		try{
        			responseJSON = JSON.parse(xhr.response);
        		}catch(e){}
        		if(responseJSON && responseJSON.__abp && responseJSON.unAuthorizedRequest){
        			//app.mui.toast('<a href="javascript:void(0);" style="text-decoration: underline;color: #FFF;" onclick="window.location.reload();">亲~登录过期了。点此重新登录</a>', {duration: 8000, type:'div'});
        			app.mui.confirm("亲~登录过期了！", null, ['想再看看','去登录'], function(e){
        				if(e.index === 1){
        					app.vueApp.$router.push({ name: 'login' });
        				}
        			});
        		} else if(responseJSON && responseJSON.__abp && responseJSON.error && responseJSON.error.message){
        			app.mui.toast(responseJSON.error.message);
        		}
            } else {
                app.mui.toast('<a href="javascript:void(0);" style="text-decoration: underline;color: #FFF;" onclick="window.location.reload();">亲~服务出错了。点此刷新重试</a>', {duration: 8000, type:'div'});
            }
        }
        _options.beforeSend = function(xhr){
        	//xhr.setRequestHeader("ClientVersion", app.Config.innerVersion);
        	var _token = app.globalService.getLoginUserInfo().token;
        	if(_token){
                xhr.setRequestHeader("Authorization", _token);
            }
            if(_options.showLoading === true){
            	//router.app.$emit('vShowLoad');
            }
            if(typeof(options.beforeSend) === "function"){
        		options.beforeSend(xhr);
        	}
        }
        app.mui.ajax(_url, _options);
	},
	
	//获取图片地址，如果地址带有 http://那么就认为是绝对地址，然后直接返回
    getResourceUrl: function(url){
    	if(url && url.match(/http:\/\//)){
            return url;
    	}
        //全站统一配置
        if(window.abp){
            return app.Config.imageDomain + url;
        }
        return "http://img.yaomaiche.com" + url;
    },

	//获取站点本地存储信息
	getSiteLocalStorage: function(){
		var _site_local_storage = app.utils.localStorage("siteLocalStorage");
		if(_site_local_storage) {
			try {
				_site_local_storage = JSON.parse(_site_local_storage);
			}catch(e){
				app.log.error(e);
			}
		}
		if(_site_local_storage == null || typeof(_site_local_storage) != "object"){
			_site_local_storage = {};
		}
		return _site_local_storage;
	},
};
site.initApp();
module.exports = site;