import { reqCategoryList, reqGetBannerList, reqFloorList } from "@/api"
const home = {
    namespaced: true,

    //actions:处理action,可以手写自己的业务逻辑，也可以处理异步
    actions: {

        // 这里可以书写业务逻辑，但是不能修改state

        //通过Api里面的接口函数调用，向服务器发请求，获取服务器的数据
        async categoryList(context) {
            let result = await reqCategoryList()
            if (result.code === 200) {
                context.commit("CATEGORYLIST", result.data)
            }

            // 测试
            // let test = reqCategoryList()
            // console.log(test);
        },

        //获取首页轮播图的数据
        async getBannerList(context) {
            let result = await reqGetBannerList()
            if (result.code === 200) {
                context.commit("GETBANNERLIST", result.data)
            }
        },

        //获取Floor的数据
        async getFloorList(context) {
            let result = await reqFloorList()
            if (result.code === 200) {
                context.commit("GETFLOORLIST", result.data)
            }
        }
    },

    //mutations:修改state的唯一手段
    mutations: {
        CATEGORYLIST(state, value) {
            state.categoryList = value
        },
        GETBANNERLIST(state, value) {
            state.bannerList = value
        },
        GETFLOORLIST(state, value) {
            state.floorList = value
        }
    },

    //state:仓库存储数据的地方
    state: {
        //state中数据默认初始值别乱写，根据接口返回值初始化
        categoryList: [],
        bannerList: [],  //轮播图数据
        floorList: []   //floor数据
    },

    //getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
    getters: {},
}
export default home