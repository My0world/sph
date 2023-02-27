<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div
        @click="changeCurrentIndex(index)"
        class="swiper-slide"
        v-for="(item, index) in skuImageList"
        :key="item.id"
      >
        <img :src="item.imgUrl" :class="{ active: currentIndex == index }" />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "ImageList",
  components: {},
  props: ["skuImageList"],
  data() {
    return {
      currentIndex: 0,
    };
  },
  watch: {
    skuImageList() {
      this.$nextTick(() => {
        new Swiper(this.$refs.cur, {
          // 如果需要前进后退按钮
          slidesPerView: 5.85,
          slidesPerGroup: 1,
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
        });
      });
    },
  },
  computed: {},
  methods: {
    changeCurrentIndex(index) {
      //修改响应式数据
      this.currentIndex = index;

      //通知兄弟组件，当前的索引值为几
      this.$bus.$emit('getIndex',this.currentIndex)
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 402px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      // &:hover {
      //   border: 2px solid #f60;
      //   padding: 1px;
      // }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>