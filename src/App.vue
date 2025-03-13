// App.vue
<template>
  <div class="app-container">
    <NavBar />
    <router-view />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'

export default {
  name: 'App',
  components: {
    NavBar
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Arial', sans-serif;
  background-color: #f5f5f5;
  color: #333;
}

.app-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.btn {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: #4361ee;
  color: white;
}

.btn-danger {
  background-color: #ef476f;
  color: white;
}

.btn-success {
  background-color: #06d6a0;
  color: white;
}

.btn:hover {
  opacity: 0.9;
}

.form-group {
  margin-bottom: 20px;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.alert {
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 15px;
}

.alert-danger {
  background-color: #ffccd5;
  color: #ef476f;
  border: 1px solid #ef476f;
}

.alert-success {
  background-color: #ccfbf1;
  color: #06d6a0;
  border: 1px solid #06d6a0;
}
</style>