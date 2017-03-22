/**
 * 作者：yujinjin9@126.com
 * 时间：2015-08-04
 * 描述：用户中心API接口
 */
import app from '../../app'
define(function () {
    if (app.Config && app.Config.isDebug) {
        //前端调试模式
        //用户
        return {
        	//登录用户
            "login": function(ajaxOptions){
            	//APP环境不接受本地JSON文件获取，就只能通过这样方式调试
            	if(app.Config.isApp){
            		return new Promise(function(resolve, reject) {
            			if(ajaxOptions.success && typeof(ajaxOptions.success) === "function"){
            				ajaxOptions.success(require("../../data/login.json").result);
            			}
        				resolve();
    				});
            	}
            	return app.ajax($.extend({
		            url: require("file-loader!../../data/login.json"),
		        }, ajaxOptions));
            },
            //查询用户基本信息
            "queryUserInfo": function(ajaxOptions){
            	if(app.Config.isApp){
            		return new Promise(function(resolve, reject) {
            			if(ajaxOptions.success && typeof(ajaxOptions.success) === "function"){
            				ajaxOptions.success(require("../../data/info.json").result);
            			}
        				resolve();
    				});
            	}
            	return app.ajax($.extend({
		            url: require("file-loader!../../data/info.json"),
		        }, ajaxOptions));
            }
        }
    } else {
        //前端开发模式
        return {
        	//登录用户
            "login": function(ajaxOptions){
            	return app.ajax($.extend({
		            url: "/api/login",
		        }, ajaxOptions));
            },
            //查询用户基本信息
            "queryUserInfo": function(ajaxOptions){
            	return app.ajax($.extend({
		            url: "/api/info",
		        }, ajaxOptions));
            }
        }
    }
});