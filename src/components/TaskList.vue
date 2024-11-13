<script setup>
import { onMounted, ref } from 'vue';
import { useTaskStore } from '../stores/taskStore';

const taskStore = useTaskStore();
const titleSearch = ref('');
const descriptionSearch = ref('');
const statusFilter = ref('pending');
const priorityFilter = ref('');

const fetchTasks = () => {
  taskStore.fetchTasks(statusFilter.value, titleSearch.value, priorityFilter.value);
};

const completeTask = (id) => {
  taskStore.completeTask(id);
};

const deleteTask = (id) => {
  taskStore.deleteTask(id);
};

const changePage = (page) => {
  taskStore.changePage(page);
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

onMounted(fetchTasks);
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold">Task List ({{ taskStore.totalItems }})</h1>
    <div class="my-4">
      <input v-model="titleSearch" placeholder="Search by title" @input="fetchTasks" class="border p-2 mr-2" />
      <input v-model="descriptionSearch" placeholder="Search by description" @input="fetchTasks" class="border p-2 mr-2" />
      <select v-model="statusFilter" @change="fetchTasks" class="border p-2 mr-2">
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
      </select>
      <select v-model="priorityFilter" @change="fetchTasks" class="border p-2">
        <option value="">All Priorities</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
    </div>
  </div>
  <ul>
    <li v-for="task in taskStore.tasks" :key="task.id" class="border-b py-2">
      <div class="flex justify-between">
        <div>
          <h2 class="font-semibold">{{ task.title }}</h2>
          <p>Due Date: {{ formatDate(task.dueDate) }} | Priority: {{ task.priority }} | Status: {{ task.status }}</p>
          <p>{{ task.description }}</p>
        </div>
        <div>
          <button v-if="task.status === 'pending'" @click="() => completeTask(task._id)" class="bg-green-500 text-white px-2 py-1">Complete</button>
          <button @click="() => deleteTask(task._id)" class="bg-red-500 text-white px-2 py-1">Delete</button>
        </div>
      </div>
    </li>
  </ul>
  <div>
    <div class="flex items-center justify-between my-4">
      <button @click="changePage(taskStore.currentPage - 1)" :disabled="taskStore.currentPage === 1"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50">
        Previous
      </button>
      <span class="text-lg">Page {{ taskStore.currentPage }}</span>
      <button @click="changePage(taskStore.currentPage + 1)"
        :disabled="taskStore.currentPage * taskStore.itemsPerPage >= taskStore.totalItems"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50">
        Next
      </button>
    </div>
  </div>
</template>

<style scoped></style>