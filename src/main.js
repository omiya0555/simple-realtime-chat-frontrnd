import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
import './index.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)

app.mount('#app')

window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: process.env.VITE_PUSHER_APP_KEY,
    cluster: process.env.VITE_PUSHER_APP_CLUSTER,
    forceTLS: true,
});