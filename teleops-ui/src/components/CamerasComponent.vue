<template>
  <div>
    <CameraComponent id="rear" :stream-client="streamClient" />
    <CameraComponent id="front" :stream-client="streamClient" />
    <CameraComponent id="left" :stream-client="streamClient" />
    <CameraComponent id="right" :stream-client="streamClient" />
  </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted } from 'vue'
import CameraComponent from '@/components/CameraComponent.vue'
import { StreamClient } from '@viamrobotics/sdk'

interface Props {
    streamClient: StreamClient
}

const props = defineProps<Props>()

onMounted(() => {
    console.log(`cameras: ${props.streamClient.add}`)
})

</script>

<style scoped>

</style>