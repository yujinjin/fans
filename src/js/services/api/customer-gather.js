/**
 * 作者：yujinjin9@126.com
 * 时间：2015-08-04
 * 描述：集客API接口
 */
import app from '../../app'

define(function () {
    if (app.Config && app.Config.isDebug) {
        //前端调试模式
        return {
        	//会员二维码集客
            "myTempQrCode": function(ajaxOptions){
            	//APP环境不接受本地JSON文件获取，就只能通过这样方式调试
            	if(app.Config.isApp){
            		return new Promise(function(resolve, reject) {
            			if(ajaxOptions.success && typeof(ajaxOptions.success) === "function"){
            				ajaxOptions.success(require("../../data/myTempQrCode.json").result);
            			}
        				resolve();
    				});
            	}
            	return app.ajax($.extend({
		            url: require("file-loader!../../data/myTempQrCode.json"),
		        }, ajaxOptions));
            }
        }
    } else {
        //开发模式
        return {
        	//查询订单列表
            "myTempQrCode": function(ajaxOptions){
            	return app.ajax($.extend({
            		type: "GET",
		            url: config.webapiDomain + "/api/CustomerGather/MyTempQrCode",
		        }, ajaxOptions));
            }
        }
    }
});