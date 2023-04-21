<template>
  <div>
    <ControllerComponent
      :signaling-host="signalHost"
      :host="host"
      :secret="secret"
    ></ControllerComponent>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ControllerComponent from '@/components/ControllerComponent.vue';

const signalHost = ref<string>(process.env.VUE_APP_SIGNAL_HOST);
const host = ref<string>(process.env.VUE_APP_ROBOT_ADDR);
const secret = ref<string>(process.env.VUE_APP_ROBOT_SECRET);

</script>

<style>

</style>
