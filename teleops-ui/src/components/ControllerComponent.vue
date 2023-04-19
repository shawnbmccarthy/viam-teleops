<template>
  <div>
    <BasicNavbar />
    <div v-if="!streamClient">
      <div><h3>loading</h3></div>
    </div>
    <div v-else>
      <b-container fluid class="m-0 p-0 text-center">
        <b-row class="w-100">
          <b-col id="nav" class="w-25"></b-col>
          <b-col class="w-50 embed-responsive embed-responsive-4by3">
            <div id="rear" class="img-wrapper">
              <b-img class="img-overlay" :src="lines"></b-img>
            </div>
          </b-col>
          <b-col id="monitor" class="w-25"></b-col>
        </b-row>
        <b-row class="w-100">
          <b-col fluid-grow id="left" class="embed-responsive embed-responsive-1by1"></b-col>
          <b-col fluid-grow class="embed-responsive embed-responsive-1by1">
            <div id="front" class="img-wrapper">
              <b-img class="img-overlay" :src="lines"></b-img>
            </div>
          </b-col>
          <b-col fluid-grow id="right" class="embed-responsive embed-responsive-1by1"></b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script setup lang="ts">
/*
 * TODO: This is a basic skeleton of a teleop demonstration
 *       - need to add dynamic settings for keyboard and robot switching
 */
import { defineProps, onMounted, ref } from 'vue'
import { createRobotClient, StreamClient } from '@viamrobotics/sdk'
import BasicNavbar from '@/components/BasicNavbar.vue'
import lines from '@/assets/lines.svg'

interface Props {
    signalingHost: string,
    host: string,
    secret: string
}

const props = defineProps<Props>()
const streamClient = ref<StreamClient | null>(null)

const show = true
/*
 * simple connection loop
 */
const connect = async () => {
    let connected = false;
    let attempts = 0;

    while(!connected && attempts < 5) {
        try {
            return await createRobotClient({
                host: props.host,
                authEntity: props.host,
                signalingAddress: props.signalingHost,
                credential: {
                    type: 'robot-location-secret',
                    payload: props.secret
                },
                iceServers: [{ urls: 'stun:global.stun.twilio.com:3478' }]
            })
        } catch (err) {
            console.warn(`failed to connect (${err}), attempting to retry (${attempts})`);
            attempts++;
        }
    }
    throw new Error('attempts to connect have failed');
}

const onTrack = (event) => {
  const eventStream = event.streams[0]
  if(!eventStream) {
    console.error('eventStream is not valid')
  }

  const kind = 'track'
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

onMounted(async () => {
    try {
      const robotClient = await connect()
      streamClient.value = new StreamClient(robotClient)
      streamClient.value.on('track', onTrack)
      streamClient.value.add('rear')
      streamClient.value.add('left')
      streamClient.value.add('front')
      streamClient.value.add('right')
    } catch (error) {
        console.error(`failed to create a client connection ${error}`)
    }
    /*
     * todo setup control options here
     */
})
</script>

<style scoped>
.img-wrapper {
  position: relative;
  width: 100%;
}

.img-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>