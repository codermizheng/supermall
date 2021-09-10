<template>
  <div>
      <TabBar>
   <TabBarItem path="/home" >
     <img slot="item-icon" src="~assets/img/tabbar/home.png" alt="">
     <img slot="item-icon-active" src="~assets/img/tabbar/home-active.png" alt="">
     <div slot="item-text">首页</div>
   </TabBarItem>
   <TabBarItem path="/category" >
     <img slot="item-icon" src="~assets/img/tabbar/sort.png" alt="">
     <img slot="item-icon-active" src="~assets/img/tabbar/sort-active.png" alt="">
     <div slot="item-text">分类</div>
   </TabBarItem>
   <TabBarItem path="/cart">
     <img slot="item-icon" src="~assets/img/tabbar/shop.png" alt="">
     <img slot="item-icon-active" src="~assets/img/tabbar/shop-active.png" alt="">
     <div slot="item-text">购物车</div>
   </TabBarItem>
   <TabBarItem path="/profile">
     <img slot="item-icon" src="~assets/img/tabbar/my.png" alt="">
     <img slot="item-icon-active" src="~assets/img/tabbar/my-active.png" alt="">
     <div slot="item-text">我的</div>
   </TabBarItem>
  </TabBar>
  </div>
</template>

<script>

import TabBar from "components/common/tabbar/TabBar.vue"
import TabBarItem from "components/common/tabbar/TabBarItem.vue"

export default {
   name:'MainTabBar',
   components:{
    TabBar,
    TabBarItem
  }
}
</script>

<style>

</style>