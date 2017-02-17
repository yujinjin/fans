/**
 * 作者：yujinjin9@126.com
 * 时间：2017-01-19
 * app事件管理
 */
export default {
	state: {
		events:{},//事件集合 {name:[]}格式
		barcodeOnmarkedEvent: null //条码识别成功事件
	},
	
	mutations: {
		on(state, {eventName, callback}){
			if (!state.events[eventName]) {
                state.events[eventName] = [];
            }
            state.events[eventName].push(callback);
		},
		
		off(state, {eventName, callback}){
			const callbacks = state.events[eventName];
            if (!callbacks) {
                return;
            }
            callbacks.find(function(value, index, arr){
            	if(value === callback) {
            		callbacks.splice(0, 1);
            		return true;
            	}
            });
		},
		
		trigger(state, {eventName, args}){
			var callbacks = state.events[eventName];
            if (!callbacks || !callbacks.length) {
                return;
            }
            for (var i = 0; i < callbacks.length; i++) {
                callbacks[i].apply(this, args);
            }
		},
		
		bindBarcodeOnmarkedEvent(state, barcodeOnmarkedFun){
			state.barcodeOnmarkedEvent = barcodeOnmarkedFun;
		}
	},
	
	actions: {
		//绑定事件
		on({commit}, {eventName, callback}){
			if (!eventName || typeof (callback) !== "function") {
                app.log.debug("错误的参数，不能绑定事件!");
                return;
            }
            commit("on", {eventName, callback});
		},
		
		//删除事件
		off({commit}, {eventName, callback}){
			if (!eventName || typeof (callback) !== "function") {
                site.log.debug("错误的参数，不能消除事件!");
                return;
            }
            commit("off", {eventName, callback});
		},
		
		//事件触发
        trigger({commit}, {eventName, args}) {
        	if (!eventName) {
                app.log.debug("错误的参数，不能触发该事件!");
                return;
            }
            commit("trigger", {eventName, args});
        },
        
        //绑定扫码识别成功事件
        bindBarcodeOnmarkedEvent({commit}, barcodeOnmarkedFun) {
        	if (typeof(barcodeOnmarkedFun) != "function") {
                app.log.debug("绑定扫码识别成功事件必须是一个函数");
                return;
            }
        	commit("bindBarcodeOnmarkedEvent", barcodeOnmarkedFun);
        },
        
        //删除绑定扫码识别成功事件
        deleteBarcodeOnmarkedEvent({commit}){
        	commit("bindBarcodeOnmarkedEvent", null);
        }
	}

}