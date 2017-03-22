const path = require('path'),
	webpack = require('webpack'),
	NODE_ENV = process.env.NODE_ENV || "DEV", //环境类型
	NODE_RUN = process.env.NODE_RUN || "0", //是否是运行
	ROOT_PATH = path.resolve(__dirname) + "/",
	OUT_PATH = path.resolve(ROOT_PATH, 'build') + "/",
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
		path: NODE_RUN === "0" ? path.resolve(__dirname, './build') : "/",//"./build",//"./build",//path.resolve(__dirname, './build'), //path.resolve(__dirname, './build'), //
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
			config: ROOT_PATH + "/src/js/config/" + NODE_ENV
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
					clearOutPutDir(path + fileName + "/");
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
