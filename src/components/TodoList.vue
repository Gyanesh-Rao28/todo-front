// components/TodoList.vue
<template>
  <div class="todo-list">
    <div v-if="todos.length === 0" class="empty-state">
      <div class="empty-icon">assignment</div>
      <h3>No tasks yet</h3>
      <p>Add your first task to get started!</p>
    </div>
    <transition-group name="list" tag="ul" v-else>
      <TodoItem 
        v-for="todo in todos" 
        :key="todo._id" 
        :todo="todo"
        @update-todo="updateTodo"
        @delete-todo="deleteTodo"
      />
    </transition-group>
  </div>
</template>

<script>
import TodoItem from './TodoItem.vue'

export default {
  name: 'TodoList',
  components: {
    TodoItem
  },
  props: {
    todos: {
      type: Array,
      required: true
    }
  },
  emits: ['update-todo', 'delete-todo'],
  setup(props, { emit }) {
    const updateTodo = (id, text, completed) => {
      emit('update-todo', id, text, completed)
    }
    
    const deleteTodo = (id) => {
      emit('delete-todo', id)
    }
    
    return {
      updateTodo,
      deleteTodo
    }
  }
}
</script>

<style scoped>
.todo-list {
  margin-top: 24px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 0;
  background-color: #f7fafc;
  border-radius: 12px;
}

.empty-icon {
  font-family: 'Material Icons', sans-serif;
  font-size: 48px;
  color: #a0aec0;
  margin-bottom: 16px;
}

h3 {
  color: #4a5568;
  font-size: 20px;
  margin-bottom: 8px;
}

p {
  color: #a0aec0;
}

ul {
  list-style-type: none;
  padding: 0;
}

/* List animations */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>