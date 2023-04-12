<template>
  <div>
    <h1>Controller</h1>
  </div>
</template>

<style>

</style>

<script setup lang="ts">
/*
 * implement controller components
 */
import {
  defineProps,
  onMounted,
} from 'vue';
import { createRobotClient } from '@viamrobotics/sdk';

interface Props {
  signalingHost: string,
  host: string,
  secret: string
}

const props = defineProps<Props>();

const dialTo = () => {
  console.log(`host: ${props.host}`);
  console.log(`secret: ${props.secret}`);
  console.log(`signal: ${props.signalingHost}`);
  return createRobotClient({
    host: props.host,
    credential: {
      type: 'robot-location-secret',
      payload: props.secret,
    },
    authEntity: props.host,
    signalingAddress: props.signalingHost,
  });
};

onMounted(async () => {
  console.log('attempting dial');
  dialTo().then((client) => {
    console.log(`client: ${client}`);
  });
});
</script>
