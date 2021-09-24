<template>
  <div class="bottom-bar">
      <div class="check-area">
      <check-button class="check-button" :is-checked="isSelectAll" @click.native="checkClick"/>
      <span>全选</span>
      </div>

      <div class="price">
          合计: {{totlePrice}}
      </div>

      <div class="caculate">
          去计算({{checkLength}})
      </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton.vue"

export default {
  name:"CartBottomBar",
  components:{
      CheckButton
  },
  computed: {
      totlePrice() {
          return "￥" + this.$store.state.cartList.filter(item => {
              return item.checked;
          }).reduce((preValue,item) => {
             return preValue + item.price * item.count
          },0).toFixed(2)
      },
      checkLength() {
          return this.$store.state.cartList.filter(item => item.checked).length
      },
      isSelectAll() {
        //   return !(this.$store.state.cartList.filter(item =>item.checked).length);
        if (this.$store.state.cartList.length === 0) {
            return false
           }else{
            return !this.$store.state.cartList.find(item => !item.checked)
           }
      }
  },
  methods: {
      checkClick(){
        if (this.isSelectAll){  //全部选中
            this.$store.state.cartList.forEach(item => item.checked = false)
        } else {
            this.$store.state.cartList.forEach(item => item.checked = true)
        }
      }
  },
}
</script>

<style scoped>
 .bottom-bar {
    display: flex;
    position: relative;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
 }

.check-area {
    display: flex;
    align-items: center;
    margin-left: 8px;
    width: 60px;
}

 .check-button{
     width: 22px;
     height: 22px;
     line-height: 22px;
     margin-right: 5px;
 }

 .price {
     margin-left: 30px;
     flex: 1;
 }

 .caculate {
     width: 90px;
     color: #fff;
     background-color: red;
     text-align: center;
 }
</style>