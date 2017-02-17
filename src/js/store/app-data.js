/**
 * 作者：yujinjin9@126.com
 * 时间：2017-01-19
 * app临时数据管理
 */
export default {
	state: {
		navbarTitle: "首页", //app的导航页标题
		isShowHead: true, //是否显示app 的导航栏
		isShowFoot: true, //是否显示foot栏
		isShowBack: true, //是否显示返回按钮
		isConnectionHub: false, //是否连接hubs
		locationInfo: {}
	},
	mutations: {
		updateLocationInfo(state, locationInfo){
			state.locationInfo = locationInfo;
		},
		updateNavbarTitle(state, navbarTitle){
			state.navbarTitle = navbarTitle;
		},
		updateNavbarStatus(state, {isShowHead=true, isShowFoot=true, isShowBack=true} = {}){
			if(state.isShowHead != isShowHead){
				state.isShowHead = isShowHead;
			}
			if(state.isShowFoot != isShowFoot){
				state.isShowFoot = isShowFoot;
			}
			if(state.isShowBack != isShowBack){
				state.isShowBack = isShowBack;
			}
		},
		updateConnectionHubStatus(state, isConnectionHub){
			state.isConnectionHub = isConnectionHub;
		}
	},
	actions: {
		updateLocationInfo({commit}, locationInfo){
			commit("updateLocationInfo", locationInfo);
		},
		updateNavbarTitle({commit}, navbarTitle){
			commit("updateNavbarTitle", navbarTitle);
		},
		updateNavbarStatus({commit}, navbarStatusObject){
			commit("updateNavbarStatus", navbarStatusObject);
		},
		updateConnectionHubStatus({commit}, isConnectionHub){
			commit("updateConnectionHubStatus", isConnectionHub);
		}
	}
}