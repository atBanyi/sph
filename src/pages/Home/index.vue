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
    <Floor/>
<!-- Brand商标-->
    <Brand/>
<button @click="add">点我+1</button>
    <span>仓库的数据{{count}}</span>
    <button>点击我-1</button>
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
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  components: {Brand, Floor, Like, Rank, Recommend, ListContainer},
computed:{
  ...mapState(['count'])
}
,
  methods:{
    add(){
     this.$store.dispatch('add')
    }
  }
}
</script>

<style scoped>

</style>
