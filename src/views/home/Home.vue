<template>
  <div id="home">

    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
        <tab-control :titles="['流行','新款','精选']" 
                     @tabClick='tabClick' 
                     ref="tabControl1" 
                     class="tab-control"
                     v-show="isTabFixed">
        </tab-control>

      <scroll class="content"
              ref="scroll" 
             :probe-type="3"  
             @scroll="scrollClick"
             :pull-up-load="true"
             @pullingUp="loadMore">

        <!-----👇这个用的等轮播图图片加载完毕 然后用 swiperImageLoad 事件 子传父事件 在medthods里获取offsetTop ----->
        <!-- <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper> -->

        <!-----👇这个用的update生命周期函数 获取offsetTop 准确的概率比较准确  目前使用这个-------->
        <home-swiper :banners="banners"></home-swiper>
        <home-recommend-view :recommends="recommends"></home-recommend-view>
        <home-feature-view></home-feature-view>
        <tab-control :titles="['流行','新款','精选']" 
                     @tabClick='tabClick' 
                     ref="tabControl2" >
        </tab-control>
        <goods-list :goods="showGoods"></goods-list>
      </scroll>
     
     <back-top @click.native="backClick" v-show="isShowBackTop"></back-top><!--@click后面加 .native 监听组件根元素的原生事件--->
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper.vue'
import HomeRecommendView from './childComps/HomeRecommendView.vue'
import HomeFeatureView from './childComps/HomeFeatureView.vue'

import NavBar from "components/common/navbar/NavBar"
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from "components/common/backTop/BackTop"

import {getHomeMultidata,getHomeGoods} from 'network/home';
import {debounce} from "common/utilis"

export default {
   name:'Home',
   components:{
     NavBar,
     HomeSwiper,
     HomeRecommendView,
     HomeFeatureView,
     TabControl,
     GoodsList,
     Scroll,
     BackTop,
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
       currentType : 'pop',
       isShowBackTop: false,
       tabOffsetTop: 0,
       isTabFixed:false,
       saveY:0,
     }
   },
   computed: {
     showGoods(){
       return this.goods[this.currentType].list
     }
   },

   activated() {
     this.$refs.scroll.scrollTo(0,this.saveY);
     this.$refs.scroll.refresh();
   },

   deactivated() {
     this.saveY = this.$refs.scroll.getScrollY();
     this.$refs.scroll.refresh();
   },

   created() {
     //1. 请求多个数据
     this.getHomeMultidata();
     
     //2. 请求商品数据
     this.getHomeGoods('pop');
     this.getHomeGoods('new')
     this.getHomeGoods('sell') 

     //3. 赋值
    //  this.tabOffsetTop = this.$refs.tabControl = undefine;
    
   },//created
  
   mounted() {
    //3. 监听item中图片加载完成
    const refresh = debounce(this.$refs.scroll.refresh,200)

    this.$bus.$on("itemImgLoad",()=>{
      refresh()   
    })
    //2. 获取tabControld offsetTop
    // 所有的组件都有一个属性$el: 用于获取组件中的元素
    //  this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
  },
   
   updated() {
     this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
   },

   destroyed() {
     console.log("home destroyed");
   },

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
      };
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick(){
      this.$refs.scroll.scrollTo(0,0,500)
   },

    scrollClick(position){
    //  console.log(position);
      //1. 判断BackTop是否显示
      position.y<-1000 ? this.isShowBackTop = true : this.isShowBackTop = false;

      //2. 决定tabControl 是否吸顶(position: fixed)
      this.isTabFixed = (-position.y) > this.tabOffsetTop;
   },

    loadMore() {
    //  console.log('上拉加载更多');
      this.getHomeGoods(this.currentType)
   },

   //用子传父$emit事件获取tab-control的offsetTop 
 /* swiperImageLoad(){
     this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
   }, */

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
       this.goods[type].page +=1;

       this.$refs.scroll.finishPullUp();
     })
      },//getHomeGoods
   },
}
</script>

<style scoped>
.home-nav{
  /* background-color: var(--color-tink); */
  background-color: #ff8198;
  color: white;
  /* 
  * 在使用浏览器原生滚动时, 为了让导航不跟随一起滚动
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 999;
   */
}
#home{
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
   /*vh -> viewport height 视口 */
}

.content{
  /* height: 300px; */
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.tab-control{
  position: relative;
  z-index: 9;
}
</style>