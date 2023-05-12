<template>
  <div :id="props.id" v-if="useOverlay">
    <b-img class="img-overlay" :src="lines"/>
  </div>
  <div :id="props.id" v-else>
      <b-img/>
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
.img-overlay {
    position: absolute;
    padding-bottom: 2%;
    bottom: 0;
    left: 0;
    right: 0;
}
</style>