import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.5:3000',
  headers: {
    common: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  },
});

export default api;
