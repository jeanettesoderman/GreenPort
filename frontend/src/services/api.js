import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const projectService = {
  getAllProjects: () => api.get('/projects'),
  getProjectById: (id) => api.get(`/projects/${id}`),
  createProject: (project) => api.post('/projects', project),
  updateProject: (id, project) => api.put(`/projects/${id}`, project),
  deleteProject: (id) => api.delete(`/projects/${id}`),
  updateMetrics: (id) => api.post(`/projects/${id}/metrics`),
  getProjectMetrics: (id) => api.get(`/projects/${id}/metrics`),
};

export default api;
