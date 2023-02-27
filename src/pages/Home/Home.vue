<template>
  <div class="Home">
    <!-- 三级联动全局组件:三级联动已经注册为全局组件，因此不需要再引入了 -->
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <TodayRecommend></TodayRecommend>
    <Rank></Rank>
    <Like></Like>
    <!-- Floor这个组件，自己在组件内部是没有发请求的，数据是父组件给的 -->
    <Floor v-for="floor in floorList" :key="floor.id" :list="floor"></Floor>
    <Brand></Brand>
  </div>
</template>


<script>
import ListContainer from "@/pages/Home/components/ListContainer/ListContainer";
import TodayRecommend from "@/pages/Home/components/TodayRecommend/TodayRecommend";
import Rank from "@/pages/Home/components/Rank/Rank";
import Like from "@/pages/Home/components/Like/Like";
import Floor from "@/pages/Home/components/Floor/Floor";
import Brand from "@/pages/Home/components/Brand/Brand";

import { mapState } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      msg:"abc"
    };
  },
  components: {
    ListContainer,
    TodayRecommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  computed: {
    ...mapState("home", ["floorList"]),
  },
  methods: {},
  mounted() {
    //派发action获取floor数据
    this.$store.dispatch("home/getFloorList");

    // //获取用户信息
    // this.$store.dispatch("user/getUserInfo");
  },
};
</script>


<style>
.Home {
}
</style>

