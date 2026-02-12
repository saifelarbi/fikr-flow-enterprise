import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const authAPI = {
  register: (data: any) => api.post('/auth/register', data),
  login: (data: any) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
};

// Clients
export const clientsAPI = {
  list: (search?: string) => api.get('/clients', { params: { search } }),
  create: (data: any) => api.post('/clients', data),
  get: (id: number) => api.get(`/clients/${id}`),
  update: (id: number, data: any) => api.put(`/clients/${id}`, data),
  delete: (id: number) => api.delete(`/clients/${id}`),
};

// Invoices
export const invoicesAPI = {
  list: (type?: string) => api.get('/invoices', { params: { type } }),
  create: (data: any) => api.post('/invoices', data),
  get: (id: number) => api.get(`/invoices/${id}`),
  update: (id: number, data: any) => api.put(`/invoices/${id}`, data),
  delete: (id: number) => api.delete(`/invoices/${id}`),
};

// Expenses
export const expensesAPI = {
  list: (params?: any) => api.get('/expenses', { params }),
  create: (data: any) => api.post('/expenses', data),
  get: (id: number) => api.get(`/expenses/${id}`),
  update: (id: number, data: any) => api.put(`/expenses/${id}`, data),
  delete: (id: number) => api.delete(`/expenses/${id}`),
};

// Stats
export const statsAPI = {
  summary: () => api.get('/stats/summary'),
  invoices: () => api.get('/stats/invoices'),
  expenses: () => api.get('/stats/expenses'),
};
