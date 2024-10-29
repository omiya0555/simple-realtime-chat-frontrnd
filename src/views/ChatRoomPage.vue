<template>
    <div class="chat">
        <h1 class="text-2xl font-bold mb-4">Chat with {{ otherUserName }}</h1>
        <div class="messages">
            <div v-for="message in messages" :key="message.id" class="message mb-2">
                <strong>{{ message.sender.name }}:</strong> {{ message.message }}
            </div>
        </div>
        <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type a message"
            class="border p-2 mt-4 w-full" />
    </div>
</template>

<script setup>
//import { ref, onMounted, getCurrentInstance } from 'vue';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const chatRoomId = route.params.id;
const userId = ref(null);
const otherUserName = ref(null);

const messages = ref([]);
const newMessage = ref('');

const fetchMessages = async () => {
    try {
        const response = await axios.get(`http://localhost/api/chat-rooms/${chatRoomId}/messages`);
        messages.value = response.data.messages; // 配列を直接代入
    } catch (error) {
        console.error('Failed to fetch messages:', error);
    }
};


const fetchOtherUser = async () => {
    try {
        const response = await axios.get(`http://localhost/api/chat-room/${chatRoomId}/other-user`);
        otherUserName.value = response.data.name;
    } catch (error) {
        console.error('Failed to fetch other user:', error);
    }
};

const sendMessage = async () => {
    if (newMessage.value.trim() !== '') {
        try {
            await axios.post('http://localhost/api/messages', {
                chat_room_id: chatRoomId,
                sender_id: userId.value,
                message: newMessage.value.trim(),
            });
            newMessage.value = '';
        } catch (error) {
            console.error('Failed to send message:', error);
        }
    }
    
};

onMounted(() => {
    fetchMessages();
    fetchOtherUser();
    
    // Laravel Echoを使用してリアルタイムでメッセージをリッスン
    const echo = window.Echo; // グローバルで定義された Echo を使用
    echo.channel(`chat`)
        .listen('.message.sent', (event) => { // ドットで始まるイベント名を使用
            console.log('Received event:', event); // デバッグ用に確認
            messages.value.push(event.message);
        });

});
</script>