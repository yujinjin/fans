/**
 * 作者：yujinjin9@126.com
 * 时间：2016-07-07
 * 描述：modal组件
 */
module.exports = function(site) {
	site = site || {};
	site.modal = site.modal || {};
	site.modal.delayCloseTimerId = null;
	site.modal.info = function(contents, callBackFun, options){
		var _options = {};
		if(typeof(options) === "number"){
			_options.delay = options;
		} else if(typeof(options) === "object"){
			_options = $.extend(true, {}, options);
		}
		_options.className = "modal-info";
		_options.contents = contents;
		_options.onEscape = callBackFun;
		if(!_options.delay){
			//默认1秒隐藏
			_options.delay = 1500;
		}
		site.modal.dialog(_options);
	}

	site.modal.error = function(contents, callBackFun, options){
		var _options = {};
		if(typeof(options) === "number"){
			_options.delay = options;
		} else if(typeof(options) === "object"){
			_options = $.extend(true, {}, options);
		}
		_options.className = "modal-error";
		_options.contents = contents;
		_options.onEscape = callBackFun;
		if(!_options.delay){
			//默认1秒隐藏
			_options.delay = 3000;
		}
		site.modal.dialog(_options);
	}

	site.modal.success = function(contents, callBackFun, options){
		var _options = {};
		if(typeof(options) === "number"){
			_options.delay = options;
		} else if(typeof(options) === "object"){
			_options = $.extend(true, {}, options);
		}
		_options.className = "modal-success";
		_options.contents = contents;
		_options.onEscape = callBackFun;
		if(!_options.delay){
			//默认1秒隐藏
			_options.delay = 2000;
		}
		site.modal.dialog(_options);
	}
	
	site.modal.explain = function(title, contents){
		var _options = {
			title: title,
			className:"modal-explain",
			width: "100%",
			contents: contents,
			autoHide: false,
			useIScroll: true,
			buttons: [{
				className: "button-explain",
				callback: function($body){
					site.modal.close();
				}
			}],
			initCallback: function($body){
				var _max_height = $(window).height() - $($body).next().height() - $($body).prev().height() - 50;
				$($body).css("max-height", _max_height + "px");
			}
		};
		site.modal.dialog(_options);
	}

	site.modal.alert = function(title, contents, label, callback){
		var _options = {
			title: title,
			className:title? "modal-alert" : "modal-alert-notitle" ,
			contents: contents,
			autoHide: false,
			buttons: [{
				className: "button-alert",
				label: label? label : "确认",
				callback: function($body){
					site.modal.close(callback);
				}
			}]
		};
		site.modal.dialog(_options);
	}
	
	
	site.modal.confirm = function(contents, buttons, callback, title){
		var _options = {
			title: title,
			className:title? "modal-confirm": "modal-confirm-notitle" ,
			contents: contents,
			autoHide: false,
			buttons: [{
				className: "button-cancel",
				label: "取消",
				callback: function($body){
					site.modal.close(callback, false);
				}
			}, {
				className: "button-ok",
				label: "确认",
				callback: function($body){
					site.modal.close(callback, true);
				}
			}]
		};
		if(typeof(buttons) === "object"){
			_options.buttons = $.extend(true, _options.buttons , buttons);
		}
		site.modal.dialog(_options);
	}

	site.modal.prompt = function(title, callBackFun, options){
		var _options = {
			buttons: [{
				className: "button-ok",
				label: "确认",
				callback: function($body){
					if(_options.inputType === "checkbox"){
						var checkedItems = $body.find("input:checked"), value = [];
						$.each(checkedItems, function(_, item) {
							value.push($(item).val());
						});
						site.modal.close(callBackFun, true, value);
					} else {
						site.modal.close(callBackFun, true, $body.find("input").val());
					}
				}
			}, {
				className: "button-cancel",
				label: "取消",
				callback: function($body){
					site.modal.close(callBackFun, false);
				}
			}]
		};
		if(typeof(options) === "object"){
			_options = $.extend(true, _options, options);
		}
		_options.title = title;
		_options.autoHide = false;
		_options.className = "modal-prompt";
		if(!_options.inputType){
			_options.inputType = "text";
		}
		_options.contents = function(){
			var inputs = {
				text : "<input class='modal-input modal-input-text' autocomplete=off type=text />",
				textarea : "<textarea class='modal-input modal-input-textarea'></textarea>",
				email : "<input class='modal-input modal-input-email' autocomplete='off' type='email' />",
				select : "<select class='modal-input modal-input-select'></select>",
				checkbox : "<div class='modal-checkbox'><label class='modal-checkbox-inline'><input class='modal-input modal-input-checkbox' type='checkbox' /></label></div>",
				date : "<input class='modal-input modal-input-date' autocomplete=off type='date' />",
				time : "<input class='modal-input modal-input-time' autocomplete=off type='time' />",
				number : "<input class='modal-input modal-input-number' autocomplete=off type='number' />",
				password : "<input class='modal-input modal-input-password' autocomplete='off' type='password' />"
			}
			if(!inputs[_options.inputType]){
				return;
			}
			var $input = $(inputs[_options.inputType]);
			if(_options.inputType === "select"){
				if(!$.isArray(_options.inputOptions)){
					site.log.error("请输入正确的参数[inputOptions]");
					return;
				}
				for(var i=0, j=_options.inputOptions.length; i<j; i++){
					$input.append("<option value='" + _options.inputOptions[i].value + "' checked='" + (_options.inputOptions[i].value==_options.value) + ">" + _options.inputOptions[i].text + "</option>");
				}
			} else if(_options.inputType === "checkbox"){
				if(!$.isArray(_options.inputOptions)){
					site.log.error("请输入正确的参数[inputOptions]");
					return;
				}
				for(var i=0, j=_options.inputOptions.length; i<j; i++){
					$input.append("<label class='modal-checkbox-inline'>" + _options.inputOptions[i].text + "<input class='modal-input modal-input-checkbox' type='checkbox' value='" + _options.inputOptions[i].value + "' checked='" + (_options.inputOptions[i].value==_options.value) + "'/></label>");
				}
			} else if(_options.value){
				$input.attr("value", _options.value);
			}
			if (_options.placeholder) {
				$input.attr("placeholder", _options.placeholder);
			}
			return $input.prop("outerHTML");
		}();
		site.modal.dialog(_options);
	}
	//关闭弹窗
	site.modal.close = function(callBackFun){
		var args = [];
		for(var i=1, j = arguments.length; i<j; i++){
			args.push(arguments[i]);
		}
		router.app.$refs.modal.destroy(function($body){
			if($.isFunction(callBackFun)){
				args.push($body);
				callBackFun.apply(null, args);
			}
		});
	}

	//site.modal.dialog({title: "", contents: "", className: "modal-vertical-buttons", buttons:[{label:"", callback: "", className: ""}]})
	//site.modal.dialog({className: "actions-modal-group", buttons:[{label:"", callback: "", className: ""}]})
	site.modal.dialog = function(options){
		if(site.modal.delayCloseTimerId){
			clearTimeout(site.modal.delayCloseTimerId);
		}
		router.app.$refs.modal.init(options);
		if (typeof (options.delay) == "number" && options.delay > 100) {
			site.modal.delayCloseTimerId = setTimeout(function() {
				site.modal.close(options.onEscape);
				site.modal.delayCloseTimerId = null;
			}, options.delay);
		}
	}

	//TODO: 显示页面预加载提示
	site.modal.showPreloader = function(message) {
		if (!message) {
			message = "正在加载...";
		}
	},

	//TODO: 隐藏页面加载提示
	site.modal.hidePreloader = function() {

	}
	/********************************************** test *********************************************************/
	site.modal.Test = function(type){
		switch (type) {
			case "info":
				site.modal.info("info", function($body){
					console.info($body);
				}, 30000);
				break;
			case "error":
				site.modal.error("error", function($body){
					console.info($body);
				}, 30000);
				break;
			case "success":
				site.modal.success("success", function($body){
					console.info($body);
				}, 30000);
				break;
			case "explain":
				site.modal.explain("这是标题", "这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内<br>容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容<br>容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容<br>容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容<br>容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容<br>容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容");
				//site.modal.explain("这是标题", "这是内容这是内容这是内容这是内容这");
				break;
			case "alert":
				site.modal.alert("alert", "这是内容", "按钮标签", function($body){
					console.info($body);
				});
				break;
			case "confirm":
				site.modal.confirm("这是内容", [{label: "取消2"}, {label: "确认2"}], function(isOk, $body){
					console.info(isOk, $body);
				}, "标题");
				break;
			case "prompt":
				site.modal.prompt("prompt", function(isOk, value, $body){
					console.info(isOk, value, $body);
				}, {
					value: "text"
				});
				break;
			case "custom-vertical-buttons":
				site.modal.dialog({
					title: "11111",
					contents: "22222",
					className: "modal-vertical-buttons",
					buttons:[{
						label:"01",
						callback: function(){
							console.info(11)
						},
						className: "b1"
					},{
						label:"02",
						callback: function(){
							console.info(22)
						},
						className: "b2"
					},{
						label:"03",
						callback: function(){
							console.info(22)
						},
						className: "b3"
					}]
				});
				break;
			case "custom-actions-modal-group":
				site.modal.dialog({
					className: "actions-modal-group",
					buttons:[{
						label:"01",
						callback: function(){
							console.info(11)
						},
						className: "b1"
					},{
						label:"02",
						callback: function(){
							console.info(22)
						},
						className: "b2"
					},{
						label:"03",
						callback: function(){
							console.info(22)
						},
						className: "b3"
					}]
				});
				break;
			case "custom-fluid":
				var _src = require("../../imgs/colse.png");
				var _html = '<div class="detail-con">';
				for(var i = 0; i < 15; i++){
					_html += '<ul class="price-detail-con"><li>贷款首付 (首付30％)<span class="fr">￥288,990</span></li><li>贷款首付 (首付30％)<span class="fr">￥288,990</span></li></ul><p>标题</p>';
				}
				_html += '<div class="total">总计 <span class="fr">约￥300,793</span><br><span class="fr d7000">此价格不含车辆购置税</span></div>';
				_html += '</div>'
				site.modal.dialog({
					title: "价格明细",
					contents: _html,
					useIScroll: true,
					autoHide:false,
					width: "100%",
					height: "100%",
					className:"custom-fluid",
					buttons:[{
						label: '<div class="colse"><img src="'+_src+'"></div>',
						callback: function($body){
							site.modal.close();
						},
						className: "button-ok"
					}],
					initCallback: function($body){
						var _max_height = $(window).height() - $($body).next().height() - $($body).prev().height();
						$($body).css("max-height", _max_height + "px");
					}
				});
				break;
			
		}

	}
	/*******************************************************************************************************/
}

