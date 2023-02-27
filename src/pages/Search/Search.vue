<template>
  <div class="Search">
    <TypeNav></TypeNav>
    <div class="main">
      <div class="py-container">
        <!--bread:面包屑，带有x的结构的-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName
              }}<i @click="removeCategoryName">x</i>
            </li>

            <!-- 关键字面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeKeyword">x</i>
            </li>

            <!-- 品牌信息的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1] || ""
              }}<i @click="removeTrademark">x</i>
            </li>

            <!-- 平台售卖信息的面包屑 -->
            <li
              class="with-x"
              v-for="(i, index) in searchParams.props"
              :key="index"
            >
              {{ i.split(":")[1] || "" }}<i @click="removeAttr(index)">x</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="changeOrder('1')">
                  <a href="#">
                    综合
                    <span v-show="isOne && OrderType">⬆</span>
                    <span v-show="isOne && !OrderType">⬇</span>
                  </a>
                </li>
                <li :class="{ active: isTwo }" @click="changeOrder('2')">
                  <a href="#">
                    价格
                    <span v-show="isTwo && OrderType">⬆</span>
                    <span v-show="isTwo && !OrderType">⬇</span>
                  </a>
                </li>
                <li>
                  <a href="#" @click="alert('未开发')">销量</a>
                </li>
                <li>
                  <a href="#" @click="alert('未开发')">新品</a>
                </li>
                <li>
                  <a href="#" @click="alert('未开发')">评价</a>
                </li>
                <!-- <li>
                  <a href="#">价格⬆</a>
                </li> -->
                <!-- <li>
                  <a href="#">价格⬇</a>
                </li> -->
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="i in goodsList" :key="i.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${i.id}`"
                      ><img v-lazy="i.defaultImg"
                    /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ i.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" :title="i.title">{{
                      i.title
                    }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <!-- 分页器 -->
          <Pagination
            :pageNo="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :total="searchList.total"
            :continues="5"
            @getPageNo="getPageNo"
          ></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapState, mapGetters } from "vuex";

import SearchSelector from "./SearchSelector/SearchSelector";
export default {
  name: "Search",
  data() {
    return {
      //带给服务器参数
      searchParams: {
        // 一级分类的id
        category1Id: "",
        // 二级分类的id
        category2Id: "",
        // 三级分类的id
        category3Id: "",
        // 分类名字
        categoryName: "",
        // 关键字
        keyword: "",
        // 排序
        order: "1:desc",
        // 分页器用的:代表的当前是第几页
        pageNo: 1,
        // 代表的是每一个展示数据个数
        pageSize: 25,
        // 平台售卖属性操作带的参数
        props: [],
        // 品牌
        trademark: "",
      },
    };
  },
  computed: {
    ...mapState("search", ["searchList"]),

    //mapGetters里面的写法：传递的数组，因为getters计算是没有划分模块【home,search】
    // ...mapGetters("search",["attrsList","goodsList","trademarkList"])
    //命名空间写法
    ...mapGetters({ goodsList: "search/goodsList" }),

    //选择综合
    isOne() {
      return this.searchParams.order.indexOf("1") !== -1;
    },

    //选择价格
    isTwo() {
      return this.searchParams.order.indexOf("2") !== -1;
    },

    //排序类型
    OrderType() {
      if (this.searchParams.order.split(":")[1] === "desc") {
        return false;
      } else {
        return true;
      }
    },
  },

  //数据监听：监听组件实例身上的属性的属性值变化
  watch: {
    // 监听路由的信息是否发生变化，如果发生变化，再次发起请求
    $route() {
      //再次发请求之前整理带给服务器参数
      Object.assign(this.searchParams, this.$route.query, this.$route.params);

      //再次发起ajax请求
      this.getData();

      //每一次请求完毕，应该把相应的1、2、3级分类的id置空的，让他接受下一次的相应1、2、3
      //分类名字与关键字不用清理：因为每一次路由发生变化的时候，都会给他赋予新的数据
      this.searchParams.category1Id = "";
      this.searchParams.category2Id = "";
      this.searchParams.category3Id = "";
    },
  },
  components: {
    SearchSelector,
  },
  methods: {
    //向服务器发请求获取search模块数据（根据参数不同返回不同的数据进行展示）
    //把这次请求封装为一个函数，当你需要在调用的时候调用
    getData() {
      // 先测试数据范围的格式
      this.$store.dispatch("search/getSearchList", this.searchParams);
    },

    // 删除TypeNav关键字
    removeCategoryName() {
      //把带给服务器的参数置空了，还需要向服务器发请求
      //带给服务器参数说明可有可无：如果属性值为空的字符串还是会把相应的字段带给服务器
      //但是你把相应的字段变为undefined，当前这个字段不会带给服务器
      this.searchParams.categoryName = undefined;
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;

      //地址栏也需要修改：进行路由跳转（现在的路由跳转只是跳转到自己这里）
      //严谨：本意是删除query,如果路径当中出现params不应该删除，路由跳转的时候应该带着
      this.$router.push({ name: "search", params: this.$route.params });
    },

    // 删除关键字
    removeKeyword() {
      //给服务器带的参数searchParams的keyWord置空
      this.searchParams.keyword = undefined;

      //通知兄弟组件Header清除关键字
      this.$bus.$emit("clear");

      //再次发请求
      this.$router.push({ name: "search", query: this.$route.query });
    },

    //收集手机品牌信息
    //自定义事件回调
    trademarkInfo(i) {
      this.searchParams.trademark = i.tmId + ":" + i.tmName;
      this.getData();
    },

    //删除手机品牌
    removeTrademark() {
      this.searchParams.trademark = undefined;
      this.getData();
    },

    //收集平台属性
    //自定义事件回调
    attrInfo(string) {
      //去重
      if (this.searchParams.props.indexOf(string) === -1) {
        this.searchParams.props.push(string);
        this.getData();
      }
    },

    //去除平台售卖信息
    removeAttr(i) {
      // 再次整理参数
      this.searchParams.props.splice(i, 1);

      // 再次发请求
      this.getData();
    },

    //排序操作
    //flag形参：它是一个标记：代表用户点击的是综合（1）价格（2）
    changeOrder(flag) {
      //这里获取到的是最开始的状态
      let originFlag = this.searchParams.order.split(":")[0];
      let originSort = this.searchParams.order.split(":")[1];

      //准备一个新的order属性值
      let newOrder = "";

      //判断的是多次点击的是不是同一个按钮
      if (flag === originFlag) {
        newOrder = `${originFlag}:${originSort === "desc" ? "asc" : "desc"}`;
      }
      //点击不是同一个按钮
      else {
        newOrder = `${flag}:${"desc"}`;
      }

      //整合数据
      this.searchParams.order = newOrder;

      //发请求
      this.getData();
    },

    //获取页码
    getPageNo(pageNo) {
      //整理带给服务器的数据
      this.searchParams.pageNo = pageNo;
      //再次发请求
      this.getData();
    },
  },

  //当组件挂载完毕之前执行一次【先于mounted之前】
  beforeMount() {
    // 在发请求之前，把接口需要传递参数，进行整理（在给服务器发请求之前，把参数整理好，服务器就会返回查询的数据）
    // Object.assign:Es6新增的语法，合并对象
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
    // console.log(this.searchParams);
  },

  //组件挂载完毕执行一次（只执行一次）
  mounted() {
    //在发请求之前带给服务器参数【searchParams参数发生变化有数值带给服务器】
    this.getData();
  },
};
</script>


<style lang="less" scoped>
.Search {
  .main {
    margin: 10px 0;

    .py-container {
      width: 1200px;
      margin: 0 auto;

      .bread {
        margin-bottom: 5px;
        overflow: hidden;

        .sui-breadcrumb {
          padding: 3px 15px;
          margin: 0;
          font-weight: 400;
          border-radius: 3px;
          float: left;

          li {
            display: inline-block;
            line-height: 18px;

            a {
              color: #666;
              text-decoration: none;

              &:hover {
                color: #4cb9fc;
              }
            }
          }
        }

        .sui-tag {
          margin-top: -5px;
          list-style: none;
          font-size: 0;
          line-height: 0;
          padding: 5px 0 0;
          margin-bottom: 18px;
          float: left;

          .with-x {
            font-size: 12px;
            margin: 0 5px 5px 0;
            display: inline-block;
            overflow: hidden;
            color: #000;
            background: #f7f7f7;
            padding: 0 7px;
            height: 20px;
            line-height: 20px;
            border: 1px solid #dedede;
            white-space: nowrap;
            transition: color 400ms;

            i {
              margin-left: 10px;
              height: 70%;
              cursor: pointer;
              font: 400 14px tahoma;

              &:hover {
                color: #28a3ef;
              }
            }
          }
        }
      }

      .details {
        margin-bottom: 5px;

        .sui-navbar {
          overflow: visible;
          margin-bottom: 0;

          .filter {
            min-height: 40px;
            padding-right: 20px;
            background: #fbfbfb;
            border: 1px solid #e2e2e2;
            padding-left: 0;
            border-radius: 0;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

            .sui-nav {
              position: relative;
              left: 0;
              display: block;
              float: left;
              margin: 0 10px 0 0;

              li {
                float: left;
                line-height: 18px;

                a {
                  display: block;
                  cursor: pointer;
                  padding: 11px 15px;
                  color: #777;
                  text-decoration: none;
                }

                &.active {
                  a {
                    background: #e1251b;
                    color: #fff;
                  }
                }
              }
            }
          }
        }

        .goods-list {
          margin: 20px 0;

          ul {
            display: flex;
            flex-wrap: wrap;

            li {
              height: 100%;
              width: 20%;
              margin-top: 10px;
              line-height: 28px;

              .list-wrap {
                .p-img {
                  padding-left: 15px;
                  width: 215px;
                  height: 255px;

                  a {
                    color: #666;

                    img {
                      max-width: 100%;
                      height: auto;
                      vertical-align: middle;
                    }
                  }
                }

                .price {
                  padding-left: 15px;
                  font-size: 18px;
                  color: #c81623;

                  strong {
                    font-weight: 700;

                    i {
                      margin-left: 0px;
                    }
                  }
                }

                .attr {
                  padding-left: 15px;
                  width: 85%;
                  overflow: hidden;
                  margin-bottom: 8px;
                  min-height: 38px;
                  cursor: pointer;
                  line-height: 1.8;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;

                  a {
                    color: #333;
                    text-decoration: none;
                  }
                }

                .commit {
                  padding-left: 15px;
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;

                  span {
                    font-weight: 700;
                    color: #646fb0;
                  }
                }

                .operate {
                  padding: 12px 15px;

                  .sui-btn {
                    display: inline-block;
                    padding: 2px 14px;
                    box-sizing: border-box;
                    margin-bottom: 0;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                    vertical-align: middle;
                    cursor: pointer;
                    border-radius: 0;
                    background-color: transparent;
                    margin-right: 15px;
                  }

                  .btn-bordered {
                    min-width: 85px;
                    background-color: transparent;
                    border: 1px solid #8c8c8c;
                    color: #8c8c8c;

                    &:hover {
                      border: 1px solid #666;
                      color: #fff !important;
                      background-color: #666;
                      text-decoration: none;
                    }
                  }

                  .btn-danger {
                    border: 1px solid #e1251b;
                    color: #e1251b;

                    &:hover {
                      border: 1px solid #e1251b;
                      background-color: #e1251b;
                      color: white !important;
                      text-decoration: none;
                    }
                  }
                }
              }
            }
          }
        }

        .page {
          width: 733px;
          height: 66px;
          overflow: hidden;
          float: right;

          .sui-pagination {
            margin: 18px 0;
            display: flex;
            align-items: center;

            ul {
              margin-left: 0;
              margin-bottom: 0;
              vertical-align: middle;
              width: 490px;
              float: left;

              li {
                line-height: 18px;
                display: inline-block;

                a {
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  border: 1px solid #e0e9ee;
                  margin-left: -1px;
                  font-size: 14px;
                  padding: 9px 18px;
                  color: #333;
                }

                &.active {
                  a {
                    background-color: #fff;
                    color: #e1251b;
                    border-color: #fff;
                    cursor: default;
                  }
                }

                &.prev {
                  a {
                    background-color: #fafafa;
                  }
                }

                &.disabled {
                  a {
                    color: #999;
                    cursor: default;
                  }
                }

                &.dotted {
                  span {
                    margin-left: -1px;
                    position: relative;
                    float: left;
                    line-height: 18px;
                    text-decoration: none;
                    background-color: #fff;
                    font-size: 14px;
                    border: 0;
                    padding: 9px 18px;
                    color: #333;
                  }
                }

                &.next {
                  a {
                    background-color: #fafafa;
                  }
                }
              }
            }

            div {
              color: #333;
              font-size: 14px;
              float: right;
              width: 241px;
            }
          }
        }
      }
    }
  }
}
</style>


