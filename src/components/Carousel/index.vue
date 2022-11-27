<template>
  <!--              轮播图-->
  <div class="swiper-container" id="floor1Swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(carousel,index) in list" :key="carousel.id">
        <img :src="carousel.imgUrl">
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";

export default {
  name: "Carousel",
  props: ['list'],
  mounted() {

  },
  computed: {},
  watch: {
    list: {//不写immediate 监听不到，因为这个数据从来没有发生变化（数据是父亲给的,父亲给的时候是一个对象，对象里面该有的数据都是有的）
      immediate: true,// 立即监听：不管数据有没有变化一上来就立即监听
      handler() {
        // 只能监听到数据已经有了，但是v-for渲染的时候我们么欸有办法确定，因此还是要用nextTick
        this.$nextTick(() => {
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
  }

}
</script>

<style scoped>

</style>
