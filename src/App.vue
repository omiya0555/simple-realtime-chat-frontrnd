<template>
  <div id="app">
    <nav class="p-4 bg-gray-200 mb-4">
      <router-link to="/" class="mr-4">Home</router-link>
      <router-link to="/profile" class="mr-4">Profile</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script setup>
</script>

<style scoped>
nav a {
  text-decoration: none;
  color: #333;
  padding: 0.5rem 1rem;
  border-radius: 4px;
}

nav a.router-link-active {
  background-color: #4f46e5;
  color: #fff;
}
</style>
