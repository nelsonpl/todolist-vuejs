<script setup>
import { ref } from 'vue';
import { api } from '../services/api';
import { useTaskStore } from '../stores/taskStore';
const task = ref({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
});

const taskStore = useTaskStore();

const submitTask = async () => {
    try {
        await api.createTask(task.value);
        task.value = {
            title: '',
            description: '',
            priority: 'medium',
            dueDate: '',
        };
        taskStore.fetchTasks();
    } catch (error) {
        console.error('Error adding task:', error);
        alert('Failed to add task. Please try again.');
    }
};
</script>

<template>
    <div class="p-4">
        <h2 class="text-xl font-bold mb-4">Add New Task</h2>
        <form @submit.prevent="submitTask" class="space-y-4">
            <div>
                <label for="title" class="block text-sm font-medium">Title</label>
                <input type="text" id="title" v-model="task.title" required
                    class="mt-1 block w-full border border-gray-300 rounded-md p-2" />
            </div>
            <div>
                <label for="description" class="block text-sm font-medium">Description</label>
                <textarea id="description" v-model="task.description"
                    class="mt-1 block w-full border border-gray-300 rounded-md p-2"></textarea>
            </div>
            <div>
                <label for="priority" class="block text-sm font-medium">Priority</label>
                <select id="priority" v-model="task.priority"
                    class="mt-1 block w-full border border-gray-300 rounded-md p-2">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>
            <div>
                <label for="dueDate" class="block text-sm font-medium">Due Date</label>
                <input type="date" id="dueDate" v-model="task.dueDate"
                    class="mt-1 block w-full border border-gray-300 rounded-md p-2" />
            </div>
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md">
                Add Task
            </button>
        </form>
    </div>
</template>

<style scoped></style>
