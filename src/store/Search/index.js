import { reqGetSearchInfo } from "@/api"

const search = {
    namespaced: true,

    //actions:处理action,可以手写自己的业务逻辑，也可以处理异步
    actions: {

        // 这里可以书写业务逻辑，但是不能修改state
        async getSearchList(context, value = {}) {
            //当前这个reqGetSearchInfo这个函数在调用获取服务器数据的时候，至少传递一个参数（空对象）
            //value形参：是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象
            let result = await reqGetSearchInfo(value)
            if (result.code === 200) {
                context.commit("GETSEARCHLIST", result.data)
            }
        }


    },

    //mutations:修改state的唯一手段
    mutations: {
        GETSEARCHLIST(state, value) {
            state.searchList = value
        }

    },

    //state:仓库存储数据的地方
    state: {
        searchList: {}
    },

    //getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
    //计算属性，在项目当中，为了简化数据而生
    //可以把我们将来在组件当中需要的数据简化一下【将来组件在获取数据的时候就方便了】
    getters: {
        //当前形参state，当前仓库中的state，并非大仓库的那个state
        attrsList(state) {
            return state.searchList.attrsList || []
        },
        goodsList(state) {
            //state.searchList.goodsList如果服务器数据回来了，没问题是一个数组
            //假如网络不给力|没有网state.searchList.goodsList应该返回的是undefined
            //计算新的属性的属性值至少给人家一个空数组
            return state.searchList.goodsList || []
        },
        trademarkList(state) {
            return state.searchList.trademarkList || []
        }
    },
}
export default search