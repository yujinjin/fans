<template>
  <div>
  	我是用户中心页面
  	<div> 会好一些，理由如下：

    无论是 HTML5 history 模式还是 hash 模式，它的表现行为一致，所以，当你要切换路由模式，或者在 IE9 降级使用 hash 模式，无须作任何变动。

    在 HTML5 history 模式下，router-link 会拦截点击事件，让浏览器不在重新加载页面。

    当你在 HTML5 history 模式下使用 base 选项之后，所有的 to 属性都不需要写（基路径）了。</div>
  </div>
  
</template>
<style lang="less" scoped>

</style>
<script>
    export default{
        data(){
            return{

            }
        },
        methods:{

        }
    }
</script>