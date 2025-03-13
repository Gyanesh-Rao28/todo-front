// components/NavBar.vue
<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <router-link to="/">
        <span class="logo-text">TaskFlow</span>
      </router-link>
    </div>
    <div class="navbar-links">
      <template v-if="isAuthenticated">
        <div class="user-info">
          <span class="user-avatar">{{ username.charAt(0).toUpperCase() }}</span>
          <span class="username">{{ username }}</span>
        </div>
        <button class="logout-btn" @click="logout">
          <i class="icon">logout</i>
          <span>Logout</span>
        </button>
      </template>
      <template v-else>
        <router-link to="/login" class="nav-link">Login</router-link>
        <router-link to="/register" class="nav-btn">Get Started</router-link>
      </template>
    </div>
  </nav>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'NavBar',
  setup() {
    const store = useStore()
    const router = useRouter()
    
    const isAuthenticated = computed(() => store.getters.isAuthenticated)
    const username = computed(() => store.getters.getUser?.username || '')
    
    const logout = () => {
      store.dispatch('logout')
      router.push('/login')
    }
    
    return {
      isAuthenticated,
      username,
      logout
    }
  }
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background-color: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar-brand a {
  font-size: 24px;
  font-weight: 800;
  color: #3a86ff;
  text-decoration: none;
  letter-spacing: -0.5px;
}

.logo-text {
  background: linear-gradient(90deg, #3a86ff, #5e60ce);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.navbar-links {
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav-link {
  color: #4a5568;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.nav-link:hover {
  color: #3a86ff;
}

.nav-btn {
  background: linear-gradient(90deg, #3a86ff, #5e60ce);
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
}

.nav-btn:hover {
  box-shadow: 0 4px 12px rgba(94, 96, 206, 0.25);
  transform: translateY(-2px);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.user-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #3a86ff, #5e60ce);
  color: white;
  border-radius: 50%;
  font-weight: 600;
}

.username {
  font-weight: 500;
  color: #2d3748;
}

.logout-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background-color: #f7fafc;
  border: 1px solid #e2e8f0;
  color: #4a5568;
  padding: 8px 12px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.logout-btn:hover {
  background-color: #edf2f7;
  color: #3a86ff;
}

.icon {
  font-family: 'Material Icons', sans-serif;
  font-size: 18px;
}
</style>