<template>
  <div>
    <!--三级联动组件，已经全局引入了，不需要import了-->
    <TypeNav/>
<!-- ListContainer列表-->
    <ListContainer/>
<!-- todayRecommend 今日推荐-->
    <Recommend/>
<!-- Rank 商品排行-->
    <Rank/>
<!--Like猜你喜欢-->
    <Like/>
<!--Floor楼层-->
    <Floor v-for="(floor,index) in floorList" :key="floor.id" :list="floor"/>
<!-- Brand商标-->
    <Brand/>
  </div>
</template>

<script>
import ListContainer from "@/pages/Home/ListContainer";
import Recommend from "@/pages/Home/Recommend";
import Rank from "@/pages/Home/Rank";
import Like from "@/pages/Home/Like";
import Floor from "@/pages/Home/Floor";
import Brand from "@/pages/Home/Brand";
import {mapState} from "vuex";
import Swiper from 'swiper'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  props: [],
  components: {Brand, Floor, Like, Rank, Recommend, ListContainer},
  mounted() {
    // 派发action,获取floor组件的数组
    this.$store.dispatch('home/getFloorList')
  },
  computed:{
    ...mapState({
      floorList: state => state.home.floorList
    })
},
  watch:{
    list:{//不写immediate 监听不到，因为这个数据从来没有发生变化（数据是父亲给的,父亲给的时候是一个对象，对象里面该有的数据都是有的）
      immediate:true,// 立即监听：不管数据有没有变化一上来就立即监听
      handler(){
        // 只能监听到数据已经有了，但是v-for渲染的时候我们么欸有办法确定，因此还是要用nextTick
        this.$nextTick(()=>{
          var mySwiper = new Swiper('.swiper-container', {
            direction: 'horizontal', // 垂直切换选项
            loop: true, // 循环模式选项
            autoplay: true,// 自动切换
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
              clickable: true// 点击小球切换
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },

            // 如果需要滚动条
            scrollbar: {
              el: '.swiper-scrollbar',
            },
          });
        })
        // console.log("23324")
      }
    }
  },

  methods:{

  }
}
</script>

<style scoped>

</style>
