import { defineStore } from 'pinia';
import { ref } from 'vue';
import { api } from '../services/api';

export const useTaskStore = defineStore('task', () => {
    const tasks = ref([]);
    const totalItems = ref(0);
    const currentPage = ref(1);
    const itemsPerPage = 10;

    const fetchTasks = async (status, search, priority) => {
        try {
            const { data } = await api.getTasks(currentPage.value, itemsPerPage, status, search, priority);
            tasks.value = data.data;
            totalItems.value = data.totalItems;
            currentPage.value = data.currentPage;
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const completeTask = async (id) => {
        try {
            await api.completeTask(id);
        } catch (error) {
            console.error('Error completing task:', error);
        }
    };

    const deleteTask = async (id) => {
        try {
            await api.deleteTask(id);
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const changePage = (page) => {
        currentPage.value = page;
        fetchTasks();
    };

    return { tasks, totalItems, currentPage, itemsPerPage, fetchTasks, completeTask, deleteTask, changePage };
});
