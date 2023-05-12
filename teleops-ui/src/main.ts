import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

// font awesome
/*
 * TODO: pull out only the fonts we are using to reduce the chunk size
 */
import { dom, library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faGear, faDharmachakra } from '@fortawesome/free-solid-svg-icons'
import { faDiscord } from '@fortawesome/free-brands-svg-icons'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { BootstrapVue3 } from 'bootstrap-vue-3'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

library.add(faDharmachakra,faDiscord, faUser, faGear)
dom.watch()

createApp(App)
    .component('fa-icon', FontAwesomeIcon)
    .use(BootstrapVue3)
    .use(createPinia())
    .mount('#app')
