import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger' // <---- 打印Log信息

Vue.use(Vuex) // 安装Vuex

const debug = process.env.NODE_ENV !== 'production' // 是生产环境还是开发环境

export default new Vuex.Store({
  actions,
  mutations,
  strict: debug, // 严格模式： 此模式下所有状态的变更且不是由mutation函数引起，将会抛出错误。
  plugins: debug ? [createLogger()] : [] // 在开发环境下，配置日志插件。
})