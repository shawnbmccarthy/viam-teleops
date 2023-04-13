<template>
  <div>
      <h3>{{ signalHost }}</h3>
      <h3>{{ host }}</h3>
      <h3>{{ secret }}</h3>
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
