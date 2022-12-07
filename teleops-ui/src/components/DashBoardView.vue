<template>
  <div :id="id" :class="class"></div>
</template>

<script setup lang="ts">
import {onMounted} from 'vue'

interface Props {
  id: string,
  class: string
}

const props = defineProps<Props>()

onMounted(() => {
  console.debug(`loading dashboard(${props.id}) in class ${props.class}`)
})
</script>
