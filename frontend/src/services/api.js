import axios from 'axios';

// Create Axios instance
const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Automatically attach token to request headers if available
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
