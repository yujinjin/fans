import babelPolyfill from 'babel-polyfill'
import mui from "./lib/mui"
import app from './app'
import globalService from './services/global-service'
import api from "./services/api"
import log from './utils/log'
import utils from './utils/utils'
import directives from "./utils/directives"
import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import routers from "./routers"
import vueApp from "../views/app"
import store from "./store/"
import jQuery from "./lib/jquery-1.12.4"


Object.assign(app.Config, config);
window.app = Object.assign({}, app, {log, utils, mui, globalService, api});
//signalR是基于jquery的，所以必须要把jQuery引进来，Jquery仅仅是用于signalR。太恶心了，其实我TM的真的不想这样...
window.jQuery = window.$ = jQuery;
const initVue = function(){
	Vue.use(Vuex);
	Vue.use(VueRouter);
	Object.keys(directives).forEach((key) => {
	    Vue.directive(key, directives[key]);
	});
	const [router, VueApp] = [routers.createRouter(VueRouter, store), Vue.extend(vueApp)];
	window.app.vueApp = new VueApp({ router, name: "app", store }).$mount('#app');
}
mui.init({
	swipeBack:false, //关闭右滑关闭功能（默认就是false）
	keyEventBind: {
		backbutton: true  //开启back按键监听（默认就是true）
	},
	statusBarBackground: "#1981D8" //设置状态栏颜色,仅iOS可用
});
if(mui.os.plus) {
	app.Config.isApp = true;
	mui.plusReady(function(){
		Object.assign(app.Config.device, {
			isAndroid : plus.os.name === "Android", //是否在安卓环境内
			isIOS : plus.os.name === "iOS", //是否在IOS环境内
			model: plus.device.model, //设备的型号
			imsi: plus.device.imsi, //设备的国际移动用户识别码 ,//Android - 2.2+ (支持): 如果设备没有插入SIM卡，则返回空数组。|iOS - 4.5+ (不支持): iOS设备不支持获取SIM卡信息，返回空数组。
			vendor: plus.device.vendor, // 设备的生产厂商
			uuid: plus.device.uuid, //设备的唯一标识
//			resolutionHeight: plus.screen.resolutionHeight * plus.screen.scale, //设备屏幕高度分辨率
//			resolutionWidth: plus.screen.resolutionWidtht * plus.screen.scale, //设备屏幕宽度分辨率，目前好像是空的
//			scale: plus.screen.scale, //逻辑分辨率与实际分辨率的比例
			version: plus.os.version, //系统版本信息
			osName: plus.os.name //系统的名称
		});
		app.Config.version = plus.runtime.version;
		app.Config.clientVersion = plus.runtime.innerVersion;
		initVue();
	});
} else {
	mui.ready(function() {
		initVue();
	});
}

//require("../less/app.less"); //加载公共样式
//window.app = require("./app.js"); //加载公共样式,
//var Vue = require('vue');
//var VueRouter = require('vue-router');
//Vue.use(VueRouter);
//var router = require('./routers').createRouter(VueRouter);
//var App = Vue.extend(require('../views/app.vue'));
//new App({router: router, name: "app"}).$mount('#app');
