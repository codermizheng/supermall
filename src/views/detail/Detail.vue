<template>
  <div id="detail">
      <detail-nav-bar class="detail-nav" @titleClick="titleClick"/>
      <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad = "imageLoad"/>
      <detail-param-info :param-info="paramInfo" ref="params"/>
      <detail-comment-info :comment-info="commentInfo" ref="comment"/>
      <goods-list :goods="recommends" ref="recommend"/>
      </scroll> 
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar"
import DetailSwiper from './childComps/DetailSwiper';
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamInfo from "./childComps/DetailParamInfo.vue"
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'

import Scroll from 'components/common/scroll/Scroll';
import GoodsList from "components/content/goods/GoodsList"

import {getDetail,Goods,Shop, GoodsParam,getRecommend} from "network/detail"
import {debounce} from 'common/utils.js'
import {itemListenerMixin} from "common/mixin"

export default {
  name:"Detail",
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
  },
  mixins: [itemListenerMixin],
  data() {
      return {
          iid:null,
          topImages:[],
          goods:{},
          shop:{},
          detailInfo:{},
          paramInfo:{},
          commentInfo:{},
          recommends:[],
          themeTopYts:[],
          getThemeTopY:null,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
      }
  },

  methods: {
      imageLoad(){
        this.$refs.scroll.refresh();
        this.getThemeTopY()
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0,-this.themeTopYts[index],100)
      }
  },

  created() {
    // 1. 保存存入的iid
      this.iid = this.$route.params.iid;

    //根据iid请求详情数据  
    getDetail(this.iid).then(res=>{
      // console.log(res);
      //1. 获取顶部的图片轮播数据
      const data = res.data.result;
      this.topImages = data.itemInfo.topImages;
      
      //2. 获取商品信息
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services);

      //3. 创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);

      //4. 保存商品的详情数据
      this.detailInfo = data.detailInfo;

      //5. 获取参数的信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

      //6.获取参数的信息
      if (data.rate.cRate !== 0 ) {
        this.commentInfo = data.rate.list[0];
      }
    })
    getRecommend().then(res=>{
      // console.log(res);
      this.recommends = res.data.data.list
    })
      //4. 给getthemeTopY赋值
      this.getThemeTopY = debounce(()=>{
        this.themeTopYts = [];
        this.themeTopYts.push(0);
        this.themeTopYts.push(this.$refs.params.$el.offsetTop-44);
        this.themeTopYts.push(this.$refs.comment.$el.offsetTop-44);
        this.themeTopYts.push(this.$refs.recommend.$el.offsetTop-44)
        // console.log(this.themeTopYts);
      },100)
  },

  mounted() {
    // this.themeTopYts.push(0);
    // this.themeTopYts.push(this.$refs.params.$el.offsetTop);
    // this.themeTopYts.push(this.$refs.comment.$el.offsetTop);
    // this.themeTopYts.push(this.$refs.recommend.$el.offsetTop);
    // console.log(this.themeTopYts);
  },
  destroyed() {
    this.$bus.$off('itemImgLoad',this.homeItemListener)
  },
}
</script>

<style scoped>
 #detail{
   position: relative;
   z-index: 9;
   background-color: #fff;
   height: 100vh;
 }
 .content {
   height: calc(100% - 44px);
 }
 .detail-nav{
   position: relative;
   z-index: 9;
   background-color: #fff;
 }
</style>