// components/TodoItem.vue
<template>
  <li class="todo-item">
    <div v-if="editing" class="edit-form">
      <input 
        type="text" 
        v-model="editText" 
        class="form-control"
        @keyup.enter="saveEdit"
        @keyup.esc="cancelEdit"
        ref="editInput"
      />
      <div class="edit-actions">
        <button class="btn btn-success btn-sm" @click="saveEdit">Save</button>
        <button class="btn btn-danger btn-sm" @click="cancelEdit">Cancel</button>
      </div>
    </div>
    <div v-else class="todo-content">
      <div class="todo-info">
        <input
          type="checkbox"
          :checked="todo.completed"
          @change="toggleComplete"
          class="todo-checkbox"
        />
        <span 
          class="todo-text" 
          :class="{ 'completed': todo.completed }"
        >
          {{ todo.text }}
        </span>
      </div>
      <div class="todo-actions">
        <button class="btn btn-primary btn-sm" @click="startEdit">Edit</button>
        <button class="btn btn-danger btn-sm" @click="deleteTodo">Delete</button>
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
  background-color: #f9f9f9;
  border-radius: 4px;
  margin-bottom: 10px;
  padding: 15px;
  transition: all 0.3s ease;
}

.todo-item:hover {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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

.todo-checkbox {
  margin-right: 10px;
  width: 18px;
  height: 18px;
}

.todo-text {
  font-size: 16px;
  word-break: break-word;
}

.completed {
  text-decoration: line-through;
  color: #999;
}

.todo-actions {
  display: flex;
  gap: 10px;
}

.edit-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.edit-actions {
  display: flex;
  gap: 10px;
}

.btn-sm {
  padding: 5px 10px;
  font-size: 12px;
}
</style>