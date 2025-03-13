// store/index.js
import { createStore } from "vuex";
import axios from "axios";

// Set base URL for axios
axios.defaults.baseURL = "https://backend-todo-flax.vercel.app/api";

// Add interceptor to include JWT cookie in requests
axios.interceptors.request.use((config) => {
  // If the token exists in localStorage, add it to axios
  const token = localStorage.getItem("token");
  if (token) {
    // You're using cookies for auth, so no need to set Authorization header
    // The cookie will be sent automatically
  }
  return config;
});

export default createStore({
  state: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    todos: [],
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    getTodos: (state) => state.todos,
    getUser: (state) => state.user,
  },
  mutations: {
    setUser(state, userData) {
      state.user = userData.user;
      state.token = userData.token;
      localStorage.setItem("user", JSON.stringify(userData.user));
      localStorage.setItem("token", userData.token);

      // Set cookie for API requests
      document.cookie = `jwt=${userData.token}; path=/; max-age=${
        60 * 60 * 24 * 10
      }; SameSite=Strict`;
    },
    clearUser(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      // Clear the cookie
      document.cookie = "jwt=; path=/; max-age=0";
    },
    setTodos(state, todos) {
      state.todos = todos;
    },
    addTodo(state, todo) {
      state.todos.push(todo);
    },
    updateTodo(state, updatedTodo) {
      const index = state.todos.findIndex(
        (todo) => todo._id === updatedTodo._id
      );
      if (index !== -1) {
        state.todos.splice(index, 1, updatedTodo);
      }
    },
    removeTodo(state, todoId) {
      state.todos = state.todos.filter((todo) => todo._id !== todoId);
    },
  },
  actions: {
    async register({ commit }, userData) {
      try {
        const response = await axios.post("/user/register", userData);
        commit("setUser", {
          user: response.data.newUser,
          token: response.data.token,
        });
        return response;
      } catch (error) {
        throw error;
      }
    },
    async login({ commit }, credentials) {
      try {
        const response = await axios.post("/user/login", credentials);
        commit("setUser", {
          user: response.data.user,
          token: response.data.token,
        });
        return response;
      } catch (error) {
        throw error;
      }
    },
    logout({ commit }) {
      commit("clearUser");
      // You can add an actual logout API call here if needed
    },
    async fetchTodos({ commit }) {
      try {
        const response = await axios.get("/todo/fetch", {
          withCredentials: true,
          credentials: "include",
        });
        commit("setTodos", response.data.todos);
        return response;
      } catch (error) {
        throw error;
      }
    },
    async createTodo({ commit, state }, todoText) {
      try {
        const todoData = {
          text: todoText,
          completed: false,
          _id: state.user._id,
        };
        const response = await axios.post("/todo/create", todoData, {
          withCredentials: true,
        });
        commit("addTodo", response.data.newTodo);
        return response;
      } catch (error) {
        throw error;
      }
    },
    async updateTodo({ commit, state }, { id, text, completed }) {
      try {
        const todoData = {
          text,
          completed,
          _id: state.user._id,
        };
        const response = await axios.put(`/todo/update/${id}`, todoData, {
          withCredentials: true,
        });
        commit(
          "updateTodo",
          response.data.updatedTodo || { _id: id, text, completed }
        );
        return response;
      } catch (error) {
        throw error;
      }
    },
    async deleteTodo({ commit }, todoId) {
      try {
        await axios.delete(`/todo/delete/${todoId}`, { withCredentials: true });
        commit("removeTodo", todoId);
      } catch (error) {
        throw error;
      }
    },
  },
});
