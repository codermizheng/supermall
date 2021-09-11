<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <home-recommend-view :recommends="recommends"></home-recommend-view>
    <home-feature-view></home-feature-view>
    <tab-control class="tab-control" :titles="['流行','新款','精选']" @tabClick='tabClick'></tab-control>
    <goods-list :goods="showGoods"></goods-list>
    <ul>
      <li>hh</li>
      <li>hh</li>
      <li>hh</li>
      <li>hh</li>
      <li>hh</li>
      <li>hh</li>
      <li>hh</li>
      <li>hh</li>
      <li>hh</li>
      <li>hh</li>
      <li>hh</li>
      <li>hh</li>
      <li>hh</li>
      <li>hh</li>
      <li>hh</li>
      <li>hh</li>
      <li>hh</li>
      <li>hh</li>
      <li>hh</li>
      <li>hh</li>
      <li>hh</li>
      <li>hh</li>
      <li>hh</li>
      <li>hh</li>
      <li>hh</li>
      <li>hh</li>
      <li>hh</li>
      <li>hh</li>
      <li>hh</li>
      <li>hh</li>
      <li>hh</li>
      <li>hh</li>
      <li>hh</li>
      <li>hh</li>
      <li>hh</li>
      <li>hh</li>
      <li>hh</li>
      <li>hh</li>
      <li>hh</li>
      <li>hh</li>
      <li>hh</li>
      <li>hh</li>
      <li>hh</li>
      <li>hh</li>
      <li>hh</li>
    </ul>
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper.vue'
import HomeRecommendView from './childComps/HomeRecommendView.vue'
import HomeFeatureView from './childComps/HomeFeatureView.vue'

import NavBar from "components/common/navbar/NavBar"
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'

import {getHomeMultidata,getHomeGoods} from 'network/home';

export default {
   name:'Home',
   components:{
     NavBar,
     HomeSwiper,
     HomeRecommendView,
     HomeFeatureView,
     TabControl,
     GoodsList,
   },
   data() {
     return {
       banners:[],
       recommends:[],
       goods:{
         'pop':{page:0,list:[]},
         'new':{page:0,list:[]},
         'sell':{page:0,list:[]}
       },
       currentType : 'pop'
     }
   },
   computed: {
     showGoods(){
       return this.goods[this.currentType].list
     }
   },
   created() {
     //1. 请求多个数据
     this.getHomeMultidata();
     this.getHomeGoods('pop');
     this.getHomeGoods('new')
     this.getHomeGoods('sell')
   },//created
   methods: {
     /*
     * 事件监听相关方法
     */
    tabClick(index){
      switch (index){
        case 0:
          this.currentType = 'pop';
          break;
        case 1:
          this.currentType = 'new';
          break;
        case 2:
          this.currentType = 'sell';
          break;
      }
    },

     /*
     * 网络请求相关方法
     */ 
     getHomeMultidata(){
        getHomeMultidata().then(res=>{
      //  console.log(res);
       this.banners = res.data.data.banner.list;
       this.recommends = res.data.data.recommend.list;
     });
     },//getHomeMultidata
      getHomeGoods(type){
       const page = this.goods[type].page + 1;
       getHomeGoods(type,page).then(res=>{
      //  console.log(res);
       this.goods[type].list.push(... res.data.data.list);
       this.goods[type].page+=1;
     })
      },//getHomeGoods
   },
}
</script>

<style>
.home-nav{
  /* background-color: var(--color-tink); */
  background-color: #ff8198;
  color: white;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 999;
}
#home{
  padding-top: 44px;
}

.tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
}
</style>