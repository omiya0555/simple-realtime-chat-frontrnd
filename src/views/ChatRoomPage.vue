<template>
    <div class="chat">
        <h1 class="text-2xl font-bold mb-4">Chat with {{ userName }}</h1>
        <div class="messages">
            <div v-for="message in messages" :key="message.id" class="message mb-2">
                <strong>{{ message.sender }}:</strong> {{ message.text }}
            </div>
        </div>
        <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type a message"
            class="border p-2 mt-4 w-full" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
// import { useRoute } from 'vue-router';

// const route = useRoute();
// const userId = route.params.id;
const userName = ref(''); // 本来はユーザー情報から取得

const messages = ref([
    { id: 1, sender: 'Alice', text: 'Hello!' },
    { id: 2, sender: 'Bob', text: 'Hi there!' },
]);

const newMessage = ref('');

const sendMessage = () => {
    if (newMessage.value.trim() !== '') {
        messages.value.push({
            id: Date.now(),
            sender: 'You',
            text: newMessage.value.trim(),
        });
        newMessage.value = '';
    }
};
</script>