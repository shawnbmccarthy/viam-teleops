<template>
  <div v-if="useOverlay">
    <b-img class="img-overlay" :src="lines"></b-img>
  </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted } from 'vue'
import { StreamClient } from '@viamrobotics/sdk'
import lines from '@/assets/lines.svg'

interface Props {
    id: string
    streamClient: StreamClient
    useOverlay: boolean
}

const props = defineProps<Props>()

onMounted(() => {
    try {
        props.streamClient.add(props.id)
    }catch(error){
        console.error(`problem adding stream: ${error}`)
    }
})
</script>

<style scoped>

</style>