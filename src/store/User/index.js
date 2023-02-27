// api
import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from "@/api"

//token
import { setToken, getToken, removeToken } from "@/utils/token"



const user = {
    namespaced: true,

    //actions:处理action,可以手写自己的业务逻辑，也可以处理异步
    actions: {
        //获取验证码
        async getCode(context, phone) {
            //获取验证码的这个接口是把验证码返回的
            let result = await reqGetCode(phone)
            if (result.code == 200) {
                context.commit('GETCODE', result.data)
            }
        },
        //注册
        async userRegister(context, data) {
            let result = await reqUserRegister(data)
            if (result.code === 200) {
                return "ok"
            } else {
                return Promise.reject(new Error(result.message))
            }
        },
        //登录业务
        async userLogin(context, data) {
            let result = await reqUserLogin(data)
            //服务器下发token，用户唯一标识符（uuid）
            //将来经常通过带token找服务器要用户信息进行展示
            if (result.code === 200) {
                //用户已经登录成功获取token（非持久化）
                context.commit("USERLOGIN", result.data.token)
                //使用session存储token
                setToken(result.data.token)
                return "ok"
            } else {
                return Promise.reject(new Error(result.message))
            }
        },
        //获取用户信息
        async getUserInfo(context) {
            let result = await reqUserInfo()
            if (result.code === 200) {
                context.commit("GETUSERINFO", result.data)
                return 'ok'
            }else{
                return Promise.reject(new Error(result.message))
            }
        },
        //退出登录
        async Logout(context) {
            let result = await reqLogout()
            if (result.code === 200) {
                context.commit("CLEAR")
                return 'ok'
            } else {
                return Promise.reject(new Error(result.message))
            }
        }
    },

    //mutations:修改state的唯一手段
    mutations: {
        GETCODE(state, value) {
            state.code = value
        },
        USERLOGIN(state, value) {
            state.token = value
        },
        GETUSERINFO(state, value) {
            state.userInfo = value
        },
        //清除用户数据
        CLEAR(state) {
            //仓库清空
            state.token = ""
            state.userInfo = {}
            //session清空
            removeToken()
        }
    },

    //state:仓库存储数据的地方
    state: {
        code: "",
        token: getToken() || "",
        userInfo: {}
    },

    //getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
    //计算属性，在项目当中，为了简化数据而生
    //可以把我们将来在组件当中需要的数据简化一下【将来组件在获取数据的时候就方便了】
    getters: {

    },
}
export default user