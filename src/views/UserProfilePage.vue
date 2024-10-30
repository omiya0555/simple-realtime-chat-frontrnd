<template>
    <div class="profile">
        <h1 class="text-2xl font-bold mb-4">Profile</h1>
        <div class="user-info">
            <p><strong>Name:</strong>{{ currentUserName }}</p>
            <p><strong>Email:</strong>{{ currentUserEmail }}</p>
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