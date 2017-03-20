/**
 * 作者：yujinjin9@126.com
 * 时间：2016-08-16
 * 描述：signalR组件
 */
module.exports = {
	register(methods) {
		//$.connection.abpCommonHub
        if (!methods || typeof (methods) !== "object") {
            return;
        }
        for (var o in methods) {
            $.connection.abpCommonHub.client[o] = methods[o];
        }
        
    },

    connect: function () {
    	$.connection.hub.url = app.Config.webapiDomain + "/signalr/hubs";
		$.connection.hub.start({ withCredentials: false }).done(function () {
            app.vueApp.$store.dispatch("trigger", {eventName: "signalr.connected"});
            app.vueApp.$store.dispatch("updateConnectionHubStatus", true);
            $.connection.abpCommonHub.server.register().done(function () {
                app.log.debug('Registered to the SignalR server!'); //TODO: Remove log
                app.vueApp.$store.dispatch("trigger", {eventName: "signalr.register"});
            });
        });
    },

    disconnected: function () {
        //reconnect if hub disconnects
        $.connection.hub.disconnected(function () {
            //if (!abp.signalr.autoConnect) {
            //    return;
            //}
            setTimeout(function () {
                if ($.connection.hub.state === $.signalR.connectionState.disconnected) {
                    $.connection.hub.start();
                }
            }, 5000);
            app.vueApp.$store.dispatch("updateConnectionHubStatus", false);
        });
   	},
   	
   	retgisterQrScan(){
   		this.register({
            "qrScanned": function (scannerId,properties) {
                app.log.debug(scannerId);
                app.log.debug(properties);
                app.vueApp.$store.dispatch("trigger", {eventName: "qrScan.received", args: [scannerId, properties]});
            }
        });
   	},
   	
   	connectAndRegister(){
   		var _this = this;
   		//console.info(app.Config.webapiDomain + "/signalr/hubs");
   		//$.connection.hub.url = app.Config.webapiDomain + "/signalr/hubs";
   		Promise.all([
		    require("../lib/jquery.signalR-2.2.1"),
		    require("http://storeapi.dev.sqj.fanscrm.cn/signalr/hubs")
		]).then(function() {
			_this.retgisterQrScan();
   			_this.connect();
		});
   	}
}
