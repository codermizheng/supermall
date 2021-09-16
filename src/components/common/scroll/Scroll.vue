<template>
  <div class="wrapper" ref="wrapper">
     <div class="content">
          <slot></slot>
     </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'Scroll',
  props:{
   probeType:{
     type:Number,
     default:0
   },
   pullUpLoad:{
     type:Boolean,
     default:false
   }
  },

  data() {
      return {
        scroll:null,     
      }
  },

  mounted() {
    //1. 创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper,{
          click: true,
          observeDOM: true,
          tap: true,
          mouseWheel: true,
          probeType: this.probeType,
          pullUpLoad: this.pullUpLoad,
      })
      //2. 监听滚动的位置
      this.scroll.on('scroll',position=>{
        // console.log(position);
        this.$emit('scroll', position);
      })

      //3. 监听上拉时间
      if (this.probeType === 2 || this.probeType === 3 )
      {
      this.scroll.on('pullingUp',()=>{
        // console.log('上拉加载更多');
        this.$emit('pullingUp');
      })
      }
      // this.scroll.refresh()
      // console.log(this.scroll);
  },
  methods: {
    scrollTo(x,y,time=300) {
      return this.scroll && this.scroll.scrollTo(x,y,time);
    },

    finishPullUp() {
      return this.scroll && this.scroll.finishPullUp();
    },

    refresh() {
      return this.scroll && this.scroll.refresh();
    },

    getScrollY() {
      return this.scroll ? this.scroll.y : 0;
    }/*路由之间来回切换时记录位置在哪*/
  },
}
</script>

<style>

</style>