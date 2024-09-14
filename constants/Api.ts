import axios from 'axios';

const api = axios.create({
  baseURL: 'https://your-api-base-url.com', // Replace with your API base URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const apiUrl = [
    '/login',
]

export {api, apiUrl};
