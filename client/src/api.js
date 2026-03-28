/**
 * Axios instance pre-configured to talk to the backend API.
 * Uses relative URL — works with both Vite proxy (dev) and Netlify redirects (prod).
 */
import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
});

export default API;
