<script setup lang="ts">
  import { gsap } from 'gsap'
  import { computed, nextTick, watch, ref, onBeforeUpdate } from 'vue'

  const numberScrollList = ref<HTMLElement[]>([])

  const props = defineProps({
    targetValue: { type: Number, default: 0 }, // 目标数值
    duration: { type: Number, default: 2 }, // 动画时长（秒）
    scrollTrigger: { type: Boolean, default: false }, // 是否滚动触发
    reverse: { type: Boolean, default: false }, // 是否颠倒触发
  })

  const numList = computed(() => {
    const valueStr = props.targetValue.toString()
    const digits = valueStr.split('').map(Number)
    return digits
  })

  watch(
    () => props.targetValue,
    (newVal, oldVal) => {
      nextTick(() => {
        const items = numberScrollList.value
        if (!items || !items.length) return
        items.forEach((item, index) => {
          const targetY = -numList.value[index] * 1 + 'em'
          gsap.to(item, {
            y: targetY,
            duration: props.duration,
            ease: 'power2.inOut',
            scrollTrigger: props.scrollTrigger
              ? {
                  trigger: item,
                  start: 'top 80%',
                  toggleActions: `play none none ${props.reverse ? 'reverse' : 'none'}`,
                }
              : undefined,
          })
        })
      })
    },
    { immediate: true }
  )

  const handleRef = (el: any, index: number) => {
    if (el) {
      numberScrollList.value[index] = el // 按索引存储，保证顺序一致
    }
  }

  // 组件更新前清空数组（避免重复添加）
  onBeforeUpdate(() => {
    numberScrollList.value = []
  })
</script>

<template>
  <div class="number-scroll">
    <div class="number-scroll-container">
      <div
        :ref="(el) => handleRef(el, index)"
        v-for="(numItem, index) in numList"
        :key="index + 'key1'"
        class="number-scroll-item"
      >
        <ul class="number-scroll-list">
          <li v-for="num in 10" :key="num + 'key2'">{{ num - 1 }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .number-scroll {
    height: 1em;
    overflow: hidden;
    &-container {
      display: flex;
      height: 100%;
      overflow: hidden;
    }
    &-list {
      li {
        height: 1em;
      }
    }
  }
</style>
