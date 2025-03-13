// components/NavBar.vue
<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <router-link to="/">Todo App</router-link>
    </div>
    <div class="navbar-links">
      <template v-if="isAuthenticated">
        <span class="user-info">{{ username }}</span>
        <button class="btn btn-danger btn-sm" @click="logout">Logout</button>
      </template>
      <template v-else>
        <router-link to="/login" class="nav-link">Login</router-link>
        <router-link to="/register" class="nav-link">Register</router-link>
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
  padding: 15px 0;
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
}

.navbar-brand a {
  font-size: 24px;
  font-weight: 700;
  color: #4361ee;
  text-decoration: none;
}

.navbar-links {
  display: flex;
  align-items: center;
}

.nav-link {
  margin-left: 20px;
  color: #333;
  text-decoration: none;
  font-weight: 500;
}

.nav-link:hover {
  color: #4361ee;
}

.user-info {
  margin-right: 15px;
  font-weight: 500;
}

.btn-sm {
  padding: 5px 10px;
  font-size: 12px;
}
</style>
    