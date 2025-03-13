// views/Home.vue
<template>
  <div class="home-container">
    <h1>Welcome, {{ username }}</h1>
    <div class="todo-app">
      <TodoForm @add-todo="addTodo" />
      <TodoList 
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
    const username = computed(() => store.getters.getUser?.username || 'User')
    const loading = ref(false)
    const error = ref(null)

    onMounted(async () => {
      loading.value = true
      try {
        await store.dispatch('fetchTodos')
      } catch (err) {
        error.value = err.message || 'Failed to fetch todos'
      } finally {
        loading.value = false
      }
    })

    const addTodo = async (text) => {
      try {
        await store.dispatch('createTodo', text)
      } catch (err) {
        error.value = err.message || 'Failed to add todo'
      }
    }

    const updateTodo = async (id, text, completed) => {
      try {
        await store.dispatch('updateTodo', { id, text, completed })
      } catch (err) {
        error.value = err.message || 'Failed to update todo'
      }
    }

    const deleteTodo = async (id) => {
      try {
        await store.dispatch('deleteTodo', id)
      } catch (err) {
        error.value = err.message || 'Failed to delete todo'
      }
    }

    return {
      todos,
      username,
      loading,
      error,
      addTodo,
      updateTodo,
      deleteTodo
    }
  }
}
</script>

<style scoped>
.home-container {
  padding: 40px 0;
}

h1 {
  margin-bottom: 30px;
  color: #333;
  text-align: center;
}

.todo-app {
  max-width: 600px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.loading {
  text-align: center;
  margin: 20px 0;
  color: #777;
}

.error {
  color: #ef476f;
  text-align: center;
  margin: 20px 0;
}
</style>