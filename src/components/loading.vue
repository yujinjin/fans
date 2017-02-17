<template>
<div class="vui-mask" @touchstart.stop.prevent v-show="Show" >
    <div class="block" >
        <span class="vui-loading" :style.sync="loadingEndStyle" :class="{'vui-loading-end':vLoadEndFlag, 'vui-loading-on': show}"></span>
        <span class="z-word"> 加载中...</span>
    </div>
</div>
</template>
<script>
module.exports = {
    props: ['show'],
    data: function() {
        return {
            loadingeffect: '',
            vLoadEndFlag: false,
            loadingEndStyle: null,
            Show: null
        }
    },
    ready: function() {
        var ua = window.navigator.userAgent;
        if (ua.match(/iPhone|iPad|iPod/) //苹果设备 加入渐隐效果
        || !("ontouchstart" in window) //pc       加入渐隐效果
        ) {
            this.loadingeffect = 'loadingfade';
        }
    },
    watch: {
        'show': function(val, oldVal) {
            var _this = this;
            _this.Show = val;
        }
    },
    events: {
        vLoadEndFn: function() {
            var _this = this;
            _this.vLoadEndFlag = true;
            var delta = parseInt(Math.max($('.vui-mask').width(), $('.vui-mask-virtual').width()) / 2 + 30) + 1; //180为初始width 120为结束动画
        },
        vLoadInit: function() {
            this.vLoadEndFlag = false;
            this.loadingEndStyle = null;
        }
    }
}
</script>

<style>
.vui-mask {
    z-index: 2001;
    width: 100%;
    height: 100%;
    left:0;
    top:0;
    right:0;
    bottom:0;
    text-align: center;
    color:#999;
    position:fixed;
    background: rgba(255,255,255,1);
}
.vui-mask .block{
    width: 100px;
    height: 100px;
    text-align: center;
    color:#999;
    position:fixed;
    left:50%;
    top:50%;
    margin: -50px 0 0 -50px;
}
.vui-loading{
    display: block;
    width: 45px; height: 45px;
    background: url("../imgs/load1.png") no-repeat 0 0;
    background-size: 45px 45px;
    margin: 0 auto 10px;
}
.vui-loading-on{
    -webkit-animation: vui-load .8s linear infinite normal both;
    animation: vui-load .8s linear infinite normal both;
}

@-webkit-keyframes vui-load{
    0%{
      -webkit-transform:rotate(0deg);
    }
    100%{
        -webkit-transform:rotate(360deg);
    }
}

@keyframes vui-load{
  0%{
      transform:rotate(0deg);
    }
    100%{
        transform:rotate(360deg);
    }
}
</style>
