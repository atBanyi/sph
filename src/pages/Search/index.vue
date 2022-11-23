<template>
<div>
  <h1>params参数----{{$route.params.keyword}}</h1>
  <h1>props传递参数---{{keyword}}</h1>
  <h1>query参数-----{{$route.query.k}}</h1>
</div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Search",
  props:['keyword'],
}
</script>

<style scoped>

</style>
