import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
import axios from 'axios'
import './index.css'

// トークンの有効期限を確認
const token     = localStorage.getItem('access_token');
const expiresAt = localStorage.getItem('expires_at');

if (token && expiresAt) {
    const now = new Date();
    if (new Date(expiresAt) > now) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        // 有効期限切れの場合、トークンを削除
        localStorage.removeItem('access_token');
        localStorage.removeItem('expires_at');
    }
}


// Pusherの設定
window.Pusher = Pusher;

// Laravel Echo の設定
window.Echo = new Echo({
    broadcaster: 'pusher',
    key: "a3793a14555006c29e72",
    cluster: "ap3",
    forceTLS: true,
});

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount('#app');



// const echoInstance = new Echo({
//     broadcaster: 'pusher',
//     key: "a3793a14555006c29e72",
//     cluster: "ap3",
//     forceTLS: true,
// });

// const app = createApp(App);
// app.config.globalProperties.$echo = echoInstance;
// app.use(createPinia());
// app.use(router);
// app.mount('#app');
