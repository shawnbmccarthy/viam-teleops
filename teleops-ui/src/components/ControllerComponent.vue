<template>
  <div>
    <BasicNavbar />
    <div v-if="!streamClient">
      <LoadingComponent/>
    </div>
    <div v-else>
      <TeleopComponents :robot-client="robotClient" :use-overlay="true" base-name="base"/>
    </div>
  </div>
</template>

<script setup lang="ts">
/*
 * TODO: This is a basic skeleton of a teleop demonstration
 *       - need to add dynamic settings for keyboard and robot switching
 */
import {defineProps, onMounted, onUnmounted, ref} from 'vue'
import {BaseClient, createRobotClient, RobotClient, StreamClient, Vector3D} from '@viamrobotics/sdk'
import BasicNavbar from '@/components/BasicNavbar.vue'
import LoadingComponent from '@/components/LoadingComponent.vue'
import TeleopComponents from '@/components/TeleopComponents.vue'
import lines from '@/assets/lines.svg'

interface Props {
    signalingHost: string,
    host: string,
    secret: string
}

const props = defineProps<Props>()
const robotClient = ref<RobotClient | null>(null)
const streamClient = ref<StreamClient | null>(null)

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

onMounted(async () => {
  try {
    robotClient.value = await connect()
    streamClient.value = new StreamClient(robotClient.value)
  } catch (error) {
    console.error(`failed to create a client connection ${error}`)
  }
  /*
   * todo setup control options here
   */
})

onUnmounted(async () => {
  if (robotClient.value) {
    robotClient.value.disconnect()
  }
})

</script>

<style scoped>
.img-wrapper {
  position: relative;
  width: 100%;
}

.img-overlay {
  position: absolute;
  padding-bottom: 2%;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>