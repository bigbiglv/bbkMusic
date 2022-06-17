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
    startX.value = e.touches[0].clientX;
    startY.value = e.touches[0].clientY;
  })
  el?.addEventListener('touchmove', (e)=>{
    
    let X = e.touches[0].clientX - startX.value;
    let Y = e.touches[0].clientY - startY.value;
    if(isTouch.value) {
      //超出当前元素的范围阻止默认事件会报错
      if(e.cancelable) e.preventDefault() 
      x.value = X
      y.value = Y
      return
    }
    //偏移量大于20才算滑动 事实上这里是先执行的
    if(Math.abs(X) > 20 || Math.abs(Y) > 20) {
      isTouch.value = true;
    }
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