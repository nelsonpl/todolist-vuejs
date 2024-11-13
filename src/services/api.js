import axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL; 

export const api = {
  getTasks: (page, limit) => 
    axios.get(`${API_URL}/tasks`, { 
      params: { 
        page,   
        limit,
        status: 'pending'
      } 
    }),
  createTask: (task) => axios.post(`${API_URL}/tasks`, task),
  getTaskById: (id) => axios.get(`${API_URL}/tasks/${id}`),
  updateTask: (id, task) => axios.put(`${API_URL}/tasks/${id}`, task),
  deleteTask: (id) => axios.delete(`${API_URL}/tasks/${id}`),
  completeTask: (id) => axios.put(`${API_URL}/tasks/${id}/complete`),
  archiveTask: (id) => axios.put(`${API_URL}/tasks/${id}/archive`),
};