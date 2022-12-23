import axios from 'axios';

//we set up base url for the server for fethcing the data.
const instance = axios.create({
  baseURL: 'http://localhost:4444',
});

//This middlware will check with every request if we have a user Token in localStorage or not. It there is a token - send request.
instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token');
  return config; //axios updated configuration returns.
});

export default instance;
