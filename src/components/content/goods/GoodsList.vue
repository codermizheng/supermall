<template>
  <div class="goods">
      <goods-list-item v-for="(item,index) in goods" :key="index" :goodsItem='item'>{{goods}}</goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from 'components/content/goods/GoodsListItem'

export default {
  name:'GoodsList',
  components:{
   GoodsListItem,
  },
  props:{
      goods:{
          type:Array,
          default(){
              return [];
          }
      }
  }
}
</script>

<style>
 .goods {
   display: flex;
   flex-wrap: wrap; /*不全挤在一行显示*/ 
   justify-content: space-around; /*均等分*/
   padding: 2px;
 }


</style>