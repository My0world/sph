//设置token
export const setToken = (value) =>{
    sessionStorage.setItem("TOKEN",value)
} 
//获取token
export const getToken = () =>{
    return sessionStorage.getItem("TOKEN")
} 
//移除token
export const removeToken = () =>{
    return sessionStorage.removeItem("TOKEN")
} 