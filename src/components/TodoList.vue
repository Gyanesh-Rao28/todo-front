// components/TodoList.vue
<template>
  <div class="todo-list">
    <h3 v-if="todos.length === 0">No tasks yet. Add your first todo!</h3>
    <ul v-else>
      <TodoItem 
        v-for="todo in todos" 
        :key="todo._id" 
        :todo="todo"
        @update-todo="updateTodo"
        @delete-todo="deleteTodo"
      />
    </ul>
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
  margin-top: 20px;
}

h3 {
  color: #777;
  text-align: center;
  margin: 30px 0;
}

ul {
  list-style-type: none;
  padding: 0;
}
</style>
