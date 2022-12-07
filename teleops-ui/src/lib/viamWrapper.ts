import { dialWebRTC } from '@viamrobotics/rpc'
import { WebRTCConfig } from '@viamrobotics/rpc/src/gen/proto/rpc/webrtc/v1/signaling_pb';

/*
 * TODO:
 *  - support for multiple ice servers?
 *
 * If successful return a valid WebRTCConnection
 * If failed return a null, which can be used to present a new retry button
 */
const dialTo = async (
  signalingHost: string,
  robotHost: string,
  robotSecret: string,
  iceServers: string,
  numRetries: number
) => {
  let webRTCConnection: any = null
  let attempts: number = 0

  while (!webRTCConnection && attempts < numRetries) {
    try {
      webRTCConnection = await dialWebRTC(
        signalingHost,
        robotHost,
        {
          authEntity: robotHost,
          credentials: {
            type: 'robot-location-secret',
            payload: robotSecret
          },
          webrtcOptions: {
            disableTrickleICE: false,
            signalingAuthEntity: robotHost,
            signalingCredentials: {
              type: 'robot-location-secret',
              payload: robotSecret
            },
            rtcConfig: {
              iceServers: [{ urls: iceServers }]
            }
          }
        }
      )
    }catch (err) {
      console.warn(`problem creating webrtc connection: ${err}, retrying`)
      attempts++
    }
  }
  if (!webRTCConnection) {
    console.error(`failed to connect after ${numRetries} attempts`)
  }
  return webRTCConnection
}




