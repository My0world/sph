import { reqAddOrUpdateShopCart, reqGoodsInfo } from "@/api"
import { getUUID } from "@/utils/uuid_token.js"
const detail = {
    namespaced: true,

    //actions:处理action,可以手写自己的业务逻辑，也可以处理异步
    actions: {

        // 这里可以书写业务逻辑，但是不能修改state

        //获取产品信息
        async getGoodsInfo(context, skuId) {
            let result = await reqGoodsInfo(skuId)
            if (result.code === 200) {
                context.commit("GETGOODSINFO", result.data)
            }
        },

        //将产品信息添加到购物车
        async addOrUpdateShopCart(context, { skuId, skuNum }) {
            //加入购物车返回的解构
            //加入购物车以后（发请求），前台将参数带给服务器
            //服务器写入数据成功，并没有返回前台的数据，展示返回code:200,代表操作成功
            //因为服务器没有带回数据，所以不需要存储数据
            let result = await reqAddOrUpdateShopCart(skuId, skuNum)
            //代表服务器加入购物车成功
            if(result.code === 200){
                return 'ok'
            }else{
                //加入购物车失败
                return Promise.reject("faile")
            }
        },

    },

    //mutations:修改state的唯一手段
    mutations: {
        GETGOODSINFO(state, value) {
            state.goodsInfo = value
        },
    },

    //state:仓库存储数据的地方
    state: {

        //state中数据默认初始值别乱写，根据接口返回值初始化
        goodsInfo: {},
        uuid_token:getUUID()

    },
    //getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
    getters: {
        // 路径导航简化的数据
        categoryView(state) {
            //比如：state.goodsInfo初始状态空对象，空对象的categoryView属性值undefined
            //当前计算出的categoryView属性值至少是一个空对象，假的报错不会有了
            return state.goodsInfo.categoryView || {}
        },
        // 简化产品信息的数据
        skuInfo(state) {
            return state.goodsInfo.skuInfo || {}
        },
        // 产品售卖属性的简化
        spuSaleAttrList(state) {
            return state.goodsInfo.spuSaleAttrList || []
        }
    },
}
export default detail