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