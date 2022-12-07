<template>
  <div :id="id" :class="class"></div>
</template>

<script setup lang="ts">
import { defineEmits, onMounted, onUnmounted } from 'vue'
import { StreamServiceClient, ServiceError } from '../gen/js/proto/stream/v1/stream_pb_service'
import { AddStreamRequest, RemoveStreamRequest } from '../gen/js/proto/stream/v1/stream_pb'

interface Props {
  streamName: string,
  streamClient: StreamServiceClient,
  id: string,
  class: string
}

const props = defineProps<Props>()
const emits = defineEmits<{(e: 'trackChange'): void}>()

const loadStream = async () => {
  const addStreamRequest = new AddStreamRequest()
  addStreamRequest.setName(props.streamName)
  props.streamClient.addStream(addStreamRequest, (err: ServiceError | null) => {
    if (err) {
      console.error(`Error adding stream(${props.streamName}): ${err}`)
    } else {
      emits('trackChange')
    }
  })
}

const removeStream = async () => {
  const removeStreamRequest = new RemoveStreamRequest()
  removeStreamRequest.setName(props.streamName)
  props.streamClient.removeStream(removeStreamRequest, (err: ServiceError | null) => {
    if (err) {
      console.error(`Error removing stream(${props.streamName}): ${err}`)
    }
  })
}

onMounted(async () => await loadStream())
onUnmounted(async () => await removeStream())

</script>
