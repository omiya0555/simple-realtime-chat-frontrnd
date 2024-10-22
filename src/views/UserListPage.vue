<template>
    <div class="home">
        <h1 class="text-2xl font-bold mb-4">User List</h1>
        <ul>
            <li v-for="user in users" :key="user.id" class="mb-2">
                <router-link :to="'/chat/' + user.id">{{ user.name }}</router-link>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const users = ref([
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
]);
</script>