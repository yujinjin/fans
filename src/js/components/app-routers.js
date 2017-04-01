/**
 * 作者：yujinjin9@126.com
 * 时间：2016-08-16
 * 描述：站点路由插件（只做路由的操作，不涉及实际的业务处理）
 */
export default {
	referrer: null,
	//获取路由访问历史 
	//name|appfrom|query|url
	getHistorys(index){
		var _historys = app.utils.localStorage("historys") || "[]";
		if(_historys) {
			try {
				_historys = JSON.parse(_historys);
			}catch(e){
				app.log.error(e);
			}
		}
		if(_historys == null || typeof(_historys) != "object"){
			_historys = [];
		}
		if(typeof(index) === "number"){
			return (_historys.length > index ? _historys[index] : {});
		}
		return _historys;
	},
	
	//判断当前的页面是否是前进方向
	isGoing(isGoing, url){
		var _historys = this.getHistorys(), 
			_length = _historys.length, 
			_current_url = window.location.href;
		//首先判断当前的URL是否是存在，如果已经存在就认为是页面刷新不再做路由历史操作
		if(_length > 0 && _historys[_length-1].url == _current_url){
			return true;
		}
		var _referrer = document.referrer;
		if(_referrer && document.referrer.indexOf(location.host) === -1 && this.referrer != document.referrer){
			return true;
		}
		if(isGoing !== true && _length > 1 && _historys[_length-2].url == _current_url){
			return false;
		}
		return true;
	},
	
	//direction: null, //going：前进|backing后退|replace：浏览历史中替换最后一条历史|null:用户操作浏览器的返回或者前进按钮，这个只能通过历史
	push(isGoing, opitions){
		var _historys = this.getHistorys(), 
			_length = _historys.length, 
			_current_url = window.location.href;
		//首先判断当前的URL是否是存在，如果已经存在就认为是页面刷新不再做路由历史操作
		if(_length > 0 && _historys[_length-1].url == _current_url){
			return true;
		}
		//判断上一个URL是否是在当前站点进来的
		var _referrer = document.referrer;
		opitions = opitions || {};
		opitions.url = _current_url;
		if(_referrer && _referrer.indexOf(location.host) === -1 && this.referrer != document.referrer){
			this.referrer = _referrer
			_historys.push({
				url:_referrer
			});
			_historys.push(opitions);
			app.utils.localStorage("historys", JSON.stringify(_historys));
			return true;
		}
		if(isGoing === true){
			//正常前进
			_historys.push(opitions);
		} else if(_length > 1 && _historys[_length-2].url == _current_url){
			//非正常路由，通过浏览的后退按钮访问
			_historys.splice(_length-1,1);
			isGoing = false;
			//console.debug("浏览器中后退");
		} else {
			//非正常路由，通过浏览的前进按钮访问
			_historys.push(opitions);
			isGoing = true;
			//console.debug("浏览器中前进");
		}
		
		app.utils.localStorage("historys", JSON.stringify(_historys));
		return isGoing;
	},
	
	//返回opitions：{url:指定返回的URL}name|appfrom|query|url
	back(callbackFun, opitions){
		var _historys = this.getHistorys(), 
			_length = _historys.length;
		//appfrom是app进来的
		if(opitions && _length > 0){
			_historys.splice(_length-1, 1);
		} else if(_length > 1){
			//opitions.name || opitions.url
			opitions = opitions || _historys[_length-2];
			_historys.splice(_length-2, 2);
		} else {
			opitions = null;
			_historys = [];
		}
		app.utils.localStorage("historys", JSON.stringify(_historys));
		if(typeof(callbackFun) === "function"){
			callbackFun(opitions);
		}
	},
	
	//去除指定最新size路由记录
	pop(size){
		var _historys = this.getHistorys(), 
			_length = _historys.length,
			_history = null;
			size = size || 1;
		if(typeof(size) === "string"){
			try{
				size = parseInt(size, 10);
			}catch(e){}
		}
		if(_length < size) {
			_historys = [];
		} else {
			_history = _historys[_length-size];
			_historys.splice(_length-size, size);// = _historys[_length-1];
		}
		app.utils.localStorage("historys", JSON.stringify(_historys));
		return _history;
	},
	
	//清空
	clear(){
		app.utils.localStorage("historys", null);
	}
}
