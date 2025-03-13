// views/Register.vue
<template>
  <div class="auth-container">
    <div class="auth-content">
      <div class="auth-branding">
        <h1 class="app-name">TaskFlow</h1>
        <p class="tagline">Organize your tasks, simplify your life</p>
      </div>
      
      <div class="auth-card">
        <h2>Create Account</h2>
        <p class="auth-subtitle">Join thousands of users managing tasks effectively</p>
        
        <div v-if="error" class="alert-error">
          <span class="error-icon">error</span>
          <span>{{ error }}</span>
        </div>
        
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="username">Username</label>
            <div class="input-wrapper">
              <span class="input-icon">person</span>
              <input 
                type="text" 
                id="username" 
                v-model="username" 
                class="form-control" 
                placeholder="johndoe"
                required
              />
            </div>
          </div>
          
          <div class="form-group">
            <label for="email">Email</label>
            <div class="input-wrapper">
              <span class="input-icon">email</span>
              <input 
                type="email" 
                id="email" 
                v-model="email" 
                class="form-control" 
                placeholder="your@email.com"
                required
              />
            </div>
          </div>
          
          <div class="form-group">
            <label for="password">Password</label>
            <div class="input-wrapper">
              <span class="input-icon">lock</span>
              <input 
                type="password" 
                id="password" 
                v-model="password" 
                class="form-control" 
                placeholder="••••••••"
                required
              />
            </div>
            <p class="password-hint">Must be at least 8 characters</p>
          </div>
          
          <button 
            type="submit" 
            class="submit-btn" 
            :disabled="loading"
          >
            <span v-if="loading" class="spinner"></span>
            <span v-else>Create Account</span>
          </button>
        </form>
        
        <div class="auth-links">
          <p>Already have an account? <router-link to="/login">Sign in</router-link></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'Register',
  setup() {
    const store = useStore()
    const router = useRouter()
    
    const username = ref('')
    const email = ref('')
    const password = ref('')
    const loading = ref(false)
    const error = ref(null)
    
    const handleSubmit = async () => {
      loading.value = true
      error.value = null
      
      try {
        await store.dispatch('register', {
          username: username.value,
          email: email.value,
          password: password.value
        })
        router.push('/')
      } catch (err) {
        error.value = err.response?.data?.message || 'Registration failed. Please try again.'
      } finally {
        loading.value = false
      }
    }
    
    return {
      username,
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
/* Same base styles as Login.vue */
.auth-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f6f9ff 0%, #edf2f7 100%);
  padding: 20px;
}

.auth-content {
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.auth-branding {
  text-align: center;
  margin-bottom: 40px;
}

.app-name {
  font-size: 36px;
  font-weight: 800;
  background: linear-gradient(90deg, #3a86ff, #5e60ce);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 8px;
}

.tagline {
  color: #718096;
  font-size: 18px;
}

.auth-card {
  width: 100%;
  max-width: 450px;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 40px;
}

h2 {
  font-size: 28px;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 8px;
}

.auth-subtitle {
  color: #718096;
  margin-bottom: 24px;
}

.alert-error {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background-color: #fff5f5;
  border-left: 4px solid #e53e3e;
  border-radius: 8px;
  color: #e53e3e;
  margin-bottom: 20px;
  font-size: 14px;
}

.error-icon {
  font-family: 'Material Icons', sans-serif;
  font-size: 18px;
  margin-right: 8px;
}

.form-group {
  margin-bottom: 24px;
}

label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 8px;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 12px;
  color: #a0aec0;
  font-family: 'Material Icons', sans-serif;
  font-size: 18px;
}

.form-control {
  width: 100%;
  padding: 12px 12px 12px 40px;
  font-size: 16px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  outline: none;
  transition: all 0.2s ease;
}

.form-control:focus {
  border-color: #3a86ff;
  box-shadow: 0 0 0 3px rgba(58, 134, 255, 0.1);
}

.form-control::placeholder {
  color: #cbd5e0;
}

.password-hint {
  font-size: 12px;
  color: #718096;
  margin-top: 6px;
}

.submit-btn {
  width: 100%;
  padding: 14px;
  background: linear-gradient(90deg, #3a86ff, #5e60ce);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(58, 134, 255, 0.25);
}

.submit-btn:disabled {
  background: #cbd5e0;
  transform: none;
  box-shadow: none;
  cursor: not-allowed;
}

.spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.auth-divider {
  display: flex;
  align-items: center;
  margin: 24px 0;
}

.auth-divider::before,
.auth-divider::after {
  content: "";
  flex: 1;
  border-bottom: 1px solid #e2e8f0;
}

.auth-divider span {
  padding: 0 10px;
  color: #a0aec0;
  font-size: 14px;
}

.social-btn {
  width: 100%;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-color: white;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.2s ease;
}

.social-btn:hover {
  background-color: #f7fafc;
}

.social-icon {
  font-weight: 700;
  color: #3a86ff;
}

.auth-links {
  margin-top: 24px;
  text-align: center;
  font-size: 14px;
  color: #718096;
}

.auth-links a {
  color: #3a86ff;
  font-weight: 600;
  text-decoration: none;
}

.auth-links a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .auth-card {
    padding: 30px 20px;
  }
}
</style>