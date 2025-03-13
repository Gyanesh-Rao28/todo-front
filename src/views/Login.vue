// views/Login.vue
<template>
  <div class="auth-container">
    <div class="auth-card">
      <h2>Login</h2>
      <div v-if="error" class="alert alert-danger">{{ error }}</div>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="email">Email</label>
          <input 
            type="email" 
            id="email" 
            v-model="email" 
            class="form-control" 
            required
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input 
            type="password" 
            id="password" 
            v-model="password" 
            class="form-control" 
            required
          />
        </div>
        <button 
          type="submit" 
          class="btn btn-primary btn-block" 
          :disabled="loading"
        >
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>
      </form>
      <div class="auth-links">
        <p>Don't have an account? <router-link to="/register">Register</router-link></p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'Login',
  setup() {
    const store = useStore()
    const router = useRouter()
    
    const email = ref('')
    const password = ref('')
    const loading = ref(false)
    const error = ref(null)
    
    const handleSubmit = async () => {
      loading.value = true
      error.value = null
      
      try {
        await store.dispatch('login', {
          email: email.value,
          password: password.value
        })
        router.push('/')
      } catch (err) {
        error.value = err.response?.data?.message || 'Login failed. Please check your credentials.'
      } finally {
        loading.value = false
      }
    }
    
    return {
      email,
      password,
      loading,
      error,
      handleSubmit
    }
  }
}
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 20px;
}

.auth-card {
  width: 100%;
  max-width: 400px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 30px;
}

h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.btn-block {
  width: 100%;
  margin-top: 10px;
}

.auth-links {
  margin-top: 20px;
  text-align: center;
}

.auth-links a {
  color: #4361ee;
  text-decoration: none;
}

.auth-links a:hover {
  text-decoration: underline;
}
</style>
