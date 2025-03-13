// components/TodoForm.vue
<template>
  <div class="todo-form">
    <form @submit.prevent="addTodo">
      <div class="input-group">
        <input 
          type="text" 
          v-model="text" 
          placeholder="Add a new task..." 
          class="form-control"
          required
        />
        <button type="submit" class="btn btn-primary" :disabled="!text.trim()">
          Add
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
  margin-bottom: 20px;
}

.input-group {
  display: flex;
}

.input-group .form-control {
  flex: 1;
  border-radius: 4px 0 0 4px;
}

.input-group .btn {
  border-radius: 0 4px 4px 0;
}
</style>