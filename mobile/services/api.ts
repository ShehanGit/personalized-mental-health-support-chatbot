// services/api.ts
import axios from 'axios';

const baseURL = 'http://your-backend-url-here/api'; // e.g., 'http://192.168.1.10:5000/api'

const api = axios.create({
  baseURL,
});

// For authenticated calls, you might add an interceptor:
// api.interceptors.request.use((config) => {
//   const token = YOUR_TOKEN_HERE; // e.g., from a global store or AsyncStorage
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default api;
