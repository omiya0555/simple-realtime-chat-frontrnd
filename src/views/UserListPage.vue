<template>
    <div class="home">
        <h2 class="flex justify-center text-2xl text-gray-600 font-bold mb-24">My frends</h2>
        <div class="cards flex justify-center flex-wrap gap-8">
            <div v-for="user in users" :key="user.id" 
                @click="enterChatRoom(user.id)"
                class="card mb-2 bg-gray-200 border border-white shadow-lg backdrop-blur-md rounded-xl text-center cursor-pointer transition-all transform hover:scale-105 active:scale-95 active:rotate-1.7deg text-black font-bold flex items-center justify-center select-none w-[190px] h-[254px]">

                {{ user.name }}
            </div>
        </div>
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
        const userResponse      = await axios.get('http://localhost/api/me');
        currentUserId.value     = userResponse.data.id;

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