<template>
  <div>
      <h3>hello from controller</h3>
  </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted, ref } from 'vue';
import {createRobotClient, RobotClient, StreamClient} from '@viamrobotics/sdk';

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
    console.error('all attempts to connect to robot have failed');
    return null;
}
onMounted(async () => {
    const robotClient = await connect();
    streamClient.value = new StreamClient(robotClient);

    /*
     * todo setup control options here
     */
})
</script>

<style scoped>

</style>