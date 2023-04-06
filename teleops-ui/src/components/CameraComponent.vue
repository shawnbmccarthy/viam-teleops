<template>

</template>

<script setup lang="ts">
import { Stream, StreamClient } from '@viamrobotics/sdk';

interface Props {
  streamName: string
  streamClient: StreamClient
  id: string
  className: string
}

const props = defineProps<Props>();
</script>

<style scoped>

</style>
