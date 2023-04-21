<template>
  <b-container fluid>
    <b-row>
      <b-col>
        <MonitorComponent type="nav"/>
      </b-col>
      <b-col>
        <CameraComponent
          id="rear"
          class="img-wrapper"
          :use-overlay="useOverlay"
          :stream-client="streamClient"/>
      </b-col>
      <b-col>
        <MonitorComponent :id="baseName" type="controls"/>
      </b-col>
    </b-row>
    <b-row>
      <b-col fluid-grow>
        <CameraComponent id="left" :use-overlay="false" :stream-client="streamClient"/>
      </b-col>
      <b-col fluid-grow>
        <CameraComponent
          id="front"
          class="img-wrapper"
          :use-overlay="useOverlay"
          stream-client=""/>
      </b-col>
      <b-col fluid-grow>
        <CameraComponent id="right" :use-overlay="false" stream-client=""/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script setup lang="ts">
import {defineProps, onMounted, onUnmounted, ref} from 'vue'
import CameraComponent from '@/components/CameraComponent.vue'
import MonitorComponent from '@/components/MonitorComponent.vue'
import {BaseClient, RobotClient, StreamClient} from '@viamrobotics/sdk'

const streamClient = ref<StreamClient | null>(null)
const baseClient = ref<BaseClient | null>(null)

interface Props {
    robotClient: RobotClient
    useOverlay: boolean
    baseName: string
}

const props = defineProps<Props>()

const onTrack = (event) => {
    const eventStream = event.streams[0]
    if(!eventStream) {
        console.error('eventStream is not valid')
    }

    const streamName = eventStream.id;
    const streamContainer = document.querySelector(`[id=${streamName}]`)
    if (!streamContainer) {
        console.error('cannot find camera container')
    } else {
        const mediaElement = document.createElement(event.track.kind)
        mediaElement.id = 'camstream'
        mediaElement.classList.add('embed-responsive-item')
        mediaElement.classList.add('mh-100')
        mediaElement.classList.add('mw-100')
        streamContainer.appendChild(mediaElement)
        mediaElement.autoplay = true
        mediaElement.srcObject = eventStream
        if (mediaElement instanceof HTMLVideoElement){
            mediaElement.playsInline = true
            mediaElement.controls = false
        }
    }
}
onMounted(() => {
    baseClient.value = new BaseClient(props.robotClient, props.baseName)
    streamClient.value = new StreamClient(props.robotClient)
    streamClient.value.on('track', onTrack)
})

onUnmounted(() => {
  if (streamClient.value) {
    streamClient.value.off('track', onTrack)
  }
})

</script>

<style scoped>

</style>