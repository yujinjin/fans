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
            "myTempQrCode": app.Config.serverPath + "/src/js/data/myTempQrCode.json"
        }
    } else {
        //开发模式
        return {
        	//查询订单列表
            "myTempQrCode": config.webapiDomain + "/api/CustomerGather/MyTempQrCode"
        }
    }
});