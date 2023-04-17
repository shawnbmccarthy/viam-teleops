import { defineStore } from 'pinia'
import { ref } from 'vue'

/*
 * during runtime we will allow the user to change the type of controller to use
 * TODO: need to implement and test
 *       Add ability to change robots we are controlling
 */
export const useSettingStore = defineStore('settings', () => {
    const controllerType = ref('keyboard')

    const useKeyboard = () => {
        controllerType.value = 'keyboard'
    }
    const useJoystick = () => {
        controllerType.value = 'joystick'
    }

    const useGamepad = () => {
        controllerType.value = 'gamepad'
    }
})