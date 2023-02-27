import { reqDeleteCartById, reqCartList, reqUpdataCheckedByid } from "@/api"


const search = {
    namespaced: true,

    //actions:处理action,可以手写自己的业务逻辑，也可以处理异步
    actions: {

        // 这里可以书写业务逻辑，但是不能修改state
        //获取购物车数据
        async getCarList(context) {
            let result = await reqCartList()

            if (result.code === 200) {
                context.commit("GETCATLIST", result.data)
            }
        },

        //删除购物车数据
        async deleteCarListBySkuId(context, skuId) {
            let result = await reqDeleteCartById(skuId)
            if (result.code === 200) {
                return "ok"
            } else {
                Promise.reject("faile")
            }
        },

        //修改某一个商品勾选状态
        async updataCheckedByid(context, { skuId, isChecked }) {
            let result = await reqUpdataCheckedByid(skuId, isChecked)
            if (result.code === 200) {
                return "ok"
            } else {
                Promise.reject("faile")
            }
        },

        //删除全部选中的产品
        deleteAllCheckedCart({ dispatch, getters }) {
            // context：小仓库，commit 【提交mutations修改state】，getters【计算属性】，dispatch【派发action】，state【当前仓库数据】
            let PromiseAll = []
            getters.cartList.cartInfoList.forEach(item => {
                if (item.isChecked === 1) {
                    PromiseAll.push(dispatch("deleteCarListBySkuId", item.skuId))
                }
            });
            return Promise.all(PromiseAll)
        },

        updateAllCartIsChecked({ dispatch, getters }, value) {
            let PromiseAll = []
            getters.cartList.cartInfoList.forEach(item => {
                PromiseAll.push(dispatch("updataCheckedByid", { skuId: item.skuId, isChecked: value }))
            });
            return Promise.all(PromiseAll)
        },
    },

    //mutations:修改state的唯一手段
    mutations: {
        GETCATLIST(state, value) {
            state.cartList = value
        }
    },

    //state:仓库存储数据的地方
    state: {
        cartList: []
    },

    //getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
    //计算属性，在项目当中，为了简化数据而生
    //可以把我们将来在组件当中需要的数据简化一下【将来组件在获取数据的时候就方便了】
    getters: {
        cartList(state) {
            return state.cartList[0] || {}
        }
    },
}
export default search