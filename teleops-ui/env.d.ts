/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_VIAM_ROBOT_PAYLOAD: string,
  readonly VITE_VIAM_ROBOT_ADDRESS: string,
  readonly VITE_VIAM_SIGNAL_HOST: string,
  readonly VITE_VIAM_ICE_SERVER: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
