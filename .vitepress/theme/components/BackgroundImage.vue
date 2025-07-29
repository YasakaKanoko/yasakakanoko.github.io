<template>
  <div class="background-image" :style="backgroundStyle">
    <slot></slot>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  // 背景图 URL
  imageUrl: {
    type: String,
    required: true
  },
  // 背景图定位
  position: {
    type: String,
    default: 'center'
  },
  // 背景图大小
  size: {
    type: String,
    default: 'cover'
  },
  // 背景图重复
  repeat: {
    type: String,
    default: 'no-repeat'
  },
  // 新增透明度属性
  opacity: {
    type: [Number, String],
    default: 1,
    validator: (value) => {
      const num = Number(value)
      return num >= 0 && num <= 1
    }
  }
})

// 计算背景样式
const backgroundStyle = computed(() => ({
  backgroundImage: `url(${props.imageUrl})`,
  backgroundPosition: props.position,
  backgroundSize: props.size,
  backgroundRepeat: props.repeat,
  minHeight: '100vh',
  width: '100%',
  opacity: props.opacity // 添加透明度
}))
</script>

<style scoped>
.background-image {
  position: relative;
}
</style>
