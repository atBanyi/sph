<template>
  <div>
    <!--    商品分类三级路由列表-->
    <TypeNav/>
    <div class="main">
      <div class="py-container">
        <!--bread 面包屑，带有x的结构-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑-->
            <li class="with-x" v-if="searchParams.categoryName">{{ searchParams.categoryName }}<i
                @click="removeCategoryName">x</i></li>
            <!--关键字的面包屑   -->
            <li class="with-x" v-if="searchParams.keyword">{{ searchParams.keyword }}<i
                @click="removeKeyword">x</i></li>
            <!-- 品牌的面包屑-->
            <li class="with-x" v-if="searchParams.trademark">{{ searchParams.trademark.split(":")[0] }}<i
                @click="removetradeMark()">x</i></li>
            <!--平台的售卖的属性值展示-->
            <li class="with-x" v-for="(attrValue,index) in searchParams.props" :key="index">{{
                attrValue.split(":")[1]
              }}<i
                  @click="removeAttr(index)">x</i></li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo"/>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!--排序的解构-->
              <ul class="sui-nav">
                <li :class="{active:isOne}" @click="changeOrder('1')">
                  <a>综合
                    <span v-show="isOne"
                          class="iconfont"
                          :class="{'icon-direction-down':isAsc,'icon-direction-up':isDesc}"></span>
                  </a>
                </li>
                <li :class="{active:isTwo}" @click="changeOrder('2')">
                  <a>价格
                    <span v-show="isTwo" class="iconfont"
                          :class="{'icon-direction-down':isAsc,'icon-direction-up':isDesc}"></span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <!--销售产品列表-->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5"
                  v-for="(good,index) in goodsList"
                  :key="good.id"
              >
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 跳转记得带id-->
                    <router-link :to="`/detail/${good.id}`">
                      <img :src="good.defaultImg"/>
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <router-link :to="`/detail/${good.id}`"
                                 title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">{{ good.title }}
                    </router-link>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <router-link :to="`/detail/${good.id}`" class="sui-btn btn-bordered btn-danger">
                      加入购物车
                    </router-link>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!--分页器-->
          <div class="fr page">
            <Pagination :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize" :total="total" :continues="5"
                        @getPageNo="getPageNo"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from './SearchSelector/SearchSelector'
import {mapGetters, mapState} from "vuex";
import Pagination from "@/components/Pagination";

export default {
  name: 'Search',
  data() {
    return {
      //   带给服务器的参数
      searchParams: {
        // 一级分类id
        "category1Id": "",
        // 二级分类id
        "category2Id": "",
        // 三级分类id
        "category3Id": "",
        // 分类名字
        "categoryName": "",
        // 关键字
        "keyword": "",
        // 排序 初始应该是综合|降序
        "order": "1:desc",
        // 代表当前是第几页
        "pageNo": 1,
        // 每一个页面展示的个数
        "pageSize": 3,
        // 平台售卖属性操作
        "props": [],
        // 品牌
        "trademark": ""
      }
    }
  },
  beforeCreate() {

  },
  created() {

  },
  beforeMount() {
    // 复杂写法
    /*this.searchParams.category1Id=this.$store.query.category1Id;
    this.searchParams.category2Id=this.$store.query.category2Id;
    this.searchParams.category3Id=this.$store.query.category3Id;*/
    //
    Object.assign(this.searchParams, this.$route.query, this.$route.params)
  },
  mounted() {
//    测试接口返回的数据
    this.getData();// 再发服务器数据请求之前带给服务器数据
  },
  methods: {
    // 请求封装为函数，在需要调用的时候去调用
    getData() {
      //    测试接口返回的数据
      this.$store.dispatch('search/getSearchList', this.searchParams)
    },
    removeCategoryName() {
      // 带给服务器的参数置空
      // 带给服务器的字段是可有可无的，如果属性为空的字符串还是会把相应的字符串字段带给服务器
      // 变为undefined 不会重新给服务器提交，增加性能
      this.searchParams.categoryName = undefined;
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      // 加载默认数据
      this.getData();
      //   地址栏也需要修改:进行路由的跳转,跳转到自己这里
      //  本意删除params参数，
      if (this.$route.params) {
        this.$router.push({name: 'search', params: this.$route.params})
      }
    },
    removeKeyword() {
      this.searchParams.keyword = undefined;
      //  再次发送请求
      this.getData();
      //  搜索框置空  通知兄弟组件Header清楚关键字
      this.$bus.$emit('clear');
      //  进行路由的跳转
      if (this.$route.query) {
        this.$router.push({name: 'search', query: this.$route.query});
      }
    },
    // 自定义事件的回调
    trademarkInfo(trademark) {
      // console.log("wos父组件", trademark)
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      // 再次发送请求，获取serach模块数据
      this.getData();
    },
    // 删除品牌的信息
    removetradeMark() {
      //将品牌信息置空
      this.searchParams.trademark = undefined;
      this.getData();
    },
    // 平台售卖属性自定义回调
    attrInfo(attr, attrValue) {
      // 父组件接收数据并发送请求
      // console.log("aaa",attr)
      //['属性ID':'属性值：属性名']
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`;
      // this.searchParams.props.push(props)
      // 追加到数组中去
      if (this.searchParams.props.indexOf(props) == -1) this.searchParams.props.push(props)
      // 再次发送请求
      this.getData();
    },
    // 删除售卖属性面包屑
    removeAttr(index) {
      // 再次整理参数
      this.searchParams.props.splice(index, 1);
      this.getData()
    },
    //   排序的操作
    changeOrder(flag) {
      // flag 标记用户点击的是谁（综合:1 or 价格:2）
      // console.log(flag)
      let originOrder = this.searchParams.order;//1:desc
      // 获取最开始的状态 originFlag:1
      let originFlag = this.searchParams.order.split(":")[0];
      //
      let originSort = this.searchParams.order.split(":")[1];
      // console.log(originOrder,originSort)//1:desc desc
      // 准备一个新的order属性值
      let newOrder = '';// 新的排序方式
      // 判断多次点击的是不是同一个按钮
      if (flag == originFlag) {// 判断当前点击的是谁
        newOrder = `${originFlag}:${originSort == "desc" ? "asc" : "desc"}`
      } else {
        //  点击的是价格
        newOrder = `${flag}:${'desc'}`;
      }
      //  将新的order赋值给searchParams
      this.searchParams.order = newOrder;
      // 再次发送请求
      this.getData()
    },
    getPageNo(pageNo) {
      this.searchParams.pageNo = pageNo;
      //  再次发送请求
      this.getData()
    }
  },
  components: {
    SearchSelector,
    Pagination
  },
  computed: {
    // mapGetters 里面的写法传递是数组，因为getters计算是没有划分模块的
    ...mapGetters('search', ['goodsList']),
    //  判断是不是包含1，2高亮、排序
    isOne() {
      return this.searchParams.order.indexOf('1') != -1
    },
    isTwo() {
      return this.searchParams.order.indexOf('2') != -1;
    },
    isAsc() {
      return this.searchParams.order.indexOf('asc') != -1
    },
    isDesc() {
      return this.searchParams.order.indexOf('desc') != -1
    },
    ...mapState({
      // 获取数据
      total: state => state.search.searchList.total
    }),
  },
  // 数据监听：监听组件实例身上的属性的变化值
  watch: {
    // 监听属性
    // 监听路由信息是否发生拜年话，如果发生变化，再次发送请求
    $route(newValue, oldValue) {
      // 再次发送请求之前整理带给服务器参数
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      // 再次发送请求
      this.getData();
      // 分类的名字与关键字不用清理
      this.searchParams.category1Id = '';
      this.searchParams.category2Id = '';
      this.searchParams.category3Id = '';
    }
  }
}
</script>

<style lang="less" scoped>
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
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
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
                    margin-left: -5px;
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
        margin: 10px auto;

        .sui-pagination {
          margin: 18px 0;

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
</style>
