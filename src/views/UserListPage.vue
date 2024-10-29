<template>
    <div class="home">
        <h1 class="text-2xl font-bold mb-4">User List</h1>
        <ul>
            <li v-for="user in users" :key="user.id" class="mb-2">
                <button @click="enterChatRoom(user.id)">{{ user.name }}</button>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const users = ref([]);
const currentUserId = ref(null);
const router = useRouter();

const fetchUsers = async () => {
    try {
        const userResponse  = await axios.get('http://localhost/api/me');
        currentUserId.value = userResponse.data.id;

        const usersResponse = await axios.get('http://localhost/api/users');
        users.value = usersResponse.data.users.filter(
            user => user.id !== currentUserId.value
        );

    } catch (error) {
        console.error('Failed to fetch users:', error);
    }
};

const enterChatRoom = async (otherUserId) => {
    try {
        const response = await axios.post('http://localhost/api/chat-room', {
            other_user_id: otherUserId,
        });
        const chatRoomId = response.data.chat_room_id;
        router.push(`/chat/${chatRoomId}`);
    } catch (error) {
        console.error('Failed to enter chat room:', error);
    }
};

onMounted(() => {
    fetchUsers();
});


</script>