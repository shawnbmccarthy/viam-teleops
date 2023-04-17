<template>
<div></div>
</template>

<script setup lang="ts">
import { defineProps, onMounted } from 'vue'
import { StreamClient } from '@viamrobotics/sdk'

interface Props {
    id: string,
    streamClient: StreamClient
}

const props = defineProps<Props>()

const onTrack = (event) => {
    console.log(`event: ${event}`)
}

onMounted(() => {
    console.log(`id: ${props.id}`)
    console.log(props.streamClient)
    props.streamClient.on('track', onTrack)

    try {
        props.streamClient.add(props.id)
    }catch(error){
        console.error(`problem adding stream: ${error}`)
    }
})
</script>

<style scoped>

</style>