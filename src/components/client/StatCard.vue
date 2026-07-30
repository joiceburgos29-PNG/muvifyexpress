<template>
  <div :class="['rounded-lg shadow p-6 border-l-4', borderColorClass]">
    <p class="text-gray-600 text-sm font-medium mb-2">{{ title }}</p>
    <p :class="['text-4xl font-bold', textColorClass]">{{ value }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  title: string
  value: number
  color?: 'blue' | 'yellow' | 'green' | 'purple'
}

const props = withDefaults(defineProps<Props>(), {
  color: 'blue'
})

const borderColorClass = computed(() => {
  const colors: Record<string, string> = {
    blue: 'border-blue-500 bg-blue-50',
    yellow: 'border-yellow-500 bg-yellow-50',
    green: 'border-green-500 bg-green-50',
    purple: 'border-purple-500 bg-purple-50'
  }
  return colors[props.color]
})

const textColorClass = computed(() => {
  const colors: Record<string, string> = {
    blue: 'text-blue-600',
    yellow: 'text-yellow-600',
    green: 'text-green-600',
    purple: 'text-purple-600'
  }
  return colors[props.color]
})
</script>

<style scoped>
</style>
