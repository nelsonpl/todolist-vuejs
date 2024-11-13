<script setup>
import TaskList from './components/TaskList.vue';
import AddTaskForm from './components/AddTaskForm.vue';
</script>

<template>
  <header class="bg-blue-500 text-white p-4 text-center">
    <h1 class="text-3xl font-bold">My Task Manager</h1>
    <p class="text-lg">Organize your tasks efficiently</p>
  </header>
  <div id="app">
    <div class="container mx-auto">
      <AddTaskForm />
      <TaskList />
    </div>
  </div>
</template>

<style></style>