// 引入Vue
import Vue from 'vue'

// 引入Vuex
import Vuex from 'vuex'

//使用Vuex插件
Vue.use(Vuex)

//引入配置文件
import home from './Home'
import search from './Search'
import detail from './Detail'
import shopCart from './ShopCart'
import user from './User'
import trade from './Trade'


//创建并暴露store
export default new Vuex.Store({

    // 实现Vuex仓库模块式开发存储数据
    modules: {
        home,
        search,
        detail,
        shopCart,
        user,
        trade
    }
})