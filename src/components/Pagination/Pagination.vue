<template>
  <div class="Pagination">
    <!-- 上半 -->
    <button :disabled="pageNo === 1" @click="$emit('getPageNo', pageNo - 1)">
      上一页
    </button>
    <button
      v-if="startNumAndEndNum.start > 1"
      @click="$emit('getPageNo', 1)"
      :class="{ active: pageNo === 1 }"
    >
      1
    </button>
    <button v-if="startNumAndEndNum.start > 2">···</button>

    <!-- 中间 -->
    <button
      v-for="(page, index) in pageNumbers"
      :key="index"
      @click="$emit('getPageNo', page)"
      :class="{ active: pageNo == page }"
    >
      {{ page }}
    </button>

    <!-- 下半 -->
    <button v-if="startNumAndEndNum.end < totalPage - 1">···</button>
    <button
      v-if="startNumAndEndNum.end < totalPage"
      @click="$emit('getPageNo', totalPage)"
      :class="{ active: pageNo == totalPage }"
    >
      {{ totalPage }}
    </button>
    <button
      :disabled="pageNo == totalPage"
      @click="$emit('getPageNo', pageNo + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>


<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  data() {
    return {};
  },
  computed: {
    // 总共多少页
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },

    //计算出连续的页码的起始数字与结束数字【连续页码的数字：至少是5】
    startNumAndEndNum() {
      //先定义两个变量存储起始数字与结束数字
      let start = 0,
        end = 0;
      //连续页码数字5【就是至少5页】，如果出现不正常现象【就是不够五页】
      //不正常现象【总页数没有连续页码多】
      if (this.continues > this.totalPage) {
        start = 1;
        end = this.totalPage;
      }
      //正常现象 【连续页码5，但是你的总页数一定是大于5的】
      else {
        //起始数字
        start = this.pageNo - parseInt(this.continues / 2);
        //结束数字
        end = this.pageNo + parseInt(this.continues / 2);
        //start数字不会出现0||负数
        if (start < 1) {
          start = 1;
          end = this.continues;
        }
        //end数字不会出现大于总页数
        if (end > this.totalPage) {
          start = this.totalPage - (this.continues + 1);
          end = this.totalPage;

          //start只可以为1
          if (start < 1) {
            start = 1;
          }
        }
      }
      return { start, end };
    },

    //页码数字
    pageNumbers() {
      let numbers = [];
      for (let page = 0; page <= this.startNumAndEndNum.end; page++) {
        if (page >= this.startNumAndEndNum.start) {
          numbers.push(page);
        }
      }
      return numbers;
    },
  },
  components: {},
  methods: {},
};
</script>


<style lang="less" scoped>
.Pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>

