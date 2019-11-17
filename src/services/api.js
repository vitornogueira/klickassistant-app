import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.105:3000',
  headers: {
    common: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  },
});

export default api;
