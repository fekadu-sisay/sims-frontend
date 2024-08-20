import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import './assets/index.css'
import router from './router'
import VeeValidatePlugin from './includes/validation'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
// import VeeValidatePlugin from './includes/validation'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VeeValidatePlugin)
// app.user('VeeValidatePlugin', VeeValidatePlugin)

app.mount('#app')
