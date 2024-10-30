<template>
  <div id="app">
    <nav v-if="isLoggedIn" class="flex justify-between items-center p-4 mb-4 border">
      <div>
        <router-link to="/" class="mr-4 nav-link">Frends</router-link>
        <router-link to="/profile" class="mr-4 nav-link">Profile</router-link>
      </div>
      <div>
        <button @click="logout" class="text-red-600">Logout</button>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script setup>
import { ref,onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isLoggedIn = ref(!!localStorage.getItem('access_token'));

const logout = async () => {
  if(confirm('ログアウトしますか？')){
    try {
      await fetch('http://localhost/api/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      localStorage.removeItem('access_token');
      localStorage.removeItem('expires_at');
      isLoggedIn.value = false;
      router.push({ name: 'Login' });
    }
  }
};
onMounted(() => {
  isLoggedIn.value = !!localStorage.getItem('access_token');
});

</script>

<style scoped>
.nav-link {
  @apply no-underline text-gray-600 py-2 px-4 rounded;
}

.nav-link.router-link-active {
  @apply bg-gray-500 text-white;
}
</style>