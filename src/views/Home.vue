// views/Home.vue
<template>
  <div class="home-container">
    <div class="welcome-header">
      <div class="greeting">
        <h1>Hello, {{ username }}</h1>
        <p class="date">{{ today }}</p>
      </div>
      <div class="stats">
        <div class="stat-item">
          <span class="stat-value">{{ completedTodos }}</span>
          <span class="stat-label">Completed</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ pendingTodos }}</span>
          <span class="stat-label">Pending</span>
        </div>
      </div>
    </div>
    
    <div class="todo-app">
      <TodoForm @add-todo="addTodo" />
      
      <div v-if="loading" class="loading-container">
        <div class="loader"></div>
        <p>Loading your tasks...</p>
      </div>
      
      <div v-else-if="error" class="error-container">
        <span class="error-icon">error</span>
        <p>{{ error }}</p>
        <button class="retry-btn" @click="fetchTodos">Try Again</button>
      </div>
      
      <TodoList 
        v-else
        :todos="todos" 
        @update-todo="updateTodo" 
        @delete-todo="deleteTodo" 
      />
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import TodoForm from '../components/TodoForm.vue'
import TodoList from '../components/TodoList.vue'

export default {
  name: 'Home',
  components: {
    TodoForm,
    TodoList
  },
  setup() {
    const store = useStore()
    const todos = computed(() => store.getters.getTodos)
    const username = computed(() => store.getters.getUser?.username || 'Friend')
    const loading = ref(false)
    const error = ref(null)
    
    // Get today's date in a nice format
    const today = computed(() => {
      const date = new Date()
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
      return date.toLocaleDateString('en-US', options)
    })
    
    // Calculate stats
    const completedTodos = computed(() => todos.value.filter(todo => todo.completed).length)
    const pendingTodos = computed(() => todos.value.filter(todo => !todo.completed).length)

    const fetchTodos = async () => {
      loading.value = true
      error.value = null
      try {
        await store.dispatch('fetchTodos')
      } catch (err) {
        error.value = err.message || 'Failed to fetch todos'
      } finally {
        loading.value = false
      }
    }

    onMounted(fetchTodos)

    const addTodo = async (text) => {
      try {
        await store.dispatch('createTodo', text)
      } catch (err) {
        error.value = err.message || 'Failed to add todo'
        setTimeout(() => {
          error.value = null
        }, 3000)
      }
    }

    const updateTodo = async (id, text, completed) => {
      try {
        await store.dispatch('updateTodo', { id, text, completed })
      } catch (err) {
        error.value = err.message || 'Failed to update todo'
        setTimeout(() => {
          error.value = null
        }, 3000)
      }
    }

    const deleteTodo = async (id) => {
      try {
        await store.dispatch('deleteTodo', id)
      } catch (err) {
        error.value = err.message || 'Failed to delete todo'
        setTimeout(() => {
          error.value = null
        }, 3000)
      }
    }

    return {
      todos,
      username,
      loading,
      error,
      today,
      completedTodos,
      pendingTodos,
      addTodo,
      updateTodo,
      deleteTodo,
      fetchTodos
    }
  }
}
</script>

<style scoped>
.home-container {
  padding: 40px 20px;
  max-width: 800px;
  margin: 0 auto;
}

.welcome-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.greeting h1 {
  font-size: 32px;
  font-weight: 800;
  color: #2d3748;
  margin-bottom: 8px;
  background: linear-gradient(90deg, #3a86ff, #5e60ce);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.date {
  color: #718096;
  font-size: 16px;
}

.stats {
  display: flex;
  gap: 20px;
}

.stat-item {
  padding: 12px 20px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  text-align: center;
  min-width: 100px;
}

.stat-value {
  display: block;
  font-size: 24px;
  font-weight: 700;
  color: #2d3748;
}

.stat-label {
  display: block;
  font-size: 14px;
  color: #718096;
  margin-top: 4px;
}

.todo-app {
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 30px;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
}

.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3a86ff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  background-color: #fff5f5;
  border-radius: 12px;
  color: #e53e3e;
  margin: 20px 0;
}

.error-icon {
  font-family: 'Material Icons', sans-serif;
  font-size: 36px;
  margin-bottom: 12px;
}

.retry-btn {
  margin-top: 16px;
  background-color: #e53e3e;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.retry-btn:hover {
  background-color: #c53030;
}

@media (max-width: 768px) {
  .welcome-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }
  
  .stats {
    width: 100%;
  }
  
  .stat-item {
    flex: 1;
  }
}
</style>