import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://winpredict-backend.onrender.com';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  login: (data: any) => api.post('/api/auth/login', data),
  register: (data: any) => api.post('/api/auth/registro', data),
  getMe: () => api.get('/api/auth/me'),
};

export const groupsService = {
  create: (data: any) => api.post('/api/grupos/', data),
  getMyGroups: () => api.get('/api/grupos/mis-grupos'),
  getRules: (id: string) => api.get(`/api/grupos/${id}/reglas`),
  updateRules: (id: string, data: any) => api.put(`/api/grupos/${id}/reglas`, data),
  join: (data: any) => api.post('/api/grupos/unirse', data),
};

export const matchesService = {
  list: () => api.get('/api/partidos/'),
  get: (id: string) => api.get(`/api/partidos/${id}`),
};

export const predictionsService = {
  register: (data: any) => api.post('/api/pronosticos/', data),
  getMyPredictions: (groupId: string) => api.get(`/api/pronosticos/mis-pronosticos/${groupId}`),
  calculatePoints: (matchId: string) => api.post(`/api/pronosticos/calcular/${matchId}`),
};

export const rankingService = {
  getRanking: (groupId: string) => api.get(`/api/ranking/${groupId}`),
};

export const proService = {
  checkout: () => api.post('/api/pro/checkout'),
  getSuggestions: (matchId: string) => api.get(`/api/pro/sugerencias/${matchId}`),
};

export const mercadoPagoService = {
  createPayment: (data: any) => api.post('/api/mercadopago/create-payment', data),
  getPaymentStatus: (paymentId: string) => api.get(`/api/mercadopago/payment-status/${paymentId}`),
};
