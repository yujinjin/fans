## 前言
这是一个html5+打包app(android/iOS)项目

前端h5是基于[mui](http://dev.dcloud.net.cn/mui/) + [vue2](http://cn.vuejs.org/v2/api/) + [vue-router2](http://router.vuejs.org/zh-cn/) + [es6](http://es6.ruanyifeng.com/) + [webpack2](http://webpack.github.io/) + [vuex](http://vuex.vuejs.org/zh-cn/) + [signalR](http://signalr.net/) 的前端webApp单页项目框架。

app打包技术是用[HBuilder IDE](http://www.dcloud.io/index.html)工具一键打包成APP，本项目使用了原生设备的的Storage和管理条码扫描。对于app的升级是html5资源在线升级更新,而不是整个APP更新。这些都是[dcloud](httphttp://www.dcloud.io/index.html)提供一整套套技术解决方案。

本项目只是一个技术框架，对于项目中具体的业务的东西只会大概的说明一下。


**==说明：==** 可能有些朋友不知道[signalR](httphttp://signalr.net/)是什么东西，其实[signalR](httphttp://signalr.net/)就是让客户端（Web页面）和服务器端可以互相通知消息及调用方法的前端JS，当WebSockets可用时（即浏览器支持Html5）[signalR](httphttp://signalr.net/)使用WebSockets，当不支持时[signalR](httphttp://signalr.net/)将使用其它技术来保证达到相同效果。


> 1. 前端UI的部分使用mui框架
> 
> 2. app打包技术使用HBuilder IDE工具
> 
> 3. 原生App对设备的调用
> 
> 4. 使用vue-router2实现单页路由
> 
> 5. 使用.vue文件进行页面功能组件化的开发
> 
> 6. 使用vuex管理webApp的数据状态
> 
> 7. 使用signalR实现客户端与服务端长时间通信
> 
> 8. 使用webpack2实现对模块打包、压缩、混淆，预处理，热加载。


==**吐槽：**== 我想吐槽一下webpack2的webpack.config.js中各个插件配置，当时配置了好几天，这个loader配置好了，另外一个又出问题了，而且网上关于webapck2 API太少了，都是靠摸索着前进，真的是好难配。那有人肯定问了为啥不用VUE官方提供的vue-cli创建项目，我想说兄弟呀那个vue-cli是针对webpack1的，我想用webpack2（不要问我为什么，我就是固执的想用），而且官方配置的JS太TM的不直接了，10个配置文件我想改一些配置得看半天。


## 安装
- 下载[HBuilder IDE](http://www.dcloud.io/index.html)开发工具，其实HBuilder是dcloud 把eclipse的改造成一个专门应用于app打包、多种语言支持：php、jsp、ruby、python、nodejs等web语言，less、coffee等编译型语言均支持的开发工具

- 下载[node.js](https://nodejs.org/en/)，作为前端web的运行环境。我当前的node.js版本是6.9.2 npm版本是3.10.9


- app打包完全是基于manifest.json配置文件，它主要是用来配置app的基本信息（版本号、appid等）、图标(app的应用图标)、sdk配置、模块权限配置、页面引用关系、代码视图，具体参看dcloud提供的[文档](http://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/94)。


## npm初始化

##### package.json内容如下

```
{
	"name": "Fans",
	"version": "1.0.0",
	"description": "粉丝煲",
	"main": "js/entrance.js",
	"keywords": "粉丝煲",
	"homepage": "",
	"bugs": {
		"url": "https://github.com/yujinjin/fans/issues",
		"email": "yujinjin9@126.com"
	},
	"author": {
		"name": "jinyu",
		"email": "yujinjin9@126.com",
		"url": "https://github.com/yujinjin"
	},
	"license": "MIT",
	"repository": {
		"type": "git",
		"url": "https://github.com/yujinjin/fans.git"
	},
	"scripts": {
		"R_DEV": "set NODE_RUN=1&&webpack-dev-server --progress --watch --inline --host=0.0.0.0  --port 8083",
		"B_DEV":"set NODE_ENV=dev&set NODE_RUN=0&webpack --progress --hide-modules",
		"lint": "eslint --ext .js,.vue src test/unit/specs test/e2e/specs"
	},
	"dependencies": {
		"vue": "^2.1.8",
		"vue-resource": "^1.0.3",
		"vue-router": "^2.0.1",
		"vue-html-loader": "1.2.3",
    	"vue-loader": "10.0.0",
    	"vue-style-loader": "^1.0.0",
    	"vue-template-compiler": "^2.1.0"
	},
	"devDependencies": {
		"vuex": "^2.0.0",
		"autoprefixer": "^6.4.0",
	    "babel-core": "^6.0.0",
	    "babel-eslint": "^7.0.0",
	    "babel-loader": "^6.0.0",
	    "babel-plugin-transform-runtime": "^6.0.0",
	    "babel-preset-es2015": "^6.0.0",
	    "babel-preset-stage-2": "^6.0.0",
	    "babel-register": "^6.0.0",
	    "babel-polyfill": "^6.22.0",
		"cross-env": "^1.0.6",
		"css-loader": "^0.25.0",
		"less": "^2.7.1",
		"less-loader": "^2.2.3",
		"file-loader": "^0.9.0",
		"html-loader": "^0.4.4",
		"html-webpack-plugin": "^2.24.1",
		"jshint": "^2.9.4",
		"jshint-loader": "^0.8.3",
		"style-loader": "^0.13.1",
		"url-loader": "^0.5.7",
		"extract-text-webpack-plugin": "^2.0.0-beta.4",
		"webpack": "^2.1.0-beta.25",
		"webpack-dev-server": "^2.1.0-beta.10",
		"webpack-require-http": "^0.4.0"
	},
	
	"engines": {
		"node": ">=5.0.0",
		"npm": ">=3.3.6"
	}
}

```

##### 开发环境依赖模块说明


```
vue                            //构建用户界面的
vue-resource                   //vue 的http ajax请求插件（本项目没有用它，暂时保留）
vue-router                     //vue 路由插件
vue-html-loader                //vue html加载器
vue-loader                     //vue加载器
vue-style-loader               //vue的样式加载器
vue-template-compiler          //vue的模板编译器
vuex                           //组件状态管理
autoprefixer                   //css  浏览器兼容性问题处理
babel-core                     //ES6  代码转换器
babel-eslint                   //ES6的代码检查
babel-loader                   //ES6  代码转换器，webpack插件
babel-plugin-transform-runtime //和polyfill类似，替换助手函数
babel-preset-es2015            //ES6  代码编译成现在浏览器支持的ES5
babel-preset-stage-2           //ES6  ES7要使用的语法阶段
babel-register                 //用于改写require命令,为它加上一个钩子。此后,每当使用require加载.js、.jsx、.es和.es6后缀名的文件,就会先用Babel进行转码。
babel-polyfill                 //Babel默认只转换新的JavaScript句法（syntax），而不转换新的API，babel-polyfill就是为当前环境提供一个垫片。解决一些浏览器不能识别的语法，比如：Promise
cross-env                      //解决跨平台设置NODE_ENV的问题
css-loader                     //css  生成
less                           //css  预处理器less
less-loader                    //css  预处理器less的webpack插件
file-loader                    //webpack的文件加载器，主要用于字体  将字体文件打包
html-loader                    //webpack的html加载器，主要用于html文件的加载
html-webpack-plugin            //html  文件编译
jshint                         //Js代码检查工具
jshint-loader                  //webpack的jshint加载器，主要用于Js代码检查工具
style-loader                   //webpack的style加载器，主要用于css  插入到style标签
url-loader                     //webpack的url加载器，主要用于图片加载及限制
extract-text-webpack-plugin    //把额外的数据内容加到编译好的文件中 (独立打包样式文件)
webpack                        //用来构建打包程序
webpack-dev-server             //开发环境下，设置代理服务器
webpack-require-http           //webapck打包环境下的requrire加载http文件的插件
```



## 项目目录说明


```
|-- build                               // webapck打包后的文件目录
|-- logo                                // 存放app的图表地址目录
|-- src                                 // 源码目录
|   |-- components                      // 存放公共组件的目录
|       |-- member-qrcode.vue           // 会员二维码公共组件
|       |-- ...                         // 其他公共组件
|   |-- css                             // 存放各种css文件目录
|       |-- app.css                     // app的公用样式文件 
|       |-- icons-extra.css             // icons的扩展字体样式 
|       |-- mui.css                     // mui框架css
|       |-- ...                         // 其他css
|   |-- fonts                           // 存放各种fonts文件目录
|       |-- ...                         // 其他fonts文件
|   |-- imgs                            // 存放各种图片文件目录
|       |-- test                        // 存放开发测试的图片文件目录
|           |-- ...                     // 其他测试图片文件
|       |-- ...                         // 其他图片文件
|   |-- js                              // 存放各种js文件目录
|       |-- components                  // 存放各种js组件的目录
|           |-- app-routers.js          // 站点路由插件（只做路由的操作，不涉及实际的业务处理）
|           |-- signalR.js              // signalR组件
|           |-- ...                     // 其他JS组件
|       |-- config                      // 存放打包各种环境的目录
|           |-- DEV.js                  // DEV环境配置文件
|           |-- GQC.js                  // GQC环境配置文件
|           |-- PRD.js                  // PRD环境配置文件
|           |-- ...                     // 其他环境配置文件
|       |-- lib                         // 第三方JS lib目录
|           |-- mui.js                  // mui插件
|           |-- ...                     // 其他第三方JS插件
|       |-- services                    // app自己的业务目录
|           |-- global-service.js       // APP 全局业务逻辑方法，主要处理登录、登出的业务逻辑
|       |-- store                       // vuex管理webApp的数据状态目录
|           |-- index.js                // app数据管理入口文件
|           |-- app-data.js             // app临时数据管理
|           |-- app-event.js            // app事件管理
|           |-- router-status.js        // app路由状态管理
|       |-- utils                       // app的存放工具
|           |-- directives.js           // vue 自定义指令文件
|           |-- log.js                  // app log日志
|           |-- update.js               // app在线更新
|           |-- utils.js                // app站点页面表单验证框架工具类
|           |-- ....                    // 其他工具JS文件
|   		|-- app.js                      // app配置以及其他方法
|   		|-- entrance.js                 // app程序入口文件，加载各种公共组件
|   		|-- routers.js                  // vue的路由配置文件
|   |-- json                      			// 测试的json数据存放目录
|   |-- less                      			// 存放各种less文件的目录
|   		|-- app.less                    // app基础样式，包含其他less文件的入口
|   		|-- ...                         // 其他less样式文件
|   |-- views                      			// 存放各种页面视图组件目录
|   		|-- error                       // 存放错误视图组件目录
|   				|-- 404.vue                 // 404页面视图
|   		|-- users                      	// 存放用户的视图组件目录
|   				|-- login.vue               // 登录页面
|   				|-- user-center.vue         // 用户中心页面
|   				|-- welcome.vue         		// 欢迎页面
|   		|-- app.vue                     // app页面入口文件
|   		|-- barcode.vue                 // barcode页面入口文件
|   		|-- home.vue                    // app首页面
|   |-- index.html                      // app的html模板页面
|-- unpackage                           // app编译包目录
|-- .babelrc                            // ES6语法编译配置
|-- .editorconfig                       // 编辑器编码规范配置
|-- .gitignore                          // git忽略文件
|-- index.html                          // webapp的首页加载文件
|-- manifest.json                       // 打包app的配置文件
|-- package.json                        // 配置项目相关信息，通过执行 npm init 命令创建
|-- webpack.config.js                   // webpack配置文件
```

## 上图
##### 1. 登录页


##### 2. 首页


###### 2. 1. 扫码核销



###### 2. 2. 会员识别


###### 2. 3. 素材列表


##### 3. 我的集客


###### 3. 1. 会员列表


##### 4. 个人中心


###### 4. 1. 我的收益


###### 4. 2. 密码修改


###### 4. 3. 消息内容



## 运行程序

项目地址：（`git clone`）
```shell
git clone https://github.com/yujinjin/fans.git
```
通过`npm`安装本地服务第三方依赖模块(需要已安装[Node.js](https://nodejs.org/))

```
npm install
```
启动DEV服务(http://localhost:8083)

```
npm run R_DEV
```
打包发布DEV代码

```
npm run B_DEV
```

## 实现的功能
- 用户登录
- 首页
    - 扫码核销
    - 会员识别
    - 消息中心
    - 我的收益
    - 营销（素材列表、分享集客）
    - 集客排行榜
- 我的集客
    - 会员管理
    - 集团集客排行榜
    - 本院集客排行榜
- 个人中心
    - 员工信息
    - 我的收益
    - 密码修改
    - 消息中心（收益变化 等）
    - 用户注销


## webpack.config.js 配置说明


```
const path = require('path'),
	webpack = require('webpack'),
	NODE_ENV = process.env.NODE_ENV || "DEV", //环境类型
	NODE_RUN = process.env.NODE_RUN || "0", //是否是运行
	ROOT_PATH = path.resolve(__dirname) + "\\",
	OUT_PATH = path.resolve(ROOT_PATH, 'build') + "\\",
	SERVER_PATH = process.env.SERVER || "./build/",// 服务路径
	ExtractTextPlugin = require("extract-text-webpack-plugin"),
	HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
	entry: {
		page: "./src/js/entrance.js", //[ROOT_PATH + "\\js\\entrance.js"],
		// 打包第三方库作为公共包
	    commons: ['vue', 'vue-router']
	},
	output: {
		path: NODE_RUN === "0" ? './build' : "/",//"./build",//"./build",//path.resolve(__dirname, './build'), //path.resolve(__dirname, './build'), //
		//publicPath路径就是你发布之后的路径，比如你想发布到你站点的/util/vue/build 目录下, 那么设置publicPath: "/util/vue/build/",此字段配置如果不正确，发布后资源定位不对，比如：css里面的精灵图路径错误
		publicPath: NODE_RUN === "0" ? "./build/": "/build/",//"build/",//SERVER_PATH, //process.env.CUSTOM ? "/git/WebApp/n-build/" : "/n-build/",
		filename: NODE_RUN === "0" ? "build.[hash].js" : "build.js",
		/*
	    	import()加载的文件会被分开打包, 我们称这个包为chunk, chunkFilename用来配置这个chunk输出的文件名.
	    	[id]: 编译时每个chunk会有一个id.
	    	[chunkhash]: 这个chunk的hash值, 文件发生变化时该值也会变. 文件名加上该值可以防止浏览器读取旧的缓存文件.
	    */
	    //chunkFilename: '[id].js?[chunkhash]',
	},
	externals:[require('webpack-require-http')],
	module: {
		rules: [{
          	test: /\.html$/,
          	use: [{
          		loader: 'html-loader',
          		options: {
            		//root: resolve(__dirname, 'src'),
            		attrs: ['img:src', 'link:href']
          		}
           }]
		}, {
            test: /\.js(x)*$/,
            exclude: /^node_modules$/,
            //loader: 'babel-loader'
            use: ['babel-loader']
       	}, {
			test: /\.vue$/,
			use: ['vue-loader']
			//loader: 'vue-loader'
//			options: {
//				loaders: {
//		            css: ExtractTextPlugin.extract({
//		              	loader: 'css-loader',
//		              	fallbackLoader: 'vue-style-loader' // <- this is a dep of vue-loader, so no need to explicitly install if using npm3
//		            })
//		        }
//			}
		}, 
//		{
//			test: /\.html$/,
//			loader: 'html-loader',
//			options: {
//            	/*
//	              	html-loader接受attrs参数, 表示什么标签的什么属性需要调用webpack的loader进行打包.
//	              	比如<img>标签的src属性, webpack会把<img>引用的图片打包, 然后src的属性值替换为打包后的路径.
//	              	使用什么loader代码, 同样是在module.rules定义中使用匹配的规则.
//	              	如果html-loader不指定attrs参数, 默认值是img:src, 意味着会默认打包<img>标签的图片.
//	              	这里我们加上<link>标签的href属性, 用来打包入口index.html引入的favicon.png文件.
//            	*/
//            	attrs: ['img:src', 'link:href']
//          }
//		},
		{
			test: /\.css$/,
			exclude: /^node_modules$/,
//			use:[{
//          	loader: 'style-loader'
//          },{
//          	loader: 'css-loader'
//          }]
			//use: ['style-loader', 'css-loader']
//			loader: ['style-loader', 'css-loader']
//			loader: `vue-style-loader!css-loader!autoprefixer-loader?{ browsers: ['last 100 versions'] }!`
			loader: ExtractTextPlugin.extract({
                fallbackLoader: "style-loader",
                loader: "css-loader",
                publicPath: "./"
            })
		}, {
            test: /\.less/,
            exclude: /^node_modules$/,
//          use:[{
//          	loader: 'style-loader'
//          },{
//          	loader: 'css-loader'
//          },{
//          	loader: 'less-loader'
//          }]
//                loader: ['style-loader', 'css-loader', 'less-loader']
//                loader: `vue-style-loader!css-loader!less-loader!autoprefixer-loader?{ browsers: ['last 100 versions'] }!less-loader`
            loader: ExtractTextPlugin.extract({
	          	fallbackLoader: 'style-loader',
	          	loader: "css-loader!less-loader",
                publicPath: "./"
	        })
        },{
	        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
	        use: [{
	        	loader: "url-loader",
	        	query: {
		          	limit: 10000,
		          	name: 'imgs/[name].[hash:7].[ext]'
	        	}
	        }]
	        //loader: 'url-loader',
//	        use: ['url-loader'],
//	        query: {
//	          	limit: 5000,
//	          	name: 'imgs/[name].[hash:7].[ext]'
//	        }
      	} ,{
	        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
	        use: [{
	        	loader: "url-loader",
	        	query: {
		          	limit: 5000,
		          	name: 'fonts/[name].[hash:7].[ext]'
	        	}
	        }]
	        //loader: 'url-loader',
//	        query: {
//	          	limit: 5000,
//	          	name: 'fonts/[name].[hash:7].[ext]'
//      	}
      	}
//      ,{
//			//!cssnext-loader 会导致压缩的时候动画命名被覆盖
//			test: /\.(png|jpg)$/,
//			exclude: /^node_modules$/,
//			//注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图片
//			loader: 'url-loader?limit=8000&name=[name].[ext]'
//		}, {
//          test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
//          exclude: /^node_modules$/,
//          loader: 'file-loader?name=[name].[ext]'
//      }
		]
	},
	plugins:[
//		new ExtractTextPlugin({
//			fileName: NODE_RUN === "0" ? "style.[hash].css" : "style.css",
//			disable: false,
//			allChunks: true
//		}), //加上这个参数老是编译不通过不知道为什么
		new ExtractTextPlugin(NODE_RUN === "0" ? "style.[hash].css" : "style.css"),
		new HtmlWebpackPlugin({
			filename: "../index.html", //生成的html存放路径，相对于 path
			template: './src/index.html', //html模板路径
			favicon: "./src/imgs/goldfish.ico",
			inject: true, //允许插件修改哪些内容，包括head与body
			minify: { //压缩HTML文件
				removeComments: true, //移除HTML中的注释
				collapseWhitespace: false, //删除空白符与换行符
				//removeAttributeQuotes: true
			}
		}),
		/*
		      使用CommonsChunkPlugin插件来处理重复代码
		      因为vendor.js和index.js都引用了spa-history, 如果不处理的话, 两个文件里都会有spa-history包的代码,
      		我们用CommonsChunkPlugin插件来使共同引用的文件只打包进vendor.js
      	*/
		new webpack.optimize.CommonsChunkPlugin({
			name: "commons",
			filename: NODE_RUN === "0" ? "common.[hash].js" : "common.js",
			minChunks: function (module, count) {
		        // any required modules inside node_modules are extracted to vendor
		        return (module.resource && /\.js$/.test(module.resource) && module.resource.indexOf(path.join(__dirname, '../node_modules')) === 0);
		    }
		}),
//		new webpack.optimize.CommonsChunkPlugin({
//    		name: 'manifest',
//    		chunks: ['commons']
//  	}),
		//自动分析重用的模块并且打包成单独的文件
		new webpack.ProvidePlugin({
			//根据环境加载JS
			config: ROOT_PATH + "\\src\\js\\config\\" + NODE_ENV
		})
	],
	resolve: {
        extensions: ['.js', '.vue', '.jsx', '.less', '.scss', '.css'], //后缀名自动补全
    	//fallback: [path.join(__dirname, '../node_modules')], webpack2 不能有这个
//  	alias: {
//          hubs : 'http://www.dev.zmscrm.cn/signalr/hubs',//后续直接 require('AppStore') 即可
//      }
	},
	devServer: {
		historyApiFallback: true,//配置为true, 当访问的文件不存在时, 返回根目录下的index.html文件
		noInfo: true
	},
	performance: {
    	hints: false
  	},
//	vue: {
//		loaders: {
//			css:"vue-style-loader!css-loader?sourceMap",
//			less:"vue-style-loader!css-loader?sourceMap!less-loader?sourceMap"
//		},
//      postcss: [
//          require('autoprefixer')({
//              browsers: ['last 100 versions']
//          })
//      ]
//	},
	devtool: '#eval-source-map'
}
var fileSystem = require('fs');
//打包状态
if(NODE_RUN === "0") {
	module.exports.devtool = false;
	module.exports.plugins = (module.exports.plugins || []).concat([
//		new webpack.LoaderOptionsPlugin({
//		      	minimize: true
//		}), //加上这个编辑“url('data:image/svg+xml;charset=utf-8,<svg....”会报错
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
		        warnings: false
		    },
		    output: {
		        comments: false
		    },
			sourceMap: false
		})
	]);
	//非开发环境下要清空 output 文件夹下的文件
	var dirArray = [];
	//递归删文件
	var clearOutPutDir = function(path) {
		if(fileSystem.existsSync(path)) {
			var dirList = fileSystem.readdirSync(path);
			dirList.forEach(function(fileName) {
				if(fileSystem.statSync(path + fileName).isDirectory()) {
					console.info("目录:" + path + fileName);
					// 目录
					dirArray.push(path + fileName);
					clearOutPutDir(path + fileName + "\\");
				} else {
					console.info("文件:" + path + fileName);
					fileSystem.unlinkSync(path + fileName);
				}
			});
		};
	}
	clearOutPutDir(OUT_PATH);
	for(var i = dirArray.length - 1, j = 0; i >= j; i--) {
		console.info(dirArray[i])
		fileSystem.rmdirSync(dirArray[i]);
	}
} else {
	console.info("run........................................");
	//本地运行状态把index.html中的href、src连接修改掉
	fileSystem.readFile("index.html", 'utf-8', function(err, data) {
	if(err) {
		console.log("error");
	} else {
		//将index.html里面的hash值清除掉
		var devhtml = data.replace(/((?:href|src)="[^"]+\.)(\w{20}\.)(js|css)/g, '$1$3');
		fileSystem.writeFileSync('index.html', devhtml);
	}
});
}

```

## webApp技术框架说明
##### 1. 入口（entrance.js）



##### 2. app配置以及其他方法（app.js）



##### 3. 单页路由配置（routers.js）



##### 4. 视图组件




##### 5. JS组件



##### 6. 环境打包配置





##### 7. app自己的业务




##### 8. vuex管理webApp的数据状态



##### 9. webapp的工具包





##### 10. webapp的页面视图















## app打包及原生JS接口调用

- app打包技术是用HBuilder IDE工具通过manifest.json配置一键打包成android和iOS,具体教程参看dcloud提供的[文档](http://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/94)。

- 原生设备的接口教程参看dcloud提供的[文档](http://www.html5plus.org/doc/h5p.html)。

- app的更新，dcloud提供三种解决方案。目前采用第二种解决方案，第一种方案作为备用。
    - 1. 整包(apk/ipa)升级 
    - 2. App资源在线升级更新（生成移动App资源升级包直接下载更新）
    - 3. App资源在线差量升级更新（差量升级包是针对某个历史版本到新版本的差量，所以对于升级服务器来讲需要保留所有历史版本，并且分别生成每个历史版本到新版本的差量升级包。）
其更新的JS的代码如下

```
// src/js/utils/update.js

/**
 * 作者：yujinjin9@126.com
 * 时间：2017-01-19
 * 描述：app在线更新
 */
module.exports = {
	//资源在线升级更新
	updateWgt(){
		plus.downloader.createDownload("http://demo.dcloud.net.cn/test/update/H5EF3C469.wgt", {filename:"_doc/update/"}, function(d,status){
			plus.nativeUI.showWaiting("下载wgt文件...");
	        if ( status == 200 ) { 
## 前言
这是一个html5+打包app(android/iOS)项目

前端h5是基于[mui](http://dev.dcloud.net.cn/mui/) + [vue2](http://cn.vuejs.org/v2/api/) + [vue-router2](http://router.vuejs.org/zh-cn/) + [es6](http://es6.ruanyifeng.com/) + [webpack2](http://webpack.github.io/) + [vuex](http://vuex.vuejs.org/zh-cn/) + [signalR](http://signalr.net/)的前端webApp单页项目框架。

app打包技术是用[HBuilder IDE](http://www.dcloud.io/index.html)工具一键打包成APP，本项目使用了原生设备的的Storage和管理条码扫描。对于app的升级是html5资源在线升级更新,而不是整个APP更新。这些都是[dcloud](http://www.dcloud.io/index.html)提供一整套套技术解决方案。

本项目只是一个技术框架，对于项目中具体的业务的东西只会大概的说明一下。


**==说明：==** 可能有些朋友不知道[signalR](http://signalr.net/)是什么东西，其实[signalR](http://signalr.net/)就是让客户端（Web页面）和服务器端可以互相通知消息及调用方法的前端JS，当WebSockets可用时（即浏览器支持Html5）[signalR](http://signalr.net/)使用WebSockets，当不支持时[signalR](http://signalr.net/)将使用其它技术来保证达到相同效果。


> 1. 前端UI的部分使用mui框架
> 
> 2. app打包技术使用HBuilder IDE工具
> 
> 3. 原生App对设备的调用
> 
> 4. 使用vue-router2实现单页路由
> 
> 5. 使用.vue文件进行页面功能组件化的开发
> 
> 6. 使用vuex管理webApp的数据状态
> 
> 7. 使用signalR实现客户端与服务端长时间通信
> 
> 8. 使用webpack2实现对模块打包、压缩、混淆，预处理，热加载。


==**吐槽：**== 我想吐槽一下webpack2的webpack.config.js中各个插件配置，当时配置了好几天，这个loader配置好了，另外一个又出问题了，而且网上关于webapck2 API太少了，都是靠摸索着前进，真的是好难配。那有人肯定问了为啥不用VUE官方提供的vue-cli创建项目，我想说兄弟呀那个vue-cli是针对webpack1的，我想用webpack2（不要问我为什么，我就是固执的想用），而且官方配置的JS太TM的不直接了，10个配置文件我想改一些配置得看半天。


## 安装
- 下载[HBuilder IDE](http://www.dcloud.io/index.html)开发工具，其实HBuilder是dcloud 把eclipse的改造成一个专门应用于app打包、多种语言支持：php、jsp、ruby、python、nodejs等web语言，less、coffee等编译型语言均支持的开发工具

- 下载[node.js](https://nodejs.org/en/)，作为前端web的运行环境。我当前的node.js版本是6.9.2 npm版本是3.10.9


- app打包完全是基于manifest.json配置文件，它主要是用来配置app的基本信息（版本号、appid等）、图标(app的应用图标)、sdk配置、模块权限配置、页面引用关系、代码视图，具体参看dcloud提供的[文档](http://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/94)。


## npm初始化

##### package.json内容如下

```
{
	"name": "Fans",
	"version": "1.0.0",
	"description": "粉丝煲",
	"main": "js/entrance.js",
	"keywords": "粉丝煲",
	"homepage": "",
	"bugs": {
		"url": "https://github.com/yujinjin/fans/issues",
		"email": "yujinjin9@126.com"
	},
	"author": {
		"name": "jinyu",
		"email": "yujinjin9@126.com",
		"url": "https://github.com/yujinjin"
	},
	"license": "MIT",
	"repository": {
		"type": "git",
		"url": "https://github.com/yujinjin/fans.git"
	},
	"scripts": {
		"R_DEV": "set NODE_RUN=1&&webpack-dev-server --progress --watch --inline --host=0.0.0.0  --port 8083",
		"B_DEV":"set NODE_ENV=dev&set NODE_RUN=0&webpack --progress --hide-modules",
		"lint": "eslint --ext .js,.vue src test/unit/specs test/e2e/specs"
	},
	"dependencies": {
		"vue": "^2.1.8",
		"vue-resource": "^1.0.3",
		"vue-router": "^2.0.1",
		"vue-html-loader": "1.2.3",
    	"vue-loader": "10.0.0",
    	"vue-style-loader": "^1.0.0",
    	"vue-template-compiler": "^2.1.0"
	},
	"devDependencies": {
		"vuex": "^2.0.0",
		"autoprefixer": "^6.4.0",
	    "babel-core": "^6.0.0",
	    "babel-eslint": "^7.0.0",
	    "babel-loader": "^6.0.0",
	    "babel-plugin-transform-runtime": "^6.0.0",
	    "babel-preset-es2015": "^6.0.0",
	    "babel-preset-stage-2": "^6.0.0",
	    "babel-register": "^6.0.0",
	    "babel-polyfill": "^6.22.0",
		"cross-env": "^1.0.6",
		"css-loader": "^0.25.0",
		"less": "^2.7.1",
		"less-loader": "^2.2.3",
		"file-loader": "^0.9.0",
		"html-loader": "^0.4.4",
		"html-webpack-plugin": "^2.24.1",
		"jshint": "^2.9.4",
		"jshint-loader": "^0.8.3",
		"style-loader": "^0.13.1",
		"url-loader": "^0.5.7",
		"extract-text-webpack-plugin": "^2.0.0-beta.4",
		"webpack": "^2.1.0-beta.25",
		"webpack-dev-server": "^2.1.0-beta.10",
		"webpack-require-http": "^0.4.0"
	},
	
	"engines": {
		"node": ">=5.0.0",
		"npm": ">=3.3.6"
	}
}

```

##### 开发环境依赖模块说明


```
vue                            //构建用户界面的
vue-resource                   //vue 的http ajax请求插件（本项目没有用它，暂时保留）
vue-router                     //vue 路由插件
vue-html-loader                //vue html加载器
vue-loader                     //vue加载器
vue-style-loader               //vue的样式加载器
vue-template-compiler          //vue的模板编译器
vuex                           //组件状态管理
autoprefixer                   //css  浏览器兼容性问题处理
babel-core                     //ES6  代码转换器
babel-eslint                   //ES6的代码检查
babel-loader                   //ES6  代码转换器，webpack插件
babel-plugin-transform-runtime //和polyfill类似，替换助手函数
babel-preset-es2015            //ES6  代码编译成现在浏览器支持的ES5
babel-preset-stage-2           //ES6  ES7要使用的语法阶段
babel-register                 //用于改写require命令,为它加上一个钩子。此后,每当使用require加载.js、.jsx、.es和.es6后缀名的文件,就会先用Babel进行转码。
babel-polyfill                 //Babel默认只转换新的JavaScript句法（syntax），而不转换新的API，babel-polyfill就是为当前环境提供一个垫片。解决一些浏览器不能识别的语法，比如：Promise
cross-env                      //解决跨平台设置NODE_ENV的问题
css-loader                     //css  生成
less                           //css  预处理器less
less-loader                    //css  预处理器less的webpack插件
file-loader                    //webpack的文件加载器，主要用于字体  将字体文件打包
html-loader                    //webpack的html加载器，主要用于html文件的加载
html-webpack-plugin            //html  文件编译
jshint                         //Js代码检查工具
jshint-loader                  //webpack的jshint加载器，主要用于Js代码检查工具
style-loader                   //webpack的style加载器，主要用于css  插入到style标签
url-loader                     //webpack的url加载器，主要用于图片加载及限制
extract-text-webpack-plugin    //把额外的数据内容加到编译好的文件中 (独立打包样式文件)
webpack                        //用来构建打包程序
webpack-dev-server             //开发环境下，设置代理服务器
webpack-require-http           //webapck打包环境下的requrire加载http文件的插件
```



## 项目目录说明


```
|-- build                               // webapck打包后的文件目录
|-- logo                                // 存放app的图表地址目录
|-- src                                 // 源码目录
|   |-- components                      // 存放公共组件的目录
|       |-- member-qrcode.vue           // 会员二维码公共组件
|       |-- ...                         // 其他公共组件
|   |-- css                             // 存放各种css文件目录
|       |-- app.css                     // app的公用样式文件 
|       |-- icons-extra.css             // icons的扩展字体样式 
|       |-- mui.css                     // mui框架css
|       |-- ...                         // 其他css
|   |-- fonts                           // 存放各种fonts文件目录
|       |-- ...                         // 其他fonts文件
|   |-- imgs                            // 存放各种图片文件目录
|       |-- test                        // 存放开发测试的图片文件目录
|           |-- ...                     // 其他测试图片文件
|       |-- ...                         // 其他图片文件
|   |-- js                              // 存放各种js文件目录
|       |-- components                  // 存放各种js组件的目录
|           |-- app-routers.js          // 站点路由插件（只做路由的操作，不涉及实际的业务处理）
|           |-- signalR.js              // signalR组件
|           |-- ...                     // 其他JS组件
|       |-- config                      // 存放打包各种环境的目录
|           |-- DEV.js                  // DEV环境配置文件
|           |-- GQC.js                  // GQC环境配置文件
|           |-- PRD.js                  // PRD环境配置文件
|           |-- ...                     // 其他环境配置文件
|       |-- lib                         // 第三方JS lib目录
|           |-- mui.js                  // mui插件
|           |-- ...                     // 其他第三方JS插件
|       |-- services                    // app自己的业务目录
|           |-- global-service.js       // APP 全局业务逻辑方法，主要处理登录、登出的业务逻辑
|       |-- store                       // vuex管理webApp的数据状态目录
|           |-- index.js                // app数据管理入口文件
|           |-- app-data.js             // app临时数据管理
|           |-- app-event.js            // app事件管理
|           |-- router-status.js        // app路由状态管理
|       |-- utils                       // app的存放工具
|           |-- directives.js           // vue 自定义指令文件
|           |-- log.js                  // app log日志
|           |-- update.js               // app在线更新
|           |-- utils.js                // app站点页面表单验证框架工具类
|           |-- ....                    // 其他工具JS文件
|   		|-- app.js                      // app配置以及其他方法
|   		|-- entrance.js                 // app程序入口文件，加载各种公共组件
|   		|-- routers.js                  // vue的路由配置文件
|   |-- json                      			// 测试的json数据存放目录
|   |-- less                      			// 存放各种less文件的目录
|   		|-- app.less                    // app基础样式，包含其他less文件的入口
|   		|-- ...                         // 其他less样式文件
|   |-- views                      			// 存放各种页面视图组件目录
|   		|-- error                       // 存放错误视图组件目录
|   				|-- 404.vue                 // 404页面视图
|   		|-- users                      	// 存放用户的视图组件目录
|   				|-- login.vue               // 登录页面
|   				|-- user-center.vue         // 用户中心页面
|   				|-- welcome.vue         		// 欢迎页面
|   		|-- app.vue                     // app页面入口文件
|   		|-- barcode.vue                 // barcode页面入口文件
|   		|-- home.vue                    // app首页面
|   |-- index.html                      // app的html模板页面
|-- unpackage                           // app编译包目录
|-- .babelrc                            // ES6语法编译配置
|-- .editorconfig                       // 编辑器编码规范配置
|-- .gitignore                          // git忽略文件
|-- index.html                          // webapp的首页加载文件
|-- manifest.json                       // 打包app的配置文件
|-- package.json                        // 配置项目相关信息，通过执行 npm init 命令创建
|-- webpack.config.js                   // webpack配置文件
```

## 上图
##### 1. 登录页


##### 2. 首页


###### 2. 1. 扫码核销



###### 2. 2. 会员识别


###### 2. 3. 素材列表


##### 3. 我的集客


###### 3. 1. 会员列表


##### 4. 个人中心


###### 4. 1. 我的收益


###### 4. 2. 密码修改


###### 4. 3. 消息内容



## 运行程序

项目地址：（`git clone`）
```shell
git clone https://github.com/yujinjin/fans.git
```
通过`npm`安装本地服务第三方依赖模块(需要已安装[Node.js](https://nodejs.org/))

```
npm install
```
启动DEV服务(http://localhost:8083)

```
npm run R_DEV
```
打包发布DEV代码

```
npm run B_DEV
```

## 实现的功能
- 用户登录
- 首页
    - 扫码核销
    - 会员识别
    - 消息中心
    - 我的收益
    - 营销（素材列表、分享集客）
    - 集客排行榜
- 我的集客
    - 会员管理
    - 集团集客排行榜
    - 本院集客排行榜
- 个人中心
    - 员工信息
    - 我的收益
    - 密码修改
    - 消息中心（收益变化 等）
    - 用户注销


## webpack.config.js 配置说明


```
const path = require('path'),
	webpack = require('webpack'),
	NODE_ENV = process.env.NODE_ENV || "DEV", //环境类型
	NODE_RUN = process.env.NODE_RUN || "0", //是否是运行
	ROOT_PATH = path.resolve(__dirname) + "\\",
	OUT_PATH = path.resolve(ROOT_PATH, 'build') + "\\",
	SERVER_PATH = process.env.SERVER || "./build/",// 服务路径
	ExtractTextPlugin = require("extract-text-webpack-plugin"),
	HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
	entry: {
		page: "./src/js/entrance.js", //[ROOT_PATH + "\\js\\entrance.js"],
		// 打包第三方库作为公共包
	    commons: ['vue', 'vue-router']
	},
	output: {
		path: NODE_RUN === "0" ? './build' : "/",//"./build",//"./build",//path.resolve(__dirname, './build'), //path.resolve(__dirname, './build'), //
		//publicPath路径就是你发布之后的路径，比如你想发布到你站点的/util/vue/build 目录下, 那么设置publicPath: "/util/vue/build/",此字段配置如果不正确，发布后资源定位不对，比如：css里面的精灵图路径错误
		publicPath: NODE_RUN === "0" ? "./build/": "/build/",//"build/",//SERVER_PATH, //process.env.CUSTOM ? "/git/WebApp/n-build/" : "/n-build/",
		filename: NODE_RUN === "0" ? "build.[hash].js" : "build.js",
		/*
	    	import()加载的文件会被分开打包, 我们称这个包为chunk, chunkFilename用来配置这个chunk输出的文件名.
	    	[id]: 编译时每个chunk会有一个id.
	    	[chunkhash]: 这个chunk的hash值, 文件发生变化时该值也会变. 文件名加上该值可以防止浏览器读取旧的缓存文件.
	    */
	    //chunkFilename: '[id].js?[chunkhash]',
	},
	externals:[require('webpack-require-http')],
	module: {
		rules: [{
          	test: /\.html$/,
          	use: [{
          		loader: 'html-loader',
          		options: {
            		//root: resolve(__dirname, 'src'),
            		attrs: ['img:src', 'link:href']
          		}
           }]
		}, {
            test: /\.js(x)*$/,
            exclude: /^node_modules$/,
            //loader: 'babel-loader'
            use: ['babel-loader']
       	}, {
			test: /\.vue$/,
			use: ['vue-loader']
			//loader: 'vue-loader'
//			options: {
//				loaders: {
//		            css: ExtractTextPlugin.extract({
//		              	loader: 'css-loader',
//		              	fallbackLoader: 'vue-style-loader' // <- this is a dep of vue-loader, so no need to explicitly install if using npm3
//		            })
//		        }
//			}
		}, 
//		{
//			test: /\.html$/,
//			loader: 'html-loader',
//			options: {
//            	/*
//	              	html-loader接受attrs参数, 表示什么标签的什么属性需要调用webpack的loader进行打包.
//	              	比如<img>标签的src属性, webpack会把<img>引用的图片打包, 然后src的属性值替换为打包后的路径.
//	              	使用什么loader代码, 同样是在module.rules定义中使用匹配的规则.
//	              	如果html-loader不指定attrs参数, 默认值是img:src, 意味着会默认打包<img>标签的图片.
//	              	这里我们加上<link>标签的href属性, 用来打包入口index.html引入的favicon.png文件.
//            	*/
//            	attrs: ['img:src', 'link:href']
//          }
//		},
		{
			test: /\.css$/,
			exclude: /^node_modules$/,
//			use:[{
//          	loader: 'style-loader'
//          },{
//          	loader: 'css-loader'
//          }]
			//use: ['style-loader', 'css-loader']
//			loader: ['style-loader', 'css-loader']
//			loader: `vue-style-loader!css-loader!autoprefixer-loader?{ browsers: ['last 100 versions'] }!`
			loader: ExtractTextPlugin.extract({
                fallbackLoader: "style-loader",
                loader: "css-loader",
                publicPath: "./"
            })
		}, {
            test: /\.less/,
            exclude: /^node_modules$/,
//          use:[{
//          	loader: 'style-loader'
//          },{
//          	loader: 'css-loader'
//          },{
//          	loader: 'less-loader'
//          }]
//                loader: ['style-loader', 'css-loader', 'less-loader']
//                loader: `vue-style-loader!css-loader!less-loader!autoprefixer-loader?{ browsers: ['last 100 versions'] }!less-loader`
            loader: ExtractTextPlugin.extract({
	          	fallbackLoader: 'style-loader',
	          	loader: "css-loader!less-loader",
                publicPath: "./"
	        })
        },{
	        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
	        use: [{
	        	loader: "url-loader",
	        	query: {
		          	limit: 10000,
		          	name: 'imgs/[name].[hash:7].[ext]'
	        	}
	        }]
	        //loader: 'url-loader',
//	        use: ['url-loader'],
//	        query: {
//	          	limit: 5000,
//	          	name: 'imgs/[name].[hash:7].[ext]'
//	        }
      	} ,{
	        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
	        use: [{
	        	loader: "url-loader",
	        	query: {
		          	limit: 5000,
		          	name: 'fonts/[name].[hash:7].[ext]'
	        	}
	        }]
	        //loader: 'url-loader',
//	        query: {
//	          	limit: 5000,
//	          	name: 'fonts/[name].[hash:7].[ext]'
//      	}
      	}
//      ,{
//			//!cssnext-loader 会导致压缩的时候动画命名被覆盖
//			test: /\.(png|jpg)$/,
//			exclude: /^node_modules$/,
//			//注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图片
//			loader: 'url-loader?limit=8000&name=[name].[ext]'
//		}, {
//          test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
//          exclude: /^node_modules$/,
//          loader: 'file-loader?name=[name].[ext]'
//      }
		]
	},
	plugins:[
//		new ExtractTextPlugin({
//			fileName: NODE_RUN === "0" ? "style.[hash].css" : "style.css",
//			disable: false,
//			allChunks: true
//		}), //加上这个参数老是编译不通过不知道为什么
		new ExtractTextPlugin(NODE_RUN === "0" ? "style.[hash].css" : "style.css"),
		new HtmlWebpackPlugin({
			filename: "../index.html", //生成的html存放路径，相对于 path
			template: './src/index.html', //html模板路径
			favicon: "./src/imgs/goldfish.ico",
			inject: true, //允许插件修改哪些内容，包括head与body
			minify: { //压缩HTML文件
				removeComments: true, //移除HTML中的注释
				collapseWhitespace: false, //删除空白符与换行符
				//removeAttributeQuotes: true
			}
		}),
		/*
		      使用CommonsChunkPlugin插件来处理重复代码
		      因为vendor.js和index.js都引用了spa-history, 如果不处理的话, 两个文件里都会有spa-history包的代码,
      		我们用CommonsChunkPlugin插件来使共同引用的文件只打包进vendor.js
      	*/
		new webpack.optimize.CommonsChunkPlugin({
			name: "commons",
			filename: NODE_RUN === "0" ? "common.[hash].js" : "common.js",
			minChunks: function (module, count) {
		        // any required modules inside node_modules are extracted to vendor
		        return (module.resource && /\.js$/.test(module.resource) && module.resource.indexOf(path.join(__dirname, '../node_modules')) === 0);
		    }
		}),
//		new webpack.optimize.CommonsChunkPlugin({
//    		name: 'manifest',
//    		chunks: ['commons']
//  	}),
		//自动分析重用的模块并且打包成单独的文件
		new webpack.ProvidePlugin({
			//根据环境加载JS
			config: ROOT_PATH + "\\src\\js\\config\\" + NODE_ENV
		})
	],
	resolve: {
        extensions: ['.js', '.vue', '.jsx', '.less', '.scss', '.css'], //后缀名自动补全
    	//fallback: [path.join(__dirname, '../node_modules')], webpack2 不能有这个
//  	alias: {
//          hubs : 'http://www.dev.zmscrm.cn/signalr/hubs',//后续直接 require('AppStore') 即可
//      }
	},
	devServer: {
		historyApiFallback: true,//配置为true, 当访问的文件不存在时, 返回根目录下的index.html文件
		noInfo: true
	},
	performance: {
    	hints: false
  	},
//	vue: {
//		loaders: {
//			css:"vue-style-loader!css-loader?sourceMap",
//			less:"vue-style-loader!css-loader?sourceMap!less-loader?sourceMap"
//		},
//      postcss: [
//          require('autoprefixer')({
//              browsers: ['last 100 versions']
//          })
//      ]
//	},
	devtool: '#eval-source-map'
}
var fileSystem = require('fs');
//打包状态
if(NODE_RUN === "0") {
	module.exports.devtool = false;
	module.exports.plugins = (module.exports.plugins || []).concat([
//		new webpack.LoaderOptionsPlugin({
//		      	minimize: true
//		}), //加上这个编辑“url('data:image/svg+xml;charset=utf-8,<svg....”会报错
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
		        warnings: false
		    },
		    output: {
		        comments: false
		    },
			sourceMap: false
		})
	]);
	//非开发环境下要清空 output 文件夹下的文件
	var dirArray = [];
	//递归删文件
	var clearOutPutDir = function(path) {
		if(fileSystem.existsSync(path)) {
			var dirList = fileSystem.readdirSync(path);
			dirList.forEach(function(fileName) {
				if(fileSystem.statSync(path + fileName).isDirectory()) {
					console.info("目录:" + path + fileName);
					// 目录
					dirArray.push(path + fileName);
					clearOutPutDir(path + fileName + "\\");
				} else {
					console.info("文件:" + path + fileName);
					fileSystem.unlinkSync(path + fileName);
				}
			});
		};
	}
	clearOutPutDir(OUT_PATH);
	for(var i = dirArray.length - 1, j = 0; i >= j; i--) {
		console.info(dirArray[i])
		fileSystem.rmdirSync(dirArray[i]);
	}
} else {
	console.info("run........................................");
	//本地运行状态把index.html中的href、src连接修改掉
	fileSystem.readFile("index.html", 'utf-8', function(err, data) {
	if(err) {
		console.log("error");
	} else {
		//将index.html里面的hash值清除掉
		var devhtml = data.replace(/((?:href|src)="[^"]+\.)(\w{20}\.)(js|css)/g, '$1$3');
		fileSystem.writeFileSync('index.html', devhtml);
	}
});
}

```

## webApp技术框架说明
##### 1. 入口（entrance.js）



##### 2. app配置以及其他方法（app.js）



##### 3. 单页路由配置（routers.js）



##### 4. 视图组件




##### 5. JS组件



##### 6. 环境打包配置





##### 7. app自己的业务




##### 8. vuex管理webApp的数据状态



##### 9. webapp的工具包





##### 10. webapp的页面视图















## app打包及原生JS接口调用

- app打包技术是用HBuilder IDE工具通过manifest.json配置一键打包成android和iOS,具体教程参看dcloud提供的[文档](http://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/94)。

- 原生设备的接口教程参看dcloud提供的[文档](http://www.html5plus.org/doc/h5p.html)。

- app的更新，dcloud提供三种解决方案。目前采用第二种解决方案，第一种方案作为备用。
    - 1. 整包(apk/ipa)升级 
    - 2. App资源在线升级更新（生成移动App资源升级包直接下载更新）
    - 3. App资源在线差量升级更新（差量升级包是针对某个历史版本到新版本的差量，所以对于升级服务器来讲需要保留所有历史版本，并且分别生成每个历史版本到新版本的差量升级包。）
其更新的JS的代码如下

```
// src/js/utils/update.js

/**
 * 作者：yujinjin9@126.com
 * 时间：2017-01-19
 * 描述：app在线更新
 */
module.exports = {
	//资源在线升级更新
	updateWgt(){
		plus.downloader.createDownload("http://demo.dcloud.net.cn/test/update/H5EF3C469.wgt", {filename:"_doc/update/"}, function(d,status){
			plus.nativeUI.showWaiting("下载wgt文件...");
	        if ( status == 200 ) { 
	            app.log.debug("下载wgt成功："+ d.filename);
	            plus.nativeUI.showWaiting("安装wgt文件...");
			    plus.runtime.install(d.filename, {} ,function(){
			        plus.nativeUI.closeWaiting();
			        app.log.debug("安装wgt文件成功！");
			        plus.nativeUI.alert("应用资源更新完成！",function(){
			            plus.runtime.restart();
			        });
			    },function(e){
			        plus.nativeUI.closeWaiting();
			        app.log.debug("安装wgt文件失败["+e.code+"]："+e.message);
			        plus.nativeUI.alert("安装wgt文件失败["+e.code+"]："+e.message);
			    });
	        } else {
	            app.log.debug("下载wgt失败！");
	            plus.nativeUI.alert("下载wgt失败！");
	        }
	        plus.nativeUI.closeWaiting();
	    }).start();
	},
	//整包更新
	updateApk(){
		if(app.Config.device.isAndroid){
			plus.downloader.createDownload("", {filename:"_doc/update/"}, function(d,status){
				plus.nativeUI.showWaiting("下载app文件...");
		        if ( status == 200 ) { 
		            app.log.debug("下载app成功："+ d.filename);
		            plus.nativeUI.showWaiting("安装app文件...");
				    plus.runtime.install(d.filename, {} ,function(){
				        plus.nativeUI.closeWaiting();
				        app.log.debug("安装app文件成功！");
				        plus.nativeUI.alert("应用资源更新完成！",function(){
				            plus.runtime.restart();
				        });
				    },function(e){
				        plus.nativeUI.closeWaiting();
				        app.log.debug("安装app文件失败["+e.code+"]："+e.message);
				        plus.nativeUI.alert("安装app文件失败["+e.code+"]："+e.message);
				    });
		        } else {
		            app.log.debug("下载wgt失败！");
		            plus.nativeUI.alert("下载wgt失败！");
		        }
		        plus.nativeUI.closeWaiting();
		    }).start();
		} else if(app.Config.device.isIOS){
			//iOS平台的ipa无法安装，此时需要跳转到appstore，提示用户自动点击升级更新，跳转到appstore的方法为打开应用的appstore地址
			var url='itms-apps://itunes.apple.com/cn/app/hello-h5+/id682211190?l=zh&mt=8';// HelloH5应用在appstore的地址
			plus.runtime.openURL(url);
		}
	}

}
```


## 最后
- 如果喜欢一定要 star哈!!!（谢谢!!）

- 如果有意见和问题 请在 lssues提出，我会在线解答。
