<template>
    <div class="chat">
        <div class="messages max-w-4xl mx-auto bg-blue-200 rounded-md">
            <h2 class="text-2xl font-bold mb-4 p-2">Chat with {{ otherUserName }}</h2>
            <div v-for="message in messages" :key="message.id" class="message p-2">
                <div v-if="message.sender_id == otherUserId" class="flex justify-start">
                    <img :src="otherUserIcon" alt="User Icon" class="w-11 h-11 rounded-full">
                    <span class="ml-6 p-2 w-fit bg-white rounded-xl">{{ message.message }}</span>
                </div>
                <div v-if="message.sender_id != otherUserId" class="flex justify-end">
                    <span class="mr-6 p-2 w-fit bg-white rounded-xl">{{ message.message }}</span>
                    <img :src="currentUserIcon" alt="Your Icon" class="w-11 h-11 rounded-full">
                </div>
            </div>
            <div class="flex bg-white border p-2 w-full mx-auto">
                <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type a message" required
                class="w-full p-2"/>
                <svg @click="sendMessage" xlink="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" 
                    class="size-10 flex justify-end m-auto  p-1">
                    <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                </svg>
            </div>


        </div>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const chatRoomId = route.params.id;

const userId = ref(null);
const currentUserId = ref(null);
const currentUserIcon = ref(null);

const otherUserName = ref(null);
const otherUserId   = ref(null);
const otherUserIcon = ref(null);


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
        otherUserId.value   = response.data.id;
        otherUserIcon.value = response.data.path;

    } catch (error) {
        console.error('Failed to fetch other user:', error);
    }
};

const fetchUserIcon = async () => {
    try {
        const userIdResponse  = await axios.get('http://localhost/api/me');
        currentUserId.value = userIdResponse.data.id;

        const userIconResponse = await axios.get(`http://localhost/api/users/${currentUserId.value}`);
        currentUserIcon.value = userIconResponse.data.user[0].icon.path;
    } catch (error) {
        console.error('Failed to fetch users:', error);
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
    fetchUserIcon();
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