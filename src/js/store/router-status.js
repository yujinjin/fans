/**
 * 作者：yujinjin9@126.com
 * 时间：2017-01-19
 * app路由状态管理
 */
export default {
	state: {
		direction: null,//going：前进|backing后退|replace
		transition: "next", //fang
		backConfig: {}//返回指定的路由配置选项{name|appfrom|query|url|callback}
	},
	mutations: {
		//修改路由的方向
		updateDirection(state, direction="going"){
			state.direction = direction;
			if(direction) {
				state.transition = (direction === "backing"?"prev": "next");
			}
		},
		updateTransition(state, transition){
			state.transition = transition;
		},
		//修改返回路由的配置选项
		updateBackConfig(state, config){
			state.backConfig = config;
		},
		//重置回路由的配置选项内容
		resetBackConfig(state){
			state.backConfig = {};
		}
	},
	actions: {
		updateDirection({commit}, direction){
			commit("updateDirection", direction);
		},
		updateTransition({commit}, transition){
			commit("updateTransition", transition);
		},
		updateBackConfig({commit}, config){
			commit("updateBackConfig", config);
		},
		resetBackConfig({commit}){
			commit("resetBackConfig");
		}
	}
}
