<script setup lang="ts">
import { ref, toRefs } from 'vue'
import { useInfiniteScroll } from '@vueuse/core'

const el = ref<HTMLElement>(null)
const data = ref([1,2,3,4,5,6,1,2,3,4,5,6,1,2,3,4,5,6])

useInfiniteScroll(
  el,
  () => {
    // load more
    data.value.push(1)
  },
  { distance: 10 }
)
</script>

<template>
  home
  <div ref="el">
    <div v-for="item in data">
      {{ item }}
    </div>
  </div>
</template>


<style scoped>

</style>