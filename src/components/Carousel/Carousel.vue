<template>
  <div class="Carousel">
    <div class="swiper-container" ref="Swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="i in list" :key="i.id">
          <img :src="i.imgUrl" />
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>

      <!-- 如果需要导航按钮 -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
  </div>
</template>


<script>
import Swiper from "swiper";
export default {
  name: "Carousel",
  props: ["list"],
  data() {
    return {};
  },
  watch: {
    list: {
      deep: true,
      //立即监听：不管你数据有没有变化，上来立即监听一次
      //为什么watch监听不到list：因为这个数据从来没有发生变化（数据是父亲给的，对象里面的数据都是有的）
      immediate: true,
      handler() {
        //只能监听到数据已经有了，但是v-for动态渲染结构我们还是没有办法确定的，因此还是需要用nextTick
        this.$nextTick(() => {
          //当你执行这个回调函数的时候：保证服务器数据回来了，v-for执行完毕了【轮播图结构一定有了】
          new Swiper(this.$refs.Swiper, {
            // direction: 'vertical', // 垂直切换选项
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },

            // // 如果需要滚动条
            // scrollbar: {
            //     el: '.swiper-scrollbar',
            // },
          });
        });
      },
    },
  },
  components: {},
  methods: {},
};
</script>


<style>
.Carousel {
}
</style>

