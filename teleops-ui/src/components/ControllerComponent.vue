<template>
  <div>
    <BasicNavbar />
    <div v-if="!streamClient">
      <div><h3>loading</h3></div>
    </div>
    <div v-else>
      <div id="nav"></div>
      <div id="rear" data-stream="rear"></div>
      <div id="monitor"></div>
      <div id="left" data-stream="left"></div>
      <div id="front" data-stream="front"></div>
      <div id="right" data-stream="right"></div>
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

interface Props {
    signalingHost: string,
    host: string,
    secret: string
}

const props = defineProps<Props>();
const streamClient = ref<StreamClient | null>(null);

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
    console.log(`onTrack -> ${event}`)
    const eventStream = event.streams[0]
    if(!eventStream) {
      console.error('eventStream is not valid')
    }

    const kind = 'track'
    const streamName = eventStream.id;
    console.log(`${kind} -> ${streamName}`)
    const streamContainer = document.querySelector(`[id=${streamName}]`)
    console.log(`streamContainer: ${streamContainer}`)

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

</style>