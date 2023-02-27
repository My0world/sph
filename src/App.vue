<template>
  <div class="App">
    <HeaderComponent></HeaderComponent>

    <!-- 路由组件出口的地方 -->
    <router-view></router-view>

    <!-- 在Home、Search显示的，在登录、注册隐藏 -->
    <!-- <FooterComponent
      v-show="$route.path === '/home' || $route.path === '/search'"
    ></FooterComponent> -->
    <FooterComponent v-show="$route.meta.isShow"></FooterComponent>
  </div>
</template>


<script>
import HeaderComponent from "./components/Header/HeaderComponent";
import FooterComponent from "./components/Footer/FooterComponent";
export default {
  name: "App",
  data() {
    return {};
  },
  components: {
    HeaderComponent,
    FooterComponent,
  },
  methods: {},
  mounted() {
    //  派发一个action||获取商品分类的三级列表的数据
    // 通知Vuex发请求，获取数据，存储于仓库中
    this.$store.dispatch("home/categoryList");
  },
};
</script>


<style lang="less">
#nprogress .bar {
  background: rgb(255, 94, 0) !important; //这里可以随便写颜色
}
.App {
}
</style>

