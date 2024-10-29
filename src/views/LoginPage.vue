<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
            <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h2>
            <form @submit.prevent="login">
                <div class="mb-4">
                    <label class="block text-gray-700 font-semibold mb-2" for="email">Email</label>
                    <input id="email" type="email" v-model="email" required
                        class="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                        placeholder="Enter your email" />
                </div>
                <div class="mb-6">
                    <label class="block text-gray-700 font-semibold mb-2" for="password">Password</label>
                    <input id="password" type="password" v-model="password" required
                        class="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                        placeholder="Enter your password" />
                </div>
                <button type="submit"
                    class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
                    Login
                </button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const email = ref();
const password = ref();
const router = useRouter();

const login = async () => {
    try {
        const response = await axios.post('http://localhost/api/login', {
            email: email.value,
            password: password.value,
        });

        // 認証情報を保存
        const token = response.data.token;
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 1);

        // トークンと有効期限を保存
        localStorage.setItem('access_token', token);
        localStorage.setItem('expires_at', expiresAt.toISOString());

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // リダイレクト
        router.push('/').then(() => {
            window.location.reload(); // 状態を強制的に再描画させる
        });

    } catch (error) {
        alert('Login failed: ' + error.response.data.message);
    }
};
</script>

<style scoped>
/* カスタムスタイルを追加する場合はここに記述 */
</style>