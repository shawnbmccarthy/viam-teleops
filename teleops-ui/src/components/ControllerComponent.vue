<template>
  <div>
    <b-navbar toggleable="sm" type="dark">
      <b-navbar-brand href="#">Teleop Demo</b-navbar-brand>
      <fa-icon :icon="['fas', 'dharmachakra']"/>
    </b-navbar>
    <div v-if="!streamClient">
      <div class="mt-xxl-5 pt-xxl-5 text-center">
          <h3>loading Cameras</h3>
          <div class="d-flex justify-content-center mb-3">
              <b-spinner style="width: 5rem; height: 5rem;"/>
          </div>
      </div>
    </div>
    <div v-else>
      <b-container fluid>
        <b-row>
          <b-col id="nav"/>
          <b-col>
            <div id="rear" class="img-wrapper">
              <b-img class="img-overlay" :src="lines"/>
            </div>
          </b-col>
          <b-col id="monitor">
            <div>
              <label for="power">base power: {{ power }}</label>
              <b-form-input id="power" v-model="power" type="range" min="0" max="100"/>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col fluid-grow id="left"/>
          <b-col fluid-grow>
            <div id="front" class="img-wrapper">
              <b-img class="img-overlay" :src="lines"/>
            </div>
          </b-col>
          <b-col fluid-grow id="right"/>
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
import { BaseClient, createRobotClient, StreamClient, type ServiceError } from '@viamrobotics/sdk'
import { displayError, displayWarning } from '@/lib/error'
import lines from '@/assets/lines.svg'

export type Keys = 'w' | 'a' | 's' | 'd'

interface Props {
    signalingHost: string,
    host: string,
    secret: string
}

const props = defineProps<Props>()
const streamClient = ref<StreamClient | null>(null)
const baseClient = ref<BaseClient | null>(null)
const power = ref<number>(50)

const pressed = new Set<Keys>()
let stopped = true

const enum Keymap {
  LEFT = 'a',
  RIGHT = 'd',
  FORWARD = 'w',
  BACKWARD = 's'
}

const stop = async () => {
  stopped = true
  try {
    if (baseClient.value) {
      await baseClient.value.stop()
    } else {
      displayError('base client is not initialized')
    }
  } catch (error) {
    displayError(error as ServiceError)
  }
}

const digestInput = async () => {
  let linearValue = 0;
  let angularValue = 0;

  for (const item of pressed) {
    switch (item) {
      case Keymap.FORWARD: {
        linearValue += Number(0.01 * power.value)
        break
      }
      case Keymap.BACKWARD: {
        linearValue -= Number(0.01 * power.value)
        break
      }
      case Keymap.LEFT: {
        angularValue += Number(0.01 * power.value)
        break
      }
      case Keymap.RIGHT: {
        angularValue -= Number(0.01 * power.value)
        break
      }
    }
  }

  const linear = {x: 0, y: linearValue, z: 0}
  const angular = {x: 0, y: 0, z: angularValue}

  try {
    if (baseClient.value) {
      await baseClient.value.setPower(linear, angular)
    } else {
      displayError('base client not initialized')
    }
  } catch (error) {
    displayError(error as ServiceError)
  }

  if (pressed.size <= 0) {
    await stop()
  }
}
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
            displayWarning(`failed to connect (${err}), attempting to retry (${attempts})`)
            attempts++;
        }
    }
    throw new Error('attempts to connect have failed');
}

const onTrack = (event) => {
  const eventStream = event.streams[0]
  if(!eventStream) {
    displayError('eventStream is not valid')
  }

  const streamName = eventStream.id;
  const streamContainer = document.querySelector(`[id=${streamName}]`)
  if (!streamContainer) {
    displayError('cannot find camera container')
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

const handleKeyDown = (key: Keys) => {
  pressed.add(key)
  digestInput()
}

const handleKeyUp = (key: Keys) =>  {
  pressed.delete(key)

  if (pressed.size > 0) {
    stopped = false
    digestInput()
  } else {
    stop()
  }
}

onMounted(async () => {
    /*
     * setup basic viam services
     */
    try {
      const robotClient = await connect()
      streamClient.value = new StreamClient(robotClient)
      baseClient.value = new BaseClient(robotClient, 'base')
      streamClient.value.on('track', onTrack)
      streamClient.value.add('rear')
      streamClient.value.add('left')
      streamClient.value.add('front')
      streamClient.value.add('right')
    } catch (error) {
      displayError(error as ServiceError)
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
  padding-bottom: 2%;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>