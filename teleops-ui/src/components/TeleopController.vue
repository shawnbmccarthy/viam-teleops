<template>
  <div :id="id">
    <CameraView id="rear" class="rearView" stream-client="" stream-name=""/>
    <CameraView id="front" class="frontView" stream-client="" stream-name=""/>
    <CameraView id="left" class="leftView" stream-client="" stream-name=""/>
    <CameraView id="right" class="rightView" stream-client="" stream-name=""/>

  </div>
</template>

<script setup lang="ts">
/*
 * basic support
 * TODO:
 *  - custom controller mappings
 *  - different controllers (gamepad, keypressed)
 */
import {onMounted} from 'vue'
import {StreamServiceClient} from '../gen/js/proto/stream/v1/stream_pb_service'
import CameraView from './CameraView.vue'

interface Props {
  webRtcConnection: any,
  streamServiceClient: StreamServiceClient
}

onMounted(() => {
  console.debug(`viam teleop controller mounted, building out drive view`)
})
</script>
