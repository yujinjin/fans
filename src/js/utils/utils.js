/**
 * 作者：yujinjin9@126.com
 * 时间：2017-01-19
 * 描述：站点页面表单验证框架工具类
 */
export default {
	//日期格式化
	dateFormat(date, fmt){
		// TODO: 没有经过测试
		if(!date || !date instanceof Date) {
			return "";
		}
		var o = {
			"M+": date.getMonth() + 1, // 月份
			"d+": date.getDate(), // 日
			"h+": date.getHours(), // 小时
			"m+": date.getMinutes(), // 分
			"s+": date.getSeconds(), // 秒
			"q+": Math.floor((date.getMonth() + 3) / 3), // 季度
			"S": date.getMilliseconds() // 毫秒
		};
		if(/(y+)/.test(fmt))
			fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
		for(var k in o)
			if(new RegExp("(" + k + ")").test(fmt))
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	},
	
	/** 
	 * 将数值四舍五入(保留2位小数)后格式化成金额形式 
	 * 
	 * @param num 数值(Number或者String) 
	 * @param digit 保留小数点几位
	 * @return 金额格式的字符串,如'1,234,567.45' 
	 * @type String 
	 */
	//货币格式化
	dateCurrency(num, digit) {
		num = num.toString().replace(/\$|\,/g, '');
		if(isNaN(num))
			num = "0";
		if(typeof(digit) != "number" || digit < 0){
			digit = 0;
		}
		//最大支持11位小数
		if(digit > 11){
			return;
		}
		// 绝对值
		var sign = (num == (num = Math.abs(num))), cents = null;
		num = Math.floor(num * Math.pow(10, digit) + 0.50000000001);
		if(digit > 0){
			//小数位
			cents = num % Math.pow(10, digit);
			cents = ( "00000000000" + num).substr(-digit)
		}
		num = Math.floor(num / Math.pow(10, digit)).toString();
		for(var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
				num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
		if(cents) {
			return (((sign) ? '' : '-') + num + '.' + cents);
		} else {
			return (((sign) ? '' : '-') + num);
		}
	},
	
	parseUrl(url) {
		if(!url) {
			return;
		}
		var _a_el = document.createElement("a");
		_a_el.href = url;
		return {
			protocol: _a_el.protocol.replace(':', ''), //协议
			host: _a_el.hostname, //域名
			port: _a_el.port,
			query: (function() {
				if(_a_el.search) {
					return _a_el.search;
				}
				//兼容http://xxxx/#/id=xxx这种格式
				if(url.indexOf("?") != -1) {
					return url.substring(url.indexOf("?"));
				}
				return "";
			})(),
			params: (function() {
				var ret = {},
					seg = _a_el.search;
				//兼容http://xxxx/#/id=xxx这种格式
				if(!seg && url.indexOf("?") != -1) {
					seg = url.substring(url.indexOf("?"));
				}
				seg = seg.replace(/^\?/, '').split('&');
				var len = seg.length,
					i = 0,
					s;
				for(; i < len; i++) {
					if(!seg[i]) {
						continue;
					}
					s = seg[i].split('=');
					ret[s[0]] = s[1];
				}
				return ret;
			})(), //参数对象
			file: (_a_el.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
			hash: _a_el.hash.replace('#', ''),
			path: _a_el.pathname.replace(/^([^\/])/, '/$1'),
			relative: (_a_el.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
			segments: _a_el.pathname.replace(/^\//, '').split('/')
		}
	},
	
	generateGuid() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random() * 16 | 0,
				v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	},
	
	//本地存储
	localStorage(key, value) {
		if(arguments.length === 0) {
			app.log.warn("没有参数");
			return;
		}
		if(app.isApp) {
			if(arguments.length === 1 || typeof(value) === "undefined") {
				return plus.storage.getItem(key);
			} else if(value === null || value === '') {
				plus.storage.removeItem(key);
			} else if(typeof(value) === "object") {
				plus.storage.setItem(key, JSON.stringify(value));
			} else {
				plus.storage.setItem(key, value);
			}
		} else {
			if(!window || !window.localStorage) {
				app.mui.alert("您开启了秘密浏览或无痕浏览模式，请关闭!");
				return;
			}
			if(arguments.length === 1 || typeof(value) === "undefined") {
				return window.localStorage.getItem(key);
			} else if(value === null || value === '') {
				window.localStorage.removeItem(key);
			} else if(typeof(value) === "object") {
				window.localStorage.setItem(key, JSON.stringify(value));
			} else {
				window.localStorage.setItem(key, value);
			}
		}
	}
}
