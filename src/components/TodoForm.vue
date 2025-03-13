// components/TodoForm.vue
<template>
  <div class="todo-form">
    <form @submit.prevent="addTodo">
      <div class="input-group">
        <input 
          type="text" 
          v-model="text" 
          placeholder="What needs to be done?" 
          class="form-control"
          required
        />
        <button 
          type="submit" 
          class="add-btn" 
          :disabled="!text.trim()"
          :class="{ 'disabled': !text.trim() }"
        >
          <span class="icon">add_task</span>
          <span>Add Task</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'TodoForm',
  emits: ['add-todo'],
  setup(props, { emit }) {
    const text = ref('')
    
    const addTodo = () => {
      if (text.value.trim()) {
        emit('add-todo', text.value)
        text.value = ''
      }
    }
    
    return {
      text,
      addTodo
    }
  }
}
</script>

<style scoped>
.todo-form {
  margin-bottom: 24px;
  width: 100%;
}

.input-group {
  display: flex;
  width: 100%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  border-radius: 12px;
  overflow: hidden;
}

.form-control {
  flex: 1;
  padding: 16px 20px;
  font-size: 16px;
  border: none;
  outline: none;
  color: #2d3748;
}

.form-control::placeholder {
  color: #a0aec0;
}

.add-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 20px;
  background: linear-gradient(90deg, #3a86ff, #5e60ce);
  color: white;
  border: none;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.add-btn:hover {
  background: linear-gradient(90deg, #2a76ff, #4e50be);
}

.add-btn.disabled {
  background: #cbd5e0;
  cursor: not-allowed;
}

.icon {
  font-family: 'Material Icons', sans-serif;
  font-size: 20px;
}
</style>
