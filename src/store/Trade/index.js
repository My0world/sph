import { reqAddressInfo,reqOrderInfo } from "@/api"


const trade = {
    namespaced: true,

    //actions:处理action,可以手写自己的业务逻辑，也可以处理异步
    actions: {
        //获取用户地址信息
        async getUserAddress(context) {
            let result = await reqAddressInfo()
            if (result.code === 200) {
                context.commit("GETUSERADDRESS", result.data)
            }
        },
        
        //获取商品清单数据
        async getOrderInfo(context) {
            let result = await reqOrderInfo()
            if (result.code === 200) {
                context.commit("GETORDERINFO", result.data)
            }
        }

    },

    //mutations:修改state的唯一手段
    mutations: {
        GETUSERADDRESS(state, value) {
            state.addressInfo = value
        },
        GETORDERINFO(state, value) {
            state.orderInfo = value
        },
    },

    //state:仓库存储数据的地方
    state: {
        addressInfo: [],
        orderInfo:{}
    },

    //getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
    //计算属性，在项目当中，为了简化数据而生
    //可以把我们将来在组件当中需要的数据简化一下【将来组件在获取数据的时候就方便了】
    getters: {
        detailArrayList(state){
            return state.orderInfo.detailArrayList || []
        }
    },
}
export default trade