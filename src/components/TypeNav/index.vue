<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <!--    事件委托-->
    <div class="container">
      <div @mouseleave="leaveIndex">
        <h2 class="all">全部商品分类</h2>
        <!--      三级联动-->
        <div class="sort">
          <!--          事件委派+编程式路由实现-->
          <div class="all-sort-list2" @click="goSearch">
            <div class="item" v-for="(c1,index) in categoryList.slice(0,16)" :key="c1.categoryId"
                 :class="{cur:currentIndex==index}">
              <h3 @mouseenter="changeIndex(index)">
                <!--一级路由-->
                <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                >{{ c1.categoryName }}</a>
              </h3>
              <!--            二 三级分类-->
              <div class="item-list clearfix" :style="{display:currentIndex==index?'block':'none'}">
                <!-- 当前索引为Index展示出来，否则就隐藏-->
                <div class="subitem" v-for="(c2,index) in c1.categoryChild" :key="c2.categoryId">
                  <dl class="fore">
                    <dt>
                      <!--二级路由-->
                      <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                      >{{ c2.categoryName }}</a>
                    </dt>
                    <dd>
                      <em v-for="(c3,index) in c2.categoryChild" :key="c3.categoryId">
                        <!--三级路由-->
                        <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                        >{{ c3.categoryName }}</a>
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>

    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import _ from 'lodash'

console.log(_)
export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1
    }
  },
  methods: {
    // home模块跳转到search模块
    goSearch(event) {
      let element = event.target;
      // dataset和获取到节点的自定义属性的名称
      let {categoryname, category1id, category2id, category3id} = element.dataset;
      // 如果标签上有categoryname就是123级的a标签
      if (categoryname) {
        // 整理路由跳转参数
        let location = {name: "search"};
        let query = {categoryName: categoryname};
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        // 整理完参数
        location.query = query;
        //路由的跳转
        this.$router.push(location)
      }
    },
    // 鼠标进入修改响应式currentIndex属性
    // 原始方法
    /*    changeIndex(index){
          //  一级分类移上某个一级分类元素的索引值
          //
          this.currentIndex=index
        },*/
    // 节流的方法
    changeIndex: _.throttle(function (index) {
      this.currentIndex = index
    }, 50),// 在规定的时间之后促发
    //  一级分类鼠标移除的事件回调
    leaveIndex() {
      //  鼠标移除currentIndex，变为-1
      this.currentIndex = -1
    }
  },
  mounted() {
    // 1. 挂载完毕的生命周期的钩子，当三级联动组件挂载到页面上时向Vuex发送数据
    //  通知Vuex发送请求，获取数据存储于home仓库中
    this.$store.dispatch('home/categoryList')
  },
  computed: {
    // 2.在三级联动组件引入mapState 通过mapState设置categoryList用来接收数据
    ...mapState(
        // 'home',['categoryList']
        {
          categoryList: (state) => {
            // 拿到数据后利用v-for渲染到页面
            return state.home.categoryList;
          }
        })
  }
}
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }

        .cur {
          background-color: skyblue;
        }
      }
    }
  }
}
</style>
