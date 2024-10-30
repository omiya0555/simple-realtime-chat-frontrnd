<template>
    <div class="profile">
        <h2 class="flex justify-center text-2xl text-gray-600 font-bold mb-24">Profile</h2>
        <div class="card mb-2 bg-gray-200 border border-white shadow-lg backdrop-blur-md rounded-xl text-center cursor-pointer transition-all transform hover:scale-105 active:scale-95 active:rotate-1.7deg text-black font-bold flex items-center justify-center select-none w-[190px] h-[254px] m-auto">        
            <div class="user-info flex flex-col">
                <span><strong>Name:</strong>{{ currentUserName }}</span>
                <span><strong>Email:</strong>{{ currentUserEmail }}</span>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const currentUserName = ref(null);
const currentUserEmail = ref(null);

const fetchUser = async () => {
    try {
        const userResponse  = await axios.get('http://localhost/api/me');
        currentUserName.value = userResponse.data.name;
        currentUserEmail.value = userResponse.data.email;

    } catch (error) {
        console.error('Failed to fetch users:', error);
    }
};

onMounted(() => {
    fetchUser();
});


</script>