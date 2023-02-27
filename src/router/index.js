// 引入VueRouter
import VueRouter from 'vue-router'

// 引入routes
import routes from './routes'

//引入store
import store from '@/store'

// 先把VueRouter原型对象的push，先保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

// 重写push|replace
// 第一个参数：告诉原来push方法，你往哪里跳转（传递哪些参数）
// 第二个参数成功的回调
// 第三个参数失败的回调
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve, reject) {
        //call||apply区别
        //相同点，都可以调用函数一次，都可以篡改函数的上下文一次
        //不同点，call与apply传递参数：call传递参数用逗号隔开，apply方法执行，传递数组
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}

// 第一个参数：告诉原来replace方法，你往哪里跳转（传递哪些参数）
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve, reject) {
        //call||apply区别
        //相同点，都可以调用函数一次，都可以篡改函数的上下文一次
        //不同点，call与apply传递参数：call传递参数用逗号隔开，apply方法执行，传递数组
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}

//配置路由
let router = new VueRouter({
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { y: 0 }
        }
    }
})

//全局守卫，前置守卫（在路由跳转之前进行判断）
router.beforeEach(async (to, from, next) => {
    // to:可以获取到你要跳转到那个路由信息
    // from:可以获取到你从哪个路由而来的信息
    // next:放行的函数 next()放行、next(path)放行到指定路由、next(false)
    //用户登录了，才会有token，未登录一定不会有token
    let token = store.state.user.token
    let name = store.state.user.userInfo.name
    //用户已经登录了
    if (token) {
        if (to.path === '/login') {
            //不可以去login
            next(false)
        } else if (to.path === '/register') {
            //不可以去register
            next(false)
        } else {
            //去的是【home|search|detail|shopcart】
            //如果用户名已有
            if (name) {
                next()
            } else {
                //没有用户信息，派发action让仓库存储用户信息在跳转
                try {
                    //获取用户信息
                    await store.dispatch("user/getUserInfo")
                    //放行
                    next()
                } catch (error) {
                    //token失效
                    try {
                        //退出登录(清空)
                        await store.dispatch("user/Logout")
                        next("/login")
                    } catch (error) {
                        alert(error.message)
                    }
                    alert(error.message)
                }

            }
        }

    } else {
        //未登录：不能去交易修改、不能去支付相关[pay|paysuccess]、不能去个人中心
        if (to.path === '/trade') {
            next(false)
        } else if (to.path.indexOf("/center") != -1) {
            alert("请登录")
            next("/login?redirect=" + to.path)
        } else if (to.path.indexOf("/pay") != -1) {
            next(false)
        } else {
            next()
        }
    }

})

export default router
