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
            "login": app.Config.serverPath + "/src/js/data/login.json",
            //查询用户基本信息
            "queryUserInfo": app.Config.serverPath + "/src/js/data/info.json"
        }
    } else {
        //前端开发模式
        return {
        	//登录用户
            "login": "/login",
            //查询用户基本信息
            "queryUserInfo": "/info"
        }
    }
});