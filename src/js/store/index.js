/**
 * 作者：yujinjin9@126.com
 * 时间：2017-01-19
 * app数据管理入口文件
 */

import Vue from 'vue'
import Vuex from 'vuex'
import appData from './app-data'
import appEvent from './app-event'
import routerStatus from './router-status'


Vue.use(Vuex);

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'PRD', //在非生产环境下，使用严格模式
    modules: {
        appData, routerStatus, appEvent
    }
})
