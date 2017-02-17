<template>
	<div class="modal fade" v-show="show" v-bind:style="{backgroundColor:opacity}" @click.stop.prevent="modalFadeClick">
		<div class="modal-dialog {{className==null?'':className}}">
			<div class="modal-content" v-bind:style="{width: width?width:'270px', height: height?height:'inherit'}">
				<div class="modal-header" v-if="title">
					<h4 class="modal-title">
						{{{title}}}
					</h4>
				</div>
				<div class="modal-body" v-el:body v-if="contents" @click.stop>
					<div class="modal-body-con">
						{{{contents}}}
					</div>
				</div>
				<div class="modal-footer" v-if="buttons.length > 0">
					<div class="modal-button {{buttonItem.className==null?'':buttonItem.className}}" v-for="buttonItem in buttons" @click.stop.prevent="buttonClick($index);">{{{buttonItem.label}}}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	module.exports = {
		data: function() {
			return {
				modalIScroll: null, //IScroll插件
				show: false, //是否显示弹层
				autoHide: true, //点击
				opacity: "", //是否显示遮罩层
				delay: 2000, // 窗口多少毫秒后自动关闭，为0时，不自动关闭
				animated: true, //是否添加动画
				className: null,
				contents: null, //
				title: null, //标题
				width: 270, //弹层宽度
				height: null, //弹层高度
				buttons: [] //{className|label|callback}
			}
		},

		detached: function() {
			this.destroy();
		},
		methods: {
			//弹层数据初始化
			//options:{useIScroll: false, //是否使用IScroll initCallback: fun, //弹窗初始化事件}
			init: function(options) {
				var _this = this;
				_this.destroy();
				_this.event_unbind();
				_this.contents = options.contents;
				_this.src = options.src;
				_this.show = true;
				if(options.useIScroll === true || $.isPlainObject(options.useIScroll)) {
					setTimeout(function() {
						_this.sliderNote(options.useIScroll);
					}, 100);
				}
				if(options.buttons && options.buttons.length > 0) {
					_this.buttons = options.buttons;
				}
				_this.autoHide = !(options.autoHide === false);
				_this.opacity = options.opacity || "";
				_this.delay = options.delay;
				_this.className = options.className;
				_this.title = options.title;
				_this.width = options.width;
				_this.height = options.height;
				if(options.initCallback && typeof(options.initCallback) === "function") {
					Vue.nextTick(function() {
						options.initCallback(_this.$els.body);
					});
				}
			},
			sliderNote: function(IScrollOption) {
				var _this = this;
				require(["iscroll"], function(IScroll){
					var _IScrollOption = {
						preventDefault: false,
						hScroll: false,
						vScroll: true,
						scrollbars: true
					};
					if($.isPlainObject(IScrollOption)) {
						_IScrollOption = $.extend(true, _IScrollOption, IScrollOption);
					}
					_this.modalIScroll = new IScroll(".modal-body", _IScrollOption);
				});
			},
			eDefault: function(e) {
				e.preventDefault();
			},
			event_unbind: function() {
				var _this = this;
				document.addEventListener("touchmove", _this.eDefault, false); //阻止浏览器默认事件
				document.addEventListener("mousewheel", _this.eDefault, false); //阻止浏览器默认事件
				//
			},
			event_bind: function() {
				var _this = this;
				document.removeEventListener("touchmove", _this.eDefault, false); //释放浏览器默认事件
				document.removeEventListener("mousewheel", _this.eDefault, false); //释放浏览器默认事件
			},
			//按钮点击事件
			buttonClick: function(index) {
				var _this = this;
				if(_this.buttons && _this.buttons.length > index && $.isFunction(_this.buttons[index].callback)) {
					_this.event_bind();
					_this.buttons[index].callback($(_this.$els.body));
				}
			},

			//点击遮罩层是否隐藏
			modalFadeClick: function() {
				var _this = this;
				if(_this.autoHide === true) {
					_this.destroy();
				}
			},

			destroy: function(callBackFun) {
				var _this = this;
				if(_this.modalIScroll) {
					_this.modalIScroll.destroy();
				}
				_this.modalIScroll = null;
				_this.event_bind();
				this.show = false;
				this.autoHide = true;
				this.opacity = "";
				this.delay = 2000;
				this.animated = true;
				this.className = null;
				this.contents = null;
				this.title = null;
				this.width = 400;
				this.height = 300;
				this.buttons = [];
				if($.isFunction(callBackFun)) {
					callBackFun($(this.$els.body));
				}
			}
		}
	}
</script>