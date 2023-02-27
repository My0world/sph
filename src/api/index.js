// 当前这个模块：Api进行统一管理
import apiRequests from "./ApiAjax";
import mockRequests from "./MockAjax";

// 三级联动接口
// 地址：/api/product/getBaseCategoryList 发送方式：get 参数：无
export const reqCategoryList = () => {

    // 发请求:axios发请求返回结果Promise对象
    return apiRequests({
        url: '/product/getBaseCategoryList',
        method: 'get'
    })
}

//获取banner(Home首页轮播图接口)
export const reqGetBannerList = () => mockRequests.get('/banner')

//获取floor数据
export const reqFloorList = () => mockRequests.get('/floor')

//获取搜索模块数据 地址：/api/list  请求方式：post   参数：需要参数
// {
//     "category3Id": "61",
//     "categoryName": "手机",
//     "keyword": "小米",
//     "order": "1:desc",
//     "pageNo": 1,
//     "pageSize": 10,
//     "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
//     "trademark": "4:小米"
// }
//当前这个函数需不需要接受外部传递参数
//当前这个接口，给服务器传递参数params，至少是一个空对象
export const reqGetSearchInfo = (params) => apiRequests({
    url: "/list",
    method: "post",
    data: params
})

//获取产品详情信息的接口  URL：/api/item/{skuId}  请求方式：get
export const reqGoodsInfo = (skuId) => apiRequests({
    url: `/item/${skuId}`,
    method: "get",
})

// 将产品添加到购物车中（获取更新某一个产品的个数）
export const reqAddOrUpdateShopCart = (skuId, skuNum) => apiRequests({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: "post",
})

// 获取购物车数据接口
export const reqCartList = () => apiRequests({
    url: `/cart/cartList`,
    method: "get",
})

// 删除购物车数据
export const reqDeleteCartById = (skuId) => apiRequests({
    url: `/cart/deleteCart/${skuId}`,
    method: "delete",
})

//修改商品的选中状态
export const reqUpdataCheckedByid = (skuId, isChecked) => apiRequests({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: "get",
})

//获取验证码
export const reqGetCode = (phone) => apiRequests({
    url: `/user/passport/sendCode/${phone}`,
    method: "get",
})

//注册
export const reqUserRegister = (data) => apiRequests({
    url: `/user/passport/register`,
    method: "post",
    data
})

//登录
export const reqUserLogin = (data) => apiRequests({
    url: `/user/passport/login`,
    method: "post",
    data
})

//获取用户信息【需要token向服务器要学习】
export const reqUserInfo = () => apiRequests({
    url: `/user/passport/auth/getUserInfo`,
    method: "get",
})

//退出登录
export const reqLogout = () => apiRequests({
    url: `/user/passport/logout`,
    method: "get",
})

//获取用户地址信息
export const reqAddressInfo = () => apiRequests({
    url: `/user/userAddress/auth/findUserAddressList`,
    method: "get",
})

//获取用户地址信息
export const reqOrderInfo = () => apiRequests({
    url: `/order/auth/trade`,
    method: "get",
})

//提交订单
export const reqSubmitOrder = (tradeNo,data) => apiRequests({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    method: "post",
    data 
})

// 获取订单支付信息
export const reqPayInfo = (orderId) => apiRequests({
    url: `/payment/weixin/createNative/${orderId}`,
    method: "get",
})


// 获取支付订单状态
export const reqPayStatus = (orderId) => apiRequests({
    url: `/payment/weixin/queryPayStatus/${orderId}`,
    method: "get",
})

// 获取我的订单列表
export const reqMyOrderList = (page,limit) => apiRequests({
    url: `/order/auth/${page}/${limit}`,
    method: "get",
})

