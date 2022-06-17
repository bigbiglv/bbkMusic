/*
* 返回出手指在输入元素的滑动方向的数值
*/
import { ref } from 'vue';
export default function useTouch(el: HTMLElement) {
  
  //两个轴的滑动距离
  const x = ref(0);
  const y = ref(0);
  //一开始点击的位置
  const startX = ref(0);
  const startY = ref(0);
  //touch的状态
  const isTouch = ref(false);
  el?.addEventListener('touchstart', (e:TouchEvent)=>{
    e.preventDefault()
    startX.value = e.touches[0].clientX;
    startY.value = e.touches[0].clientY;
    isTouch.value = true;
  })
  el?.addEventListener('touchmove', (e)=>{
    x.value = e.touches[0].clientX - startX.value;
    y.value = e.touches[0].clientY - startY.value;
  })
  el?.addEventListener('touchend', ()=>{
    startX.value = 0;
    startY.value = 0;
    isTouch.value = false;
  })
  /*
  * 负数时向上/向左 
  * 正数时向下/向右
  */ 
  return{
    x,
    y,
    isTouch
  }
}