// components/TodoItem.vue
<template>
  <li class="todo-item" :class="{ 'completed-item': todo.completed }">
    <div v-if="editing" class="edit-form">
      <input 
        type="text" 
        v-model="editText" 
        class="edit-input"
        @keyup.enter="saveEdit"
        @keyup.esc="cancelEdit"
        ref="editInput"
      />
      <div class="edit-actions">
        <button class="action-btn save-btn" @click="saveEdit">
          <span class="icon">check</span>
          <span>Save</span>
        </button>
        <button class="action-btn cancel-btn" @click="cancelEdit">
          <span class="icon">close</span>
          <span>Cancel</span>
        </button>
      </div>
    </div>
    <div v-else class="todo-content">
      <div class="todo-info">
        <label class="checkbox-container">
          <input
            type="checkbox"
            :checked="todo.completed"
            @change="toggleComplete"
            class="todo-checkbox"
          />
          <span class="checkmark"></span>
        </label>
        <span 
          class="todo-text" 
          :class="{ 'completed-text': todo.completed }"
        >
          {{ todo.text }}
        </span>
      </div>
      <div class="todo-actions">
        <button class="action-btn edit-btn" @click="startEdit">
          <span class="icon">edit</span>
        </button>
        <button class="action-btn delete-btn" @click="deleteTodo">
          <span class="icon">delete</span>
        </button>
      </div>
    </div>
  </li>
</template>

<script>
import { ref, nextTick, computed } from 'vue'

export default {
  name: 'TodoItem',
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  emits: ['update-todo', 'delete-todo'],
  setup(props, { emit }) {
    const editing = ref(false)
    const editText = ref(props.todo.text)
    const editInput = ref(null)
    
    const todoId = computed(() => props.todo._id)
    
    const toggleComplete = () => {
      emit('update-todo', todoId.value, props.todo.text, !props.todo.completed)
    }
    
    const startEdit = async () => {
      editText.value = props.todo.text
      editing.value = true
      await nextTick()
      editInput.value.focus()
    }
    
    const saveEdit = () => {
      if (editText.value.trim()) {
        emit('update-todo', todoId.value, editText.value, props.todo.completed)
        editing.value = false
      }
    }
    
    const cancelEdit = () => {
      editing.value = false
    }
    
    const deleteTodo = () => {
      if (confirm('Are you sure you want to delete this task?')) {
        emit('delete-todo', todoId.value)
      }
    }
    
    return {
      editing,
      editText,
      editInput,
      toggleComplete,
      startEdit,
      saveEdit,
      cancelEdit,
      deleteTodo
    }
  }
}
</script>

<style scoped>
.todo-item {
  background-color: #ffffff;
  border-radius: 12px;
  margin-bottom: 16px;
  padding: 16px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  border-left: 4px solid #3a86ff;
}

.todo-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
}

.completed-item {
  border-left-color: #10b981;
  opacity: 0.8;
}

.todo-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.todo-info {
  display: flex;
  align-items: center;
  flex: 1;
}

/* Custom checkbox */
.checkbox-container {
  display: block;
  position: relative;
  padding-left: 28px;
  cursor: pointer;
  user-select: none;
  margin-right: 12px;
}

.checkbox-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 22px;
  width: 22px;
  background-color: #edf2f7;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.checkbox-container:hover input ~ .checkmark {
  background-color: #e2e8f0;
}

.checkbox-container input:checked ~ .checkmark {
  background-color: #10b981;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.checkbox-container input:checked ~ .checkmark:after {
  display: block;
}

.checkbox-container .checkmark:after {
  left: 8px;
  top: 4px;
  width: 6px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.todo-text {
  font-size: 16px;
  word-break: break-word;
  color: #2d3748;
  transition: all 0.2s ease;
}

.completed-text {
  text-decoration: line-through;
  color: #a0aec0;
}

.todo-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  cursor: pointer;
  border-radius: 8px;
  padding: 6px;
  transition: all 0.2s ease;
}

.edit-btn {
  color: #4a5568;
}

.edit-btn:hover {
  background-color: #edf2f7;
  color: #3a86ff;
}

.delete-btn {
  color: #4a5568;
}

.delete-btn:hover {
  background-color: #edf2f7;
  color: #e53e3e;
}

.icon {
  font-family: 'Material Icons', sans-serif;
  font-size: 20px;
}

.edit-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.edit-input {
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  outline: none;
  transition: border 0.2s ease;
}

.edit-input:focus {
  border-color: #3a86ff;
}

.edit-actions {
  display: flex;
  gap: 12px;
}

.save-btn, .cancel-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 600;
}

.save-btn {
  background-color: #10b981;
  color: white;
}

.save-btn:hover {
  background-color: #059669;
}

.cancel-btn {
  background-color: #f7fafc;
  color: #4a5568;
  border: 1px solid #e2e8f0;
}

.cancel-btn:hover {
  background-color: #edf2f7;
}
</style>
