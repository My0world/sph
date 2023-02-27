<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="item in cartInfoList" :key="item.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="item.isChecked == 1"
              @change="updataChecked(item, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl" />
            <div class="item-msg">
              {{ item.skuName }}
            </div>
          </li>
          <!-- <li class="cart-list-con3">
            <div class="item-txt">语音升级款</div>
          </li> -->
          <li class="cart-list-con4">
            <span class="price">￥{{ item.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a class="mins" @click="handler('mins', -1, item)">-</a>
            <input
              autocomplete="off"
              type="text"
              :value="item.skuNum"
              onkeyup="this.value=this.value.replace(/[^\d]/g,'') "
              onafterpaste="this.value=this.value.replace(/[^\d]/g,'') "
              minnum="1"
              class="itxt"
              @change="handler('change', $event.target.value, item)"
            />
            <a class="plus" @click="handler('plus', 1, item)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">￥{{ item.skuPrice * item.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a @click="deleteCartById(item)" class="sindelet">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>

        <!-- <ul class="cart-list">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" id="" value="">
          </li>
          <li class="cart-list-con2">
            <img src="./images/goods2.png">
            <div class="item-msg">华为（MIJIA） 华为metaPRO 30 浴霸4摄像 超清晰</div>
          </li>
          <li class="cart-list-con3">
            <div class="item-txt">黑色版本</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">5622.00</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins">-</a>
            <input autocomplete="off" type="text" value="1" minnum="1" class="itxt">
            <a href="javascript:void(0)" class="plus">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">5622</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>

        <ul class="cart-list">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" id="" value="">
          </li>
          <li class="cart-list-con2">
            <img src="./images/goods3.png">
            <div class="item-msg">iphone 11 max PRO 苹果四摄 超清晰 超费电 超及好用</div>
          </li>
          <li class="cart-list-con3">
            <div class="item-txt">墨绿色</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">11399.00</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins">-</a>
            <input autocomplete="off" type="text" value="1" minnum="1" class="itxt">
            <a href="javascript:void(0)" class="plus">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">11399</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul> -->
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAllChecked"
          @click="updateAllCartChecked"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">￥{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" @click="goTrade">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce, throttle } from "lodash";
import { mapGetters } from "vuex";
export default {
  name: "ShopCart",
  data() {
    return {};
  },
  computed: {
    ...mapGetters({ cartList: "shopCart/cartList" }),
    //购物车数据
    cartInfoList() {
      return this.cartList.cartInfoList || [];
    },
    //总价格
    totalPrice() {
      let sum = 0;
      this.cartInfoList.forEach((item) => {
        sum += item.skuPrice * item.skuNum;
      });
      return sum;
    },
    //是否全选
    isAllChecked() {
      return (
        this.cartInfoList.every((item) => item.isChecked === 1) &&
        this.cartInfoList.length > 0
      );
    },
    //是否有选择
    isChecked(){
      let list = this.cartInfoList.filter(element => {
        return element.isChecked == 1
      });
      return list.length === 0 ? false :true 
    }
  },
  methods: {
    //获取购物车数据
    getData() {
      this.$store.dispatch("shopCart/getCarList");
    },
    //修改某个产品的个数
    handler: throttle(async function (type, disNum, item) {
      //type:为了区分这三个元素
      //disNum：+ 变化量（1），- 变化量（-1），input最终个数 （并不是变化量）
      //id：购物车产品的id

      if (type === "mins") {
        //减少

        //判断产品的个数是否大于1，是传递给服务器-1 ，不是为0（原封不动）
        disNum = item.skuNum > 1 ? -1 : 0;
      } else if (type === "change") {
        //用户输入的量是否为非法的

        //带有汉字和负数是，直接原封不动（发送0）
        if (isNaN(disNum) || disNum < 1) {
          disNum = 0;
        } else {
          //正常情况（parseInt保证没有小数）
          disNum = parseInt(disNum) - item.skuNum;
        }
        // disNum = (isNaN(disNum)||disNum < 1)?0:parseInt(disNum) - item.skuNum
      } else {
        //增加

        //点一次加1次
        disNum = 1;
      }

      try {
        await this.$store.dispatch("detail/addOrUpdateShopCart", {
          skuId: item.skuId,
          skuNum: disNum,
        });
      } catch (error) {
        alert(error.message);
      } finally {
        this.getData();
      }
    }, 2000),
    //删除某一个商品的数据
    async deleteCartById(item) {
      let skuId = item.skuId;
      try {
        await this.$store.dispatch("shopCart/deleteCarListBySkuId", skuId);
      } catch (error) {
        alert(error.message);
      } finally {
        this.getData();
      }
    },
    //修改某一个商品勾选状态
    async updataChecked(item, e) {
      let params = {
        skuId: item.skuId,
        isChecked: e.target.checked ? "1" : "0",
      };
      try {
        await this.$store.dispatch("shopCart/updataCheckedByid", params);
      } catch (error) {
        alert(error.message);
      } finally {
        this.getData();
      }
    },
    //删除全部选中的产品
    async deleteAllCheckedCart() {
      // context：小仓库，commit 【提交mutations修改state】，getters【计算属性】，dispatch【派发action】，state【当前仓库数据】
      try {
        await this.$store.dispatch("shopCart/deleteAllCheckedCart");
      } catch (error) {
        alert(error.message);
      } finally {
        this.getData();
      }
    },
    //全选
    updateAllCartChecked: debounce(async function (event) {
      let isChecked = event.target.checked ? 1 : 0;
      try {
        await this.$store.dispatch(
          "shopCart/updateAllCartIsChecked",
          isChecked
        );
      } catch (error) {
        alert(error.message);
      } finally {
        this.getData();
      }
    }, 700),
    // 跳转结算页
    goTrade(){
      // this.$router.push({name:"Trade"})
      if(this.isChecked){
        this.$router.push({name:"Trade"})
      }else{
        alert("请选择结算的商品")
      }
    }
  },
  mounted() {
    this.getData();
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 31.6px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>