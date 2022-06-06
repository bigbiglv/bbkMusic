<script setup lang="ts">
import { reactive, computed } from 'vue';
interface IState {
  X: number;
  Y: number;
  offsetX: number;
  offsetY: number;
}
//偏移量
let cartState = reactive<IState>({
  X: 0,
  Y: 0,
  offsetX: 0,
  offsetY: 0,
});
function handleTouchStart(e: TouchEvent){
  //阻止默认事件
  e.preventDefault();
  cartState.X = e.touches[0].clientX;
  cartState.Y = e.touches[0].clientY;
}
function handleTouchMove(e: TouchEvent){
  let X = e.touches[0].clientX;
  let Y = e.touches[0].clientY;
  //偏差
  cartState.offsetX = cartState.X - X;
  cartState.offsetY = cartState.Y - Y;
  if(cartState.offsetX > 0 && Math.abs(cartState.offsetX) > 20) console.log('向左滑动');
  if(cartState.offsetX < 0 && Math.abs(cartState.offsetX) > 20) console.log('向右滑动');
  if(cartState.offsetY > 0 && Math.abs(cartState.offsetY) > 20) console.log('向上滑动');
  if(cartState.offsetY < 0 && Math.abs(cartState.offsetY) > 20) console.log('向下滑动');
}
function handleTouchEnd(){
  cartState.offsetX = 0;
  cartState.offsetY = 0;
}


const cartStyle = computed(()=>{
  //随着cartState.offsetX Y的数值越大，x y的值增幅越小
  let transform = `translate(${-cartState.offsetX * 0.05}px, ${-cartState.offsetY * 0.05}px)` 
  let transformOrigin = `${cartState.offsetX > 0 ? 0 : '100%'} ${cartState.offsetY > 0 ? 0 : '100%'}`
  return {
    transform,
    transformOrigin,
  }
})

</script>

<template>
  <div class="cart"
    @touchstart="handleTouchStart($event)"
    @touchmove="handleTouchMove($event)"
    @touchend="handleTouchEnd"
    :style="cartStyle"
  >
    <slot></slot>
  </div>
</template>


<style scoped>
.cart{
  width: 160px;
  height: 200px;
  background-color: rgb(184, 184, 184);
  border-radius: 20px;
  margin: 0 auto;
  /* transition: .25s; */
}
</style>