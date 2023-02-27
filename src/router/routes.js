// //引入路由组件
// import Home from '@/pages/Home/Home'
// import Login from '@/pages/Login'
// import Register from '@/pages/Register'
// import Search from '@/pages/Search/Search'
// import Detail from '@/pages/Detail'
// import AddCartSuccess from '@/pages/AddCartSuccess'
// import ShopCart from '@/pages/ShopCart'
// import Trade from '@/pages/Trade'
// import Pay from '@/pages/Pay'
// import PaySuccess from '@/pages/PaySuccess'
// import Center from '@/pages/Center'

// //引入二级路由
// import MyOrder from '@/pages/Center/MyOrder/MyOrder'
// import GroupOrder from '@/pages/Center/GroupOrder/GroupOrder';

/* 
当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。
如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就会更加高效。
*/

// 路由懒加载形式
//引入路由组件
const Home = () => {
    return import("@/pages/Home/Home")
}
const Login = () => {
    return import("@/pages/Login")
}
const Register = () => {
    return import("@/pages/Register")
}
const Search = () => {
    return import("@/pages/Search/Search")
}
const Detail = () => {
    return import("@/pages/Detail")
}
const AddCartSuccess = () => {
    return import("@/pages/AddCartSuccess")
}
const ShopCart = () => {
    return import("@/pages/ShopCart")
}
const Trade = () => {
    return import("@/pages/Trade")
}
const Pay = () => {
    return import("@/pages/Pay")
}
const PaySuccess = () => {
    return import("@/pages/PaySuccess")
}
const Center = () => {
    return import("@/pages/Center")
}
// //引入二级路由
const MyOrder = () => import("@/pages/Center/MyOrder/MyOrder")
// const GroupOrder = () => {
//     return import("@/pages/Center/GroupOrder/GroupOrder")
// }

export default [

    //使用路由组件  
    {
        name: 'home',//名字
        path: '/home',//路径
        component: Home,//组件名称
        meta: { isShow: true },//isShow是否显示页脚
        children: [],//二级路由
    },
    {
        name: 'login',//名字
        path: '/login',//路径
        component: Login,//组件名称
        meta: { isShow: false },//isShow是否显示页脚
        children: [],//二级路由
    },
    {
        name: 'register',//名字
        path: '/register',//路径
        component: Register,//组件名称
        meta: { isShow: false },//isShow是否显示页脚
        children: [],//二级路由
    },
    {
        name: 'search',//名字
        path: '/search/:keyword?',//路径
        component: Search,//组件名称
        meta: { isShow: true },//isShow是否显示页脚
        children: [],//二级路由

        // 传递props参数

        // 布尔值写法（只能params）
        // props: true

        //对象写法（额外的给路由组件传递一些props）
        // props: {
        //     a: 1,
        //     b: 2
        // }

        // 函数写法（可以params参数、query参数，通过props传递给路由组件）
        props: ($route) => {
            return {
                keyword: $route.params.keyword,
                k: $route.query.k
            }
        }
    },
    {
        name: 'Detail',//名字
        path: '/detail/:skuId',//路径
        component: Detail,//组件名称
        meta: { isShow: true },//isShow是否显示页脚
        children: [],//二级路由
    },

    {
        name: 'AddCartSuccess',//名字
        path: '/addCartSuccess',//路径
        component: AddCartSuccess,//组件名称
        meta: { isShow: true },//isShow是否显示页脚
        children: [],//二级路由
    },
    {
        name: 'ShopCart',//名字
        path: '/shopCart',//路径
        component: ShopCart,//组件名称
        meta: { isShow: true },//isShow是否显示页脚
        children: [],//二级路由
    },
    {
        name: 'Trade',//名字
        path: '/trade',//路径
        component: Trade,//组件名称
        meta: { isShow: true },//isShow是否显示页脚
        children: [],//二级路由

        //路由独享守卫
        beforeEnter: (to, from, next) => {
            //去交易页面，必须是从购物车而来
            if (from.path == "/shopCart" || from.path == "/") {
                next()
            } else {
                //其他的路由组件而来停留在当前页面
                next(from.path)
            }
        }
    },
    {
        name: 'Pay',//名字
        path: '/pay',//路径
        component: Pay,//组件名称
        meta: { isShow: true },//isShow是否显示页脚
        children: [],//二级路由

        //路由独享守卫
        beforeEnter: (to, from, next) => {
            //去支付页面，必须是从交易页而来
            if (from.path == "/trade" || from.path == "/") {
                next()
            } else {
                //其他的路由组件而来停留在当前页面
                next(false)
            }
        }
    },
    {
        name: 'PaySuccess',//名字
        path: '/paySuccess',//路径
        component: PaySuccess,//组件名称
        meta: { isShow: true },//isShow是否显示页脚
        children: [],//二级路由
    },
    {
        name: 'Center',//名字
        path: '/center',//路径
        component: Center,//组件名称
        meta: { isShow: true },//isShow是否显示页脚
        children: [
            {
                name: 'MyOrder',//名字
                path: 'myOrder',//路径
                component: MyOrder,//组件名称
            },
            {
                name: 'GroupOrder',//名字
                path: 'groupOrder',//路径
                component: () => import("@/pages/Center/GroupOrder/GroupOrder"),//也可以这样懒加载
            },


            //重定向、在项目运行起来时，访问/，立马让他定向在首页
            {
                path: '/center',
                redirect: "myOrder"
            }
        ],//二级路由
    },

    //重定向、在项目运行起来时，访问/，立马让他定向在首页
    {
        path: '*',
        redirect: "/home"
    }
]