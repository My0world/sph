// 引入Vue
import Vue from 'vue'

// 引入App
import App from './App.vue'

// 引入vue-router
import VueRouter from 'vue-router'
import router from './router'
// 使用插件
Vue.use(VueRouter)

//引入vue-lazyload
import VueLazyLoad from 'vue-lazyload'
//引入图片
import loadIMG from '@/assets/loading.gif'
// 注册插件
Vue.use(VueLazyLoad,{
  loading:loadIMG
})

//引入Vuex
import store from './store'

//引入API
import * as API  from '@/api'

//引入MockServe.js---mock数据
import '@/mock/mockServe'

//引入ElementUI
import {MessageBox,Button} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
// 注册全局ElementUI组件
Vue.component(Button.name,Button)
// 也可以挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

// 引入全局组件
import TypeNav from '@/components/TypeNav/TypeNav'//三级导航
import Carousel from '@/components/Carousel/Carousel'//轮播图
import Pagination from '@/components/Pagination/Pagination'//分页器
// 使用全局组件（第一个参数：全局组件的名字；第二个参数：是使用的组件）
Vue.component("TypeNav", TypeNav)//三级导航
Vue.component("Carousel", Carousel)//轮播图
Vue.component("Pagination", Pagination)//轮播图

//引入swiper样式
import 'swiper/css/swiper.css'

//引入vee-validate（表单验证）
import '@/plugins/validate'

//创建vue实例对象---vm
// eslint-disable-next-line no-unused-vars
const vm = new Vue({
  el: "#app",
  render: h => h(App),

  //注册路由：底下的写法KV一致省略V【router小写的】
  //注册路由信息：当这里书写router的时候，组件身上都拥有$route,$router属性
  router,

  //注册仓库：组件实例的身上会多个一个属性$store属性
  store,

  beforeCreate() {
    //全局事件总线
    Vue.prototype.$bus = this

    Vue.prototype.$API = API
  }
})
