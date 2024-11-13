<script setup>
import TaskList from './components/TaskList.vue';
import AddTaskForm from './components/AddTaskForm.vue';
</script>

<template>
  <div id="app">
    <div class="container mx-auto">
      <AddTaskForm />
      <TaskList />
    </div>
  </div>
</template>

<style></style>